import { HTMLAttributes, ReactNode } from 'react'
import './ButtonGroup.css'

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'lg' | 'md' | 'sm' | 'xs'
  direction?: 'horizontal' | 'vertical'
  distribution?: 'content' | 'equal'
  children: ReactNode
}

export function ButtonGroup({
  size = 'lg',
  direction = 'horizontal',
  distribution = 'content',
  children,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      className="btn-group"
      data-size={size}
      data-direction={direction}
      data-distribution={distribution}
      role="group"
      {...rest}
    >
      {children}
    </div>
  )
}
