import React from 'react';
import { Badge } from '../src/components/Badge/Badge';

export function BadgeShowcase() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h2 style={{ margin: 0 }}>Badge (CountBadge)</h2>

      <section>
        <h3>Tone</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Badge count={5} tone="urgent" />
          <Badge count={5} tone="accent" />
          <Badge count={5} tone="neutral" />
        </div>
      </section>

      <section>
        <h3>Size</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Badge count={5} size="sm" />
          <Badge count={5} size="md" />
          <Badge count={5} size="lg" />
        </div>
      </section>

      <section>
        <h3>Count Overflow (max=99)</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Badge count={1} />
          <Badge count={9} />
          <Badge count={99} />
          <Badge count={100} />
          <Badge count={999} />
        </div>
      </section>

      <section>
        <h3>Tone × Size Grid</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 12, justifyContent: 'start' }}>
          {(['urgent', 'accent', 'neutral'] as const).map((tone) =>
            (['sm', 'md', 'lg'] as const).map((size) => (
              <Badge key={`${tone}-${size}`} count={12} tone={tone} size={size} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
