import { ButtonHTMLAttributes } from 'react'
import './ArrowControl.css'
import { Icon, IconName } from '../Icon/Icon'

export interface ArrowControlProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'prev' | 'next'
  variant?: 'surfaceFill' | 'surfaceOutline' | 'overlayLight' | 'overlayDark'
  size?: 'xs' | 'sm' | 'md'
}

const ICON_SIZE: Record<NonNullable<ArrowControlProps['size']>, number> = {
  xs: 14,
  sm: 16,
  md: 20,
}

const ICON_NAME: Record<NonNullable<ArrowControlProps['direction']>, IconName> = {
  prev: 'monoChevronLeft',
  next: 'monoChevronRight',
}

export function ArrowControl({
  direction = 'prev',
  variant = 'surfaceFill',
  size = 'md',
  disabled,
  ...rest
}: ArrowControlProps) {
  return (
    <button
      className="arrow-control"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      disabled={disabled}
      {...rest}
    >
      <span className="arrow-control__icon" aria-hidden>
        <Icon name={ICON_NAME[direction]} size={ICON_SIZE[size]} />
      </span>
      <span className="arrow-control__focus-ring" aria-hidden />
    </button>
  )
}
