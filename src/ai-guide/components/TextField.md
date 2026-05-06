<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T15:12:00.000Z -->

# TextField

Single-line text input with optional label, helper message, icons, prefix/suffix, and trailing action.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `label` | `string` | — | Label above the field |
| `indicator` | `'required' \| 'optional'` | — | Badge next to label |
| `message` | `string` | — | Helper/error text below field |
| `invalid` | `boolean` | `false` | Error state (red border + red message) |
| `appearance` | `'outline' \| 'fill'` | `'outline'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Field height |
| `prefixText` | `string` | — | Text shown inside field, left of input |
| `suffixText` | `string` | — | Text shown inside field, right of input |
| `leadingIcon` | `IconName` | — | Icon left of input text |
| `trailingIcon` | `IconName` | — | Icon right of input text |
| `trailingAction` | `ReactNode` | — | Interactive element (button) in trailing slot |
| `disabled` | `boolean` | — | Via `InputHTMLAttributes` |
| `readOnly` | `boolean` | — | Via `InputHTMLAttributes` |
| `placeholder` | `string` | — | Via `InputHTMLAttributes` |

## Usage

```tsx
// Basic
<TextField label="이름" placeholder="이름을 입력하세요" />

// With validation
<TextField label="이메일" invalid message="유효한 이메일 주소를 입력하세요" />

// With icons
<TextField leadingIcon="searchOutline2dp" placeholder="검색" />

// With prefix/suffix
<TextField prefixText="https://" suffixText=".com" />

// Required indicator
<TextField label="비밀번호" indicator="required" type="password" />

// Fill appearance
<TextField appearance="fill" label="검색" />

// Small size
<TextField size="sm" placeholder="간단 입력" />
```

## NOT in Figma (avoid)

- Multi-line text input — use TextArea instead
- `xs` size not in Figma
- Combo of `leadingIcon` + `prefixText` simultaneously not in Figma
