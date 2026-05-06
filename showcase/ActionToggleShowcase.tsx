import { useState } from 'react'
import { ActionToggle } from '../src/components/ActionToggle/ActionToggle'

function ToggleDemo({ ...props }: React.ComponentProps<typeof ActionToggle>) {
  const [selected, setSelected] = useState(props.selected ?? false)
  return (
    <ActionToggle
      {...props}
      selected={selected}
      onClick={() => setSelected(s => !s)}
    />
  )
}

export function ActionToggleShowcase() {
  return (
    <section>
      <h2>ActionToggle</h2>

      <h3>onDefault emphasis</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <ToggleDemo emphasis="onDefault" size="md" iconName="settingSolid">팔로우</ToggleDemo>
        <ToggleDemo emphasis="onDefault" selected size="md" iconName="settingSolid">팔로잉</ToggleDemo>
        <ToggleDemo emphasis="onDefault" size="sm" iconName="settingSolid">팔로우</ToggleDemo>
        <ToggleDemo emphasis="onDefault" size="xs" iconName="settingSolid">팔로우</ToggleDemo>
        <ActionToggle emphasis="onDefault" size="md" iconName="settingSolid" disabled>Disabled</ActionToggle>
      </div>

      <h3 style={{ marginTop: 24 }}>onSelect emphasis</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <ToggleDemo emphasis="onSelect" size="md" iconName="settingSolid">팔로우</ToggleDemo>
        <ToggleDemo emphasis="onSelect" selected size="md" iconName="settingSolid">팔로잉</ToggleDemo>
      </div>

      <h3 style={{ marginTop: 24 }}>Icon only</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <ToggleDemo emphasis="onDefault" size="md" iconOnly iconName="settingSolid" />
        <ToggleDemo emphasis="onDefault" selected size="md" iconOnly iconName="settingSolid" />
        <ToggleDemo emphasis="onDefault" size="sm" iconOnly iconName="settingSolid" />
        <ToggleDemo emphasis="onDefault" size="xs" iconOnly iconName="settingSolid" />
      </div>
    </section>
  )
}
