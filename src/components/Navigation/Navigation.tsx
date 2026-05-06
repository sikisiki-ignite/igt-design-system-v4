import { ReactNode } from 'react'
import './Navigation.css'

export interface NavigationProps {
  size?: 'sm' | 'md'
  scrolled?: boolean
  layoutMode?: 'narrow' | 'wide' | 'full'
  logo?: ReactNode
  navItems?: ReactNode
  center?: ReactNode
  trailing?: ReactNode
  className?: string
}

export function Navigation({
  size = 'sm',
  scrolled = false,
  layoutMode = 'full',
  logo,
  navItems,
  center,
  trailing,
  className,
}: NavigationProps) {
  return (
    <header
      className={['navigation', className].filter(Boolean).join(' ')}
      data-size={size}
      data-layout={layoutMode}
      data-scrolled={scrolled ? '' : undefined}
    >
      <div className="navigation__content">
        <div className="navigation__leading">
          {logo && <div className="navigation__logo">{logo}</div>}
          {navItems && <nav className="navigation__nav">{navItems}</nav>}
        </div>
        {center && <div className="navigation__center">{center}</div>}
        {trailing && <div className="navigation__trailing">{trailing}</div>}
      </div>
    </header>
  )
}

export interface NavItemProps {
  label: string
  href?: string
  current?: boolean
  onClick?: () => void
}

export function NavItem({ label, href, current, onClick }: NavItemProps) {
  const cls = ['navigation__nav-item', current ? 'navigation__nav-item--current' : ''].filter(Boolean).join(' ')
  if (href) {
    return (
      <a className={cls} href={href} aria-current={current ? 'page' : undefined}>
        {label}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick} aria-current={current ? 'page' : undefined}>
      {label}
    </button>
  )
}
