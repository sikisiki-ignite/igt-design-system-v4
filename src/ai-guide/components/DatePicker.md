<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T15:12:09.289Z -->

# DatePicker

Date input field with calendar popover. Supports single date and date range selection. Uses Radix UI Popover.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `variation` | `'singleDate' \| 'range'` | `'singleDate'` | Single date or range picker mode |
| `size` | `'md' \| 'lg'` | `'lg'` | Field height — no `xs`/`sm` in Figma |
| `value` | `string` | — | Controlled start date (`YYYY.MM.DD`) |
| `endValue` | `string` | — | Controlled end date for range mode |
| `defaultValue` | `string` | — | Uncontrolled initial start date |
| `defaultEndValue` | `string` | — | Uncontrolled initial end date |
| `label` | `string` | — | Field label above the input |
| `message` | `string` | — | Helper or error text below the field |
| `placeholder` | `string` | `'YYYY.MM.DD'` | Placeholder for start date |
| `endPlaceholder` | `string` | `'YYYY.MM.DD'` | Placeholder for end date (range only) |
| `invalid` | `boolean` | `false` | Error border state |
| `disabled` | `boolean` | `false` | Prevents interaction |
| `readOnly` | `boolean` | `false` | Display-only, no calendar |
| `onChange` | `(value: string) => void` | — | Called when single date selected |
| `onRangeChange` | `(start: string, end: string) => void` | — | Called when range complete |
| `className` | `string` | — | — |

## Usage

```tsx
// Single date (uncontrolled)
<DatePicker label="날짜 선택" />

// Single date (controlled)
const [date, setDate] = useState('')
<DatePicker value={date} onChange={setDate} />

// Range (controlled)
const [start, setStart] = useState('')
const [end, setEnd] = useState('')
<DatePicker
  variation="range"
  value={start}
  endValue={end}
  onRangeChange={(s, e) => { setStart(s); setEnd(e) }}
  placeholder="시작일"
  endPlaceholder="종료일"
/>

// With error state
<DatePicker label="마감일" invalid />

// Read-only
<DatePicker value="2026.05.04" readOnly />
```

## Date format

All values use `YYYY.MM.DD` format (e.g., `"2026.05.04"`).

## NOT in Figma (avoid)

- Time picker (no time variant in Figma)
- `xs`/`sm` sizes not in Figma — only `md` and `lg`
- Inline calendar (no popover toggle) not in Figma
- Month/year range picker not in Figma

## ⚠️ Figma 스펙 미추출 영역

figma-spec nodeId `2084:30005`는 **DateField 트리거 버튼**만 커버한다.
캘린더 팝오버(월 헤더, 요일, 날짜 그리드)는 별도 Figma 컴포넌트로 존재하지만 gen:spec 추출이 진행되지 않았다.
현재 캘린더 팝업 UI(`dp__popover`, `dp__calendar`, `dp__days` 등)는 **Figma 근거 없는 ad-hoc 구현**이다.
정확한 구현을 원한다면 캘린더 Figma 노드를 별도로 gen:spec 추출 후 재구현해야 한다.
