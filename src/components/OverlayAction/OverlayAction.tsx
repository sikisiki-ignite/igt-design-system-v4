import { ButtonHTMLAttributes, ReactNode } from 'react'
import './OverlayAction.css'
import { LoadingDots } from '../LoadingDots/LoadingDots'

export interface OverlayActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  polarity?: 'dark' | 'light'
  size?: 'md' | 'sm' | 'xs'
  isLoading?: boolean
  children: ReactNode
}

export function OverlayAction({
  polarity = 'dark',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  ...rest
}: OverlayActionProps) {
  return (
    <button
      className="overlay-action"
      data-polarity={polarity}
      data-size={size}
      data-loading={isLoading || undefined}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <LoadingDots /> : <span className="overlay-action__icon">{children}</span>}
      <span className="overlay-action__focus-ring" aria-hidden />
    </button>
  )
}
