import { useState } from 'react'
import { Tab } from '../src/components/Tab/Tab'

const BASIC_TABS = [
  { label: '전체' },
  { label: '진행중', count: 3 },
  { label: '완료' },
  { label: '취소', disabled: true },
]

export function TabShowcase() {
  const [active1, setActive1] = useState(0)
  const [active2, setActive2] = useState(0)
  const [active3, setActive3] = useState(1)

  return (
    <section>
      <h2>Tab</h2>

      <h3>Size variants (distribution: content)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>sm</p>
          <Tab tabs={BASIC_TABS} activeIndex={active1} onTabChange={setActive1} size="sm" />
        </div>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>md</p>
          <Tab tabs={BASIC_TABS} activeIndex={active1} onTabChange={setActive1} size="md" />
        </div>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>lg</p>
          <Tab tabs={BASIC_TABS} activeIndex={active1} onTabChange={setActive1} size="lg" />
        </div>
      </div>

      <h3>Distribution: equal</h3>
      <Tab
        tabs={[{ label: '홈' }, { label: '검색' }, { label: '마이페이지' }]}
        activeIndex={active2}
        onTabChange={setActive2}
        distribution="equal"
        size="lg"
      />

      <h3>With counts (5 tabs)</h3>
      <Tab
        tabs={[
          { label: '전체', count: 128 },
          { label: '공지', count: 5 },
          { label: '이벤트', count: 12 },
          { label: '자주묻는질문' },
          { label: '문의', disabled: true },
        ]}
        activeIndex={active3}
        onTabChange={setActive3}
        size="lg"
      />
    </section>
  )
}
