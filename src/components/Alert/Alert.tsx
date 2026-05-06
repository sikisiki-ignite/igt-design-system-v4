import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'
import './Alert.css'

const typeIconMap: Record<string, IconName> = {
  error:   'failureSolid',
  warning: 'warning',
  info:    'informationSolid',
  success: 'checkCircle',
  neutral: 'informationOutline2dp',
}

export interface AlertProps {
  type?: 'error' | 'warning' | 'info' | 'success' | 'neutral'
  title: string
  description?: string
  hasLeading?: boolean
  dismissible?: boolean
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Alert({
  type = 'error',
  title,
  description,
  hasLeading = true,
  dismissible = true,
  action,
  onDismiss,
  className,
}: AlertProps) {
  return (
    <div
      className={['alert', className].filter(Boolean).join(' ')}
      data-type={type}
      role="alert"
    >
      <div className="alert__content" data-multiline={description ? '' : undefined}>
        {hasLeading && (
          <span className="alert__icon" aria-hidden="true">
            <Icon name={typeIconMap[type]} size={20} />
          </span>
        )}
        <div className="alert__text">
          <span className="alert__title">{title}</span>
          {description && <span className="alert__description">{description}</span>}
        </div>
        {dismissible && (
          <button type="button" className="alert__dismiss" onClick={onDismiss} aria-label="닫기">
            <Icon name="xOutline2dp" size={16} aria-hidden />
          </button>
        )}
      </div>
      {action && <div className="alert__action">{action}</div>}
    </div>
  )
}
