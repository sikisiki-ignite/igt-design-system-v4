import './Tab.css'

export interface TabItem {
  label: string
  count?: number
  disabled?: boolean
}

export interface TabProps {
  tabs: TabItem[]
  activeIndex?: number
  onTabChange?: (index: number) => void
  size?: 'sm' | 'md' | 'lg'
  distribution?: 'content' | 'equal'
  className?: string
}

export function Tab({
  tabs,
  activeIndex = 0,
  onTabChange,
  size = 'lg',
  distribution = 'content',
  className,
}: TabProps) {
  return (
    <div
      className={['tab', className].filter(Boolean).join(' ')}
      data-size={size}
      data-distribution={distribution}
      role="tablist"
    >
      {tabs.map((tab, idx) => {
        const selected = idx === activeIndex
        return (
          <button
            key={idx}
            role="tab"
            type="button"
            className="tab__item"
            aria-selected={selected}
            data-selected={selected ? '' : undefined}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && onTabChange?.(idx)}
          >
            <span className="tab__label">{tab.label}</span>
            {tab.count != null && (
              <span className="tab__count">{tab.count}</span>
            )}
            <span className="tab__indicator" aria-hidden />
          </button>
        )
      })}
      <div className="tab__track" aria-hidden />
    </div>
  )
}
