import { ReactNode } from 'react'
import './SideNavigation.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'

export interface SideNavItemData {
  id: string
  label: string
  icon?: IconName
  depth?: number
  disabled?: boolean
  children?: SideNavItemData[]
}

export interface SideNavigationProps {
  items: SideNavItemData[]
  activeId?: string
  onSelect?: (id: string) => void
  header?: string
  size?: 'sm' | 'md'
  tone?: 'neutral' | 'accent'
  className?: string
}

interface SideNavItemProps {
  item: SideNavItemData
  activeId?: string
  onSelect?: (id: string) => void
  size: 'sm' | 'md'
  tone: 'neutral' | 'accent'
}

function SideNavItem({ item, activeId, onSelect, size, tone }: SideNavItemProps) {
  const current = item.id === activeId
  const iconSize = size === 'sm' ? 14 : 16
  const depth = item.depth ?? 1
  const indentStyle = depth > 1
    ? { paddingLeft: `calc(var(--navigation-sideNavigation-navItem-size-spacing-paddingInline-${size}) + ${(depth - 1) * 16}px)` }
    : {}

  return (
    <>
      <button
        type="button"
        className="side-nav__item"
        data-current={current ? '' : undefined}
        data-tone={tone}
        disabled={item.disabled}
        onClick={() => !item.disabled && onSelect?.(item.id)}
        style={indentStyle}
        aria-current={current ? 'page' : undefined}
      >
        {item.icon && (
          <span className="side-nav__item-icon">
            <Icon name={item.icon} size={iconSize} aria-hidden />
          </span>
        )}
        <span className="side-nav__item-label">{item.label}</span>
      </button>
      {item.children?.map(child => (
        <SideNavItem
          key={child.id}
          item={{ ...child, depth: depth + 1 }}
          activeId={activeId}
          onSelect={onSelect}
          size={size}
          tone={tone}
        />
      ))}
    </>
  )
}

export function SideNavigation({
  items,
  activeId,
  onSelect,
  header,
  size = 'md',
  tone = 'neutral',
  className,
}: SideNavigationProps) {
  return (
    <nav
      className={['side-nav', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={tone}
    >
      {header && (
        <div className="side-nav__header">
          <span className="side-nav__header-text">{header}</span>
        </div>
      )}
      <div className="side-nav__list">
        {items.map(item => (
          <SideNavItem
            key={item.id}
            item={item}
            activeId={activeId}
            onSelect={onSelect}
            size={size}
            tone={tone}
          />
        ))}
      </div>
    </nav>
  )
}

