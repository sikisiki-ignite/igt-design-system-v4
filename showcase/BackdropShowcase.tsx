import { useState } from 'react'
import { Backdrop } from '../src/components/Backdrop/Backdrop'
import { Button } from '../src/components/Button/Button'

export function BackdropShowcase() {
  const [active, setActive] = useState<'default' | 'strong' | null>(null)

  return (
    <section>
      <h2>Backdrop</h2>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button onClick={() => setActive('default')}>Show Default</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setActive('strong')}>Show Strong</Button>
      </div>
      {active && (
        <Backdrop strength={active} onClick={() => setActive(null)} />
      )}
      {active && (
        <div style={{
          position: 'fixed', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 41, pointerEvents: 'none',
        }}>
          <div style={{ background: 'white', padding: 24, borderRadius: 12, pointerEvents: 'auto' }}>
            <p>strength: <strong>{active}</strong></p>
            <Button tone="secondary" appearance="outline" onClick={() => setActive(null)}>닫기</Button>
          </div>
        </div>
      )}
    </section>
  )
}
