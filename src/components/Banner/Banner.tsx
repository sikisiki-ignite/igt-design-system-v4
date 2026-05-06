import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'
import './Banner.css'

const typeIconMap: Record<string, IconName> = {
  error:   'failureSolid',
  warning: 'warning',
  info:    'informationSolid',
  success: 'checkCircle',
}

export interface BannerProps {
  type?: 'error' | 'warning' | 'info' | 'success'
  variant?: 'subtle' | 'solid'
  title: string
  description?: string
  dismissible?: boolean
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Banner({
  type = 'error',
  variant = 'subtle',
  title,
  description,
  dismissible = true,
  action,
  onDismiss,
  className,
}: BannerProps) {
  return (
    <div
      className={['banner', className].filter(Boolean).join(' ')}
      data-type={type}
      data-variant={variant}
      role="alert"
    >
      <div className="banner__content" data-multiline={description ? '' : undefined}>
        <span className="banner__icon" aria-hidden="true">
          <Icon name={typeIconMap[type]} size={20} />
        </span>
        <div className="banner__stack">
          <div className="banner__text">
            <span className="banner__title">{title}</span>
            {description && <span className="banner__description">{description}</span>}
          </div>
          {action && <div className="banner__action">{action}</div>}
        </div>
        {dismissible && (
          <button type="button" className="banner__dismiss" onClick={onDismiss} aria-label="닫기">
            <Icon name="xOutline2dp" size={16} aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}
