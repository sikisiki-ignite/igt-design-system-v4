import { HTMLAttributes, ReactNode } from 'react'
import './ButtonGroupAttached.css'

export interface ButtonGroupAttachedProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'soft' | 'outline'
  size?: 'xs' | 'sm' | 'md'
  children: ReactNode
}

export function ButtonGroupAttached({
  variant = 'soft',
  size = 'md',
  children,
  ...rest
}: ButtonGroupAttachedProps) {
  return (
    <div
      className="bga"
      data-variant={variant}
      data-size={size}
      role="group"
      {...rest}
    >
      {children}
    </div>
  )
}
