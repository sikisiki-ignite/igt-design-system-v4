import './LoadingDots.css'

export interface LoadingDotsProps {
  color?: string
}

export function LoadingDots({ color = 'currentColor' }: LoadingDotsProps) {
  return (
    <span className="loading-dots" aria-hidden>
      <span className="loading-dots__dot" style={{ color }} />
      <span className="loading-dots__dot" style={{ color }} />
      <span className="loading-dots__dot" style={{ color }} />
    </span>
  )
}
