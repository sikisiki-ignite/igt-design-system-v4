<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:46:31.698Z -->

# Table

데이터를 행/열 구조로 표시하는 컴포넌트.

## Import

```tsx
import { Table } from '@igt/design-system';
```

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `columns` | `TableColumn[]` | — | 컬럼 정의 배열 (필수) |
| `data` | `Record<string, unknown>[]` | — | 데이터 배열 (필수) |
| `size` | `'md' \| 'lg'` | `'lg'` | 행 높이 크기 |
| `selectable` | `boolean` | `false` | 체크박스 선택 컬럼 표시 |
| `selectedRows` | `Set<number>` | — | 선택 상태 외부 제어 (controlled) |
| `onRowSelect` | `(index, selected) => void` | — | 행 선택 변경 이벤트 |
| `rowKey` | `keyof T \| (row, index) => string \| number` | `index` | 행 고유 키 |
| `emptyState` | `React.ReactNode` | — | 데이터 없을 때 표시할 콘텐츠 |
| `className` | `string` | — | — |

## TableColumn 타입

```ts
interface TableColumn<T> {
  key: string;         // data의 property key
  header: string;      // 헤더 텍스트
  render?: (value, row, index) => React.ReactNode;  // 셀 커스텀 렌더
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
];

const data = [
  { name: '홍길동', email: 'hong@example.com', status: '활성' },
  { name: '김철수', email: 'kim@example.com', status: '비활성' },
];

<Table columns={columns} data={data} />
<Table columns={columns} data={data} selectable size="md" />
```

## NOT in Figma (avoid)

- 정렬(sort) 기능 — 헤더 클릭 정렬 없음
- 페이지네이션 내장 — Pagination 컴포넌트 별도 사용
- 고정 열(sticky column) — Figma 미정의
