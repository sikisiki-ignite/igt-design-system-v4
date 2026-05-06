import React from 'react';
import './Avatar.css';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type AvatarShape = 'circle' | 'rounded';
type AvatarStatus = 'active' | 'attention' | 'inactive' | 'error';
type AvatarSurfaceContext =
  | 'backgroundBase'
  | 'backgroundSubtle'
  | 'surfaceBase'
  | 'surfaceRaised'
  | 'surfaceOverlay';

export interface AvatarProps {
  size?: AvatarSize;
  shape?: AvatarShape;
  src?: string;
  alt?: string;
  initials?: string;
  statusBadge?: boolean;
  status?: AvatarStatus;
  surfaceContext?: AvatarSurfaceContext;
  className?: string;
}

function AvatarContent({
  src,
  alt,
  initials,
}: Pick<AvatarProps, 'src' | 'alt' | 'initials'>) {
  if (src) {
    return <img className="avatar__image" src={src} alt={alt ?? ''} />;
  }
  if (initials) {
    return (
      <span className="avatar__initials" aria-label={initials}>
        {initials}
      </span>
    );
  }
  return (
    <svg
      className="avatar__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path
        d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Avatar({
  size = 'xl',
  shape = 'circle',
  src,
  alt,
  initials,
  statusBadge = false,
  status = 'active',
  surfaceContext = 'backgroundBase',
  className,
}: AvatarProps) {
  return (
    <div
      className={['avatar', className].filter(Boolean).join(' ')}
      data-size={size}
      data-shape={shape}
      data-surface-context={surfaceContext}
    >
      <div className="avatar__container">
        <AvatarContent src={src} alt={alt} initials={initials} />
      </div>
      {statusBadge && (
        <span
          className="avatar__status"
          data-status={status}
          role="status"
          aria-label={status}
        />
      )}
    </div>
  );
}
