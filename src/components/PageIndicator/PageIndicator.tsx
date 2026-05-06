import './PageIndicator.css'

/* ── dot variant ── */
export interface PageIndicatorDotProps {
  type: 'dot'
  count: number
  activeIndex?: number
  size?: 'sm' | 'md' | 'lg'
  appearance?: 'surface' | 'onImage'
  className?: string
}

/* ── text variant ── */
export interface PageIndicatorTextProps {
  type: 'text'
  page: number
  total: number
  size?: 'sm' | 'md'
  className?: string
}

export type PageIndicatorProps = PageIndicatorDotProps | PageIndicatorTextProps

export function PageIndicator(props: PageIndicatorProps) {
  if (props.type === 'text') {
    const { page, total, size = 'md', className } = props
    return (
      <div
        className={['page-indicator', 'page-indicator--text', className].filter(Boolean).join(' ')}
        data-size={size}
        aria-label={`${page} / ${total}`}
      >
        <span className="page-indicator__current">{page}</span>
        <span className="page-indicator__separator">/</span>
        <span className="page-indicator__total">{total}</span>
      </div>
    )
  }

  const { count, activeIndex = 0, size = 'lg', appearance = 'surface', className } = props
  return (
    <div
      className={['page-indicator', className].filter(Boolean).join(' ')}
      data-size={size}
      data-appearance={appearance}
      role="tablist"
      aria-label="Page indicator"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="page-indicator__dot"
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Page ${i + 1}`}
          {...(i === activeIndex ? { 'data-active': '' } : {})}
        />
      ))}
    </div>
  )
}
