import React from 'react';
import './Badge.css';

type BadgeTone = 'neutral' | 'accent' | 'urgent';
type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  count: number;
  tone?: BadgeTone;
  size?: BadgeSize;
  max?: number;
  className?: string;
}

export function Badge({
  count,
  tone = 'urgent',
  size = 'lg',
  max = 99,
  className,
}: BadgeProps) {
  const label = count > max ? `${max}+` : String(count);

  return (
    <span
      className={['badge', className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-size={size}
      aria-label={`${count} notifications`}
    >
      {label}
    </span>
  );
}
