import { Menu } from '../src/components/Menu/Menu'
import { MenuItem } from '../src/components/Menu/MenuItem'

export function MenuShowcase() {
  return (
    <section>
      <h2>Menu + MenuItem</h2>

      <h3>Size: md</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <Menu size="md">
          <MenuItem tone="neutral" leadingIconName="settingSolid">Settings</MenuItem>
          <MenuItem tone="neutral" leadingIconName="settingSolid">Profile</MenuItem>
          <MenuItem tone="accent" leadingIconName="settingSolid">Upgrade</MenuItem>
          <MenuItem tone="danger" leadingIconName="settingSolid">Delete</MenuItem>
          <MenuItem tone="neutral" disabled>Disabled item</MenuItem>
        </Menu>

        <Menu size="md">
          <MenuItem tone="neutral" trailingIconName="monoChevronRight">More options</MenuItem>
          <MenuItem tone="neutral">Plain item</MenuItem>
          <MenuItem tone="danger">Remove</MenuItem>
        </Menu>
      </div>

      <h3 style={{ marginTop: 24 }}>Size: sm</h3>
      <Menu size="sm">
        <MenuItem tone="neutral" size="sm" leadingIconName="settingSolid">Settings</MenuItem>
        <MenuItem tone="neutral" size="sm">Profile</MenuItem>
        <MenuItem tone="danger" size="sm">Delete</MenuItem>
      </Menu>
    </section>
  )
}
