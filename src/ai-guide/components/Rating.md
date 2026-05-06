<!-- Generated from figma-spec.json | extractedAt: 2026-05-04 -->

# Rating

별점 컴포넌트. 0–5 정수 값 표시 및 대화형 평점 입력 지원.

## Props

| prop | type | default | Figma prop |
|------|------|---------|------------|
| `value` | `number` | `0` | — |
| `max` | `number` | `5` | — |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | — |
| `readOnly` | `boolean` | `false` | — |
| `onChange` | `(value: number) => void` | — | — |
| `aria-label` | `string` | `'별점'` | — |

## Figma Dimensions (figma-spec.json)

| size | hitArea (star container) | icon size (`iconSizeMap`) |
|------|--------------------------|--------------------------|
| xs | 24px | 24px |
| sm | 28px | 28px |
| md | 32px | 32px |

## Usage

```tsx
{/* 읽기 전용 표시 */}
<Rating value={4} readOnly />

{/* 대화형 */}
const [rating, setRating] = useState(0)
<Rating value={rating} onChange={setRating} />

{/* 크기 */}
<Rating size="xs" value={3} readOnly />
<Rating size="sm" value={3} readOnly />
<Rating size="md" value={3} readOnly />

{/* 비활성 */}
<Rating value={3} disabled />
```

## NOT in Figma (avoid)

- 반별점 (0.5 단위) — Figma 스펙에 없음
- `max` 5 초과 — Figma는 5개 별 기준
- `size="lg"` — Figma 스펙에 없음
