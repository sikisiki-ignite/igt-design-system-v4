<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:03:32.836Z -->

# OrgTree

계층 구조 트리 컴포넌트. 확장/축소 가능한 폴더형 트리.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `items` | `OrgTreeItem[]` | required | Item 1~10 |
| `selectedId` | `string` | — | selected: true |
| `onSelect` | `(id: string) => void` | — | — |
| `expandedIds` | `string[]` | — | (controlled) |
| `onExpandChange` | `(id: string, expanded: boolean) => void` | — | — |
| `size` | `'default' \| 'lg'` | `'lg'` | Size |
| `className` | `string` | — | — |

### OrgTreeItem

| field | type | 설명 |
|-------|------|------|
| `id` | `string` | 고유 식별자 |
| `label` | `string` | 텍스트 |
| `count` | `number?` | 우측 숫자 카운트 배지 |
| `badge` | `string?` | 우측 텍스트 배지 (코드 전용, Figma 미정의) |
| `disabled` | `boolean?` | 비활성화 |
| `children` | `OrgTreeItem[]?` | 하위 항목 |

## 크기별 높이

| size | 아이템 높이 |
|------|-----------|
| `default` | 32px |
| `lg` | 40px |

## 확장 상태 관리

`expandedIds` / `onExpandChange` 미제공 시 내부 상태로 관리(uncontrolled).

## 사용 예시

```tsx
// Uncontrolled
<OrgTree
  items={[
    {
      id: 'root',
      label: '조직',
      count: 42,
      children: [
        { id: 'team-a', label: '팀 A', count: 12 },
        { id: 'team-b', label: '팀 B', count: 30 },
      ],
    },
  ]}
  selectedId={selectedNode}
  onSelect={setSelectedNode}
/>
```

## treeguide 운영 정책

### 1-1. 허용 아이콘 (bullet 슬롯)

| 상태 | 아이콘 | 설명 |
|------|--------|------|
| blank (기본) | 없음 | 리프 노드 — 아무 아이콘도 렌더하지 않음 |
| open | `chevronDownSmallOutline2dp` | 부모 노드 펼침 상태 |
| close | `chevronRightSmallOutline2dp` | 부모 노드 접힘 상태 |

blank / open / close 외의 아이콘(예: `circleTinySolid`) 사용 지양.

### 1-2. dot 동시 사용 금지

treeguide(가이드 라인)가 표시되는 리프 노드에 dot 아이콘을 함께 렌더하면 안 됨.  
→ 리프 노드 bullet 슬롯은 항상 blank(아무것도 렌더 안 함).

### 1-3. trail 타입 운영 정책

| trail 타입 | 적용 조건 | CSS |
|-----------|----------|-----|
| `blank` | 루트 레벨(depth=1) — treeguide 없음 | — |
| `trailDefault` | 그외(첫 번째 항목 및 단일 자식이 아닌 경우) | top: 50% → bottom: 0 (가이드 라인이 중앙에서 하단으로) |
| `trailCenter` | 각 항목의 중간(2번째 이상, 마지막 제외) | top: 0 → bottom: 0 (전체 높이) |
| `trailEnd` | 각 항목의 마지막 (또는 단일 자식) | top: 0 → bottom: 50% (상단에서 중앙까지) |

**할당 우선순위 (childTrail 함수)**
1. 단일 자식(total === 1) → `trailEnd`
2. 마지막 항목(idx === total - 1) → `trailEnd`
3. 첫 번째 항목(idx === 0) → `trailDefault`
4. 그 외 → `trailCenter`

## NOT in Figma (avoid)

- `badge` 필드 — Figma 미정의, 코드 전용. 일반적으로 `count`(숫자) 사용 권장
- 드래그 앤 드롭 — Figma 미정의
- 다중 선택 — Figma는 단일 선택만 정의
- 리프 노드에 dot 아이콘 — treeguide와 동시 사용 금지(정책 1-2)
