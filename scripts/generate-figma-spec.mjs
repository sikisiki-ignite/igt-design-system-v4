#!/usr/bin/env node
/**
 * generate-figma-spec.mjs
 *
 * Figma 노드 데이터를 직접 추출해 figma-spec.json을 생성합니다.
 * AI 해석 없이 결정론적으로 layerInventory, layoutSpec, styleValues, propMapping을 추출합니다.
 *
 * 사용법:
 *   node scripts/generate-figma-spec.mjs <ComponentName>
 *   node scripts/generate-figma-spec.mjs <ComponentName> --node-id <figmaNodeId>
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dir, '..')

// ─── ENV ──────────────────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = join(ROOT, '.env')
  if (!existsSync(envPath)) throw new Error('.env 파일이 없습니다.')
  const env = {}
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([^=]+)=(.*)$/)
    if (m) env[m[1].trim()] = m[2].trim()
  }
  return env
}

// ─── FIGMA API ────────────────────────────────────────────────────────────────

async function fetchFigmaNode(fileKey, nodeId, token) {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(nodeId)}&depth=5`
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } })
  if (!res.ok) throw new Error(`Figma API 오류: ${res.status} ${await res.text()}`)
  const data = await res.json()
  const nodeData = data.nodes[nodeId]
  if (!nodeData) throw new Error(`노드 ${nodeId}를 찾을 수 없습니다.`)
  return {
    doc: nodeData.document,
    apiComponents: data.components ?? {},
  }
}

/**
 * FRAME/GROUP 래퍼인 경우 자식에서 COMPONENT_SET 또는 COMPONENT를 자동 탐색.
 * 실제 컴포넌트 nodeId와 doc을 반환.
 */
async function resolveComponentNode(fileKey, nodeId, token) {
  const { doc, apiComponents } = await fetchFigmaNode(fileKey, nodeId, token)

  if (doc.type === 'COMPONENT_SET' || doc.type === 'COMPONENT') {
    return { nodeId, doc, apiComponents }
  }

  // FRAME/GROUP이면 자식에서 COMPONENT_SET 먼저 탐색
  if (doc.type === 'FRAME' || doc.type === 'GROUP') {
    console.log(`      ⚠️  노드 타입이 ${doc.type}입니다. 자식에서 COMPONENT_SET 탐색 중...`)

    function findComponentSet(node) {
      if (!node.children) return null
      for (const child of node.children) {
        if (child.type === 'COMPONENT_SET') return child
        if (child.type === 'COMPONENT') return child
        const found = findComponentSet(child)
        if (found) return found
      }
      return null
    }

    const found = findComponentSet(doc)
    if (found) {
      console.log(`      → COMPONENT_SET 발견: "${found.name}" (${found.id})`)
      console.log(`      → 레지스트리 nodeId를 ${found.id} 로 교체하세요.`)
      const { doc: freshDoc, apiComponents: freshApiComponents } = await fetchFigmaNode(fileKey, found.id, token)
      return { nodeId: found.id, doc: freshDoc, apiComponents: freshApiComponents }
    }

    console.warn(`      ❌ COMPONENT_SET을 찾지 못했습니다. nodeId를 확인하세요: ${nodeId}`)
  }

  return { nodeId, doc, apiComponents }
}

// ─── COLOR UTILS ──────────────────────────────────────────────────────────────

/** Figma color { r,g,b,a } (0~1 range) → 정규화된 rgba 키 */
function figmaColorToKey({ r, g, b, a = 1 }) {
  const ri = Math.round(r * 255)
  const gi = Math.round(g * 255)
  const bi = Math.round(b * 255)
  const ai = Math.round(a * 100) / 100
  return `rgba(${ri},${gi},${bi},${ai})`
}

/** CSS rgba(R, G, B, A) 문자열 → 정규화된 rgba 키 */
function cssColorToKey(css) {
  const m = css.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/)
  if (!m) return css.toLowerCase().trim()
  const r = Math.round(parseFloat(m[1]))
  const g = Math.round(parseFloat(m[2]))
  const b = Math.round(parseFloat(m[3]))
  const a = m[4] != null ? Math.round(parseFloat(m[4]) * 100) / 100 : 1
  return `rgba(${r},${g},${b},${a})`
}

// ─── LAYER TRAVERSAL ──────────────────────────────────────────────────────────

/**
 * 노드의 실제 렌더링 픽셀 크기 추출.
 * absoluteBoundingBox: 레이아웃 기준 크기 (클립 전)
 * absoluteRenderBounds: 실제 렌더 크기 (그림자·블러 포함 → 우선순위 낮음)
 */
function extractDimensions(node) {
  const box = node.absoluteBoundingBox ?? node.absoluteRenderBounds
  if (!box) return undefined
  return { width: Math.round(box.width), height: Math.round(box.height) }
}

const AXIS_ALIGN_MAP = {
  MIN: 'flex-start',
  CENTER: 'center',
  MAX: 'flex-end',
  SPACE_BETWEEN: 'space-between',
  BASELINE: 'baseline',
}

/** 루트 프레임의 auto-layout 속성 추출 */
function extractLayoutSpec(node) {
  if (!node.layoutMode || node.layoutMode === 'NONE') return null
  const spec = {
    direction: node.layoutMode === 'HORIZONTAL' ? 'horizontal' : 'vertical',
    gap: node.itemSpacing ?? 0,
    paddingTop: node.paddingTop ?? 0,
    paddingRight: node.paddingRight ?? 0,
    paddingBottom: node.paddingBottom ?? 0,
    paddingLeft: node.paddingLeft ?? 0,
    alignItems: AXIS_ALIGN_MAP[node.counterAxisAlignItems] ?? 'flex-start',
    justifyContent: AXIS_ALIGN_MAP[node.primaryAxisAlignItems] ?? 'flex-start',
  }
  if (node.cornerRadius != null) spec.borderRadius = node.cornerRadius
  return spec
}

/**
 * base layoutSpec 대비 variant layoutSpec의 변경된 속성만 반환.
 * padding은 하나라도 다르면 4개 전부 포함 (layoutSpecToStyleValues의 collapsing 로직과 호환).
 */
function diffLayoutSpec(base, variant) {
  if (!base || !variant) return null
  const diff = {}

  if (variant.gap != null && variant.gap !== base.gap) diff.gap = variant.gap

  const padKeys = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']
  if (padKeys.some(k => variant[k] !== base[k])) {
    for (const k of padKeys) diff[k] = variant[k] ?? 0
  }

  if (variant.borderRadius != null && variant.borderRadius !== (base.borderRadius ?? null)) {
    diff.borderRadius = variant.borderRadius
  }

  if (variant.direction !== base.direction) diff.direction = variant.direction
  if (variant.alignItems !== base.alignItems) diff.alignItems = variant.alignItems
  if (variant.justifyContent !== base.justifyContent) diff.justifyContent = variant.justifyContent

  return Object.keys(diff).length > 0 ? diff : null
}

