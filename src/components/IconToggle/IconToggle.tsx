import { ButtonHTMLAttributes } from 'react'
import './IconToggle.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../icons/icons'

export interface IconToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: 'reaction' | 'accent' | 'neutral'
  selected?: boolean
  size?: 'xs' | 'sm' | 'md'
  iconName: IconName
}

const ICON_SIZE: Record<NonNullable<IconToggleProps['size']>, number> = {
  xs: 14, sm: 16, md: 20,
}

export function IconToggle({
  intent = 'reaction',
  selected = false,
  size = 'md',
  iconName,
  disabled,
  ...rest
}: IconToggleProps) {
  return (
    <button
      className="icon-toggle"
      data-intent={intent}
      data-selected={selected ? 'true' : 'false'}
      data-size={size}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      <span className="icon-toggle__icon" aria-hidden>
        <Icon name={iconName} size={ICON_SIZE[size]} />
      </span>
      <span className="icon-toggle__focus-ring" aria-hidden />
    </button>
  )
}
