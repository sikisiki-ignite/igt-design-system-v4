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

## Range 모드 동작 방식

`variation="range"` 일 때 선택은 2단계로 진행된다.

1. **시작일 단계**: 팝오버를 열면 항상 시작일 선택 상태로 시작. 날짜 클릭 → 시작일이 즉시 입력 필드에 표기되고 팝오버 유지
2. **종료일 단계**: 날짜 클릭 → 범위 확정, `onRangeChange` 호출, 팝오버 닫힘
   - 선택한 종료일이 시작일보다 앞이면 자동으로 시작/종료를 교환

팝오버를 종료일 선택 없이 닫으면 다음에 열 때 시작일 단계로 리셋된다.

### Controlled 모드 패턴

`value` / `endValue` 를 외부에서 제어할 때 `onChange` 없이 `onRangeChange` 만 전달해도 된다. 시작일 클릭 시 내부적으로 `pendingRangeStart` 에 임시 저장되어 즉시 화면에 반영되며, 종료일 클릭 시 `onRangeChange(start, end)` 로 한 번에 확정된다.

```tsx
// ✅ 올바른 controlled 패턴 — onChange 없이 onRangeChange만 사용
<DatePicker
  variation="range"
  value={start}
  endValue={end}
  onRangeChange={(s, e) => { setStart(s); setEnd(e) }}
/>

// ❌ 잘못된 패턴 — start만 업데이트
onRangeChange={(s) => setStart(s)}
```

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
