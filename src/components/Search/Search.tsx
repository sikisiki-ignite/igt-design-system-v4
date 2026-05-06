import type { InputHTMLAttributes } from 'react'
import { Icon } from '../Icon/Icon'
import './Search.css'

const iconSizeMap = { sm: 14, md: 16, lg: 18 } as const

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  appearance?: 'outline' | 'fill'
  size?: 'sm' | 'md' | 'lg'
  invalid?: boolean
  onClear?: () => void
  onSearch?: (value: string) => void
}

export function Search({
  appearance = 'fill',
  size = 'lg',
  invalid = false,
  disabled,
  readOnly,
  value,
  placeholder = '검색',
  onClear,
  onSearch,
  onChange,
  onKeyDown,
  className,
  ...inputProps
}: SearchProps) {
  const hasValue = !!value

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) onSearch(value as string)
    onKeyDown?.(e)
  }

  return (
    <div
      className={['search', className].filter(Boolean).join(' ')}
      data-appearance={appearance}
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      <Icon name="searchOutline2dp" className="search__icon" size={iconSizeMap[size]} aria-hidden />

      <input
        type="search"
        className="search__input"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        aria-invalid={invalid || undefined}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        {...inputProps}
      />

      {hasValue && onClear && !disabled && !readOnly && (
        <button
          type="button"
          className="search__clear"
          onClick={onClear}
          aria-label="검색어 지우기"
          tabIndex={-1}
        >
          <Icon name="xCircleSolid" size={iconSizeMap[size]} aria-hidden />
        </button>
      )}
    </div>
  )
}
