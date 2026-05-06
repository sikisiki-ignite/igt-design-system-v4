<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T08:58:40.000Z -->

# RadioBox

**Figma node:** `2125:24541` (COMPONENT_SET) — file `VIUhZbtjMzxEHzkpSvfIDR`

## Props

| prop | type | default | Figma property |
|------|------|---------|----------------|
| `checked` | `boolean` | `false` | Selected: true→true, false→false |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `disabled` | `boolean` | — | Disabled: false→false, true→true |
| `readOnly` | `boolean` | — | ReadOnly: false→false, true→true |
| `invalid` | `boolean` | — | Invalid (BOOLEAN) |
| `name` | `string` | — | 라디오 그룹 이름 |
| `onChange` | `(e) => void` | — | — |

**NOT in Figma (avoid):**
- `focus` prop — CSS `:focus-visible`이 처리, React prop 없음
- `state` prop — CSS `:hover` / `:active`이 처리, React prop 없음

## Layer structure (layerInventory 기준)

```
<span.radio>              ← hit area (28px md / 24px sm)
  <input.radio__input>       ← visually hidden, 전체 hit area 점유
  <span.radio__control>      ← visual control (20px md / 16px sm)
                             ← Radio FRAME: bg + border + icon
    <Icon />                 ← igt_core_icon_circle_small_solid (conditional: checked)
```

- `Invalid` layer → `data-invalid` attribute로 처리 (border-color 또는 background override)
- `focusRing` layer → CSS `.radio__input:focus-visible ~ .radio__control` 처리
- `hitArea` layer → 외부 hit area 크기, span.radio로 처리

## variantStyleMatrix — 상태 조합별 시각 처리

`generate-figma-spec.mjs`가 추출한 실제 Figma variant 데이터.

| 상태 조합 | Radio bg | Invalid FRAME |
|-----------|----------|---------------|
| unselected, normal | white | **strokes: red** |
| selected, normal | blue | **fills: red** (Radio 안에 중첩) |
| unselected, disabled | subtle gray | strokes: red |
| selected, disabled | blue-subtle (opacity) | fills: red |
| unselected, readOnly | subtle gray | strokes: red |
| selected, readOnly | blue-subtle (opacity) | fills: red |

**핵심**: `selected+invalid`에서 Invalid FRAME이 Radio FRAME 내부에 중첩
→ CSS에서 `--rb-bg`를 red로 교체, `--rb-border`는 normal 유지.

## Token 체인

| 상태 | CSS 변수 | 최종 의미 |
|------|---------|---------|
| unselected/normal bg | `--input-radio-color-unselected-container-normal` | `--sys-surface-base` (white) |
| unselected/normal border | `--input-radio-color-unselected-border-normal` | `--sys-border-neutral-muted` |
| selected/normal bg | `--input-radio-color-selected-container-normal` | `--sys-container-brand-solid-default` |
| **invalid border (unselected only)** | `--input-radio-color-invalid-border` | `--sys-border-status-danger-default` |
| **invalid bg (selected only)** | `--input-radio-color-selected-container-invalid` | `--sys-container-status-danger-solid-default` |
| focus ring | `--sys-interactive-focus-ring-default` | keyboard Tab 시에만 표시 |

## Invalid 상태 CSS 규칙 (variantStyleMatrix 근거)

```css
/* unselected+invalid: Invalid FRAME에 red strokes */
.radio[data-invalid] {
  --rb-border: var(--input-radio-color-invalid-border);
}

/* selected+invalid: Invalid FRAME(inside Radio)에 red fills → bg 교체 */
.radio[data-checked="true"][data-invalid] {
  --rb-bg:     var(--input-radio-color-selected-container-invalid);
  --rb-border: var(--input-radio-color-selected-border-normal);
}
```

## 사용 예시

```tsx
// 기본
<RadioBox checked={true} onChange={handleChange} />

// 사이즈
<RadioBox size="sm" checked={false} onChange={handleChange} />

// 비활성
<RadioBox checked={true} disabled />

// 읽기전용
<RadioBox checked={true} readOnly />

// 에러 상태 (unselected → red border / selected → red bg)
<RadioBox checked={false} invalid onChange={handleChange} />
<RadioBox checked={true} invalid onChange={handleChange} />

// 라디오 그룹
<RadioBox name="payment" value="card" checked={selected === 'card'} onChange={handleChange} />
<RadioBox name="payment" value="bank" checked={selected === 'bank'} onChange={handleChange} />
```

## Open gaps

| priority | 항목 | 내용 |
|----------|------|------|
| P1 | invalid-state-css | ✅ fixed — variantStyleMatrix 기반 selected+invalid CSS 추가 |
| P1 | icon-size | ✅ fixed — dimensionsBySize 기반 sm=12/md=16px size prop 전달 |
| P2 | colorMap-bg-priority | selected bg `rgba(49,130,246,1)` → `--sys-border-brand-default` (오류). background 컨텍스트 우선순위 개선 필요 |
