import * as RadixPopover from '@radix-ui/react-popover'
import { ReactNode } from 'react'
import './Popover.css'

export interface PopoverProps {
  children: ReactNode
  content: ReactNode
  emphasis?: 'surface' | 'inverse'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Popover({
  children,
  content,
  emphasis = 'surface',
  placement = 'bottom',
  sideOffset = 8,
  open,
  onOpenChange,
}: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          className="popover"
          data-emphasis={emphasis}
          side={placement}
          sideOffset={sideOffset}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  )
}

export interface PopoverSectionProps {
  children: ReactNode
}

export function PopoverSection({ children }: PopoverSectionProps) {
  return <div className="popover__section">{children}</div>
}

export interface PopoverHeaderProps {
  children: ReactNode
}

export function PopoverHeader({ children }: PopoverHeaderProps) {
  return <div className="popover__header">{children}</div>
}

export interface PopoverBodyProps {
  children: ReactNode
}

export function PopoverBody({ children }: PopoverBodyProps) {
  return <div className="popover__body">{children}</div>
}
