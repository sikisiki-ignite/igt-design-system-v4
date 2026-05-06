import type { ReactNode } from 'react'
import './StateView.css'

export interface StateViewProps {
  variant?: 'error' | 'empty'
  density?: 'standard' | 'compact'
  headline: string
  body?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function StateView({
  variant = 'error',
  density = 'standard',
  headline,
  body,
  icon,
  action,
  className,
}: StateViewProps) {
  return (
    <div
      className={['state-view', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-density={density}
    >
      {icon && <div className="state-view__icon">{icon}</div>}
      <div className="state-view__text">
        <div className="state-view__headline">
          <span className="state-view__heading">{headline}</span>
        </div>
        {body && (
          <div className="state-view__body">
            <span className="state-view__body-text">{body}</span>
          </div>
        )}
      </div>
      {action && (
        <div className="state-view__action">{action}</div>
      )}
    </div>
  )
}
