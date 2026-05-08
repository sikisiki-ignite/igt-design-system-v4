<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:46:31.698Z -->

# Table

데이터를 행/열 구조로 표시하는 컴포넌트.

## Import

```tsx
import { Table } from '@igt/design-system';
```

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `columns` | `TableColumn[]` | — | 컬럼 정의 배열 (필수) |
| `data` | `Record<string, unknown>[]` | — | 데이터 배열 (필수) |
| `size` | `'md' \| 'lg'` | `'lg'` | 행 높이 크기 |
| `selectable` | `boolean` | `false` | 체크박스 선택 컬럼 표시 |
| `selectedRows` | `Set<number>` | — | ⚠️ 헤더 체크박스 비작동 — 아래 주의사항 참고 |
| `onRowSelect` | `(index: number, selected: boolean) => void` | — | 행 선택 변경 콜백 (비제어 모드에서도 호출됨) |
| `rowKey` | `keyof T \| (row, index) => string \| number` | `index` | 행 고유 키 |
| `emptyState` | `React.ReactNode` | — | 데이터 없을 때 표시할 콘텐츠 |
| `className` | `string` | — | — |

## TableColumn 타입

```ts
interface TableColumn<T> {
  key: string;
  header: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}
```

## 사용 예시

```tsx
const columns = [
  { key: 'name', header: '이름' },
  { key: 'email', header: '이메일' },
  { key: 'status', header: '상태', render: (v) => <Label color="green">{v}</Label> },
]

const data = [
  { name: '홍길동', email: 'hong@example.com', status: '활성' },
  { name: '김철수', email: 'kim@example.com', status: '비활성' },
]

// 기본
<Table columns={columns} data={data} />

// 체크박스 선택 (비제어 모드)
const [selectedCount, setSelectedCount] = useState(0)
<Table
  columns={columns} data={data}
  selectable size="md"
  onRowSelect={(_, selected) => setSelectedCount(prev => selected ? prev + 1 : Math.max(0, prev - 1))}
/>

// 빈 데이터
<Table columns={columns} data={[]} emptyState={<StateView type="empty" />} />
```

## Pagination 연동

`total` prop은 **전체 행 수가 아니라 전체 페이지 수**다.
데이터가 0개일 때 `Math.ceil(0 / PAGE_SIZE) = 0`이 되므로 반드시 `Math.max(1, ...)` 처리한다.

```tsx
const PAGE_SIZE = 10
const [page, setPage] = useState(1)
const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE))  // ← Math.max(1, ...) 필수
const pagedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

<Table columns={columns} data={pagedData} rowKey="id" />
<Pagination page={page} total={totalPages} onChange={setPage} />
//                              ↑ 페이지 수 (행 수 아님)
```

## ⚠️ selectedRows 제어 모드 — 헤더 체크박스 비작동

`selectedRows` prop을 외부에서 주입하면 Table 내부의 `toggleAll()`이 차단되어 **헤더 체크박스 일괄 선택이 작동하지 않는다.**

```tsx
// ❌ 금지: selectedRows 외부 주입 (제어 모드)
<Table selectable selectedRows={selectedRows} onRowSelect={(i, sel) => updateSet(i, sel)} />

// ✅ 올바름: 비제어 모드 — 선택 개수만 별도 state로 추적
const [selectedCount, setSelectedCount] = useState(0)
<Table
  selectable
  onRowSelect={(_, selected) => setSelectedCount(prev => selected ? prev + 1 : Math.max(0, prev - 1))}
  size="md"
  rowKey="id"
/>
```

`onRowSelect`는 비제어 모드에서도 정상 호출된다.

## NOT in Figma (avoid)

- 정렬(sort) 기능 — 헤더 클릭 정렬 없음
- 페이지네이션 내장 — Pagination 컴포넌트 별도 사용
- 고정 열(sticky column) — Figma 미정의
