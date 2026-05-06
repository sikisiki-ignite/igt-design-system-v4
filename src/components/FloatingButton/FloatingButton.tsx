import { ButtonHTMLAttributes } from 'react'
import './FloatingButton.css'
import { LoadingDots } from '../LoadingDots/LoadingDots'
import { Icon, IconName } from '../Icon/Icon'

export interface FloatingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'icon' | 'extended'
  priority?: 'primaryFill' | 'secondaryFill' | 'secondaryOutline'
  size?: 'lg' | 'md'
  iconName: IconName
  isLoading?: boolean
  children?: string
}

const ICON_SIZE: Record<NonNullable<FloatingButtonProps['size']>, number> = {
  lg: 24,
  md: 20,
}

export function FloatingButton({
  variant = 'icon',
  priority = 'primaryFill',
  size = 'lg',
  iconName,
  isLoading = false,
  disabled,
  children,
  ...rest
}: FloatingButtonProps) {
  return (
    <button
      className="fab"
      data-variant={variant}
      data-priority={priority}
      data-size={size}
      data-loading={isLoading || undefined}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <LoadingDots />
      ) : (
        <>
          <span className="fab__icon" aria-hidden>
            <Icon name={iconName} size={ICON_SIZE[size]} />
          </span>
          {variant === 'extended' && children && (
            <span className="fab__label">{children}</span>
          )}
        </>
      )}
      <span className="fab__focus-ring" aria-hidden />
    </button>
  )
}
