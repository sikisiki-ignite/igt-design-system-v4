import { useState } from 'react'
import { NumberStepper } from '../src/components/NumberStepper/NumberStepper'

function StepperDemo(props: React.ComponentProps<typeof NumberStepper> & { label?: string }) {
  const [value, setValue] = useState(props.value ?? 0)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <NumberStepper {...props} value={value} onChange={setValue} />
      {props.label && <span style={{ fontSize: 12, color: '#666' }}>{props.label}</span>}
    </div>
  )
}

export function NumberStepperShowcase() {
  const [qty, setQty] = useState(1)
  const [guests, setGuests] = useState(2)

  return (
    <section>
      <h2>NumberStepper</h2>

      {/* ── Emphasis × Size ── */}
      <h3>Emphasis × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {(['soft', 'outline'] as const).map(emphasis => (
          <div key={emphasis}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 8, textTransform: 'uppercase' }}>emphasis={emphasis}</div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              {(['xs', 'sm', 'md'] as const).map(size => (
                <StepperDemo key={size} emphasis={emphasis} size={size} value={3} label={`size=${size}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Lock states ── */}
      <h3 style={{ marginTop: 32 }}>Lock states</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>none (free)</div>
          <NumberStepper value={3} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>min locked (value=0)</div>
          <NumberStepper value={0} min={0} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>max locked (value=10)</div>
          <NumberStepper value={10} max={10} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>both (value=5, min=max=5)</div>
          <NumberStepper value={5} min={5} max={5} />
        </div>
      </div>

      {/* ── Disabled ── */}
      <h3 style={{ marginTop: 32 }}>Disabled</h3>
      <div style={{ display: 'flex', gap: 12 }}>
        <NumberStepper value={3} disabled />
        <NumberStepper value={3} emphasis="outline" disabled />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 32 }}>Interactive</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <StepperDemo value={1} min={0} max={99} label="min=0, max=99" />
        <StepperDemo value={5} step={5} min={0} max={50} label="step=5" />
        <StepperDemo value={0} emphasis="outline" min={0} label="outline, min=0" />
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시</h3>
      <div style={{ maxWidth: 420 }}>
        {/* 상품 수량 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--sys-border-neutral-muted)' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-content-neutral-default)' }}>상품 수량</div>
            <div style={{ fontSize: 12, color: 'var(--sys-content-neutral-subtle)', marginTop: 2 }}>최소 1개, 최대 99개</div>
          </div>
          <NumberStepper value={qty} min={1} max={99} onChange={setQty} />
        </div>
        {/* 인원 수 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--sys-border-neutral-muted)' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-content-neutral-default)' }}>인원 수</div>
            <div style={{ fontSize: 12, color: 'var(--sys-content-neutral-subtle)', marginTop: 2 }}>성인 기준</div>
          </div>
          <NumberStepper value={guests} min={1} max={10} size="sm" emphasis="outline" onChange={setGuests} />
        </div>
      </div>
    </section>
  )
}
