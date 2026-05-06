import { AnchorHTMLAttributes, ReactNode } from 'react'
import './Link.css'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  tone?: 'brand' | 'neutral'
  underline?: 'always' | 'auto' | 'none'
  disabled?: boolean
  children: ReactNode
}

export function Link({
  tone = 'brand',
  underline = 'always',
  disabled,
  children,
  ...rest
}: LinkProps) {
  return (
    <a
      className="link"
      data-tone={tone}
      data-underline={underline}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...rest}
    >
      {children}
      <span className="link__focus-ring" aria-hidden />
    </a>
  )
}
