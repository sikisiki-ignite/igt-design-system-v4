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

## Radix UI 제약 사항

### `value=""` 빈 문자열 금지

Radix UI Select는 `value=""`(빈 문자열)을 옵션 value로 허용하지 않습니다. 빈 문자열을 사용하면 컴포넌트가 충돌하며 흰 화면이 발생합니다.

```tsx
// ❌ 금지 — 흰 화면 발생
const options = [
  { value: '', label: '전체' },
  { value: 'a', label: 'Option A' },
]

// ✅ 올바른 방법 — 의미 있는 sentinel 값 사용
const options = [
  { value: 'all', label: '전체' },
  { value: 'a', label: 'Option A' },
]

// 필터 로직도 sentinel 값에 맞게 작성
const filtered = selected === 'all' ? allData : allData.filter(d => d.key === selected)
```

**규칙**: "전체", "없음", "미선택" 의미의 옵션은 반드시 `'all'`, `'none'`, `'unset'` 등 비어 있지 않은 문자열을 사용한다.

---

## Appearance Variants

| appearance | Use case |
|---|---|
| `outline` | Default form field |
| `fill` | Filled background, prominent form |
| `plain` | Inline or toolbar context |

## Form Row Patterns

폼 행 안에서 Select 너비를 결정하는 규칙.

### 결정 규칙

| 상황 | Select 너비 | 나머지 컨트롤 |
|---|---|---|
| 행에서 셀렉트만 있을 때 | `width="fill"` | — |
| 셀렉트가 타입·기준 선택 역할 (날짜 타입, 검색 기준) | 고정 px (`className`) | 인풋/날짜 → `flex: 1` |
| 셀렉트가 검색 카테고리 역할 | 고정 px (`className`) | 텍스트 인풋 → `width="fill"` |

### 고정 너비 계산

```
고정 너비 = 옵션 최장 글자수 × 8px + padding 40px
```

- 날짜 타입 셀렉트 (Updated date, 명의이전 요청일 등): 140–160px
- 검색 카테고리 셀렉트 (Dealer No., 차량번호 등): 100–120px

### 코드 예시

```tsx
{/* ① 단독 행 — flex: 1 풀 너비 */}
<div className="flex">
  <Select options={statusOptions} width="fill" placeholder="Select" />
</div>

{/* ② 타입 셀렉트 고정 + 날짜 인풋 flex */}
<div className="flex" style={{ gap: 'var(--spacing-8)' }}>
  <Select options={dateTypeOptions} style={{ width: 140 }} placeholder="Updated date" />
  <DateInput style={{ flex: 1 }} />
  <span>~</span>
  <DateInput style={{ flex: 1 }} />
</div>

{/* ③ 카테고리 셀렉트 고정 + 텍스트 인풋 flex */}
<div className="flex" style={{ gap: 'var(--spacing-8)' }}>
  <Select options={categoryOptions} style={{ width: 110 }} placeholder="Dealer No." />
  <TextInput width="fill" placeholder="이름" />
</div>
```

### 주의

- 고정 너비는 페이지/폼 레벨 레이아웃 결정이므로 Select 내부 토큰 사용 금지
- 고정 너비는 `style={{ width: N }}`으로 지정 — Tailwind는 레이아웃 유틸리티만 허용, sizing 스케일 값 사용 금지

## NOT in Figma (avoid)

- Multi-select is not in Figma — do not add
- Custom trigger content (icons in trigger) not in Figma
- Option groups / separators not in Figma