/** fills/strokes/effects에서 스타일 값 추출 */
function extractStyleValues(node) {
  const values = []

  // TEXT 노드의 fills는 background가 아닌 color — 아래 TEXT 블록에서 별도 처리
  if (node.type !== 'TEXT') {
    for (const fill of node.fills ?? []) {
      if (fill.type === 'SOLID' && fill.visible !== false) {
        const opacity = fill.opacity ?? 1
        const color = opacity < 1
          ? { ...fill.color, a: (fill.color.a ?? 1) * opacity }
          : fill.color
        values.push({
          property: 'background',
          figmaValue: figmaColorToKey(color),
          token: null,
          resolved: false,
        })
      }
    }
  }

  for (const stroke of node.strokes ?? []) {
    if (stroke.type === 'SOLID' && stroke.visible !== false) {
      // Figma stroke에는 color.a와 별개로 opacity 필드가 있을 수 있음
      const opacity = stroke.opacity ?? 1
      const color = opacity < 1
        ? { ...stroke.color, a: (stroke.color.a ?? 1) * opacity }
        : stroke.color
      values.push({
        property: 'border-color',
        figmaValue: figmaColorToKey(color),
        token: null,
        resolved: false,
      })
    }
  }

  // Drop-shadow 효과를 하나의 box-shadow 값으로 합산 (CSS는 콤마 구분 단일 속성)
  const shadowParts = (node.effects ?? [])
    .filter(e => e.type === 'DROP_SHADOW' && e.visible !== false)
    .map(({ color, offset, radius, spread = 0 }) =>
      `${offset.x}px ${offset.y}px ${radius}px ${spread}px ${figmaColorToKey(color)}`
    )
  if (shadowParts.length > 0) {
    values.push({
      property: 'box-shadow',
      figmaValue: shadowParts.join(', '),
      token: null,
      resolved: false,
    })
  }

  // TEXT 노드: fills → 글자색 (opacity 보정 포함), style → typography
  if (node.type === 'TEXT') {
    for (const fill of node.fills ?? []) {
      if (fill.type === 'SOLID' && fill.visible !== false) {
        const opacity = fill.opacity ?? 1
        const color = opacity < 1
          ? { ...fill.color, a: (fill.color.a ?? 1) * opacity }
          : fill.color
        values.push({
          property: 'color',
          figmaValue: figmaColorToKey(color),
          token: null,
          resolved: false,
        })
        break // 첫 번째 fill만 사용
      }
    }
    if (node.style?.fontSize != null && node.style?.fontWeight != null) {
      const fontSize = node.style.fontSize
      const fontWeight = node.style.fontWeight
      // lineHeightUnit=PIXELS 일 때만 lineHeight를 key에 포함 — AUTO/FONT_SIZE_% 는 px 불확정
      const lhPx = node.style?.lineHeightUnit === 'PIXELS'
        ? Math.round(node.style.lineHeightPx ?? 0) || null
        : null
      const typoKey = lhPx != null ? `${fontSize}-${fontWeight}-${lhPx}` : `${fontSize}-${fontWeight}`
      values.push({
        property: 'text-style',
        figmaValue: typoKey,
        token: null,
        resolved: false,
      })
    }
  }

  return values
}

/**
 * INSTANCE 내부 VECTOR/BOOLEAN_OPERATION 에서 첫 유효 fill을 버블업
 * - grid INSTANCE(디버그 오버레이) 제외
 * - opacity 보정 후 { figmaValue } 반환
 */
function findFirstDescendantFill(node, depth = 0) {
  if (depth > 4) return null
  for (const child of (node.children ?? [])) {
    if (child.visible === false) continue
    if (child.type === 'INSTANCE' && child.name === 'grid') continue
    if (
      (child.type === 'VECTOR' || child.type === 'BOOLEAN_OPERATION') &&
      child.fills?.length > 0
    ) {
      const fill = child.fills[0]
      if (fill.type === 'SOLID' && (fill.opacity ?? 1) > 0) {
        const opacity = fill.opacity ?? 1
        const color = opacity < 1
          ? { ...fill.color, a: (fill.color.a ?? 1) * opacity }
          : fill.color
        return figmaColorToKey(color)
      }
    }
    const found = findFirstDescendantFill(child, depth + 1)
    if (found) return found
  }
  return null
}

/**
 * 컴포넌트 레이어 트리 재귀 순회
 * conditional: 해당 레이어를 제어하는 boolean prop 이름 (없으면 null)
 */
function traverseLayers(node, componentPropertyDefs, depth = 0) {
  if (!node.children || depth > 5) return []
  const inventory = []

  for (const child of node.children) {
    if (child.type === 'VECTOR' || child.type === 'BOOLEAN_OPERATION') continue

    const conditional = detectConditional(child, componentPropertyDefs)
    const styleValues = extractStyleValues(child)

    const dimensions = extractDimensions(child)

    if (child.type === 'INSTANCE') {
      // INSTANCE 자식도 순회 — Figma API는 depth=5로 이미 반환함
      const instanceChildren = depth < 5 && child.children?.length > 0
        ? traverseLayers(child, componentPropertyDefs, depth + 1)
        : []

      // C: VARIANT componentProperties 캡처 (tone, appearance, emphasis, size 등)
      const instanceProps = {}
      if (child.componentProperties) {
        for (const [key, val] of Object.entries(child.componentProperties)) {
          if (val.type === 'VARIANT') instanceProps[key.split('#')[0]] = val.value
        }
      }

      // B: INSTANCE 자체에 fill이 없으면 내부 SVG path에서 버블업
      let effectiveStyleValues = styleValues
      const hasFill = styleValues.some(sv => sv.property === 'background' || sv.property === 'color')
      if (!hasFill && child.children?.length > 0) {
        const bubbled = findFirstDescendantFill(child)
        if (bubbled) {
          effectiveStyleValues = [...styleValues, {
            property: 'color',
            figmaValue: bubbled,
            token: null,
            resolved: false,
          }]
        }
      }

      inventory.push({
        layerName: child.name,
        type: 'INSTANCE',
        componentName: child.name,
        conditional,
        dimensions,
        styleValues: effectiveStyleValues.length > 0 ? effectiveStyleValues : undefined,
        ...(Object.keys(instanceProps).length > 0 ? { instanceProps } : {}),
        ...(instanceChildren.length > 0 ? { children: instanceChildren } : {}),
      })
    } else if (child.type === 'TEXT') {
      inventory.push({
        layerName: child.name,
        type: 'TEXT',
        conditional,
        dimensions,
        ...(child.characters != null && child.characters !== child.name
          ? { characters: child.characters }
          : {}),
        styleValues: styleValues.length > 0 ? styleValues : undefined,
      })
    } else if (child.type === 'FRAME' || child.type === 'GROUP' || child.type === 'SLOT') {
      const layoutSpec = extractLayoutSpec(child)
      inventory.push({
        layerName: child.name,
        type: child.type,
        conditional,
        dimensions,
        layoutSpec: layoutSpec ?? undefined,
        styleValues: styleValues.length > 0 ? styleValues : undefined,
        children: traverseLayers(child, componentPropertyDefs, depth + 1),
      })
    } else if (
      child.type === 'ELLIPSE' || child.type === 'RECTANGLE' ||
      child.type === 'STAR' || child.type === 'LINE' || child.type === 'POLYGON'
    ) {
      inventory.push({
        layerName: child.name,
        type: child.type,
        conditional,
        dimensions,
        styleValues: styleValues.length > 0 ? styleValues : undefined,
      })
    }
  }

  return inventory
}

/**
 * 레이어가 어떤 boolean prop에 의해 제어되는지 감지
 */
function detectConditional(node, componentPropertyDefs) {
  // Figma 인스턴스의 componentProperties에서 boolean prop 확인
  if (node.componentProperties) {
    for (const [key, val] of Object.entries(node.componentProperties)) {
      if (val.type === 'BOOLEAN') return key.split('#')[0]
    }
  }

  // 기본값이 hidden인 경우 → 부모의 boolean prop과 이름 매칭
  if (node.visible === false) {
    const nodeName = node.name.toLowerCase().replace(/[\s_-]+/g, '')
    for (const [key, def] of Object.entries(componentPropertyDefs)) {
      if (def.type !== 'BOOLEAN') continue
      const propName = key.split('#')[0].toLowerCase().replace(/[\s_-]+/g, '')
      if (nodeName.includes(propName) || propName.includes(nodeName)) {
        return key.split('#')[0]
      }
    }
    return '__hidden__'
  }

  return null
}

// ─── LAYER MERGE ──────────────────────────────────────────────────────────────

/**
 * 레이어 트리의 모든 노드에 _sizesPresent: Set([sizeVal]) 태그를 재귀적으로 추가.
 */
function tagLayersWithSize(layers, sizeVal) {
  for (const layer of layers) {
    layer._sizesPresent = new Set([sizeVal])
    if (layer.children) tagLayersWithSize(layer.children, sizeVal)
  }
}

/**
 * existing 레이어의 children에 incoming의 children을 재귀적으로 병합.
 * existing에 없는 child는 추가하고, 있는 child는 _sizesPresent를 합집합 업데이트.
 */
function deepMergeChildren(existing, incoming) {
  if (!incoming.children?.length) return
  existing.children ??= []
  for (const child of incoming.children) {
    const ex = existing.children.find(c => c.layerName === child.layerName)
    if (!ex) {
      existing.children.push(child)
    } else {
      if (ex._sizesPresent && child._sizesPresent) {
        for (const sz of child._sizesPresent) ex._sizesPresent.add(sz)
      }
      deepMergeChildren(ex, child)
    }
  }
}

