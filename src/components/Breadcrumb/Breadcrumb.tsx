import React from 'react'
import './Breadcrumb.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: (e: React.MouseEvent) => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: 'chevron' | 'slash' | 'dot'
  leading?: 'none' | 'home'
  onHomeClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const SEPARATOR_ICON: Record<NonNullable<BreadcrumbProps['separator']>, IconName> = {
  chevron: 'chevronRightOutline2dp',
  slash: 'chevronRightSmallOutline2dp',
  dot: 'circleTinySolid',
}

const SEPARATOR_SIZE: Record<NonNullable<BreadcrumbProps['separator']>, number> = {
  chevron: 14,
  slash: 14,
  dot: 6,
}

export function Breadcrumb({
  items,
  separator = 'chevron',
  leading = 'none',
  onHomeClick,
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={['breadcrumb', className].filter(Boolean).join(' ')}
    >
      {leading === 'home' && (
        <button
          type="button"
          className="breadcrumb__home"
          onClick={onHomeClick}
          aria-label="Home"
        >
          <Icon name="homeSolid" size={16} aria-hidden />
        </button>
      )}
      {items.map((item, idx) => {
        const showSeparator = idx > 0 || leading === 'home'
        const isCurrent = idx === items.length - 1

        return (
          <React.Fragment key={idx}>
            {showSeparator && (
              <span className="breadcrumb__separator" aria-hidden>
                <Icon
                  name={SEPARATOR_ICON[separator]}
                  size={SEPARATOR_SIZE[separator]}
                />
              </span>
            )}
            {isCurrent ? (
              <span
                className="breadcrumb__item breadcrumb__item--current"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : item.href != null ? (
              <a
                className="breadcrumb__item breadcrumb__item--link"
                href={item.href}
                onClick={item.onClick as React.MouseEventHandler<HTMLAnchorElement>}
              >
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                className="breadcrumb__item breadcrumb__item--link"
                onClick={item.onClick as React.MouseEventHandler<HTMLButtonElement>}
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
