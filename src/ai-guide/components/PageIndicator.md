<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:01:03.083Z -->

# PageIndicator

캐러셀 또는 슬라이더의 현재 위치를 점(dot) 또는 텍스트(n/total)로 표시하는 컴포넌트.

## Props — dot variant (`type='dot'`)

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `type` | `'dot'` | required | — |
| `count` | `number` | required | Count (2~5) |
| `activeIndex` | `number` | `0` | (State: active) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Size |
| `appearance` | `'surface' \| 'onImage'` | `'surface'` | Appearance |
| `className` | `string` | — | — |

## Props — text variant (`type='text'`, 코드 전용)

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `type` | `'text'` | required | — |
| `page` | `number` | required | — |
| `total` | `number` | required | — |
| `size` | `'sm' \| 'md'` | `'md'` | — |
| `className` | `string` | — | — |

## Dot 크기

| size | dot 크기 | 간격 |
|------|---------|------|
| `sm` | 4px | 6px |
| `md` | 6px | 8px |
| `lg` | 8px | 10px |

## 사용 예시

```tsx
// dot variant (Figma 정의)
<PageIndicator type="dot" count={5} activeIndex={2} size="lg" appearance="surface" />
<PageIndicator type="dot" count={3} activeIndex={0} appearance="onImage" />

// text variant (코드 전용)
<PageIndicator type="text" page={3} total={10} size="md" />
```

## NOT in Figma (avoid)

- `type='text'` variant — Figma 미정의, 코드 전용 확장
- `size='lg'` for dot — Figma는 sm/md만 정의, lg는 코드 확장
- `activeIndex` 범위 유효성 검증 없음 — 0 이상, count 미만 범위를 준수
- 5 초과 개수 — Figma는 최대 5개 dot만 디자인
