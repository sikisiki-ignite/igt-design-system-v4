import * as RadixDialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import './Dialog.css'

export interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  size?: 'sm' | 'md' | 'lg'
  variation?: 'primary' | 'neutral' | 'danger'
  title: string
  description?: string
  children?: ReactNode
  primaryLabel?: string
  onPrimary?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  showCloseButton?: boolean
}

export function Dialog({
  open,
  onOpenChange,
  size = 'sm',
  variation = 'primary',
  title,
  description,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  showCloseButton,
}: DialogProps) {
  const hasCloseButton = showCloseButton ?? (size !== 'sm')
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="dialog-overlay" />
        <RadixDialog.Content
          className="dialog"
          data-size={size}
          data-variation={variation}
          aria-describedby={description ? 'dialog-description' : undefined}
        >
          <div className="dialog__header">
            <RadixDialog.Title className="dialog__title">{title}</RadixDialog.Title>
            {hasCloseButton && (
              <RadixDialog.Close className="dialog__close" aria-label="닫기">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </RadixDialog.Close>
            )}
          </div>

          {(description || children) && (
            <div className="dialog__body">
              {description && (
                <RadixDialog.Description id="dialog-description" className="dialog__description">
                  {description}
                </RadixDialog.Description>
              )}
              {children && <div className="dialog__slot">{children}</div>}
            </div>
          )}

          {(primaryLabel || secondaryLabel) && (
            <div className="dialog__footer">
              {secondaryLabel && (
                <button
                  type="button"
                  className="dialog__btn dialog__btn--secondary"
                  onClick={onSecondary}
                >
                  {secondaryLabel}
                </button>
              )}
              {primaryLabel && (
                <button
                  type="button"
                  className="dialog__btn dialog__btn--primary"
                  onClick={onPrimary}
                >
                  {primaryLabel}
                </button>
              )}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
