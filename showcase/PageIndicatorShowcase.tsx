import { useState } from 'react'
import { PageIndicator } from '../src/components/PageIndicator/PageIndicator'
import { Button } from '../src/components/Button/Button'

export function PageIndicatorShowcase() {
  const [active, setActive] = useState(0)

  return (
    <section>
      <h2>PageIndicator</h2>

      <h3>type: dot / Size variants (surface)</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>sm</span>
          <PageIndicator type="dot" count={4} activeIndex={1} size="sm" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>md</span>
          <PageIndicator type="dot" count={4} activeIndex={1} size="md" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 30, fontSize: 12 }}>lg</span>
          <PageIndicator type="dot" count={4} activeIndex={1} size="lg" />
        </div>
      </div>

      <h3>type: dot / appearance: onImage</h3>
      <div
        style={{
          padding: 24,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <PageIndicator type="dot" count={4} activeIndex={0} appearance="onImage" size="sm" />
        <PageIndicator type="dot" count={4} activeIndex={0} appearance="onImage" size="md" />
        <PageIndicator type="dot" count={4} activeIndex={0} appearance="onImage" size="lg" />
      </div>

      <h3>type: dot / Interactive</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <PageIndicator type="dot" count={5} activeIndex={active} size="lg" />
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <Button key={i} tone={active === i ? 'primary' : 'secondary'} appearance={active === i ? 'fill' : 'outline'} size="xs" onClick={() => setActive(i)}>
              {i}
            </Button>
          ))}
        </div>
      </div>

      <h3>type: text / Size md</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <PageIndicator type="text" page={1} total={9} size="md" />
          <PageIndicator type="text" page={5} total={9} size="md" />
          <PageIndicator type="text" page={9} total={9} size="md" />
        </div>
      </div>

      <h3>type: text / Size sm</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <PageIndicator type="text" page={1} total={20} size="sm" />
        <PageIndicator type="text" page={10} total={20} size="sm" />
      </div>
    </section>
  )
}
