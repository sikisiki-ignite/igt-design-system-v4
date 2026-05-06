import { TextButton } from '../src/components/TextButton/TextButton'

const TONES = ['neutral', 'neutralMuted', 'accent', 'danger'] as const
const SIZES = ['xs', 'sm', 'md', 'lg'] as const

export function TextButtonShowcase() {
  return (
    <section>
      <h2>TextButton</h2>

      <h3>Variant: chevron</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {TONES.map(tone =>
          SIZES.map(size => (
            <TextButton key={`${tone}-${size}`} variant="chevron" tone={tone} size={size}>
              {tone} {size}
            </TextButton>
          ))
        )}
      </div>

      <h3 style={{ marginTop: 24 }}>Variant: underline</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {TONES.map(tone => (
          <TextButton key={tone} variant="underline" tone={tone}>
            {tone}
          </TextButton>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Variant: plain</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {TONES.map(tone => (
          <TextButton key={tone} variant="plain" tone={tone}>
            {tone}
          </TextButton>
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>With leading icon</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <TextButton variant="chevron" tone="neutral" leadingIconName="settingSolid">Settings</TextButton>
        <TextButton variant="plain" tone="accent" leadingIconName="settingSolid">Settings</TextButton>
      </div>

      <h3 style={{ marginTop: 24 }}>Disabled</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <TextButton variant="chevron" tone="neutral" disabled>Disabled</TextButton>
        <TextButton variant="underline" tone="accent" disabled>Disabled</TextButton>
      </div>
    </section>
  )
}
