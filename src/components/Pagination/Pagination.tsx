import './Pagination.css'
import { Icon } from '../Icon/Icon'

export interface PaginationProps {
  page: number
  total: number
  onChange: (page: number) => void
  variant?: 'default' | 'minimal'
  size?: 'sm' | 'md'
  siblingCount?: number
  className?: string
}

function getPageRange(page: number, total: number, siblingCount: number): (number | '…')[] {
  const delta = siblingCount + 1
  const left = Math.max(2, page - delta)
  const right = Math.min(total - 1, page + delta)
  const pages: (number | '…')[] = [1]
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < total - 1) pages.push('…')
  if (total > 1) pages.push(total)
  return pages
}

export function Pagination({
  page,
  total,
  onChange,
  variant = 'default',
  size = 'md',
  siblingCount = 1,
  className,
}: PaginationProps) {
  const prevDisabled = page <= 1
  const nextDisabled = page >= total
  const iconSize = size === 'sm' ? 20 : 24

  return (
    <nav
      aria-label="Pagination"
      className={['pagination', className].filter(Boolean).join(' ')}
      data-size={size}
    >
      {/* Prev container: << + < */}
      <div className="pagination__prev-container">
        <button
          className="pagination__arrow"
          onClick={() => onChange(1)}
          disabled={prevDisabled}
          aria-label="First page"
          type="button"
        >
          <Icon name="chevronDoubleLeftSmallOutline2dp" size={iconSize} aria-hidden />
        </button>
        <button
          className="pagination__arrow"
          onClick={() => onChange(page - 1)}
          disabled={prevDisabled}
          aria-label="Previous page"
          type="button"
        >
          <Icon name="chevronLeftSmallOutline2dp" size={iconSize} aria-hidden />
        </button>
      </div>

      {variant === 'minimal' ? (
        <span className="pagination__minimal-label" aria-current="page">
          {page}
          <span className="pagination__minimal-separator"> / </span>
          <span className="pagination__minimal-total">{total}</span>
        </span>
      ) : (
        getPageRange(page, total, siblingCount).map((item, idx) =>
          item === '…' ? (
            <span key={`ellipsis-${idx}`} className="pagination__ellipsis" aria-hidden>
              …
            </span>
          ) : (
            <button
              key={item}
              className="pagination__page"
              onClick={() => onChange(item)}
              aria-label={`Page ${item}`}
              aria-current={item === page ? 'page' : undefined}
              data-current={item === page ? '' : undefined}
              type="button"
            >
              {item}
            </button>
          )
        )
      )}

      {/* Next container: > + >> */}
      <div className="pagination__next-container">
        <button
          className="pagination__arrow"
          onClick={() => onChange(page + 1)}
          disabled={nextDisabled}
          aria-label="Next page"
          type="button"
        >
          <Icon name="chevronRightSmallOutline2dp" size={iconSize} aria-hidden />
        </button>
        <button
          className="pagination__arrow"
          onClick={() => onChange(total)}
          disabled={nextDisabled}
          aria-label="Last page"
          type="button"
        >
          <Icon name="chevronDoubleRightSmallOutline2dp" size={iconSize} aria-hidden />
        </button>
      </div>
    </nav>
  )
}
