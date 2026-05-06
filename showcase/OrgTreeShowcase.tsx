import { useState } from 'react'
import { OrgTree } from '../src/components/OrgTree/OrgTree'
import type { OrgTreeItem } from '../src/components/OrgTree/OrgTree'

// 실제 사용 패턴: 복수 루트 + 다단계 중첩
const ORG_ITEMS: OrgTreeItem[] = [
  { id: 'ignite1', label: '일그나이트', count: 9 },
  {
    id: 'ignite2',
    label: '이그나이트',
    count: 9,
    children: [
      {
        id: 'plan',
        label: '기획팀',
        count: 9,
        children: [
          { id: 'plan-a', label: '서비스기획', count: 5 },
          { id: 'plan-b', label: '전략기획', count: 4 },
        ],
      },
      { id: 'design', label: '디자인팀', count: 9 },
      {
        id: 'marketing',
        label: '마케팅팀',
        count: 9,
        children: [
          { id: 'biz', label: '비즈니스', count: 9 },
          {
            id: 'promo',
            label: '프로모션팀',
            count: 9,
            children: [
              { id: 'promo-a', label: '온라인', count: 5 },
              { id: 'promo-b', label: '오프라인', count: 4 },
            ],
          },
        ],
      },
      { id: 'mgmt', label: '매니지먼트', count: 9 },
    ],
  },
  { id: 'ignite3', label: '삼그나이트', count: 9 },
  { id: 'ignite4', label: '사그나이트', count: 9 },
]


export function OrgTreeShowcase() {
  const [selected, setSelected] = useState('promo')

  return (
    <section>
      <h2>OrgTree</h2>

      <h3>다단계 중첩 / Uncontrolled</h3>
      <p style={{ fontSize: 12, color: 'var(--sys-content-neutral-muted)', margin: '4px 0 12px' }}>
        복수 루트 · 3단계 중첩 · 리프 노드 blank(dot 없음)
      </p>
      <div style={{ maxWidth: 280, border: '1px solid var(--sys-border-neutral-subtle)', borderRadius: 8, padding: 8 }}>
        <OrgTree
          items={ORG_ITEMS}
          selectedId={selected}
          onSelect={setSelected}
          size="lg"
        />
      </div>
      <p style={{ fontSize: 12, marginTop: 8 }}>선택: {selected}</p>

      <h3>Size: default</h3>
      <div style={{ maxWidth: 280, border: '1px solid var(--sys-border-neutral-subtle)', borderRadius: 8, padding: 8 }}>
        <OrgTree
          items={ORG_ITEMS}
          selectedId={selected}
          onSelect={setSelected}
          size="default"
        />
      </div>

      <h3>Flat list (no children, no trail)</h3>
      <div style={{ maxWidth: 280, border: '1px solid var(--sys-border-neutral-subtle)', borderRadius: 8, padding: 8 }}>
        <OrgTree
          items={[
            { id: 'all', label: '전체', count: 142 },
            { id: 'active', label: '활성', count: 120, badge: '인기' },
            { id: 'inactive', label: '비활성', count: 22, disabled: true },
          ]}
          selectedId="all"
          size="lg"
        />
      </div>
    </section>
  )
}
