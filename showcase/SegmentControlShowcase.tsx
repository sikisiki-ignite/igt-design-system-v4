import { useState } from 'react'
import { SegmentControl } from '../src/components/SegmentControl/SegmentControl'

export function SegmentControlShowcase() {
  const [period, setPeriod] = useState(0)
  const [view, setView] = useState(0)

  return (
    <section>
      <h2>SegmentControl</h2>

      <h3>Size variants (text, content width)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>xs</span>
          <SegmentControl
            segments={[{ label: '일' }, { label: '주' }, { label: '월' }]}
            activeIndex={period}
            onSegmentChange={setPeriod}
            size="xs"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>sm</span>
          <SegmentControl
            segments={[{ label: '일' }, { label: '주' }, { label: '월' }]}
            activeIndex={period}
            onSegmentChange={setPeriod}
            size="sm"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>md</span>
          <SegmentControl
            segments={[{ label: '일' }, { label: '주' }, { label: '월' }]}
            activeIndex={period}
            onSegmentChange={setPeriod}
            size="md"
          />
        </div>
      </div>

      <h3>Width: equal</h3>
      <div style={{ maxWidth: 320 }}>
        <SegmentControl
          segments={[{ label: '목록' }, { label: '그리드' }, { label: '맵' }]}
          activeIndex={view}
          onSegmentChange={setView}
          size="md"
          width="equal"
        />
      </div>

      <h3>Content: iconText</h3>
      <SegmentControl
        segments={[
          { label: '목록', icon: 'listBulletOutline2dp' },
          { label: '그리드', icon: 'viewTwoOutline2dp' },
        ]}
        activeIndex={view}
        onSegmentChange={setView}
        size="md"
        content="iconText"
      />

      <h3>Content: icon only</h3>
      <SegmentControl
        segments={[
          { icon: 'listBulletOutline2dp' },
          { icon: 'viewTwoOutline2dp' },
        ]}
        activeIndex={view}
        onSegmentChange={setView}
        size="md"
        content="icon"
      />

      <h3>Disabled segment</h3>
      <SegmentControl
        segments={[
          { label: '일' },
          { label: '주' },
          { label: '월', disabled: true },
        ]}
        activeIndex={0}
        size="md"
      />

      <h3>5 segments</h3>
      <SegmentControl
        segments={[
          { label: '1일' },
          { label: '1주' },
          { label: '1개월' },
          { label: '3개월' },
          { label: '1년' },
        ]}
        activeIndex={2}
        size="md"
      />
    </section>
  )
}
