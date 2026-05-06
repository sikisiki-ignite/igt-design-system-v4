import { ButtonHTMLAttributes, ReactNode } from 'react'
import './MenuItem.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../icons/icons'

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'neutral' | 'accent' | 'danger'
  size?: 'sm' | 'md'
  leadingIconName?: IconName
  trailingIconName?: IconName
  children: ReactNode
}

const ICON_SIZE = { sm: 14, md: 16 }

export function MenuItem({
  tone = 'neutral',
  size = 'md',
  leadingIconName,
  trailingIconName,
  disabled,
  children,
  ...rest
}: MenuItemProps) {
  const iconSize = ICON_SIZE[size]
  return (
    <button
      className="menu-item"
      data-tone={tone}
      data-size={size}
      disabled={disabled}
      role="menuitem"
      {...rest}
    >
      {leadingIconName && (
        <span className="menu-item__leading-icon" aria-hidden>
          <Icon name={leadingIconName} size={iconSize} />
        </span>
      )}
      <span className="menu-item__label">{children}</span>
      {trailingIconName && (
        <span className="menu-item__trailing-icon" aria-hidden>
          <Icon name={trailingIconName} size={iconSize} />
        </span>
      )}
    </button>
  )
}
