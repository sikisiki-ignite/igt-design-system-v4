import './SegmentControl.css'
import { Icon } from '../Icon/Icon'
import type { IconName } from '../Icon/Icon'

export interface SegmentItem {
  label?: string
  icon?: IconName
  disabled?: boolean
}

export interface SegmentControlProps {
  segments: SegmentItem[]
  activeIndex?: number
  onSegmentChange?: (index: number) => void
  size?: 'xs' | 'sm' | 'md'
  width?: 'content' | 'equal'
  content?: 'text' | 'iconText' | 'icon'
  className?: string
}

const ICON_SIZE: Record<NonNullable<SegmentControlProps['size']>, number> = {
  xs: 16,
  sm: 20,
  md: 20,
}

export function SegmentControl({
  segments,
  activeIndex = 0,
  onSegmentChange,
  size = 'md',
  width = 'content',
  content = 'text',
  className,
}: SegmentControlProps) {
  return (
    <div
      className={['segment-control', className].filter(Boolean).join(' ')}
      data-size={size}
      data-width={width}
      role="tablist"
    >
      {segments.map((seg, idx) => {
        const selected = idx === activeIndex
        return (
          <button
            key={idx}
            role="tab"
            type="button"
            className="segment-control__item"
            aria-selected={selected}
            data-selected={selected ? '' : undefined}
            disabled={seg.disabled}
            onClick={() => !seg.disabled && onSegmentChange?.(idx)}
          >
            {(content === 'iconText' || content === 'icon') && seg.icon && (
              <Icon name={seg.icon} size={ICON_SIZE[size]} aria-hidden />
            )}
            {(content === 'text' || content === 'iconText') && seg.label && (
              <span className="segment-control__label">{seg.label}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
