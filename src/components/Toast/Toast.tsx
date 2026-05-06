import type { ReactNode } from 'react'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'
import './Toast.css'

const typeIconMap: Record<string, IconName> = {
  error:   'failureSolid',
  warning: 'warning',
  info:    'informationSolid',
  success: 'checkCircle',
  neutral: 'informationOutline2dp',
}

export interface ToastProps {
  type?: 'error' | 'warning' | 'info' | 'success' | 'neutral'
  dismissible?: boolean
  message: string
  action?: ReactNode
  onDismiss?: () => void
  className?: string
}

export function Toast({
  type = 'neutral',
  dismissible = false,
  message,
  action,
  onDismiss,
  className,
}: ToastProps) {
  return (
    <div
      className={['toast', className].filter(Boolean).join(' ')}
      data-type={type}
      role="status"
      aria-live="polite"
    >
      <div className="toast__content">
        <span className="toast__icon" aria-hidden="true">
          <Icon name={typeIconMap[type]} size={20} />
        </span>
        <div className="toast__text">
          <span className="toast__message">{message}</span>
        </div>
        {action && <div className="toast__action">{action}</div>}
        {dismissible && (
          <button type="button" className="toast__dismiss" onClick={onDismiss} aria-label="닫기">
            <Icon name="xOutline2dp" size={16} aria-hidden />
          </button>
        )}
      </div>
    </div>
  )
}
