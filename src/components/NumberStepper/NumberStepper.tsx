import { Icon } from '../Icon/Icon'
import './NumberStepper.css'

const iconSizeMap = { xs: 14, sm: 16, md: 20 } as const

export interface NumberStepperProps {
  value?: number
  min?: number
  max?: number
  step?: number
  emphasis?: 'outline' | 'soft'
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  onChange?: (value: number) => void
  'aria-label'?: string
}

export function NumberStepper({
  value = 0,
  min,
  max,
  step = 1,
  emphasis = 'soft',
  size = 'md',
  disabled = false,
  onChange,
  'aria-label': ariaLabel = '수량',
}: NumberStepperProps) {
  const atMin = min !== undefined && value <= min
  const atMax = max !== undefined && value >= max

  const decrement = () => {
    if (!atMin && !disabled) onChange?.(value - step)
  }
  const increment = () => {
    if (!atMax && !disabled) onChange?.(value + step)
  }

  const lock = atMin && atMax ? 'both' : atMin ? 'min' : atMax ? 'max' : 'none'

  return (
    <div
      className="stepper"
      data-emphasis={emphasis}
      data-size={size}
      data-lock={lock}
      data-disabled={disabled || undefined}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="stepper__btn stepper__btn--minus"
        onClick={decrement}
        disabled={disabled || atMin}
        aria-label="감소"
      >
        <Icon name="minusOutline2dp" size={iconSizeMap[size]} aria-hidden />
      </button>

      <div className="stepper__divider" />

      <output className="stepper__value" aria-live="polite">
        {value}
      </output>

      <div className="stepper__divider" />

      <button
        type="button"
        className="stepper__btn stepper__btn--plus"
        onClick={increment}
        disabled={disabled || atMax}
        aria-label="증가"
      >
        <Icon name="plusOutline2dp" size={iconSizeMap[size]} aria-hidden />
      </button>
    </div>
  )
}
