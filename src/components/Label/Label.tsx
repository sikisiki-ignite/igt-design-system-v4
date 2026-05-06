import React from 'react';
import './Label.css';

type LabelSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LabelTone = 'soft' | 'outline';
type LabelColor = 'grey' | 'yellow' | 'green' | 'teal' | 'blue' | 'red' | 'purple' | 'orange';

export interface LabelProps {
  children: React.ReactNode;
  size?: LabelSize;
  tone?: LabelTone;
  color?: LabelColor;
  leadingIcon?: React.ReactNode;
  className?: string;
}

export function Label({
  children,
  size = 'xl',
  tone = 'soft',
  color = 'grey',
  leadingIcon,
  className,
}: LabelProps) {
  return (
    <span
      className={['label', className].filter(Boolean).join(' ')}
      data-size={size}
      data-tone={tone}
      data-color={color}
    >
      {leadingIcon && (
        <span className="label__icon" aria-hidden="true">
          {leadingIcon}
        </span>
      )}
      <span className="label__text">{children}</span>
    </span>
  );
}
