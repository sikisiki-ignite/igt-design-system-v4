import { useState, useRef, KeyboardEvent, ChangeEvent } from 'react'
import { InputChip } from '../Chip/Chip'
import './TagInput.css'

export interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  label?: string
  indicator?: 'required' | 'optional'
  size?: 'sm' | 'md' | 'lg'
  invalid?: boolean
  disabled?: boolean
  message?: string
  maxTags?: number
  tone?: 'neutral' | 'accent'
}

const chipSizeMap = { sm: 'xs', md: 'sm', lg: 'md' } as const

export function TagInput({
  tags,
  onChange,
  placeholder = '입력 후 Enter',
  label,
  indicator,
  size = 'lg',
  invalid,
  disabled,
  message,
  maxTags,
  tone = 'neutral',
}: TagInputProps) {
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const atMax = maxTags !== undefined && tags.length >= maxTags

  const addTag = (value: string) => {
    const trimmed = value.trim()
    if (!trimmed || tags.includes(trimmed) || atMax) return
    onChange([...tags, trimmed])
  }

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputVal)
      setInputVal('')
    } else if (e.key === 'Backspace' && inputVal === '') {
      removeTag(tags.length - 1)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val.endsWith(',')) {
      addTag(val.slice(0, -1))
      setInputVal('')
    } else {
      setInputVal(val)
    }
  }

  return (
    <div
      className="tag-input"
      data-size={size}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
    >
      {label && (
        <div className="tag-input__label-row">
          <span className="tag-input__label">{label}</span>
          {indicator === 'required' && (
            <span className="tag-input__indicator tag-input__indicator--required">*</span>
          )}
          {indicator === 'optional' && (
            <span className="tag-input__indicator tag-input__indicator--optional">(선택)</span>
          )}
        </div>
      )}
      <div
        className="tag-input__container"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag, i) => (
          <InputChip
            key={tag + i}
            label={tag}
            size={chipSizeMap[size]}
            tone={tone}
            disabled={disabled}
            onRemove={disabled ? undefined : () => removeTag(i)}
          />
        ))}
        <input
          ref={inputRef}
          className="tag-input__input"
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ''}
          disabled={disabled || atMax}
        />
      </div>
      {message && <p className="tag-input__message">{message}</p>}
    </div>
  )
}
