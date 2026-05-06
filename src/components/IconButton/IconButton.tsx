import { ButtonHTMLAttributes, ReactNode } from 'react'
import './IconButton.css'
import { LoadingDots } from '../LoadingDots/LoadingDots'

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: 'primary' | 'neutral'
  appearance?: 'fill' | 'outline'
  emphasis?: 'strong' | 'weak'
  size?: 'md' | 'sm' | 'xs'
  shape?: 'rounded' | 'circle'
  isLoading?: boolean
  children: ReactNode
}

export function IconButton({
  tone = 'neutral',
  appearance = 'outline',
  emphasis = 'strong',
  size = 'md',
  shape = 'rounded',
  isLoading = false,
  disabled,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      className="icon-btn"
      data-tone={tone}
      data-appearance={appearance}
      data-emphasis={emphasis}
      data-size={size}
      data-shape={shape}
      data-loading={isLoading || undefined}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <LoadingDots /> : <span className="icon-btn__icon">{children}</span>}
      <span className="icon-btn__focus-ring" aria-hidden />
    </button>
  )
}
