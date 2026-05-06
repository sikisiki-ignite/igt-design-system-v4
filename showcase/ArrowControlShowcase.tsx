import { ArrowControl } from '../src/components/ArrowControl/ArrowControl'

const variants = ['surfaceFill', 'surfaceOutline', 'overlayLight', 'overlayDark'] as const
const sizes = ['xs', 'sm', 'md'] as const

export function ArrowControlShowcase() {
  return (
    <div>
      <div className="sc-page-title">ArrowControl Showcase</div>

      <div className="sc-section">
        <div className="sc-section-title">Variant × Direction × Size</div>
        {variants.map(variant => (
          <div key={variant} className="sc-row" style={{ alignItems: 'center' }}>
            <span className="sc-label">{variant}</span>
            {sizes.map(size => (
              <ArrowControl key={`${size}-prev`} direction="prev" variant={variant} size={size} />
            ))}
            {sizes.map(size => (
              <ArrowControl key={`${size}-next`} direction="next" variant={variant} size={size} />
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">States</div>
        <div className="sc-row">
          <ArrowControl direction="prev" variant="surfaceFill" size="md" />
          <ArrowControl direction="next" variant="surfaceFill" size="md" />
          <ArrowControl direction="prev" variant="surfaceFill" size="md" disabled />
          <ArrowControl direction="next" variant="surfaceFill" size="md" disabled />
        </div>
      </div>
    </div>
  )
}
