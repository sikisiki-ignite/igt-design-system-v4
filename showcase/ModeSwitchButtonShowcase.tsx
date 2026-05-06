import { useState } from 'react'
import { ModeSwitchButton } from '../src/components/ModeSwitchButton/ModeSwitchButton'

const MODES = ['Light', 'Dark', 'System'] as const

export function ModeSwitchButtonShowcase() {
  const [mode, setMode] = useState<string>('Light')

  return (
    <section>
      <h2>ModeSwitchButton</h2>

      <h3>3-way toggle</h3>
      <div style={{ display: 'inline-flex', background: 'var(--sys-container-neutral-tint-default, #f3f4f6)', borderRadius: 8, padding: 4, gap: 4 }}>
        {MODES.map(m => (
          <ModeSwitchButton key={m} selected={mode === m} onClick={() => setMode(m)}>{m}</ModeSwitchButton>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Disabled</h3>
      <div style={{ display: 'inline-flex', background: 'var(--sys-container-neutral-tint-default, #f3f4f6)', borderRadius: 8, padding: 4, gap: 4 }}>
        <ModeSwitchButton selected={true} disabled>Light</ModeSwitchButton>
        <ModeSwitchButton selected={false} disabled>Dark</ModeSwitchButton>
      </div>
    </section>
  )
}
