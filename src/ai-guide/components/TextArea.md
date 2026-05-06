<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T15:12:01.000Z -->

# TextArea

Multi-line text input with optional label, character counter, and helper message.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `label` | `string` | — | Label above the field |
| `indicator` | `'required' \| 'optional'` | — | Badge next to label |
| `message` | `string` | — | Helper/error text below field |
| `invalid` | `boolean` | `false` | Error state |
| `appearance` | `'outline' \| 'fill'` | `'outline'` | Visual style |
| `size` | `'md' \| 'lg'` | `'lg'` | Field size — no `sm` in Figma |
| `rows` | `number` | `4` | Initial visible rows |
| `maxLength` | `number` | — | Max character count |
| `showCount` | `boolean` | `false` | Show character counter (requires `maxLength`) |
| `disabled` | `boolean` | — | Via `TextareaHTMLAttributes` |
| `readOnly` | `boolean` | — | Via `TextareaHTMLAttributes` |
| `className` | `string` | — | — |

## Usage

```tsx
// Basic
<TextArea label="설명" placeholder="내용을 입력하세요" />

// With character counter
<TextArea label="소개" maxLength={200} showCount />

// Required with error
<TextArea label="내용" indicator="required" invalid message="내용을 입력해 주세요" />

// Fill appearance, medium size
<TextArea appearance="fill" size="md" rows={3} />

// Read-only
<TextArea label="약관" value="이용약관 내용..." readOnly />
```

## NOT in Figma (avoid)

- `sm` size not in Figma — only `md` and `lg`
- `autoResize` (auto-growing height) not in Figma
- `showCount` without `maxLength` produces no counter
