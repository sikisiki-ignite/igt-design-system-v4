<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T08:38:01.544Z -->

# Checkbox

**Figma node:** `2121:22567` (COMPONENT_SET) — file `VIUhZbtjMzxEHzkpSvfIDR`

## Props

| prop | type | default | Figma property |
|------|------|---------|----------------|
| `checked` | `boolean \| 'indeterminate'` | `false` | Value: checked→true, unchecked→false, indeterminate→'indeterminate' |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `disabled` | `boolean` | — | Disabled: false→false, true→true |
| `readOnly` | `boolean` | — | ReadOnly: false→false, true→true |
| `invalid` | `boolean` | — | Invalid (BOOLEAN) |
| `onChange` | `(e) => void` | — | — |

**NOT in Figma (avoid):**
- `focus` prop — CSS `:focus-visible`이 처리, React prop 없음
- `state` prop — CSS `:hover` / `:active`이 처리, React prop 없음

## Layer structure (layerInventory 기준)

```
<span.checkbox>          ← hit area (28px md / 24px sm)
  <input.checkbox__input>    ← visually hidden, 전체 hit area 점유
  <span.checkbox__control>   ← visual control (20px md / 16px sm)
                             ← CheckBox FRAME: bg + border + icon
    <Icon />                 ← igt_core_icon_check_outline_3dp (conditional: checked)
```

- `Invalid` layer → `data-invalid` attribute로 처리 (border-color override)
- `focusRing` layer → CSS `.checkbox__input:focus-visible ~ .checkbox__control` 처리

## variantStyleMatrix — 상태 조합별 시각 처리

`generate-figma-spec.mjs`가 추출한 실제 Figma variant 데이터. CSS 작성의 근거.

| 상태 조합 | CheckBox bg | Invalid FRAME |
|-----------|------------|---------------|
| unchecked, normal | white | **strokes: red** |
| checked, normal | blue | 없음 (fills/strokes 비어있음) |
| indeterminate, normal | blue | 없음 |
| unchecked, disabled | subtle gray | strokes: red |
| checked, disabled | blue-subtle (opacity) | 없음 |
| unchecked, readOnly | subtle gray | strokes: red |
| checked, readOnly | blue-subtle (opacity) | 없음 |

**핵심**: `checked/indeterminate + invalid`에서 Invalid FRAME에 strokes 없음
→ CSS에서 `--cb-border` 변경 적용하지 않는다.

## Token 체인

| 상태 | CSS 변수 | 최종 의미 |
|------|---------|---------|
| unchecked/normal bg | `--input-checkbox-color-unchecked-container-normal` | `--sys-surface-base` (white) |
| unchecked/normal border | `--input-checkbox-color-unchecked-border-normal` | `--sys-border-neutral-muted` |
| checked/normal bg | `--input-checkbox-color-checked-container-normal` | `--sys-container-brand-solid-default` |
| **invalid border (unchecked only)** | `--input-checkbox-color-invalid-border` | `--sys-border-status-danger-default` |
| focus ring | `--sys-interactive-focus-ring-default` | keyboard Tab 시에만 표시 |

## Invalid 상태 CSS 규칙 (variantStyleMatrix 근거)

```css
/* unchecked+invalid: Invalid FRAME에 red strokes 있음 */
.checkbox[data-invalid] {
  --cb-border: var(--input-checkbox-color-invalid-border);
}

/* checked/indeterminate+invalid: Invalid FRAME에 strokes 없음 → border 유지 */
.checkbox[data-checked="true"][data-invalid] {
  --cb-border: var(--input-checkbox-color-checked-border-normal);
}
.checkbox[data-checked="indeterminate"][data-invalid] {
  --cb-border: var(--input-checkbox-color-indeterminate-border-normal);
}
```

## 사용 예시

```tsx
// 기본
<Checkbox checked={true} onChange={handleChange} />

// 사이즈
<Checkbox size="sm" checked={false} onChange={handleChange} />

// 비활성
<Checkbox checked={true} disabled />

// 읽기전용
<Checkbox checked={true} readOnly />

// 에러 상태 (unchecked → red border / checked → 변화 없음)
<Checkbox checked={false} invalid onChange={handleChange} />

// indeterminate (전체 선택 중간 상태)
<Checkbox checked="indeterminate" onChange={handleChange} />
```

## Open gaps

| priority | 항목 | 내용 |
|----------|------|------|
| P1 | invalid-state-css | ✅ fixed — variantStyleMatrix 기반으로 checked/indeterminate+invalid CSS 수정 |
| P1 | icon-size | ✅ fixed — dimensionsBySize 기반 sm=12/md=16px Icon size prop |
| P2 | border-radius | md control border-radius Figma 4px, --radius-4 토큰 체인 확인 필요 |
| P2 | colorMap-bg-priority | CheckBox bg 역매핑이 `--sys-border-brand-default`(오류)로 매핑됨. background 컨텍스트 우선순위 개선 필요 |
| P2 | composition-gap | CheckboxField(505:16484) 데이터: gap=4, hitArea, padding 반영 완료. 별도 spec 미생성 |
