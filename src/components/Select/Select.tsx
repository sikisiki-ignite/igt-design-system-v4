import * as RadixSelect from '@radix-ui/react-select'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../../icons/icons'
import './Select.css'

const iconSizeMap = { xs: 12, sm: 14, md: 16 } as const

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  leadingIcon?: IconName
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  defaultValue?: string
  placeholder?: string
  appearance?: 'fill' | 'outline' | 'plain'
  size?: 'xs' | 'sm' | 'md'
  width?: 'fill' | 'hug'
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  onChange?: (value: string) => void
  className?: string
  id?: string
}

export function Select({
  options,
  value,
  defaultValue,
  placeholder = '선택',
  appearance = 'outline',
  size = 'md',
  width = 'hug',
  disabled = false,
  readOnly = false,
  invalid = false,
  onChange,
  className,
  id,
}: SelectProps) {
  const iconSize = iconSizeMap[size]
  const isControlled = value !== undefined

  return (
    <RadixSelect.Root
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onValueChange={readOnly || disabled ? undefined : onChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger
        id={id}
        className={['select', className].filter(Boolean).join(' ')}
        data-appearance={appearance}
        data-size={size}
        data-width={width}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        aria-invalid={invalid || undefined}
        tabIndex={readOnly ? -1 : undefined}
        asChild={false}
      >
        <span className="select__value">
          <RadixSelect.Value placeholder={placeholder} />
        </span>
        <RadixSelect.Icon className="select__icon" asChild>
          <Icon name="chevronDownOutline2dp" size={iconSize} aria-hidden />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          className="select__content"
          data-size={size}
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.Viewport className="select__viewport">
            {options.map(option => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="select__item"
                data-size={size}
              >
                {option.leadingIcon && (
                  <span className="select__item-leading">
                    <Icon name={option.leadingIcon} size={iconSize} aria-hidden />
                  </span>
                )}
                <RadixSelect.ItemText className="select__item-text">
                  {option.label}
                </RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="select__item-indicator">
                  <Icon name="checkOutline2dp" size={iconSize} aria-hidden />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
