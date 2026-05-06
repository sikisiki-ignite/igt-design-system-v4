import { ButtonHTMLAttributes, ReactNode } from 'react'
import './ModeSwitchButton.css'

export interface ModeSwitchButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  children: ReactNode
}

export function ModeSwitchButton({
  selected = false,
  disabled,
  children,
  ...rest
}: ModeSwitchButtonProps) {
  return (
    <button
      className="mode-switch-btn"
      data-selected={selected ? 'true' : 'false'}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      <span className="mode-switch-btn__label">{children}</span>
    </button>
  )
}
