<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T15:12:02.000Z -->

# Search

Search input field with leading search icon and optional clear button. Supports Enter-to-search.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `appearance` | `'fill' \| 'outline'` | `'fill'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Field height |
| `invalid` | `boolean` | `false` | Error border state |
| `disabled` | `boolean` | — | Via `InputHTMLAttributes` |
| `readOnly` | `boolean` | — | Via `InputHTMLAttributes` |
| `placeholder` | `string` | `'검색'` | Placeholder text |
| `value` | `string` | — | Controlled input value |
| `onClear` | `() => void` | — | Called when clear button is pressed; button only shows if `value` + `onClear` both present |
| `onSearch` | `(value: string) => void` | — | Called when Enter is pressed |
| `onChange` | React change handler | — | For controlled mode |

## Usage

```tsx
// Uncontrolled (no clear button)
<Search placeholder="검색어 입력" />

// Controlled with clear + enter search
const [q, setQ] = useState('')
<Search
  value={q}
  onChange={e => setQ(e.target.value)}
  onClear={() => setQ('')}
  onSearch={handleSearch}
/>

// Outline, small size (table inline search)
<Search size="sm" appearance="outline" placeholder="테이블 내 검색" />

// Disabled
<Search disabled placeholder="검색 불가" />
```

## Clear button visibility

The clear button only renders when all three conditions are met:
- `value` is truthy
- `onClear` callback is provided
- `disabled` and `readOnly` are both false

## NOT in Figma (avoid)

- `plain` appearance not in Figma — only `fill` and `outline`
- `label` / `message` above/below the field — use TextField for labeled inputs
- `xs` size not in Figma
