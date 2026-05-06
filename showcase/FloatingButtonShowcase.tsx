import { FloatingButton } from '../src/components/FloatingButton/FloatingButton'

const priorities = ['primaryFill', 'secondaryFill', 'secondaryOutline'] as const
const sizes = ['lg', 'md'] as const

export function FloatingButtonShowcase() {
  return (
    <div>
      <div className="sc-page-title">FloatingButton Showcase</div>

      <div className="sc-section">
        <div className="sc-section-title">Icon variant — Priority × Size</div>
        {priorities.map(priority => (
          <div key={priority} className="sc-row">
            <span className="sc-label">{priority}</span>
            {sizes.map(size => (
              <FloatingButton key={size} priority={priority} size={size} iconName="settingSolid" />
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">Extended variant — with label</div>
        {priorities.map(priority => (
          <div key={priority} className="sc-row">
            <span className="sc-label">{priority}</span>
            {sizes.map(size => (
              <FloatingButton key={size} variant="extended" priority={priority} size={size} iconName="settingSolid">
                {priority}
              </FloatingButton>
            ))}
          </div>
        ))}
      </div>

      <div className="sc-section">
        <div className="sc-section-title">States</div>
        <div className="sc-row">
          <FloatingButton iconName="settingSolid" />
          <FloatingButton iconName="settingSolid" disabled />
          <FloatingButton iconName="settingSolid" isLoading />
        </div>
      </div>
    </div>
  )
}
