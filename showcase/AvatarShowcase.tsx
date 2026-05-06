import React from 'react';
import { Avatar } from '../src/components/Avatar/Avatar';

export function AvatarShowcase() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h2 style={{ margin: 0 }}>Avatar</h2>

      {/* Size × Content */}
      <section>
        <h3>Size — Image</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Avatar key={size} size={size} src="https://i.pravatar.cc/150" alt="User" />
          ))}
        </div>
      </section>

      <section>
        <h3>Size — Initials</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Avatar key={size} size={size} initials="HG" />
          ))}
        </div>
      </section>

      <section>
        <h3>Size — Icon (default)</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Avatar key={size} size={size} />
          ))}
        </div>
      </section>

      {/* Shape */}
      <section>
        <h3>Shape</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <Avatar size="xl" shape="circle" initials="AB" />
          <Avatar size="xl" shape="rounded" initials="AB" />
        </div>
      </section>

      {/* Status */}
      <section>
        <h3>Status Badge</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          {(['active', 'attention', 'inactive', 'error'] as const).map((status) => (
            <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Avatar size="xl" initials="HG" statusBadge status={status} />
              <span style={{ fontSize: 11 }}>{status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Status badge sizes */}
      <section>
        <h3>Status Badge — All Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Avatar key={size} size={size} initials="HG" statusBadge status="active" />
          ))}
        </div>
      </section>

      {/* Surface context */}
      <section>
        <h3>Surface Context (분리 링 색상)</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          {(['backgroundBase', 'surfaceBase', 'surfaceRaised', 'surfaceOverlay'] as const).map((ctx) => (
            <div key={ctx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Avatar size="xl" initials="AB" statusBadge status="active" surfaceContext={ctx} />
              <span style={{ fontSize: 10 }}>{ctx}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
