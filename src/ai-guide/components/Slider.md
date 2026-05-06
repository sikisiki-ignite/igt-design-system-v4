<!-- Generated from figma-spec.json | extractedAt: 2026-05-04 -->

# Slider

드래그 슬라이더 컴포넌트. Radix UI Slider 기반.

## Props

| prop | type | default | Figma prop |
|------|------|---------|------------|
| `value` | `number` | — | — |
| `defaultValue` | `number` | `0` | — |
| `min` | `number` | `0` | — |
| `max` | `number` | `100` | — |
| `step` | `number` | `1` | — |
| `disabled` | `boolean` | `false` | — |
| `leadingIcon` | `IconName` | — | hasLeadingIcon |
| `trailingIcon` | `IconName` | — | hasTrailingIcon |
| `onChange` | `(value: number) => void` | — | — |
| `aria-label` | `string` | `'슬라이더'` | — |

## Figma dimensions

| 요소 | 값 |
|------|---|
| track height | 4px (`--input-slider-size-track-height`) |
| thumb size | 18px (`--input-slider-size-thumb-size`) |
| icon size | 14px (`--input-slider-size-icon`) |
| gap (icon↔slider) | 8px (`--input-slider-size-gap`) |
| hit area height | 20px (`--input-slider-size-height`) |

## Usage

```tsx
{/* 비제어 */}
<Slider defaultValue={50} />

{/* 제어 */}
const [vol, setVol] = useState(40)
<Slider value={vol} onChange={setVol} leadingIcon="speakerOffSolid" trailingIcon="speakerOnSolid" />

{/* step */}
<Slider defaultValue={0} step={10} min={0} max={100} />

{/* 비활성 */}
<Slider defaultValue={60} disabled />
```

## NOT in Figma (avoid)

- 범위 슬라이더 (두 핸들) — Figma 스펙에 없음
- size variants — 단일 크기만 정의됨
