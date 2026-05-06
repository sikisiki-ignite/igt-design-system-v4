<!-- Generated from figma-spec.json | extractedAt: 2026-05-04 -->

# NumberStepper

수량/수치 입력 컴포넌트. 감소(−) / 값 표시 / 증가(+) 구조.

## Props

| prop | type | default | Figma prop |
|------|------|---------|------------|
| `value` | `number` | `0` | — |
| `min` | `number` | — | — |
| `max` | `number` | — | — |
| `step` | `number` | `1` | — |
| `emphasis` | `'outline' \| 'soft'` | `'soft'` | Emphasis |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `disabled` | `boolean` | `false` | — |
| `onChange` | `(value: number) => void` | — | — |
| `aria-label` | `string` | `'수량'` | — |

## Figma Lock states → Code

| Figma Lock | 조건 |
|-----------|------|
| none | 기본 |
| min | `value <= min` → minus disabled |
| max | `value >= max` → plus disabled |
| both | `value === min === max` → 둘 다 disabled |

## Usage

```tsx
{/* 기본 */}
const [qty, setQty] = useState(1)
<NumberStepper value={qty} min={1} max={99} onChange={setQty} />

{/* outline 강조 */}
<NumberStepper value={3} emphasis="outline" />

{/* step=5 단위 */}
<NumberStepper value={0} step={5} min={0} max={50} onChange={setValue} />

{/* 비활성 */}
<NumberStepper value={3} disabled />
```

## NOT in Figma (avoid)

- `size="lg"` — Figma 스펙에 없음
- 소수점 step — Figma는 정수 표시 기준
- 직접 텍스트 입력 — Figma에서 버튼 전용 입력 컴포넌트
