import { useState } from 'react'
import { SideNavigation } from '../src/components/SideNavigation/SideNavigation'

const MAIN_ITEMS = [
  { id: 'dashboard', label: '대시보드', icon: 'homeOutline2dp' as const },
  { id: 'users', label: '사용자 관리', icon: 'personOutline2dp' as const },
  { id: 'products', label: '제품 관리', icon: 'viewTwoOutline2dp' as const },
  { id: 'orders', label: '주문 관리', icon: 'listBulletOutline2dp' as const },
  { id: 'settings', label: '설정', disabled: true },
]

const NESTED_ITEMS = [
  {
    id: 'analytics',
    label: '분석',
    icon: 'documentOutline2dp' as const,
    children: [
      { id: 'analytics-overview', label: '개요', depth: 2 },
      { id: 'analytics-users', label: '사용자', depth: 2 },
      { id: 'analytics-revenue', label: '매출', depth: 2 },
    ],
  },
  { id: 'reports', label: '리포트', icon: 'documentOutline2dp' as const },
  { id: 'settings', label: '설정' },
]

export function SideNavigationShowcase() {
  const [active1, setActive1] = useState('dashboard')
  const [active2, setActive2] = useState('dashboard')
  const [active3, setActive3] = useState('analytics-users')

  return (
    <section>
      <h2>SideNavigation</h2>

      <h3>Size: md / Tone: neutral</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220 }}>
          <SideNavigation
            header="메인 메뉴"
            items={MAIN_ITEMS}
            activeId={active1}
            onSelect={setActive1}
            size="md"
            tone="neutral"
          />
        </div>
      </div>

      <h3>Size: sm / Tone: accent</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220 }}>
          <SideNavigation
            header="메인 메뉴"
            items={MAIN_ITEMS}
            activeId={active2}
            onSelect={setActive2}
            size="sm"
            tone="accent"
          />
        </div>
      </div>

      <h3>Nested items (depth 2)</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220 }}>
          <SideNavigation
            header="분석 메뉴"
            items={NESTED_ITEMS}
            activeId={active3}
            onSelect={setActive3}
            size="md"
            tone="neutral"
          />
        </div>
      </div>

      <h3>No header</h3>
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 220 }}>
          <SideNavigation
            items={MAIN_ITEMS.slice(0, 3)}
            activeId="users"
            size="md"
            tone="neutral"
          />
        </div>
      </div>
    </section>
  )
}
