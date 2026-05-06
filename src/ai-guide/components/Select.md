<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T15:12:03.836Z -->

# Select

Dropdown selector with trigger button and popover list. Built on Radix UI Select.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `options` | `SelectOption[]` | — | Array of options to display |
| `value` | `string` | — | Controlled selected value |
| `defaultValue` | `string` | — | Uncontrolled initial value |
| `placeholder` | `string` | `'선택'` | Placeholder when no value selected |
| `appearance` | `'fill' \| 'outline' \| 'plain'` | `'outline'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Trigger height |
| `width` | `'fill' \| 'hug'` | `'hug'` | Trigger width behaviour |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `readOnly` | `boolean` | `false` | Prevents selection change, allows focus |
| `invalid` | `boolean` | `false` | Error border state |
| `onChange` | `(value: string) => void` | — | Called when selection changes |
| `id` | `string` | — | — |
| `className` | `string` | — | — |

### SelectOption

```ts
interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  leadingIcon?: IconName
}
```

## Usage

```tsx
// Basic
<Select
  options={[
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ]}
  placeholder="선택"
/>

// Controlled
const [val, setVal] = useState('')
<Select options={options} value={val} onChange={setVal} />

// With validation
<Select options={options} invalid placeholder="필수 항목" />

// Full-width fill
<Select options={options} appearance="fill" width="fill" />

// Small plain (for inline use)
<Select options={options} size="sm" appearance="plain" />
```

## Appearance Variants

| appearance | Use case |
|---|---|
| `outline` | Default form field |
| `fill` | Filled background, prominent form |
| `plain` | Inline or toolbar context |

## NOT in Figma (avoid)

- Multi-select is not in Figma — do not add
- Custom trigger content (icons in trigger) not in Figma
- Option groups / separators not in Figma
