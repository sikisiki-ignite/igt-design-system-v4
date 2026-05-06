import type { TextareaHTMLAttributes } from 'react'
import './TextArea.css'

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string
  indicator?: 'required' | 'optional'
  message?: string
  invalid?: boolean
  appearance?: 'outline' | 'fill'
  size?: 'md' | 'lg'
  rows?: number
  maxLength?: number
  showCount?: boolean
}

export function TextArea({
  label,
  indicator,
  message,
  invalid = false,
  appearance = 'outline',
  size = 'lg',
  rows = 4,
  maxLength,
  showCount = false,
  disabled,
  readOnly,
  value,
  className,
  id,
  ...textareaProps
}: TextAreaProps) {
  const fieldId = id ?? `ta-${Math.random().toString(36).slice(2)}`
  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <div
      className={['ta', className].filter(Boolean).join(' ')}
      data-appearance={appearance}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      {label && (
        <div className="ta__label-row">
          <label className="ta__label" htmlFor={fieldId}>{label}</label>
          {indicator === 'required' && <span className="ta__indicator ta__indicator--required" aria-hidden>*</span>}
          {indicator === 'optional' && <span className="ta__indicator ta__indicator--optional" aria-hidden>(선택)</span>}
        </div>
      )}

      <div className="ta__container">
        <textarea
          id={fieldId}
          className="ta__textarea"
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          aria-invalid={invalid || undefined}
          aria-describedby={message ? `${fieldId}-msg` : undefined}
          {...textareaProps}
        />
        {showCount && maxLength && (
          <div className="ta__count" aria-live="polite">
            {currentLength} / {maxLength}
          </div>
        )}
      </div>

      {message && (
        <p id={`${fieldId}-msg`} className="ta__message" role={invalid ? 'alert' : undefined}>
          {message}
        </p>
      )}
    </div>
  )
}
