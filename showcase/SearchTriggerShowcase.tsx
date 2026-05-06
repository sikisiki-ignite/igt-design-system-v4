import { SearchTrigger } from '../src/components/SearchTrigger/SearchTrigger'

export function SearchTriggerShowcase() {
  return (
    <section>
      <h2>SearchTrigger</h2>

      <h3>Variant: field</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
        <SearchTrigger variant="field" appearance="default" size="md" placeholder="Search…" />
        <SearchTrigger variant="field" appearance="default" size="sm" placeholder="Search…" />
        <SearchTrigger variant="field" appearance="subtle" size="md" placeholder="Search…" />
        <SearchTrigger variant="field" appearance="subtle" size="sm" placeholder="Search…" />
        <SearchTrigger variant="field" appearance="default" size="md" placeholder="Disabled" disabled />
      </div>

      <h3 style={{ marginTop: 24 }}>Variant: icon</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <SearchTrigger variant="icon" appearance="default" size="md" />
        <SearchTrigger variant="icon" appearance="default" size="sm" />
        <SearchTrigger variant="icon" appearance="subtle" size="md" />
        <SearchTrigger variant="icon" appearance="subtle" size="sm" />
        <SearchTrigger variant="icon" appearance="default" size="md" disabled />
      </div>
    </section>
  )
}
