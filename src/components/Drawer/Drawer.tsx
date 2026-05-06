import * as RadixDialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import './Drawer.css'

export interface DrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placement?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  title?: string
  description?: string
  children?: ReactNode
  primaryLabel?: string
  onPrimary?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  tertiaryLabel?: string
  onTertiary?: () => void
  footerVariation?: 'primary' | 'neutral' | 'danger'
  footerLayout?: 'inlineEnd' | 'stack' | 'between'
}

export function Drawer({
  open,
  onOpenChange,
  placement = 'right',
  size = 'sm',
  title,
  description,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  tertiaryLabel,
  onTertiary,
  footerVariation = 'primary',
  footerLayout = 'inlineEnd',
}: DrawerProps) {
  const hasFooter = primaryLabel || secondaryLabel || (footerLayout === 'between' && tertiaryLabel)

  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="drawer-overlay" />
        <RadixDialog.Content
          className="drawer"
          data-placement={placement}
          data-size={size}
          aria-describedby={description ? 'drawer-description' : undefined}
        >
          {(title || description) && (
            <div className="drawer__header">
              <div className="drawer__header-content">
                {title && (
                  <RadixDialog.Title className="drawer__title">{title}</RadixDialog.Title>
                )}
                {description && (
                  <RadixDialog.Description id="drawer-description" className="drawer__subtitle">
                    {description}
                  </RadixDialog.Description>
                )}
              </div>
              <RadixDialog.Close className="drawer__dismiss" aria-label="닫기">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </RadixDialog.Close>
            </div>
          )}

          <div className="drawer__body">{children}</div>

          {hasFooter && (
            <div className="drawer__footer">
              <div className="drawer__footer-divider" />
              <div
                className="drawer__footer-actions"
                data-variation={footerVariation}
                data-layout={footerLayout}
              >
                {footerLayout === 'between' && tertiaryLabel && (
                  <button
                    type="button"
                    className="drawer__btn drawer__btn--tertiary"
                    onClick={onTertiary}
                  >
                    {tertiaryLabel}
                  </button>
                )}
                <div className="drawer__footer-end-group">
                  {secondaryLabel && (
                    <button
                      type="button"
                      className="drawer__btn drawer__btn--secondary"
                      onClick={onSecondary}
                    >
                      {secondaryLabel}
                    </button>
                  )}
                  {primaryLabel && (
                    <button
                      type="button"
                      className="drawer__btn drawer__btn--primary"
                      onClick={onPrimary}
                    >
                      {primaryLabel}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
