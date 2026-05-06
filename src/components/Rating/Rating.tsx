import { useState } from 'react'
import { Icon } from '../Icon/Icon'
import './Rating.css'

const iconSizeMap = { xs: 24, sm: 28, md: 32 } as const

export interface RatingProps {
  value?: number
  max?: number
  size?: 'xs' | 'sm' | 'md'
  disabled?: boolean
  readOnly?: boolean
  onChange?: (value: number) => void
  'aria-label'?: string
}

export function Rating({
  value = 0,
  max = 5,
  size = 'md',
  disabled = false,
  readOnly = false,
  onChange,
  'aria-label': ariaLabel = '별점',
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const isInteractive = !disabled && !readOnly && !!onChange

  const displayValue = hovered !== null && isInteractive ? hovered : value

  return (
    <div
      className="rating"
      data-size={size}
      data-disabled={disabled || undefined}
      data-hovering={hovered !== null && isInteractive ? true : undefined}
      role="group"
      aria-label={ariaLabel}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1
        const filled = starValue <= displayValue

        return (
          <button
            key={i}
            type="button"
            className="rating__star"
            data-filled={filled || undefined}
            disabled={disabled}
            onClick={isInteractive ? () => onChange?.(starValue) : undefined}
            onMouseEnter={isInteractive ? () => setHovered(starValue) : undefined}
            onMouseLeave={isInteractive ? () => setHovered(null) : undefined}
            aria-label={`${starValue}점`}
            aria-pressed={filled}
            tabIndex={readOnly ? -1 : undefined}
          >
            <Icon
              name={filled ? 'starRounded' : 'starRoundedOutline2dp'}
              size={iconSizeMap[size]}
              aria-hidden
            />
          </button>
        )
      })}
    </div>
  )
}
