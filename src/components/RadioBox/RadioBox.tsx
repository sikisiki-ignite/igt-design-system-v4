import { InputHTMLAttributes, useId } from 'react'
import { Icon } from '../Icon/Icon'
import './RadioBox.css'

export interface RadioBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'checked'> {
  checked?: boolean
  size?: 'sm' | 'md'
  invalid?: boolean
  readOnly?: boolean
}

export function RadioBox({
  checked = false,
  size = 'md',
  disabled,
  readOnly,
  invalid,
  name,
  onChange,
  ...rest
}: RadioBoxProps) {
  const uid = useId()
  const inputName = name ?? `radio-${uid}`

  return (
    <span
      className="radio"
      data-size={size}
      data-checked={checked ? 'true' : 'false'}
      data-disabled={disabled ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      data-invalid={invalid ? '' : undefined}
    >
      <input
        type="radio"
        className="radio__input"
        name={inputName}
        checked={checked}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        {...rest}
      />
      <span className="radio__control" aria-hidden="true">
        {checked && (
          <Icon name="circleSmallSolid" className="radio__icon" size={size === 'sm' ? 12 : 16} />
        )}
      </span>
    </span>
  )
}
