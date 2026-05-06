import React from 'react';
import { Label } from '../src/components/Label/Label';

const COLORS = ['grey', 'yellow', 'green', 'teal', 'blue', 'red', 'purple', 'orange'] as const;

export function LabelShowcase() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h2 style={{ margin: 0 }}>Label</h2>

      <section>
        <h3>Tone — soft</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((color) => (
            <Label key={color} color={color} tone="soft">
              {color}
            </Label>
          ))}
        </div>
      </section>

      <section>
        <h3>Tone — outline</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.map((color) => (
            <Label key={color} color={color} tone="outline">
              {color}
            </Label>
          ))}
        </div>
      </section>

      <section>
        <h3>Size (grey/soft)</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <Label key={size} size={size} color="grey" tone="soft">
              {size}
            </Label>
          ))}
        </div>
      </section>

      <section>
        <h3>With Leading Icon</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {COLORS.slice(0, 4).map((color) => (
            <Label
              key={color}
              color={color}
              tone="soft"
              leadingIcon={
                <svg viewBox="0 0 10 10" fill="currentColor" width="10" height="10">
                  <circle cx="5" cy="5" r="4" />
                </svg>
              }
            >
              {color}
            </Label>
          ))}
        </div>
      </section>

      <section>
        <h3>Full Grid — Color × Tone × Size (md)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {COLORS.map((color) => (
            <div key={color} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Label color={color} tone="soft" size="md">{color}</Label>
              <Label color={color} tone="outline" size="md">{color}</Label>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
