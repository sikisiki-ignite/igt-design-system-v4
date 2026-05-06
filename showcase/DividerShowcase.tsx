import { Divider } from '../src/components/Divider/Divider'

export function DividerShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* Tone × Emphasis */}
      <div>
        <p className="sc-section-label">Tone × Emphasis</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div><span className="sc-prop-label">neutral / weak (기본)</span><Divider /></div>
          <div><span className="sc-prop-label">neutral / default</span><Divider emphasis="default" /></div>
          <div><span className="sc-prop-label">neutral / strong</span><Divider emphasis="strong" /></div>
          <div><span className="sc-prop-label">accent / weak</span><Divider tone="accent" /></div>
          <div><span className="sc-prop-label">accent / default</span><Divider tone="accent" emphasis="default" /></div>
          <div><span className="sc-prop-label">accent / strong</span><Divider tone="accent" emphasis="strong" /></div>
          <div><span className="sc-prop-label">danger / weak</span><Divider tone="danger" /></div>
          <div><span className="sc-prop-label">danger / default</span><Divider tone="danger" emphasis="default" /></div>
          <div><span className="sc-prop-label">danger / strong</span><Divider tone="danger" emphasis="strong" /></div>
        </div>
      </div>

      {/* Variant */}
      <div>
        <p className="sc-section-label">Variant</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div><span className="sc-prop-label">solid</span><Divider emphasis="default" /></div>
          <div><span className="sc-prop-label">dashed</span><Divider emphasis="default" variant="dashed" /></div>
        </div>
      </div>

      {/* Inset */}
      <div>
        <p className="sc-section-label">Inset (horizontal)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, border: '1px dashed var(--sys-border-neutral-weak)', padding: 16, borderRadius: 8 }}>
          <div><span className="sc-prop-label">none</span><Divider emphasis="default" inset="none" /></div>
          <div><span className="sc-prop-label">sm (8px)</span><Divider emphasis="default" inset="sm" /></div>
          <div><span className="sc-prop-label">md (16px)</span><Divider emphasis="default" inset="md" /></div>
          <div><span className="sc-prop-label">lg (24px)</span><Divider emphasis="default" inset="lg" /></div>
        </div>
      </div>

      {/* Vertical */}
      <div>
        <p className="sc-section-label">Orientation — vertical</p>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 16, height: 80 }}>
          <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--sys-text-neutral-subtle)' }}>Left</span>
          <Divider orientation="vertical" emphasis="default" />
          <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--sys-text-neutral-subtle)' }}>Middle</span>
          <Divider orientation="vertical" emphasis="default" variant="dashed" />
          <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--sys-text-neutral-subtle)' }}>Right</span>
        </div>
      </div>

      {/* Vertical Inset */}
      <div>
        <p className="sc-section-label">Vertical + Inset (lg)</p>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 16, height: 80 }}>
          <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--sys-text-neutral-subtle)' }}>A</span>
          <Divider orientation="vertical" emphasis="default" inset="lg" />
          <span style={{ alignSelf: 'center', fontSize: 13, color: 'var(--sys-text-neutral-subtle)' }}>B</span>
        </div>
      </div>

    </div>
  )
}
