import { useState } from 'react'
import { IconToggle } from '../src/components/IconToggle/IconToggle'

function ToggleDemo({ ...props }: React.ComponentProps<typeof IconToggle>) {
  const [selected, setSelected] = useState(props.selected ?? false)
  return (
    <IconToggle
      {...props}
      selected={selected}
      onClick={() => setSelected(s => !s)}
    />
  )
}

const INTENTS = ['reaction', 'accent', 'neutral'] as const
const SIZES = ['xs', 'sm', 'md'] as const

export function IconToggleShowcase() {
  return (
    <section>
      <h2>IconToggle</h2>

      <h3>클릭하여 toggle</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {INTENTS.map(intent =>
          SIZES.map(size => (
            <ToggleDemo key={`${intent}-${size}`} intent={intent} size={size} iconName="settingSolid" />
          ))
        )}
      </div>

      <h3 style={{ marginTop: 24 }}>Selected (initial)</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {INTENTS.map(intent => (
          <ToggleDemo key={intent} intent={intent} selected size="md" iconName="settingSolid" />
        ))}
      </div>

      <h3 style={{ marginTop: 24 }}>Disabled</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <IconToggle intent="reaction" selected={false} size="md" iconName="settingSolid" disabled />
        <IconToggle intent="accent" selected={true} size="md" iconName="settingSolid" disabled />
        <IconToggle intent="neutral" selected={true} size="md" iconName="settingSolid" disabled />
      </div>
    </section>
  )
}
