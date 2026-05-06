import type { ReactNode } from 'react'
import './Card.css'

export interface CardProps {
  variant?: 'bordered' | 'shadow'
  title?: string
  description?: string
  footer?: ReactNode
  children?: ReactNode
}

export interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
  delta?: string
  deltaType?: 'positive' | 'negative' | 'neutral'
}

export function Card({
  variant = 'bordered',
  title,
  description,
  footer,
  children,
}: CardProps) {
  return (
    <div className="card" data-variant={variant}>
      {(title || description) && (
        <div className="card__header">
          {title && <p className="card__title">{title}</p>}
          {description && <p className="card__description">{description}</p>}
        </div>
      )}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </div>
  )
}

export function KpiCard({
  label,
  value,
  unit,
  delta,
  deltaType = 'neutral',
}: KpiCardProps) {
  return (
    <div className="kpi-card">
      <p className="kpi-card__label">{label}</p>
      <p className="kpi-card__value">
        {value}
        {unit && <span className="kpi-card__unit">{unit}</span>}
      </p>
      {delta && (
        <p className="kpi-card__delta" data-type={deltaType}>{delta}</p>
      )}
    </div>
  )
}
