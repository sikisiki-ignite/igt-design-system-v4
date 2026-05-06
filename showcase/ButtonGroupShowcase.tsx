import { Button } from '../src/components/Button/Button'
import { ButtonGroup } from '../src/components/ButtonGroup/ButtonGroup'
import { ButtonGroupAttached } from '../src/components/ButtonGroupAttached/ButtonGroupAttached'

export function ButtonGroupShowcase() {
  return (
    <section>
      <h2>ButtonGroup</h2>

      <h3>Direction: horizontal</h3>
      <ButtonGroup size="lg" direction="horizontal">
        <Button tone="secondary" appearance="fill" emphasis="weak" size="lg">Cancel</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="lg">Save</Button>
      </ButtonGroup>

      <h3 style={{ marginTop: 24 }}>Direction: vertical</h3>
      <ButtonGroup size="md" direction="vertical">
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Option A</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Option B</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Option C</Button>
      </ButtonGroup>

      <h3 style={{ marginTop: 24 }}>Distribution: equal</h3>
      <div style={{ width: 320 }}>
        <ButtonGroup size="lg" direction="horizontal" distribution="equal">
          <Button tone="secondary" appearance="fill" emphasis="weak" size="lg">Cancel</Button>
          <Button tone="secondary" appearance="fill" emphasis="weak" size="lg">Confirm</Button>
        </ButtonGroup>
      </div>

      <h2 style={{ marginTop: 48 }}>ButtonGroupAttached</h2>

      <h3>Variant: soft</h3>
      <ButtonGroupAttached variant="soft" size="md">
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Left</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Center</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Right</Button>
      </ButtonGroupAttached>

      <h3 style={{ marginTop: 24 }}>Variant: outline</h3>
      <ButtonGroupAttached variant="outline" size="md">
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Edit</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Copy</Button>
        <Button tone="secondary" appearance="fill" emphasis="weak" size="md">Delete</Button>
      </ButtonGroupAttached>

      <h3 style={{ marginTop: 24 }}>Sizes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ButtonGroupAttached variant="soft" size="xs">
          <Button tone="secondary" appearance="fill" emphasis="weak" size="xs">A</Button>
          <Button tone="secondary" appearance="fill" emphasis="weak" size="xs">B</Button>
        </ButtonGroupAttached>
        <ButtonGroupAttached variant="soft" size="sm">
          <Button tone="secondary" appearance="fill" emphasis="weak" size="sm">A</Button>
          <Button tone="secondary" appearance="fill" emphasis="weak" size="sm">B</Button>
        </ButtonGroupAttached>
        <ButtonGroupAttached variant="soft" size="md">
          <Button tone="secondary" appearance="fill" emphasis="weak" size="md">A</Button>
          <Button tone="secondary" appearance="fill" emphasis="weak" size="md">B</Button>
        </ButtonGroupAttached>
      </div>
    </section>
  )
}
