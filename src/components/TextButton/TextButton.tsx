import { ButtonHTMLAttributes, ReactNode } from 'react'
import './TextButton.css'
import { Icon, IconName } from '../Icon/Icon'

export interface TextButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'chevron' | 'underline' | 'plain'
  tone?: 'neutral' | 'neutralMuted' | 'accent' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  leadingIconName?: IconName
  children: ReactNode
}

const ICON_SIZE: Record<NonNullable<TextButtonProps['size']>, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
}

export function TextButton({
  variant = 'chevron',
  tone = 'neutral',
  size = 'lg',
  leadingIconName,
  disabled,
  children,
  ...rest
}: TextButtonProps) {
  const iconSize = ICON_SIZE[size]
  return (
    <button
      className="text-btn"
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      disabled={disabled}
      {...rest}
    >
      {leadingIconName && (
        <span className="text-btn__leading-icon" aria-hidden>
          <Icon name={leadingIconName} size={iconSize} />
        </span>
      )}
      <span className="text-btn__label-trailing">
        <span className="text-btn__label">{children}</span>
        {variant === 'chevron' && (
          <span className="text-btn__trailing-icon" aria-hidden>
            <Icon name="monoChevronRight" size={iconSize} />
          </span>
        )}
      </span>
      <span className="text-btn__focus-ring" aria-hidden />
    </button>
  )
}