/**
 * _sizesPresent → sizeConditional 최종 변환.
 * 모든 size에 존재 → sizeConditional 없음.
 * 일부 size에만 존재 → sizeConditional: [해당 size 배열].
 * _sizesPresent 임시 필드 삭제.
 */
function finalizeSizeConditional(layers, allSizeValues) {
  for (const layer of layers) {
    if (layer._sizesPresent) {
      if (layer._sizesPresent.size < allSizeValues.size) {
        layer.sizeConditional = [...layer._sizesPresent].sort()
      }
      delete layer._sizesPresent
    }
    if (layer.children) finalizeSizeConditional(layer.children, allSizeValues)
  }
}

/**
 * 여러 COMPONENT variant에서 레이어를 수집해 병합.
 * layerName을 키로 중복 제거 — 어느 한 variant에만 있는 레이어도 포함.
 * variant 이름에서 Size 값을 파싱해 dimensionsBySize 수집.
 * Value prop별로 다른 아이콘(INSTANCE swap)을 쓰는 경우 conditional을 자동 할당.
 */
function mergeLayerInventories(components, componentPropertyDefs) {
  // layerMap: 최상위 레이어 (layerName → layer 객체)
  const layerMap = new Map()
  // flatDimsBySize: 모든 레이어(중첩 포함)의 size별 치수 { layerName → { sizeValue → dims } }
  const flatDimsBySize = {}
  // flatTextStylesBySize: TEXT 레이어별 size별 text-style figmaValue { layerName → { sizeValue → figmaValue } }
  const flatTextStylesBySize = {}

  // instanceSlots: FRAME별 Value별 INSTANCE 목록
  // { frameLayerName → { valueStr → [{ name, dimensions }] } }
  const instanceSlots = {}
  // instanceDimsBySize: INSTANCE별 size별 치수 { instanceLayerName → { sizeValue → dims } }
  const instanceDimsBySize = {}

  // sizeConditional 감지를 위한 전체 Size 값 수집
  const allSizeValues = new Set()
  for (const comp of components) {
    const m = (comp.name ?? '').match(/\bSize=([^,\s]+)/i)
    if (m?.[1]) allSizeValues.add(m[1])
  }
  const hasSizeVariants = allSizeValues.size > 1

  // 레이어 트리를 재귀적으로 순회하며 size별 치수를 flatDimsBySize에 수집
  function collectFlatDims(layers, sizeValue) {
    for (const layer of layers) {
      if (sizeValue && layer.dimensions) {
        if (!flatDimsBySize[layer.layerName]) flatDimsBySize[layer.layerName] = {}
        if (!flatDimsBySize[layer.layerName][sizeValue]) {
          flatDimsBySize[layer.layerName][sizeValue] = layer.dimensions
        }
      }
      if (layer.children) collectFlatDims(layer.children, sizeValue)
    }
  }

  // TEXT 레이어별 size별 text-style figmaValue 수집
  function collectFlatTextStyles(layers, sizeValue) {
    for (const layer of layers) {
      if (sizeValue && layer.type === 'TEXT') {
        const sv = (layer.styleValues ?? []).find(s => s.property === 'text-style')
        if (sv?.figmaValue) {
          if (!flatTextStylesBySize[layer.layerName]) flatTextStylesBySize[layer.layerName] = {}
          if (!flatTextStylesBySize[layer.layerName][sizeValue]) {
            flatTextStylesBySize[layer.layerName][sizeValue] = sv.figmaValue
          }
        }
      }
      if (layer.children) collectFlatTextStyles(layer.children, sizeValue)
    }
  }

  // flatDimsBySize를 layerInventory 트리에 역으로 적용
  function applyDimsBySize(layers) {
    for (const layer of layers) {
      const bySize = flatDimsBySize[layer.layerName]
      if (bySize && Object.keys(bySize).length > 0) {
        layer.dimensionsBySize = bySize
      }
      if (layer.children) applyDimsBySize(layer.children)
    }
  }

  // flatTextStylesBySize를 TEXT 레이어에 적용 (token은 이후 main()에서 resolve)
  function applyTextStylesBySize(layers) {
    for (const layer of layers) {
      if (layer.type === 'TEXT') {
        const bySize = flatTextStylesBySize[layer.layerName]
        if (bySize && Object.keys(bySize).length > 0) {
          layer.textStylesBySize = Object.fromEntries(
            Object.entries(bySize).map(([size, figmaValue]) => [
              size,
              { figmaValue, token: null, resolved: false },
            ])
          )
        }
      }
      if (layer.children) applyTextStylesBySize(layer.children)
    }
  }

  for (const comp of components) {
    // variant 이름에서 Size 값 파싱: "Value=checked, Size=sm, State=normal, ..."
    const sizeMatch = (comp.name ?? '').match(/\bSize=([^,\s]+)/i)
    const sizeValue = sizeMatch?.[1] ?? null

    const layers = traverseLayers(comp, componentPropertyDefs)
    if (hasSizeVariants && sizeValue) tagLayersWithSize(layers, sizeValue)
    for (const layer of layers) {
      if (!layerMap.has(layer.layerName)) {
        layerMap.set(layer.layerName, layer)
      } else if (hasSizeVariants && sizeValue) {
        const ex = layerMap.get(layer.layerName)
        if (ex._sizesPresent && layer._sizesPresent) {
          for (const sz of layer._sizesPresent) ex._sizesPresent.add(sz)
        }
        deepMergeChildren(ex, layer)
      }
    }
    if (sizeValue) collectFlatDims(layers, sizeValue)
    if (sizeValue) collectFlatTextStyles(layers, sizeValue)

    // INSTANCE swap 수집: md(또는 Size 없음) 변형에서만, Value prop 있는 경우
    const isMd = !sizeValue || sizeValue === 'md'
    const valueMatch = (comp.name ?? '').match(/\bValue=([^,\s]+)/i)
    const valueStr = valueMatch?.[1] ?? null
    if (isMd && valueStr) {
      function scanInstances(nodes, parentName) {
        for (const node of (nodes ?? [])) {
          if (node.visible === false) continue  // 숨겨진 레이어는 conditional 수집에서 제외
          if (node.type === 'INSTANCE') {
            if (!instanceSlots[parentName]) instanceSlots[parentName] = {}
            if (!instanceSlots[parentName][valueStr]) instanceSlots[parentName][valueStr] = []
            const dims = extractDimensions(node)
            instanceSlots[parentName][valueStr].push({ name: node.name, dimensions: dims })
            // size별 치수 수집
            if (sizeValue) {
              if (!instanceDimsBySize[node.name]) instanceDimsBySize[node.name] = {}
              if (!instanceDimsBySize[node.name][sizeValue]) {
                instanceDimsBySize[node.name][sizeValue] = dims
              }
            }
          } else if (node.type === 'FRAME' || node.type === 'GROUP') {
            scanInstances(node.children, node.name)
          }
        }
      }
      scanInstances(comp.children, '__root__')
    }
    // sm 변형도 dimensionsBySize를 위해 스캔
    if (!isMd && valueStr) {
      function scanInstanceSmDims(nodes) {
        for (const node of (nodes ?? [])) {
          if (node.type === 'INSTANCE' && sizeValue) {
            if (!instanceDimsBySize[node.name]) instanceDimsBySize[node.name] = {}
            if (!instanceDimsBySize[node.name][sizeValue]) {
              instanceDimsBySize[node.name][sizeValue] = extractDimensions(node)
            }
          } else if (node.type === 'FRAME' || node.type === 'GROUP') {
            scanInstanceSmDims(node.children)
          }
        }
      }
      scanInstanceSmDims(comp.children)
    }
  }

  if (hasSizeVariants) finalizeSizeConditional([...layerMap.values()], allSizeValues)

  const result = [...layerMap.values()]
  applyDimsBySize(result)
  applyTextStylesBySize(result)

  // INSTANCE swap 보정: Value별로 다른 아이콘을 쓰는 FRAME의 children을 갱신
  function enrichInstanceChildren(layers) {
    for (const layer of layers) {
      if ((layer.type !== 'FRAME' && layer.type !== 'GROUP') || !layer.children) continue

      const slots = instanceSlots[layer.layerName]
      if (slots) {
        const allNames = new Set(
          Object.values(slots).flatMap(insts => insts.map(i => i.name))
        )
        if (allNames.size > 1) {
          // 여러 다른 아이콘(instance swap) → conditional 버전으로 교체
          // 단 하나의 Value에만 등장하는 아이콘 → conditional: <그 value>
          // 여러 Value에 등장하는 아이콘 → conditional: null (CSS 색상으로 제어)
          const nameToValues = {}
          for (const [val, insts] of Object.entries(slots)) {
            for (const inst of insts) {
              if (!nameToValues[inst.name]) nameToValues[inst.name] = []
              if (!nameToValues[inst.name].includes(val)) nameToValues[inst.name].push(val)
            }
          }
          const nonInstances = layer.children.filter(c => c.type !== 'INSTANCE')
          const conditioned = []
          for (const [name, vals] of Object.entries(nameToValues)) {
            const conditional = vals.length === 1 ? vals[0] : null
            const sample = Object.values(slots).flat().find(i => i.name === name)
            const dimsBySize = instanceDimsBySize[name]
            conditioned.push({
              layerName: name,
              type: 'INSTANCE',
              componentName: name,
              conditional,
              dimensions: sample?.dimensions ?? null,
              ...(dimsBySize && Object.keys(dimsBySize).length > 0 ? { dimensionsBySize: dimsBySize } : {}),
            })
          }
          layer.children = [...nonInstances, ...conditioned]
        }
      }

      enrichInstanceChildren(layer.children)
    }
  }
  enrichInstanceChildren(result)

  return result
}

