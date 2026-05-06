import { Button } from '../src/components/Button/Button'
import { Icon } from '../src/components/Icon/Icon'

const tones = ['primary', 'secondary', 'danger', 'overlayDark'] as const
const appearances = ['fill', 'outline'] as const
const emphases = ['strong', 'weak'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export function ButtonShowcase() {
  return (
    <div>
      <div className="sc-page-title">Button Showcase</div>

      <div className="sc-section">
        <div className="sc-section-title">Size</div>
        <div className="sc-row">
          {sizes.map(size => (
            <Button key={size} size={size}>{size}</Button>
          ))}
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-section-title">Tone × Appearance × Emphasis (fill)</div>
        {tones.map(tone => (
          <div key={tone} className="sc-row">
            <span className="sc-label">{tone}</span>
            {emphases.map(emphasis => (
              <Button key={emphasis} tone={tone} appearance="fill" emphasis={emphasis}>
                fill / {emphasis}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">Tone × Appearance × Emphasis (outline — primary/secondary/danger)</div>
        {(['primary', 'secondary', 'danger'] as const).map(tone => (
          <div key={tone} className="sc-row">
            <span className="sc-label">{tone}</span>
            {emphases.map(emphasis => (
              <Button key={emphasis} tone={tone} appearance="outline" emphasis={emphasis}>
                outline / {emphasis}
              </Button>
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">States</div>
        <div className="sc-row">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading</Button>
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-section-title">iconOnly</div>
        <div className="sc-row">
          {sizes.map(size => (
            <Button key={size} size={size} iconOnly>
              <Icon name="settingSolid" size={size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'md' ? 18 : 20} aria-hidden />
            </Button>
          ))}
        </div>
      </div>

      <div className="sc-section">
        <div className="sc-section-title">With Icons</div>
        <div className="sc-row">
          <Button leadingIcon={<Icon name="settingSolid" size={16} aria-hidden />}>Leading Icon</Button>
          <Button trailingIcon={<Icon name="settingSolid" size={16} aria-hidden />}>Trailing Icon</Button>
          <Button leadingIcon={<Icon name="settingSolid" size={16} aria-hidden />} trailingIcon={<Icon name="settingSolid" size={16} aria-hidden />}>Both Icons</Button>
        </div>
      </div>
    </div>
  )
}
