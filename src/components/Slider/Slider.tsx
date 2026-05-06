import * as RadixSlider from '@radix-ui/react-slider'
import type { IconName } from '../Icon/Icon'
import { Icon } from '../Icon/Icon'
import './Slider.css'

export interface SliderProps {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
  onChange?: (value: number) => void
  'aria-label'?: string
}

export function Slider({
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  leadingIcon,
  trailingIcon,
  onChange,
  'aria-label': ariaLabel = '슬라이더',
}: SliderProps) {
  const controlled = value !== undefined
  const iconSize = 14

  return (
    <div
      className="slider-wrap"
      data-disabled={disabled || undefined}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="slider-wrap__icon" size={iconSize} aria-hidden />
      )}

      <RadixSlider.Root
        className="slider"
        value={controlled ? [value!] : undefined}
        defaultValue={controlled ? undefined : [defaultValue]}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={([v]) => onChange?.(v)}
        aria-label={ariaLabel}
      >
        <RadixSlider.Track className="slider__track">
          <RadixSlider.Range className="slider__range" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className="slider__thumb" />
      </RadixSlider.Root>

      {trailingIcon && (
        <Icon name={trailingIcon} className="slider-wrap__icon" size={iconSize} aria-hidden />
      )}
    </div>
  )
}
