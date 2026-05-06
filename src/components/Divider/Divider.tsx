import './Divider.css'

export interface DividerProps {
  tone?: 'neutral' | 'accent' | 'danger'
  variant?: 'solid' | 'dashed'
  emphasis?: 'weak' | 'default' | 'strong'
  orientation?: 'horizontal' | 'vertical'
  inset?: 'none' | 'sm' | 'md' | 'lg'
}

export function Divider({
  tone = 'neutral',
  variant = 'solid',
  emphasis = 'weak',
  orientation = 'horizontal',
  inset = 'none',
}: DividerProps) {
  return (
    <div
      className="divider"
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      data-tone={tone}
      data-emphasis={emphasis}
      data-variant={variant}
      data-inset={inset}
    >
      <div className="divider__line" />
    </div>
  )
}
