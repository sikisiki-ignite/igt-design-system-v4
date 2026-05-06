import { IconButton } from '../src/components/IconButton/IconButton'
import { Icon } from '../src/components/Icon/Icon'

const tones = ['primary', 'neutral'] as const
const appearances = ['fill', 'outline'] as const
const emphases = ['strong', 'weak'] as const
const sizes = ['xs', 'sm', 'md'] as const
const shapes = ['rounded', 'circle'] as const

export function IconButtonShowcase() {
  return (
    <div>
      <div className="sc-page-title">IconButton Showcase</div>

      <div className="sc-section">
        <div className="sc-section-title">Size</div>
        <div className="sc-row">
          {sizes.map(size => (
            <IconButton key={size} size={size}>
              <Icon name="settingSolid" size={size === 'xs' ? 16 : size === 'sm' ? 20 : 24} aria-hidden />
            </IconButton>
          ))}
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-section-title">Shape</div>
        <div className="sc-row">
          {shapes.map(shape => (
            <IconButton key={shape} shape={shape}>
              <Icon name="settingSolid" size={24} aria-hidden />
            </IconButton>
          ))}
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-section-title">Tone × Appearance × Emphasis</div>
        {tones.map(tone => (
          <div key={tone}>
            {appearances.map(appearance => (
              <div key={appearance} className="sc-row">
                <span className="sc-label">{tone} / {appearance}</span>
                {emphases.map(emphasis => (
                  <IconButton key={emphasis} tone={tone} appearance={appearance} emphasis={emphasis}>
                    <Icon name="settingSolid" size={24} aria-hidden />
                  </IconButton>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">States</div>
        <div className="sc-row">
          <IconButton><Icon name="settingSolid" size={24} aria-hidden /></IconButton>
          <IconButton disabled><Icon name="settingSolid" size={24} aria-hidden /></IconButton>
          <IconButton isLoading><Icon name="settingSolid" size={24} aria-hidden /></IconButton>
        </div>
      </div>
    </div>
  )
}
