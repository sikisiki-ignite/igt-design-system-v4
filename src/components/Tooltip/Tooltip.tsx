import * as RadixTooltip from '@radix-ui/react-tooltip'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import './Tooltip.css'

export type TooltipPlacement =
  | 'top-start' | 'top' | 'top-end'
  | 'right-start' | 'right' | 'right-end'
  | 'bottom-start' | 'bottom' | 'bottom-end'
  | 'left-start' | 'left' | 'left-end'
  | 'none'

export interface TooltipProps {
  children: ReactNode
  label: string
  description?: string
  variant?: 'basic' | 'rich'
  tone?: 'inverse' | 'surface' | 'accent'
  placement?: TooltipPlacement
  arrow?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  delayDuration?: number
}

function parsePlacement(placement: TooltipPlacement): {
  side: 'top' | 'right' | 'bottom' | 'left'
  align: 'start' | 'center' | 'end'
} {
  if (placement === 'none') return { side: 'top', align: 'center' }
  const idx = placement.lastIndexOf('-')
  if (idx === -1) {
    return { side: placement as 'top' | 'right' | 'bottom' | 'left', align: 'center' }
  }
  return {
    side: placement.slice(0, idx) as 'top' | 'right' | 'bottom' | 'left',
    align: placement.slice(idx + 1) as 'start' | 'end',
  }
}

// 방향별 SVG caret: fill(속채움) + stroke(V면 윤곽선만)
// stroke 시작점을 0.5px 안으로 당겨 tooltip box 안으로 stroke가 새지 않도록 함
const CARET: Record<'top' | 'right' | 'bottom' | 'left', {
  w: number; h: number; fill: string; stroke: string
}> = {
  top:    { w: 18, h: 9,  fill: 'M0,0 L18,0 L9,9 Z',    stroke: 'M0,0.5 L9,9 L18,0.5' },
  bottom: { w: 18, h: 9,  fill: 'M0,9 L18,9 L9,0 Z',    stroke: 'M0,8.5 L9,0 L18,8.5' },
  left:   { w: 9,  h: 18, fill: 'M0,0 L0,18 L9,9 Z',    stroke: 'M0.5,0 L9,9 L0.5,18' },
  right:  { w: 9,  h: 18, fill: 'M9,0 L9,18 L0,9 Z',    stroke: 'M8.5,0 L0,9 L8.5,18' },
}

export function Tooltip({
  children,
  label,
  description,
  variant = 'basic',
  tone = 'inverse',
  placement = 'top',
  arrow = true,
  open,
  onOpenChange,
  delayDuration = 400,
}: TooltipProps) {
  const showArrow = arrow && placement !== 'none'
  const { side, align } = parsePlacement(placement)
  const [effectiveAlign, setEffectiveAlign] = useState<typeof align>(align)

  useEffect(() => { setEffectiveAlign(align) }, [align])

  const contentRef = useCallback((el: HTMLDivElement | null) => {
    if (!el || align === 'center') return
    if (el.scrollHeight <= 40) setEffectiveAlign('center')
  }, [align, label, description])

  const caret = CARET[side]

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={open} onOpenChange={onOpenChange} delayDuration={delayDuration}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            ref={contentRef}
            className="tooltip"
            data-tone={tone}
            data-variant={variant}
            data-has-arrow={showArrow ? 'true' : undefined}
            side={side}
            align={effectiveAlign}
            sideOffset={showArrow ? 9 : 4}
          >
            <span className="tooltip__label">{label}</span>
            {variant === 'rich' && description && (
              <span className="tooltip__description">{description}</span>
            )}
            {showArrow && (
              <svg
                className="tooltip__caret"
                width={caret.w}
                height={caret.h}
                viewBox={`0 0 ${caret.w} ${caret.h}`}
                aria-hidden="true"
              >
                <path d={caret.fill} className="tooltip__caret-fill" />
                <path d={caret.stroke} className="tooltip__caret-stroke" />
              </svg>
            )}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
