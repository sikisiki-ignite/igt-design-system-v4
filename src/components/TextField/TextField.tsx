import type { InputHTMLAttributes, ReactNode } from 'react'
import type { IconName } from '../Icon/Icon'
import { Icon } from '../Icon/Icon'
import './TextField.css'

const iconSizeMap = { sm: 14, md: 16, lg: 18 } as const

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  indicator?: 'required' | 'optional'
  message?: string
  invalid?: boolean
  appearance?: 'outline' | 'fill'
  size?: 'sm' | 'md' | 'lg'
  prefixText?: string
  suffixText?: string
  leadingIcon?: IconName
  trailingIcon?: IconName
  trailingAction?: ReactNode
}

export function TextField({
  label,
  indicator,
  message,
  invalid = false,
  appearance = 'outline',
  size = 'lg',
  prefixText,
  suffixText,
  leadingIcon,
  trailingIcon,
  trailingAction,
  disabled,
  readOnly,
  className,
  id,
  ...inputProps
}: TextFieldProps) {
  const fieldId = id ?? `tf-${Math.random().toString(36).slice(2)}`

  return (
    <div
      className={['tf', className].filter(Boolean).join(' ')}
      data-appearance={appearance}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      {label && (
        <div className="tf__label-row">
          <label className="tf__label" htmlFor={fieldId}>{label}</label>
          {indicator === 'required' && <span className="tf__indicator tf__indicator--required" aria-hidden>*</span>}
          {indicator === 'optional' && <span className="tf__indicator tf__indicator--optional" aria-hidden>(선택)</span>}
        </div>
      )}

      <div className="tf__container">
        {leadingIcon && (
          <Icon name={leadingIcon} className="tf__icon tf__icon--leading" size={iconSizeMap[size]} aria-hidden />
        )}
        {prefixText && <span className="tf__prefix">{prefixText}</span>}

        <input
          id={fieldId}
          className="tf__input"
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? `${fieldId}-msg` : undefined}
          {...inputProps}
        />

        {suffixText && <span className="tf__suffix">{suffixText}</span>}
        {trailingIcon && (
          <Icon name={trailingIcon} className="tf__icon tf__icon--trailing" size={iconSizeMap[size]} aria-hidden />
        )}
        {trailingAction && <div className="tf__trailing-action">{trailingAction}</div>}
      </div>

      {message && (
        <p id={`${fieldId}-msg`} className="tf__message" role={invalid ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  )
}
