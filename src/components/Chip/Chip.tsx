import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import type { IconName } from '../Icon/Icon'
import { Icon } from '../Icon/Icon'
import './Chip.css'

const iconSizeMap = { xs: 12, sm: 14, md: 16 } as const
type ChipSize = 'xs' | 'sm' | 'md'

// ── ActionChip ──────────────────────────────────────────────────────────────

export interface ActionChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ChipSize
  label: string
  leadingIcon?: IconName
  trailingIcon?: IconName
}

export function ActionChip({
  size = 'md',
  label,
  leadingIcon,
  trailingIcon,
  className,
  ...props
}: ActionChipProps) {
  return (
    <button
      className={['chip chip--action', className].filter(Boolean).join(' ')}
      data-size={size}
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="chip__icon" size={iconSizeMap[size]} aria-hidden />
      )}
      <span className="chip__label">{label}</span>
      {trailingIcon && (
        <Icon name={trailingIcon} className="chip__icon chip__icon--trailing" size={iconSizeMap[size]} aria-hidden />
      )}
    </button>
  )
}

// ── ChoiceChip ───────────────────────────────────────────────────────────────

export interface ChoiceChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ChipSize
  label: string
  selected?: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
}

export function ChoiceChip({
  size = 'md',
  label,
  selected = false,
  leadingIcon,
  trailingIcon,
  className,
  ...props
}: ChoiceChipProps) {
  return (
    <button
      className={['chip chip--choice', className].filter(Boolean).join(' ')}
      data-size={size}
      data-selected={selected || undefined}
      aria-pressed={selected}
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="chip__icon" size={iconSizeMap[size]} aria-hidden />
      )}
      <span className="chip__label">{label}</span>
      {trailingIcon && (
        <Icon name={trailingIcon} className="chip__icon chip__icon--trailing" size={iconSizeMap[size]} aria-hidden />
      )}
    </button>
  )
}

// ── FilterChip ───────────────────────────────────────────────────────────────

export interface FilterChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ChipSize
  label: string
  value?: string
  selected?: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
}

export function FilterChip({
  size = 'md',
  label,
  value,
  selected = false,
  leadingIcon,
  trailingIcon,
  className,
  ...props
}: FilterChipProps) {
  return (
    <button
      className={['chip chip--filter', className].filter(Boolean).join(' ')}
      data-size={size}
      data-selected={selected || undefined}
      aria-pressed={selected}
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="chip__icon" size={iconSizeMap[size]} aria-hidden />
      )}
      <span className="chip__label">{label}</span>
      {value && <span className="chip__value">{value}</span>}
      {trailingIcon && (
        <Icon name={trailingIcon} className="chip__icon chip__icon--trailing" size={iconSizeMap[size]} aria-hidden />
      )}
    </button>
  )
}

// ── InputChip ────────────────────────────────────────────────────────────────

export interface InputChipProps extends HTMLAttributes<HTMLDivElement> {
  size?: ChipSize
  label: string
  tone?: 'neutral' | 'accent'
  leadingIcon?: IconName
  disabled?: boolean
  onRemove?: () => void
}

export function InputChip({
  size = 'md',
  label,
  tone = 'neutral',
  leadingIcon,
  disabled,
  onRemove,
  className,
  ...props
}: InputChipProps) {
  return (
    <div
      className={['chip chip--input', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={tone}
      data-disabled={disabled || undefined}
      role="group"
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="chip__icon" size={iconSizeMap[size]} aria-hidden />
      )}
      <span className="chip__label">{label}</span>
      {onRemove && (
        <button
          className="chip__remove"
          onClick={onRemove}
          disabled={disabled}
          aria-label="Remove"
          type="button"
          tabIndex={disabled ? -1 : 0}
        >
          <Icon name="xOutline2dp" className="chip__remove-icon" size={iconSizeMap[size]} aria-hidden />
        </button>
      )}
    </div>
  )
}

// ── MetaChip ─────────────────────────────────────────────────────────────────

export interface MetaChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ChipSize
  label: string
  value?: string
  leadingIcon?: IconName
}

export function MetaChip({
  size = 'md',
  label,
  value,
  leadingIcon,
  className,
  ...props
}: MetaChipProps) {
  return (
    <button
      className={['chip chip--meta', className].filter(Boolean).join(' ')}
      data-size={size}
      {...props}
    >
      {leadingIcon && (
        <Icon name={leadingIcon} className="chip__icon" size={iconSizeMap[size]} aria-hidden />
      )}
      <span className="chip__label">{label}</span>
      {value && <span className="chip__value">{value}</span>}
    </button>
  )
}

// ── ChipGroup ─────────────────────────────────────────────────────────────────

export interface ChipGroupProps extends HTMLAttributes<HTMLDivElement> {
  layout?: 'wrap' | 'scroll'
  size?: ChipSize
}

export function ChipGroup({
  layout = 'wrap',
  size = 'md',
  className,
  children,
  ...props
}: ChipGroupProps) {
  return (
    <div
      className={['chip-group', className].filter(Boolean).join(' ')}
      data-layout={layout}
      data-size={size}
      {...props}
    >
      {children}
    </div>
  )
}

// ── Legacy alias ─────────────────────────────────────────────────────────────

/** @deprecated Use ActionChip, ChoiceChip, FilterChip, InputChip, or MetaChip */
export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'action' | 'filter'
  size?: ChipSize
  selected?: boolean
  leadingIcon?: IconName
  trailingIcon?: IconName
  label: string
}

/** @deprecated Use the specific chip component instead */
export function Chip({
  variant = 'action',
  size = 'md',
  selected = false,
  disabled,
  leadingIcon,
  trailingIcon,
  label,
  className,
  ...props
}: ChipProps) {
  if (variant === 'filter') {
    return (
      <ChoiceChip
        size={size}
        label={label}
        selected={selected}
        leadingIcon={leadingIcon}
        trailingIcon={trailingIcon}
        disabled={disabled}
        className={className}
        {...props}
      />
    )
  }
  return (
    <ActionChip
      size={size}
      label={label}
      leadingIcon={leadingIcon}
      trailingIcon={trailingIcon}
      disabled={disabled}
      className={className}
      {...props}
    />
  )
}
