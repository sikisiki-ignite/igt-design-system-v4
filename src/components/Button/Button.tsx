import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'
import { LoadingDots } from '../LoadingDots/LoadingDots'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'primary' | 'secondary' | 'danger' | 'overlayDark'
  appearance?: 'fill' | 'outline'
  emphasis?: 'strong' | 'weak'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  iconOnly?: boolean
  isLoading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function Button({
  tone = 'primary',
  appearance = 'fill',
  emphasis = 'strong',
  size = 'md',
  iconOnly = false,
  isLoading = false,
  leadingIcon,
  trailingIcon,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={['btn', className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-appearance={appearance}
      data-emphasis={emphasis}
      data-size={size}
      data-icon-only={iconOnly || undefined}
      data-loading={isLoading || undefined}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          {leadingIcon && (
            <span className="btn-icon btn-icon--leading" aria-hidden>
              {leadingIcon}
            </span>
          )}
          {!iconOnly && (
            <span className="btn-label-wrap">
              <span className="btn-label">{children}</span>
            </span>
          )}
          {iconOnly && (
            <span className="btn-icon btn-icon--only" aria-hidden>
              {children}
            </span>
          )}
          {trailingIcon && !iconOnly && (
            <span className="btn-icon btn-icon--trailing" aria-hidden>
              {trailingIcon}
            </span>
          )}
        </>
      )}
      <span className="btn-focus-ring" aria-hidden />
    </button>
  )
}
