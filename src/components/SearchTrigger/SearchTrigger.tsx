import { ButtonHTMLAttributes } from 'react'
import './SearchTrigger.css'
import { Icon } from '../Icon/Icon'

export interface SearchTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'field' | 'icon'
  appearance?: 'default' | 'subtle'
  size?: 'sm' | 'md'
  placeholder?: string
}

const ICON_SIZE: Record<NonNullable<SearchTriggerProps['size']>, number> = {
  sm: 14,
  md: 16,
}

export function SearchTrigger({
  variant = 'field',
  appearance = 'default',
  size = 'md',
  placeholder = '여기를 눌러 검색하세요',
  disabled,
  ...rest
}: SearchTriggerProps) {
  return (
    <button
      className="search-trigger"
      data-variant={variant}
      data-appearance={appearance}
      data-size={size}
      disabled={disabled}
      {...rest}
    >
      <span className="search-trigger__icon" aria-hidden>
        <Icon name="monoSearch" size={ICON_SIZE[size]} />
      </span>
      {variant === 'field' && (
        <span className="search-trigger__placeholder">{placeholder}</span>
      )}
      <span className="search-trigger__focus-ring" aria-hidden />
    </button>
  )
}
