import { InputHTMLAttributes } from 'react'
import './Switch.css'

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'checked'> {
  checked?: boolean
  size?: 'sm' | 'md'
}

export function Switch({
  checked = false,
  size = 'md',
  disabled,
  onChange,
  ...rest
}: SwitchProps) {
  return (
    <span
      className="switch"
      data-size={size}
      data-on={checked ? 'true' : 'false'}
      data-disabled={disabled ? '' : undefined}
    >
      <input
        type="checkbox"
        role="switch"
        className="switch__input"
        checked={checked}
        disabled={disabled}
        aria-checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span className="switch__track" aria-hidden="true">
        <span className="switch__thumb" />
      </span>
    </span>
  )
}
