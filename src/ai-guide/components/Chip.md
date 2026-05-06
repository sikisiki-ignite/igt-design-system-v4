<!-- Generated from figma-spec.json | extractedAt: 2026-05-04 -->

# Chip Components

Five distinct chip types, each backed by individual figma-spec.json files.

## ActionChip

```tsx
<ActionChip
  label="액션명"
  size="md"                      // 'xs' | 'sm' | 'md'  (default: 'md')
  leadingIcon="hashOutline3dp"   // IconName (optional)
  trailingIcon="chevronDownOutline3dp" // IconName (optional)
  disabled={false}
  onClick={() => {}}
/>
```

figma-spec: `src/components/ActionChip/figma-spec.json` (nodeId: 628:33260)  
Props: `label`, `size`, `leadingIcon?`, `trailingIcon?`, `disabled?`  
Tokens: `--input-chip-color-action-*`  
Radius: `--input-chip-size-shared-radius-{size}`

## ChoiceChip (multi-select)

```tsx
<ChoiceChip
  label="디자인"
  size="md"
  selected={true}
  leadingIcon="checkOutline3dp"  // typically shown when selected
  trailingIcon="chevronDownOutline3dp"
  disabled={false}
  aria-pressed={selected}
  onClick={() => setSelected(v => !v)}
/>
```

figma-spec: `src/components/ChoiceChip/figma-spec.json` (nodeId: 622:21561)  
Props: `label`, `size`, `selected?`, `leadingIcon?`, `trailingIcon?`, `disabled?`  
Tokens: `--input-chip-color-choice-multiple-{unselected|selected}-*`  
Border visible when selected: `--input-chip-color-choice-multiple-selected-border-normal`

## FilterChip

Shows a `value` when a filter is applied.

```tsx
<FilterChip
  label="카테고리"
  value="디자인"     // shown when selected (optional)
  selected={true}
  size="md"
  trailingIcon="chevronDownOutline3dp"
  onClick={openDropdown}
/>
```

figma-spec: `src/components/FilterChip/figma-spec.json` (nodeId: 2146:22989)  
Props: `label`, `value?`, `size`, `selected?`, `leadingIcon?`, `trailingIcon?`, `disabled?`  
Tokens: `--input-chip-color-filter-{unselected|selected}-*`

## InputChip

Used in tag/token input fields. Has a remove button. NOT a `<button>` — it is a `<div role="group">`.

```tsx
<InputChip
  label="React"
  tone="accent"    // 'neutral' | 'accent'  (default: 'neutral')
  size="md"
  leadingIcon="hashOutline3dp"
  disabled={false}
  onRemove={() => removeTag('React')}  // omit to hide remove button
/>
```

figma-spec: `src/components/InputChip/figma-spec.json` (nodeId: 2146:25765)  
Props: `label`, `tone?`, `size`, `leadingIcon?`, `disabled?`, `onRemove?`  
Tokens:  
- Container/text/icon: `--input-chip-color-input-{neutral|accent}-*`  
- Remove button: `--input-chip-color-input-remove-{neutral|accent}-*`  
- Remove size: `--input-chip-size-inputChip-remove-container-{size}`, `--input-chip-size-inputChip-remove-icon-{size}`  
- Remove gap: `--input-chip-size-inputChip-gapTextTrailing-{size}` (negative spacing)  
- End padding: `--input-chip-size-inputChip-paddingInlineEnd-{size}`

## MetaChip

Pill-shaped (border-radius: full). Displays a label + value pair as metadata. Interactive (has hover/pressed states).

```tsx
<MetaChip
  label="상태"
  value="진행중"   // value shown in brand color (optional)
  size="md"
  leadingIcon="hashOutline3dp"
  disabled={false}
  onClick={() => {}}
/>
```

figma-spec: `src/components/MetaChip/figma-spec.json` (nodeId: 2287:28130)  
Props: `label`, `value?`, `size`, `leadingIcon?`  
Note: `disabled` is available via `ButtonHTMLAttributes` spread (native HTML only) — `data-disabled` attribute is NOT set, so CSS disabled token styling does not apply. Use sparingly.
Tokens: `--input-chip-color-meta-*`  
Value color: `--input-chip-color-meta-value-normal` (brand color)  
Radius: `--input-chip-size-metaChip-radius` → `--radius-full` (9999px, pill shape)

## ChipGroup

```tsx
<ChipGroup layout="wrap" size="md">
  <ActionChip label="전체" />
  <ChoiceChip label="디자인" selected />
</ChipGroup>
```

Props: `layout?: 'wrap' | 'scroll'`, `size?: 'xs' | 'sm' | 'md'`, `children: ReactNode`  
Gap tokens: `--input-chip-size-group-spacing-gap{Stack|Inline}-{size}`

## NOT in Figma (avoid)

- `variant="action"` or `variant="filter"` — use specific components instead (old `Chip` alias is deprecated)
- Nesting chips inside chips
- Using `InputChip` as a general button (it is role="group", not role="button")
- Custom border-radius on MetaChip — the pill shape is fixed by token
