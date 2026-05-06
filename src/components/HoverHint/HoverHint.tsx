import './HoverHint.css'

export interface HoverHintProps {
  headline?: string
  description?: string
  layout?: 'inline' | 'block'
  className?: string
}

export function HoverHint({ headline, description, layout = 'inline', className }: HoverHintProps) {
  return (
    <div
      className={['hover-hint', className].filter(Boolean).join(' ')}
      data-layout={layout}
    >
      {headline && <span className="hover-hint__headline">{headline}</span>}
      {layout === 'block' && description && (
        <span className="hover-hint__description">{description}</span>
      )}
    </div>
  )
}
