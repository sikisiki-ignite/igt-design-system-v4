import { Link } from '../src/components/Link/Link'

export function LinkShowcase() {
  return (
    <section>
      <h2>Link</h2>

      <h3>Tone: brand</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Link tone="brand" underline="always" href="#">Always underline</Link>
        <Link tone="brand" underline="auto" href="#">Auto underline</Link>
        <Link tone="brand" underline="none" href="#">No underline</Link>
        <Link tone="brand" disabled>Disabled</Link>
      </div>

      <h3 style={{ marginTop: 24 }}>Tone: neutral</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        <Link tone="neutral" underline="always" href="#">Always underline</Link>
        <Link tone="neutral" underline="auto" href="#">Auto underline</Link>
        <Link tone="neutral" underline="none" href="#">No underline</Link>
        <Link tone="neutral" disabled>Disabled</Link>
      </div>
    </section>
  )
}
