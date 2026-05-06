import React, { useState } from 'react';
import { Table, TableColumn } from '../src/components/Table/Table';
import { Label } from '../src/components/Label/Label';
import { Badge } from '../src/components/Badge/Badge';
import { StateView } from '../src/components/StateView/StateView';
import { Icon } from '../src/components/Icon/Icon';
import { Pagination } from '../src/components/Pagination/Pagination';

type Employee = {
  id: number;
  name: string;
  email: string;
  department: string;
  status: '활성' | '비활성' | '대기';
  score: number;
};

const data: Employee[] = [
  { id: 1, name: '홍길동', email: 'hong@igt.com', department: '개발', status: '활성', score: 98 },
  { id: 2, name: '김철수', email: 'kim@igt.com', department: '디자인', status: '비활성', score: 72 },
  { id: 3, name: '이영희', email: 'lee@igt.com', department: '기획', status: '활성', score: 85 },
  { id: 4, name: '박민준', email: 'park@igt.com', department: '개발', status: '대기', score: 61 },
  { id: 5, name: '최지수', email: 'choi@igt.com', department: '마케팅', status: '활성', score: 91 },
];

const statusColor: Record<string, 'green' | 'grey' | 'yellow'> = {
  활성: 'green',
  비활성: 'grey',
  대기: 'yellow',
};

const columns: TableColumn<Employee>[] = [
  { key: 'name', header: '이름', width: 120 },
  { key: 'email', header: '이메일' },
  { key: 'department', header: '부서', width: 100 },
  {
    key: 'status',
    header: '상태',
    width: 80,
    align: 'center',
    render: (v) => (
      <Label color={statusColor[v as string] ?? 'grey'} size="sm">
        {v as string}
      </Label>
    ),
  },
  {
    key: 'score',
    header: '점수',
    width: 80,
    align: 'right',
    render: (v) => (
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{v as number}</span>
    ),
  },
];

const PAGE_SIZE = 3

export function TableShowcase() {
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(data.length / PAGE_SIZE)
  const pagedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
      <h2 style={{ margin: 0 }}>Table</h2>

      <section>
        <h3>Basic — size lg</h3>
        <Table columns={columns} data={data} rowKey="id" />
      </section>

      <section>
        <h3>Selectable — size md</h3>
        <Table columns={columns} data={data} rowKey="id" selectable size="md" />
      </section>

      <section>
        <h3>Empty State</h3>
        <Table
          columns={columns}
          data={[]}
          rowKey="id"
          emptyState={
            <StateView
              variant="empty"
              headline="데이터가 없습니다"
              body="검색 조건을 변경하거나 새 항목을 추가해주세요"
              icon={<Icon name="documentPaperSolid" size={40} />}
            />
          }
        />
      </section>

      {/* ── Table + Pagination 연동 ── */}
      <section>
        <h3>Table + Pagination</h3>
        {/* total은 전체 행 수가 아니라 전체 페이지 수임 */}
        <Table columns={columns} data={pagedData} rowKey="id" />
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
          <Pagination page={page} total={totalPages} onChange={setPage} />
        </div>
      </section>
    </div>
  );
}
