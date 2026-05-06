import { InputHTMLAttributes, useEffect, useRef } from 'react'
import { Icon } from '../Icon/Icon'
import './Checkbox.css'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'checked'> {
  checked?: boolean | 'indeterminate'
  size?: 'sm' | 'md'
  invalid?: boolean
  readOnly?: boolean
}

export function Checkbox({
  checked = false,
  size = 'md',
  disabled,
  readOnly,
  invalid,
  onChange,
  ...rest
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = checked === 'indeterminate'
    }
  }, [checked])

  const dataChecked = checked === true ? 'true' : checked === 'indeterminate' ? 'indeterminate' : 'false'

  return (
    <span
      className="checkbox"
      data-size={size}
      data-checked={dataChecked}
      data-disabled={disabled ? '' : undefined}
      data-readonly={readOnly ? '' : undefined}
      data-invalid={invalid ? '' : undefined}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="checkbox__input"
        checked={checked === true}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        {...rest}
      />
      <span className="checkbox__control" aria-hidden="true">
        {checked === true && (
          <Icon name="checkOutline3dp" className="checkbox__icon" size={size === 'sm' ? 12 : 16} />
        )}
        {checked === 'indeterminate' && (
          <Icon name="minusOutline25dp" className="checkbox__icon" size={size === 'sm' ? 12 : 16} />
        )}
      </span>
    </span>
  )
}
