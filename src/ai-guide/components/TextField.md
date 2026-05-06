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

## 입력 유형별 패턴

```tsx
// 전화번호 — 숫자만 받고 자동 포맷 (사용자가 '-' 직접 입력하게 하지 말 것)
const [phone, setPhone] = useState('')
const formatPhone = (v: string) => {
  const d = v.replace(/[^0-9]/g, '')
  if (d.length <= 3) return d
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`
}
<TextField
  label="전화번호" indicator="required" type="tel" placeholder="010-0000-0000"
  value={phone} onChange={e => setPhone(formatPhone(e.target.value))}
  message="숫자만 입력하면 자동으로 포맷됩니다"
/>

// 금액 — 숫자만 허용 + suffixText
const [amount, setAmount] = useState('')
<TextField
  label="금액" indicator="required" inputMode="numeric" placeholder="0" suffixText="원"
  value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
/>

// clearable 검색 — 값이 있을 때만 X 버튼 노출
const [search, setSearch] = useState('')
<TextField
  label="검색" leadingIcon="searchOutline2dp" placeholder="검색어 입력"
  value={search} onChange={e => setSearch(e.target.value)}
  trailingAction={
    search ? (
      <button type="button" onClick={() => setSearch('')}
        style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--sys-content-neutral-muted)' }}>
        <Icon name="xCircleSolid" size={20} />
      </button>
    ) : undefined
  }
/>
```

## NOT in Figma (avoid)

- Multi-line text input — use TextArea instead
- `xs` size not in Figma
- Combo of `leadingIcon` + `prefixText` simultaneously not in Figma
