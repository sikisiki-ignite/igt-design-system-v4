import { ButtonHTMLAttributes, ReactNode } from 'react'
import './ActionToggle.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../icons/icons'

export interface ActionToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  emphasis?: 'onDefault' | 'onSelect'
  selected?: boolean
  iconOnly?: boolean
  size?: 'xs' | 'sm' | 'md'
  iconName: IconName
  children?: ReactNode
}

const ICON_SIZE: Record<NonNullable<ActionToggleProps['size']>, number> = {
  xs: 12, sm: 14, md: 16,
}
const ICON_ONLY_SIZE: Record<NonNullable<ActionToggleProps['size']>, number> = {
  xs: 14, sm: 16, md: 20,
}

export function ActionToggle({
  emphasis = 'onDefault',
  selected = false,
  iconOnly = false,
  size = 'md',
  iconName,
  disabled,
  children,
  ...rest
}: ActionToggleProps) {
  const iconSize = iconOnly ? ICON_ONLY_SIZE[size] : ICON_SIZE[size]
  return (
    <button
      className="action-toggle"
      data-emphasis={emphasis}
      data-selected={selected ? 'true' : 'false'}
      data-icon-only={iconOnly ? 'true' : 'false'}
      data-size={size}
      disabled={disabled}
      aria-pressed={selected}
      {...rest}
    >
      <span className="action-toggle__icon" aria-hidden>
        <Icon name={iconName} size={iconSize} />
      </span>
      {!iconOnly && children && (
        <span className="action-toggle__label">{children}</span>
      )}
      <span className="action-toggle__focus-ring" aria-hidden />
    </button>
  )
}
