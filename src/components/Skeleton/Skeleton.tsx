import './Skeleton.css'

export interface SkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  width?: string
  className?: string
}

export function Skeleton({
  size = 'xl',
  width,
  className,
}: SkeletonProps) {
  return (
    <div
      className={['skeleton', className].filter(Boolean).join(' ')}
      data-size={size}
      style={width ? { width } : undefined}
      aria-hidden="true"
    />
  )
}
