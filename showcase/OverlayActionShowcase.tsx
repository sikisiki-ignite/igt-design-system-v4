import { OverlayAction } from '../src/components/OverlayAction/OverlayAction'
import { Icon } from '../src/components/Icon/Icon'

const sizes = ['xs', 'sm', 'md'] as const

export function OverlayActionShowcase() {
  return (
    <div>
      <div className="sc-page-title">OverlayAction Showcase</div>

      <div className="sc-section">
        <div className="sc-section-title">Polarity × Size</div>
        {(['dark', 'light'] as const).map(polarity => (
          <div key={polarity} className="sc-row" style={{
            background: polarity === 'dark' ? '#1a1a2e' : '#e0e0e0',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '8px',
          }}>
            <span className="sc-label" style={{ color: polarity === 'dark' ? '#fff' : '#333' }}>
              {polarity}
            </span>
            {sizes.map(size => (
              <OverlayAction key={size} polarity={polarity} size={size}>
                <Icon name="settingSolid" size={size === 'xs' ? 16 : size === 'sm' ? 20 : 24} aria-hidden />
              </OverlayAction>
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">States</div>
        <div className="sc-row" style={{ background: '#1a1a2e', padding: '16px', borderRadius: '8px' }}>
          <OverlayAction polarity="dark">
            <Icon name="settingSolid" size={24} aria-hidden />
          </OverlayAction>
          <OverlayAction polarity="dark" disabled>
            <Icon name="settingSolid" size={24} aria-hidden />
          </OverlayAction>
          <OverlayAction polarity="dark" isLoading>
            <Icon name="settingSolid" size={24} aria-hidden />
          </OverlayAction>
        </div>
      </div>
    </div>
  )
}
