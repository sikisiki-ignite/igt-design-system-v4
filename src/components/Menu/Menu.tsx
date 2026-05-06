import { ReactNode } from 'react'
import './Menu.css'

export interface MenuProps {
  size?: 'sm' | 'md'
  children: ReactNode
}

export function Menu({ size = 'md', children }: MenuProps) {
  return (
    <div className="menu" data-size={size} role="menu">
      {children}
    </div>
  )
}
