import './Backdrop.css'

export interface BackdropProps {
  strength?: 'default' | 'strong'
  onClick?: () => void
  className?: string
}

export function Backdrop({ strength = 'default', onClick, className }: BackdropProps) {
  return (
    <div
      className={['backdrop', className].filter(Boolean).join(' ')}
      data-strength={strength}
      onClick={onClick}
      aria-hidden="true"
    />
  )
}
