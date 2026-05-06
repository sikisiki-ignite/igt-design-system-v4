import { useState } from 'react'
import { Slider } from '../src/components/Slider/Slider'

export function SliderShowcase() {
  const [volume, setVolume] = useState(40)
  const [brightness, setBrightness] = useState(70)
  const [opacity, setOpacity] = useState(50)

  return (
    <section>
      <h2>Slider</h2>

      {/* ── Basic ── */}
      <h3>Basic</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        <div>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>Default (0–100)</div>
          <Slider defaultValue={30} />
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#999', marginBottom: 8 }}>With step=10</div>
          <Slider defaultValue={50} step={10} />
        </div>
      </div>

      {/* ── With icons ── */}
      <h3 style={{ marginTop: 32 }}>With Icons</h3>
      <div style={{ maxWidth: 400 }}>
        <Slider
          value={volume}
          onChange={setVolume}
          leadingIcon="speakerOffSolid"
          trailingIcon="speakerOnSolid"
          aria-label="볼륨"
        />
        <div style={{ fontSize: 12, color: '#666', marginTop: 8 }}>볼륨: {volume}%</div>
      </div>

      {/* ── Disabled ── */}
      <h3 style={{ marginTop: 32 }}>Disabled</h3>
      <div style={{ maxWidth: 400 }}>
        <Slider defaultValue={60} disabled />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 32 }}>Interactive</h3>
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--sys-content-neutral-default)' }}>밝기</span>
            <span style={{ fontSize: 13, color: 'var(--sys-content-neutral-subtle)' }}>{brightness}%</span>
          </div>
          <Slider value={brightness} onChange={setBrightness} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--sys-content-neutral-default)' }}>투명도</span>
            <span style={{ fontSize: 13, color: 'var(--sys-content-neutral-subtle)' }}>{opacity}%</span>
          </div>
          <Slider value={opacity} onChange={setOpacity} />
        </div>
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 볼륨 컨트롤</h3>
      <div style={{ maxWidth: 360, padding: 20, border: '1px solid var(--sys-border-neutral-muted)', borderRadius: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sys-content-neutral-default)', marginBottom: 16 }}>볼륨</div>
        <Slider
          value={volume}
          onChange={setVolume}
          leadingIcon="speakerOffSolid"
          trailingIcon="speakerOnSolid"
          aria-label="볼륨"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <span style={{ fontSize: 11, color: '#aaa' }}>0</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--sys-content-neutral-default)' }}>{volume}%</span>
          <span style={{ fontSize: 11, color: '#aaa' }}>100</span>
        </div>
      </div>
    </section>
  )
}