// ─── TOKEN REVERSE MAP ────────────────────────────────────────────────────────

/**
 * src/tokens/ CSS 파일을 파싱해 역매핑을 반환:
 *   colorMap:  { normalizedRgbaKey → [tokenName, ...] }  (색상 토큰)
 *   pixelMap:  { numericPx → [tokenName, ...] }          (spacing/radius/borderWidth)
 *   shadowMap: { normalizedShadow → [tokenName, ...] }   (box-shadow 토큰)
 *
 * 우선순위 (colorMap): --sys-* > --color-* > 나머지
 * 우선순위 (pixelMap): --spacing-* > --radius-* > --borderWidth-* > 나머지
 */

/** #RRGGBBAA 또는 #RRGGBB hex 색상 → 정규화된 rgba 키 */
function hexColorToKey(hex) {
  const m = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i)
  if (!m) return null
  const r = parseInt(m[1], 16)
  const g = parseInt(m[2], 16)
  const b = parseInt(m[3], 16)
  const a = m[4] != null ? Math.round(parseInt(m[4], 16) / 255 * 100) / 100 : 1
  return `rgba(${r},${g},${b},${a})`
}

/** box-shadow 문자열 정규화 (공백·소수 통일, hex/rgba 모두 rgba로 통일) */
function normalizeShadow(str) {
  return str
    .replace(/#[0-9a-f]{6,8}/gi, m => hexColorToKey(m) ?? m)
    .replace(/rgba?\([^)]+\)/g, m => { try { return cssColorToKey(m) } catch { return m } })
    .replace(/\s+/g, ' ')
    .trim()
}
function buildTokenReverseMap() {
  const tokensDir = join(ROOT, 'src', 'tokens')
  const files = ['primitives.css', 'semantic.css', 'component.css', 'typography.css', 'effects.css']

  // 1단계: 모든 토큰 원시값 수집 (tokenName → raw value)
  // "첫 정의 우선" — semantic.css는 라이트 모드(앞)와 다크 모드(뒤)가 공존.
  // 마지막 정의(다크 모드)로 덮어쓰면 역매핑이 오염되므로 첫 정의만 유지.
  const rawTokens = {}
  for (const file of files) {
    const filePath = join(tokensDir, file)
    if (!existsSync(filePath)) continue
    const content = readFileSync(filePath, 'utf8')
    for (const [, name, value] of content.matchAll(/--([a-zA-Z0-9-]+)\s*:\s*([^;}\n]+);/g)) {
      const key = `--${name.trim()}`
      if (!(key in rawTokens)) rawTokens[key] = value.trim()
    }
  }

  // 2단계: var() 체인 해소 → 최종 rgba() 값으로 resolve (색상 전용)
  const resolvedColors = {}
  function resolveColorToken(name, visited = new Set()) {
    if (name in resolvedColors) return resolvedColors[name]
    if (visited.has(name)) return null
    visited.add(name)

    const raw = rawTokens[name]
    if (!raw) return null

    if (raw.startsWith('rgba') || raw.startsWith('rgb')) {
      resolvedColors[name] = cssColorToKey(raw)
      return resolvedColors[name]
    }

    const varMatch = raw.match(/var\((--[a-zA-Z0-9-]+)\)/)
    if (varMatch) {
      const r = resolveColorToken(varMatch[1], new Set(visited))
      if (r) resolvedColors[name] = r
      return resolvedColors[name] ?? null
    }

    return null
  }
  for (const name of Object.keys(rawTokens)) resolveColorToken(name)

  // 3단계: colorMap 역매핑 생성
  const colorMap = {}
  for (const [name, colorKey] of Object.entries(resolvedColors)) {
    if (!colorMap[colorKey]) colorMap[colorKey] = []
    colorMap[colorKey].push(name)
  }
  for (const key of Object.keys(colorMap)) {
    colorMap[key].sort((a, b) => {
      const rank = (n) => {
        // border/surface/content semantic 토큰 — 가장 의미가 명확
        if (n.startsWith('--sys-border-')) return 0
        if (n.startsWith('--sys-surface-')) return 1
        if (n.startsWith('--sys-content-neutral')) return 2
        if (n.startsWith('--sys-interactive-focus-')) return 3
        if (n.startsWith('--sys-interactive-')) return 4
        if (n.startsWith('--sys-')) return 5
        if (n.startsWith('--color-')) return 6
        return 7
      }
      return rank(a) - rank(b)
    })
  }

  // 4단계: pixelMap 역매핑 생성 (직접 px 값만 — var() 체인 해소 없음)
  const pixelMap = {}
  for (const [name, raw] of Object.entries(rawTokens)) {
    const m = raw.match(/^(-?\d+(?:\.\d+)?)px$/)
    if (!m) continue
    const num = parseFloat(m[1])
    if (!pixelMap[num]) pixelMap[num] = []
    pixelMap[num].push(name)
  }
  for (const key of Object.keys(pixelMap)) {
    pixelMap[key].sort((a, b) => {
      const rank = (n) => {
        if (n.startsWith('--spacing-')) return 0
        if (n.startsWith('--radius-')) return 1
        if (n.startsWith('--borderWidth-')) return 2
        return 3
      }
      return rank(a) - rank(b)
    })
  }

  // 4.5단계: shadowMap 역매핑 생성
  // box-shadow 값 패턴: "Xpx Ypx Rpx Spx rgba(...)"
  const shadowMap = {}
  for (const [name, raw] of Object.entries(rawTokens)) {
    if (!/\d+px/.test(raw) || (!/rgba?\(/.test(raw) && !/#[0-9a-f]{6,8}/i.test(raw))) continue
    const normalized = normalizeShadow(raw)
    if (!shadowMap[normalized]) shadowMap[normalized] = []
    shadowMap[normalized].push(name)
  }
  for (const key of Object.keys(shadowMap)) {
    shadowMap[key].sort((a, b) => {
      const rank = (n) => {
        if (n.startsWith('--sys-')) return 0
        if (n.startsWith('--semantic-')) return 1
        return 2
      }
      return rank(a) - rank(b)
    })
  }

  // 5단계: typographyMap 생성 { "fontSize-fontWeight" → tokenPrefix }
  // 예: "15-600" → "--semantic-label-15-semibold"
  // typographyMap: { "fontSize-fontWeight" → tokenPrefix }
  // 우선순위: label > body > caption > heading > 나머지
  const typoRank = (prefix) => {
    if (prefix.includes('-label-')) return 0
    if (prefix.includes('-body-')) return 1
    if (prefix.includes('-caption-')) return 2
    if (prefix.includes('-heading-')) return 3
    return 4
  }
  const typoCandidates = {} // key → [prefix, ...]
  for (const name of Object.keys(rawTokens)) {
    const m = name.match(/^--semantic-([a-zA-Z]+)-(\d+)-(regular|medium|semibold|bold)-fontFamily$/)
    if (!m) continue
    const prefix = `--semantic-${m[1]}-${m[2]}-${m[3]}`
    const fsRaw = rawTokens[`${prefix}-fontSize`]
    const fwRaw = rawTokens[`${prefix}-fontWeight`]
    const lhRaw = rawTokens[`${prefix}-lineHeight`]
    const fsNum = fsRaw?.match(/var\(--typography-fontSize-(\d+)\)/)?.[1]
    const fwNum = fwRaw?.match(/var\(--typography-fontWeight-(\d+)\)/)?.[1]
    // lineHeight는 var(--typography-lineHeight-N) 또는 직접 Npx 형식
    const lhNum = lhRaw?.match(/var\(--typography-lineHeight-(\d+)\)/)?.[1]
               ?? lhRaw?.match(/^(\d+)px$/)?.[1]
    if (fsNum && fwNum) {
      // 3-part key(lineHeight 포함) + 2-part fallback key 둘 다 등록
      const key3 = lhNum ? `${fsNum}-${fwNum}-${lhNum}` : null
      const key2 = `${fsNum}-${fwNum}`
      for (const key of [key3, key2].filter(Boolean)) {
        if (!typoCandidates[key]) typoCandidates[key] = []
        if (!typoCandidates[key].includes(prefix)) typoCandidates[key].push(prefix)
      }
    }
  }
  const typographyMap = {}
  for (const [key, candidates] of Object.entries(typoCandidates)) {
    candidates.sort((a, b) => typoRank(a) - typoRank(b))
    typographyMap[key] = candidates[0]
  }

  return { colorMap, pixelMap, shadowMap, typographyMap }
}

/**
 * property 컨텍스트에 맞는 토큰 후보를 pixelMap에서 선택.
 * gap/padding → --spacing-* 우선
 * border-radius → --radius-* 우선
 */
function pickPixelToken(property, pixelCandidates) {
  if (!pixelCandidates?.length) return null
  const isRadius = property === 'border-radius'
  return pixelCandidates.find(t =>
    isRadius ? t.startsWith('--radius-') : t.startsWith('--spacing-')
  ) ?? pixelCandidates[0]
}

/** styleValues 배열의 각 항목을 토큰 역매핑으로 resolve */
function resolveStyleTokens(styleValues, { colorMap, pixelMap, shadowMap = {}, typographyMap = {} }) {
  return styleValues.map(sv => {
    if (sv.property === 'box-shadow') {
      const normalized = normalizeShadow(String(sv.figmaValue))
      const matches = shadowMap[normalized]
      if (matches?.length > 0) return { ...sv, token: matches[0], resolved: true }
      return sv
    }

    if (sv.property === 'text-style') {
      const token = typographyMap[sv.figmaValue]
      if (token) return { ...sv, token, resolved: true }
      // 3-part key(fontSize-fontWeight-lineHeight) 미매핑 → 2-part fallback
      const parts = sv.figmaValue.split('-')
      if (parts.length > 2) {
        const fallbackKey = `${parts[0]}-${parts[1]}`
        const fallbackToken = typographyMap[fallbackKey]
        if (fallbackToken) return { ...sv, token: fallbackToken, resolved: true }
      }
      return sv
    }

    if (typeof sv.figmaValue === 'number') {
      const token = pickPixelToken(sv.property, pixelMap[sv.figmaValue])
      if (token) return { ...sv, token, resolved: true }
      return sv
    }

    const matches = colorMap[sv.figmaValue]
    if (matches?.length > 0) {
      // color 속성(텍스트 색상)은 content 토큰이 surface/border보다 의미적으로 정확
      if (sv.property === 'color') {
        const contentFirst = [...matches].sort((a, b) => {
          const rank = (n) => {
            if (n.startsWith('--sys-content-') || n.startsWith('--sys-contentOn-')) return 0
            return 1
          }
          return rank(a) - rank(b)
        })
        return { ...sv, token: contentFirst[0], resolved: true }
      }
      return { ...sv, token: matches[0], resolved: true }
    }
    return sv
  })
}

// ─── SUB-COMPONENT INTERACTION STATES ────────────────────────────────────────

const CSS_INTERACTION_STATES = new Set(['hover', 'pressed', 'active', 'focus'])

/**
 * Figma API는 /nodes 응답에서 참조 컴포넌트의 componentSetId를 제공하지 않음.
 * 대신 수집된 componentId들의 numeric 범위를 분석해 COMPONENT_SET을 탐색:
 *   - 변형 ID 중 최솟값 -1 ~ -10 구간 (COMPONENT_SET은 보통 첫 변형 직전에 위치)
 *   - 변형 ID들 사이의 gap 구간 (COMPONENT_SET이 변형들 사이에 위치하기도 함)
 * 발견된 COMPONENT_SET 이름이 INSTANCE 이름과 일치하면 해당 COMPONENT_SET으로 확정.
 */
async function findSubComponentSetId(instanceName, compIds, fileKey, token) {
  // prefix별로 그룹화 (예: '730', '2139')
  const byPrefix = {}
  for (const id of compIds) {
    const [prefix, num] = id.split(':')
    if (!byPrefix[prefix]) byPrefix[prefix] = []
    byPrefix[prefix].push(parseInt(num, 10))
  }

  for (const [prefix, nums] of Object.entries(byPrefix)) {
    const minNum = Math.min(...nums)
    const maxNum = Math.max(...nums)
    const numsSet = new Set(nums)

    const candidates = new Set()
    for (let i = 1; i <= 10; i++) {
      if (minNum - i > 0) candidates.add(minNum - i)
    }
    // gap 구간 (최대 60개)
    let gapCount = 0
    for (let n = minNum + 1; n < maxNum && gapCount < 60; n++) {
      if (!numsSet.has(n)) { candidates.add(n); gapCount++ }
    }
    if (candidates.size === 0) continue

    try {
      const batchIds = [...candidates].map(n => `${prefix}:${n}`).join(',')
      const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${encodeURIComponent(batchIds)}&depth=0`
      const res = await fetch(url, { headers: { 'X-Figma-Token': token } })
      const data = await res.json()

      for (const [candidateId, node] of Object.entries(data.nodes ?? {})) {
        if (!node) continue
        if (node.document?.type === 'COMPONENT_SET' && node.document.name === instanceName) {
          return candidateId
        }
      }
    } catch {
      // 탐색 실패는 무시
    }
  }
  return null
}

/**
 * layerInventory의 INSTANCE 레이어에 서브 컴포넌트 인터랙션 상태를 주석으로 추가.
 *
 * instanceNameToCompIds: { instanceName → componentId[] }
 *   — 모든 부모 variant에서 수집된 componentId 목록 (State별로 다른 componentId 사용)
 *
 * 동작:
 * 1. instanceName별 COMPONENT_SET ID를 gap-scan 휴리스틱으로 탐색
 * 2. COMPONENT_SET fetch → State 변형 옵션 추출
 * 3. hover/pressed 등 CSS 처리 대상 상태가 있으면 layer.interactionStates 추가
 */
async function enrichInstanceInteractionStates(layers, instanceNameToCompIds, fileKey, token) {
  // 1. 인스턴스 이름별 COMPONENT_SET ID 탐색
  const nameToSetId = {}
  for (const [name, compIds] of Object.entries(instanceNameToCompIds)) {
    const uniqueIds = [...new Set(compIds)]
    const setId = await findSubComponentSetId(name, uniqueIds, fileKey, token)
    if (setId) nameToSetId[name] = setId
  }

  if (Object.keys(nameToSetId).length === 0) return

  // 2. 각 COMPONENT_SET fetch → State 인터랙션 옵션 추출
  const setIdToInteractionStates = {}
  for (const setId of new Set(Object.values(nameToSetId))) {
    try {
      const { doc } = await fetchFigmaNode(fileKey, setId, token)
      if (doc.type !== 'COMPONENT_SET') continue

      let stateOptions = doc.componentPropertyDefinitions?.State?.variantOptions ?? null
      if (!stateOptions && doc.children) {
        const vals = new Set()
        for (const child of doc.children) {
          if (child.type !== 'COMPONENT') continue
          const m = child.name.match(/\bState=([^,\s]+)/i)
          if (m) vals.add(m[1])
        }
        stateOptions = [...vals]
      }
      if (stateOptions) {
        const interactionStates = stateOptions.filter(s => CSS_INTERACTION_STATES.has(s.toLowerCase()))
        if (interactionStates.length > 0) setIdToInteractionStates[setId] = interactionStates
      }
    } catch {
      // 서브 컴포넌트 fetch 실패는 무시
    }
  }

  // 3. layerInventory에 interactionStates 주석
  function annotate(layers) {
    for (const layer of layers) {
      if (layer.type === 'INSTANCE') {
        const setId = nameToSetId[layer.layerName]
        const states = setId ? setIdToInteractionStates[setId] : null
        if (states?.length > 0) layer.interactionStates = states
      }
      if (layer.children) annotate(layer.children)
    }
  }
  annotate(layers)
}

/** layoutSpec의 gap/padding/borderRadius를 styleValues 항목으로 변환 */
function layoutSpecToStyleValues(layoutSpec, { pixelMap }) {
  if (!layoutSpec) return []
  const entries = []

  if (layoutSpec.gap != null) {
    entries.push({ property: 'gap', figmaValue: layoutSpec.gap, token: null, resolved: false })
  }

  const { paddingTop: pt, paddingRight: pr, paddingBottom: pb, paddingLeft: pl } = layoutSpec
  if (pt != null && pr != null && pb != null && pl != null) {
    if (pt === pr && pr === pb && pb === pl) {
      entries.push({ property: 'padding', figmaValue: pt, token: null, resolved: false })
    } else {
      if (pt === pb && pl === pr) {
        entries.push({ property: 'padding-block', figmaValue: pt, token: null, resolved: false })
        entries.push({ property: 'padding-inline', figmaValue: pl, token: null, resolved: false })
      } else {
        for (const [prop, val] of [['padding-top', pt], ['padding-right', pr], ['padding-bottom', pb], ['padding-left', pl]]) {
          entries.push({ property: prop, figmaValue: val, token: null, resolved: false })
        }
      }
    }
  }

  if (layoutSpec.borderRadius != null) {
    entries.push({ property: 'border-radius', figmaValue: layoutSpec.borderRadius, token: null, resolved: false })
  }

  if (layoutSpec.direction != null) {
    entries.push({ property: 'flex-direction', figmaValue: layoutSpec.direction, cssValue: layoutSpec.direction === 'horizontal' ? 'row' : 'column', token: null, resolved: true })
  }
  if (layoutSpec.alignItems != null) {
    entries.push({ property: 'align-items', figmaValue: layoutSpec.alignItems, cssValue: layoutSpec.alignItems, token: null, resolved: true })
  }
  if (layoutSpec.justifyContent != null) {
    entries.push({ property: 'justify-content', figmaValue: layoutSpec.justifyContent, cssValue: layoutSpec.justifyContent, token: null, resolved: true })
  }

  return resolveStyleTokens(entries, { colorMap: {}, pixelMap })
}

// ─── VARIANT STYLE MATRIX ─────────────────────────────────────────────────────

/** "Value=checked, Size=md, State=normal" → { Value: 'checked', Size: 'md', State: 'normal' } */
function parseVariantName(name) {
  const pairs = {}
  for (const part of (name ?? '').split(',')) {
    const eqIdx = part.indexOf('=')
    if (eqIdx === -1) continue
    pairs[part.slice(0, eqIdx).trim()] = part.slice(eqIdx + 1).trim()
  }
  return pairs
}

/**
 * 핵심 상태 조합별 레이어 스타일 매트릭스 추출.
 *
 * 제외 기준:
 *   - Size → dimensionsBySize로 별도 처리
 *   - State=hover/pressed → CSS :hover/:active 처리
 *
 * 나머지 prop 조합 (Value × Invalid × Disabled × ReadOnly …) 각각에 대해
 * 대표 variant (State=normal, Size=md 우선)의 직속 자식 레이어 fills/strokes를
 * 추출 → 토큰으로 resolve → layerStyles 맵에 저장.
 *
 * 결과:
 *   [{ variantKey, variantProps, layerStyles: { LayerName: resolvedStyleValues[] } }]
 */
function buildVariantStyleMatrix(allComponents, tokenMaps, baseLayoutSpec) {
  const CSS_HANDLED = new Set(['State', 'Size'])
  const SKIP_STATE = new Set(['hover', 'pressed'])

  // comboKey → { comp, props } (best candidate: State=normal, Size=md 우선)
  const matrix = new Map()

  for (const comp of allComponents) {
    const props = parseVariantName(comp.name)
    if (props['State'] && SKIP_STATE.has(props['State'])) continue

    // Size=md 아닌 것을 먼저 수집했다가 md가 나오면 교체
    const comboKey = Object.entries(props)
      .filter(([k]) => !CSS_HANDLED.has(k))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join(',')

    const isMd = !props['Size'] || props['Size'] === 'md'
    const existing = matrix.get(comboKey)
    if (!existing || isMd) {
      matrix.set(comboKey, { comp, props })
    }
  }

  const result = []

  for (const [variantKey, { comp, props }] of matrix) {
    const layerStyles = {}

    // 루트 컴포넌트 자체 스타일
    const rootSv = extractStyleValues(comp)

    // base 대비 variant의 layout 속성 diff → __root__에 추가
    const variantLayout = extractLayoutSpec(comp)
    const layoutDiff = diffLayoutSpec(baseLayoutSpec, variantLayout)
    if (layoutDiff) {
      rootSv.push(...layoutSpecToStyleValues(layoutDiff, tokenMaps))
    }

    if (rootSv.length > 0) {
      layerStyles['__root__'] = resolveStyleTokens(rootSv, tokenMaps)
    }

    // 직속 자식 + 한 단계 더 중첩된 레이어 스타일 수집.
    // checked/indeterminate 변형에서 Invalid FRAME이 CheckBox 안에 중첩되므로
    // depth=1까지 재귀해야 모든 조건부 레이어를 포착할 수 있다.
    function collectLayerStylesForVariant(node, currentDepth) {
      for (const child of node.children ?? []) {
        if (child.type === 'VECTOR' || child.type === 'BOOLEAN_OPERATION') continue
        const sv = extractStyleValues(child)
        if (sv.length > 0) {
          layerStyles[child.name] = resolveStyleTokens(sv, tokenMaps)
        }
        if (currentDepth < 1 && (child.type === 'FRAME' || child.type === 'GROUP' || child.type === 'SLOT')) {
          collectLayerStylesForVariant(child, currentDepth + 1)
        }
      }
    }
    collectLayerStylesForVariant(comp, 0)

    // variantProps에서 CSS 처리 prop 제거 (State=normal, Size=md 노이즈 제거)
    const filteredProps = Object.fromEntries(
      Object.entries(props).filter(([k]) => !CSS_HANDLED.has(k))
    )

    result.push({ variantKey, variantProps: filteredProps, layerStyles })
  }

  result.sort((a, b) => a.variantKey.localeCompare(b.variantKey))
  return result
}

// ─── OLD-STYLE VARIANT FALLBACK ───────────────────────────────────────────────

/**
 * COMPONENT_SET 자식들의 이름("Size=lg, State=hover, ...")에서
 * componentPropertyDefinitions 구조를 역산.
 * Figma 신형 componentPropertyDefinitions가 없을 때만 사용.
 */
function parseOldStyleVariants(componentSetNode) {
  const children = componentSetNode.children ?? []
  const propValues = {}

  for (const child of children) {
    if (child.type !== 'COMPONENT') continue
    const pairs = child.name.split(',').map(s => s.trim())
    for (const pair of pairs) {
      const eqIdx = pair.indexOf('=')
      if (eqIdx === -1) continue
      const key = pair.slice(0, eqIdx).trim()
      const val = pair.slice(eqIdx + 1).trim()
      if (!propValues[key]) propValues[key] = new Set()
      propValues[key].add(val)
    }
  }

  const defs = {}
  for (const [key, valSet] of Object.entries(propValues)) {
    const vals = [...valSet]
    const isBoolean = vals.length === 2 && vals.every(v => v === 'true' || v === 'false')
    if (isBoolean) {
      defs[key] = { type: 'BOOLEAN', defaultValue: false }
    } else {
      defs[key] = { type: 'VARIANT', variantOptions: vals }
    }
  }
  return defs
}

// ─── PROP MAPPING SCAFFOLD ────────────────────────────────────────────────────

/** componentPropertyDefinitions → propMapping 초안 생성 */
function buildPropMapping(defs) {
  const mapping = {}
  for (const [key, def] of Object.entries(defs)) {
    const figmaPropName = key.split('#')[0]
    const camel = figmaPropName
      .replace(/[^a-zA-Z0-9\s_-]/g, '')  // strip *, !, # etc.
      .trim()
      .replace(/^(.)/, c => c.toLowerCase())
      .replace(/[\s_-]+(\w)/g, (_, c) => c.toUpperCase())

    if (def.type === 'VARIANT') {
      const figmaToCode = Object.fromEntries(
        (def.variantOptions ?? []).map(v => [v, v.toLowerCase().replace(/\s+/g, '-')])
      )
      // deduplicate code values (handles Figma typos like 'empry'→'empty')
      const codeValues = [...new Set(Object.values(figmaToCode))]
      mapping[figmaPropName] = {
        tsProp: camel,
        tsType: codeValues.map(v => `'${v}'`).join(' | '),
        figmaToCode,
      }
    } else if (def.type === 'BOOLEAN') {
      mapping[figmaPropName] = {
        tsProp: camel,
        tsType: 'boolean',
        figmaToCode: { 'true': true, 'false': false },
      }
    } else if (def.type === 'TEXT') {
      mapping[figmaPropName] = {
        tsProp: camel,
        tsType: 'string',
        figmaToCode: {},
      }
    }
  }
  return mapping
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  if (!args[0]) {
    console.error('사용법: node scripts/generate-figma-spec.mjs <ComponentName> [--node-id <id>]')
    process.exit(1)
  }

  const componentName = args[0]
  let nodeId = null

  const nodeIdIdx = args.indexOf('--node-id')
  if (nodeIdIdx !== -1) {
    nodeId = args[nodeIdIdx + 1]
  } else {
    const registryPath = join(__dir, 'component-registry.json')
    if (!existsSync(registryPath)) {
      console.error('component-registry.json 없음. --node-id 플래그로 직접 지정하세요.')
      process.exit(1)
    }
    const registry = JSON.parse(readFileSync(registryPath, 'utf8'))
    nodeId = registry[componentName]?.figmaNodeId
    if (!nodeId) {
      console.error(`${componentName}의 figmaNodeId가 없습니다. --node-id 플래그로 직접 지정하세요.`)
      process.exit(1)
    }
  }

  const { FIGMA_TOKEN, FIGMA_FILE_KEY } = loadEnv()
  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    console.error('.env에 FIGMA_TOKEN, FIGMA_FILE_KEY가 필요합니다.')
    process.exit(1)
  }

  // ── Figma 노드 fetch ──
  console.log(`\n[1/4] Figma 노드 fetch: ${componentName} (${nodeId})`)
  const { nodeId: resolvedNodeId, doc, apiComponents } = await resolveComponentNode(FIGMA_FILE_KEY, nodeId, FIGMA_TOKEN)
  if (resolvedNodeId !== nodeId) nodeId = resolvedNodeId
  console.log(`      type: ${doc.type}, name: "${doc.name}"`)

  // COMPONENT_SET이면 모든 COMPONENT 자식 수집 (레이어 병합용)
  const allComponents = doc.type === 'COMPONENT_SET'
    ? (doc.children?.filter(c => c.type === 'COMPONENT') ?? [])
    : [doc]
  const mainComponent = allComponents[0] ?? doc

  let componentPropertyDefinitions =
    doc.componentPropertyDefinitions ??
    mainComponent.componentPropertyDefinitions ??
    {}

  // 신형 componentPropertyDefinitions가 없으면 구형 variant 이름에서 역산
  if (Object.keys(componentPropertyDefinitions).length === 0 && doc.type === 'COMPONENT_SET') {
    componentPropertyDefinitions = parseOldStyleVariants(doc)
    if (Object.keys(componentPropertyDefinitions).length > 0) {
      console.log(`      → 구형 variant 이름에서 ${Object.keys(componentPropertyDefinitions).length}개 prop 추출`)
    }
  }

  // A: per-variant INSTANCE 슬롯 캡처 — 내부 inner componentName이 variant마다 다른 경우만 출력
  const variantSlotMap = {}
  if (allComponents.length > 1) {
    function scanVariantSlots(node, variantKey, depth = 0) {
      if (depth > 3) return
      for (const child of (node.children ?? [])) {
        if (child.visible === false) continue
        if (child.type === 'INSTANCE') {
          const inner = child.children?.find(c => c.type === 'INSTANCE' && c.name !== 'grid')
          if (inner) {
            if (!variantSlotMap[child.name]) variantSlotMap[child.name] = {}
            variantSlotMap[child.name][variantKey] = inner.name
          }
        } else if (child.type === 'FRAME' || child.type === 'GROUP') {
          scanVariantSlots(child, variantKey, depth + 1)
        }
      }
    }
    for (const comp of allComponents) {
      // "* Density=STANDARD, Variant=error" → "Density=STANDARD,Variant=error" (정렬)
      const variantKey = (comp.name ?? '')
        .split(',')
        .map(s => s.trim().replace(/^\*\s*/, ''))
        .sort()
        .join(',')
      scanVariantSlots(comp, variantKey)
    }
    // 모든 variant가 동일한 inner icon이면 제거 (변화 없는 슬롯은 불필요)
    for (const slotName of Object.keys(variantSlotMap)) {
      const uniq = new Set(Object.values(variantSlotMap[slotName]))
      if (uniq.size <= 1) delete variantSlotMap[slotName]
    }
  }

  // ── Layer traversal ──
  console.log('[2/4] Layer tree traversal...')
  const layerInventory = mergeLayerInventories(allComponents, componentPropertyDefinitions)

  // 서브 컴포넌트 인터랙션 상태 추출 (INSTANCE componentId gap-scan → hover/pressed)
  {
    const instanceNameToCompIds = {}
    function scanAllInstances(nodes) {
      for (const node of (nodes ?? [])) {
        if (node.type === 'INSTANCE' && node.componentId && node.name) {
          if (!instanceNameToCompIds[node.name]) instanceNameToCompIds[node.name] = []
          instanceNameToCompIds[node.name].push(node.componentId)
        }
        if (node.children) scanAllInstances(node.children)
      }
    }
    for (const comp of allComponents) scanAllInstances(comp.children)

    if (Object.keys(instanceNameToCompIds).length > 0) {
      await enrichInstanceInteractionStates(layerInventory, instanceNameToCompIds, FIGMA_FILE_KEY, FIGMA_TOKEN)
    }
  }
  const layoutSpec = extractLayoutSpec(mainComponent)
  const rootStyleValues = extractStyleValues(mainComponent)

  // ── 토큰 역매핑 ──
  console.log('[3/4] 토큰 역매핑 및 variant style matrix 추출...')
  const tokenMaps = buildTokenReverseMap()
  const colorStyleValues = resolveStyleTokens(rootStyleValues, tokenMaps)
  const layoutStyleValues = layoutSpecToStyleValues(layoutSpec, tokenMaps)
  const styleValues = [...colorStyleValues, ...layoutStyleValues]

  // layerInventory 내 styleValues도 resolve
  function resolveLayerStyles(layers) {
    for (const layer of layers) {
      if (layer.styleValues) {
        layer.styleValues = resolveStyleTokens(layer.styleValues, tokenMaps)
      }
      if (layer.children) resolveLayerStyles(layer.children)
    }
  }
  resolveLayerStyles(layerInventory)

  // TEXT 레이어 textStylesBySize 토큰 resolve
  function resolveTextStylesBySize(layers) {
    for (const layer of layers) {
      if (layer.type === 'TEXT' && layer.textStylesBySize) {
        for (const [size, entry] of Object.entries(layer.textStylesBySize)) {
          const token = tokenMaps.typographyMap[entry.figmaValue]
          if (token) layer.textStylesBySize[size] = { ...entry, token, resolved: true }
        }
      }
      if (layer.children) resolveTextStylesBySize(layer.children)
    }
  }
  resolveTextStylesBySize(layerInventory)

  // variant style matrix: 상태 조합별 레이어 스타일 캡처
  const variantStyleMatrix = allComponents.length > 1
    ? buildVariantStyleMatrix(allComponents, tokenMaps, layoutSpec)
    : []

  // ── layoutSpecBySize: Size 변형별 컨테이너 layout 추출 ──
  // CSS_HANDLED에 Size가 포함되어 variantStyleMatrix에서 Size별 layout이 누락됨.
  // 컴포넌트에 Size variant가 2종 이상 있을 때만 생성.
  const layoutSpecBySize = (() => {
    if (allComponents.length <= 1) return null
    const sizeMap = {}
    for (const comp of allComponents) {
      const m = (comp.name ?? '').match(/\bSize=([^,\s]+)/i)
      if (!m) continue
      const sizeVal = m[1]
      if (!sizeMap[sizeVal]) sizeMap[sizeVal] = []
      sizeMap[sizeVal].push(comp)
    }
    if (Object.keys(sizeMap).length < 2) return null
    const result = {}
    for (const [sizeVal, comps] of Object.entries(sizeMap)) {
      // State=normal 우선, 없으면 첫 번째
      const rep = comps.find(c => /State=normal/i.test(c.name)) ?? comps[0]
      const ls = extractLayoutSpec(rep)
      if (!ls) continue
      const dims = extractDimensions(rep)
      const svs = layoutSpecToStyleValues(ls, tokenMaps)
      result[sizeVal] = {
        ...ls,
        ...(dims ? { containerWidth: dims.width, containerHeight: dims.height } : {}),
        styleValues: svs,
      }
    }
    return Object.keys(result).length > 0 ? result : null
  })()

  // ── gaps 수집 ──
  const gaps = styleValues
    .filter(sv => !sv.resolved)
    .map(sv => ({
      priority: 'P1',
      property: sv.property,
      figmaValue: sv.figmaValue,
      status: 'open',
      note: '토큰 미매핑 — 토큰 추가 또는 수동 확인 필요',
    }))

  // TEXT 레이어 unresolved text-style → P0 gap (typography 토큰 없으면 CSS 생성 차단)
  function collectLayerTextGaps(layers) {
    for (const layer of layers) {
      if (layer.type === 'TEXT' && layer.styleValues) {
        for (const sv of layer.styleValues) {
          if (sv.property === 'text-style' && !sv.resolved) {
            gaps.push({
              priority: 'P0',
              property: 'text-style',
              figmaValue: sv.figmaValue,
              layerName: layer.layerName,
              status: 'open',
              note: `TEXT 레이어 "${layer.layerName}" — typography 토큰 미매핑, CSS 생성 차단`,
            })
          }
        }
      }
      // textStylesBySize 내 unresolved 항목도 추가
      if (layer.type === 'TEXT' && layer.textStylesBySize) {
        for (const [size, entry] of Object.entries(layer.textStylesBySize)) {
          if (!entry.resolved) {
            gaps.push({
              priority: 'P0',
              property: 'text-style',
              figmaValue: entry.figmaValue,
              layerName: layer.layerName,
              size,
              status: 'open',
              note: `TEXT 레이어 "${layer.layerName}" size=${size} — typography 토큰 미매핑, CSS 생성 차단`,
            })
          }
        }
      }
      if (layer.children) collectLayerTextGaps(layer.children)
    }
  }
  collectLayerTextGaps(layerInventory)

  function collectSizeConditionalGaps(layers) {
    for (const layer of layers) {
      if (Array.isArray(layer.sizeConditional)) {
        gaps.push({
          priority: 'P1',
          figmaProp: `${layer.layerName} (size 조건부 레이어)`,
          figmaValue: `size=[${layer.sizeConditional.join(', ')}] 에만 존재`,
          status: 'open',
          note: `레이어가 [${layer.sizeConditional.join(', ')}] 사이즈에서만 존재. 해당 size에서의 조건부 렌더링 또는 boolean prop 추가 필요.`,
        })
      }
      if (layer.children) collectSizeConditionalGaps(layer.children)
    }
  }
  collectSizeConditionalGaps(layerInventory)

  // ── textStyles 요약 (CSS 생성 기준 — layerInventory 순회 불필요하게 만듦) ──
  const textStyles = []
  function collectTextStylesSummary(layers) {
    for (const layer of layers) {
      if (layer.type === 'TEXT' && layer.styleValues) {
        const tsSv = layer.styleValues.find(sv => sv.property === 'text-style')
        if (tsSv) {
          const entry = {
            layerName: layer.layerName,
            figmaValue: tsSv.figmaValue,
            token: tsSv.token,
            resolved: tsSv.resolved,
          }
          if (layer.textStylesBySize && Object.keys(layer.textStylesBySize).length > 0) {
            entry.textStylesBySize = layer.textStylesBySize
          }
          textStyles.push(entry)
        }
      }
      if (layer.children) collectTextStylesSummary(layer.children)
    }
  }
  collectTextStylesSummary(layerInventory)

  // ── figma-spec.json 작성 ──
  console.log('[4/4] figma-spec.json 작성...')
  const outputDir = join(ROOT, 'src', 'components', componentName)
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

  const spec = {
    _meta: {
      figmaFileKey: FIGMA_FILE_KEY,
      figmaNodeId: nodeId,
      componentName,
      extractedAt: new Date().toISOString(),
    },
    componentPropertyDefinitions,
    layerInventory,
    layoutSpec,
    ...(layoutSpecBySize ? { layoutSpecBySize } : {}),
    styleValues,
    textStyles,
    variantStyleMatrix,
    ...(Object.keys(variantSlotMap).length > 0 ? { variantSlotMap } : {}),
    propMapping: buildPropMapping(componentPropertyDefinitions),
    gaps,
  }

  writeFileSync(join(outputDir, 'figma-spec.json'), JSON.stringify(spec, null, 2))

  // ── 결과 요약 ──
  const resolvedCount = styleValues.filter(s => s.resolved).length
  const unresolvedCount = styleValues.filter(s => !s.resolved).length
  const layoutResolved = layoutStyleValues.filter(s => s.resolved).length
  const layoutUnresolved = layoutStyleValues.filter(s => !s.resolved).length

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`✅  src/components/${componentName}/figma-spec.json 생성 완료`)
  console.log(`    layerInventory : ${layerInventory.length}개 레이어`)
  console.log(`    layoutSpec     : ${layoutSpec ? `${layoutSpec.direction}, gap ${layoutSpec.gap}px` : '없음 (auto-layout 미사용)'}`)
  console.log(`    color tokens   : ${colorStyleValues.filter(s=>s.resolved).length} resolved / ${colorStyleValues.filter(s=>!s.resolved).length} unresolved`)
  console.log(`    layout tokens  : ${layoutResolved} resolved / ${layoutUnresolved} unresolved`)
  if (textStyles.length > 0) {
    const tsResolved = textStyles.filter(s => s.resolved).length
    const tsUnresolved = textStyles.filter(s => !s.resolved).length
    console.log(`    typography     : ${tsResolved} resolved / ${tsUnresolved} unresolved (${textStyles.map(s => `${s.layerName}→${s.token ?? s.figmaValue}`).join(', ')})`)
    const sizeVaried = textStyles.filter(s => s.textStylesBySize && Object.keys(s.textStylesBySize).length > 1)
    if (sizeVaried.length > 0) {
      for (const ts of sizeVaried) {
        const sizeMap = Object.entries(ts.textStylesBySize).map(([sz, e]) => `${sz}:${e.token ?? e.figmaValue}`).join(', ')
        console.log(`      ↳ ${ts.layerName} textStylesBySize: { ${sizeMap} }`)
      }
    }
  }
  if (variantStyleMatrix.length > 0) {
    console.log(`    variantMatrix  : ${variantStyleMatrix.length}개 상태 조합 캡처`)
  }
  console.log(`    styleValues    : ${resolvedCount} resolved / ${unresolvedCount} unresolved (합계)`)

  if (unresolvedCount > 0) {
    console.log(`\n⚠️  미매핑 스타일 (토큰 생성 또는 확인 필요):`)
    styleValues.filter(s => !s.resolved).forEach(sv => {
      console.log(`    ${sv.property}: ${sv.figmaValue}`)
    })
  }

  if (Object.keys(componentPropertyDefinitions).length === 0) {
    console.log(`\n⚠️  prop 정의를 추출할 수 없음 — 노드 ID가 COMPONENT/COMPONENT_SET인지 확인하세요.`)
  }

  console.log()
}

main().catch(e => { console.error(`\n오류: ${e.message}`); process.exit(1) })
