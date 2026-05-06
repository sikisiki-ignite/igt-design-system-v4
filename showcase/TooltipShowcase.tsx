import { useState } from 'react'
import { Tooltip, TooltipPlacement } from '../src/components/Tooltip/Tooltip'
import { Button } from '../src/components/Button/Button'

type Variant = 'basic' | 'rich'
type Tone = 'inverse' | 'surface' | 'accent'

const DIRECTIONS: { placement: TooltipPlacement; col: number; row: number }[] = [
  { placement: 'top-start',    col: 2, row: 1 },
  { placement: 'top',          col: 3, row: 1 },
  { placement: 'top-end',      col: 4, row: 1 },
  { placement: 'left-start',   col: 1, row: 2 },
  { placement: 'left',         col: 1, row: 3 },
  { placement: 'left-end',     col: 1, row: 4 },
  { placement: 'right-start',  col: 5, row: 2 },
  { placement: 'right',        col: 5, row: 3 },
  { placement: 'right-end',    col: 5, row: 4 },
  { placement: 'bottom-start', col: 2, row: 5 },
  { placement: 'bottom',       col: 3, row: 5 },
  { placement: 'bottom-end',   col: 4, row: 5 },
]

const TONES: Tone[] = ['inverse', 'surface', 'accent']

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 20px',
        borderRadius: 6,
        border: '1.5px solid',
        borderColor: active ? '#3182F6' : '#e0e0e0',
        background: active ? '#3182F6' : 'transparent',
        color: active ? '#fff' : '#555',
        cursor: 'pointer',
        fontWeight: active ? 600 : 400,
        fontSize: 13,
      }}
    >
      {children}
    </button>
  )
}

function ToneButton({
  tone,
  active,
  onClick,
}: {
  tone: Tone
  active: boolean
  onClick: () => void
}) {
  const bgMap: Record<Tone, string> = {
    inverse: '#1a1f28',
    surface: '#f0f0f0',
    accent: '#3182F6',
  }
  const fgMap: Record<Tone, string> = {
    inverse: '#fff',
    surface: '#1a1f28',
    accent: '#fff',
  }
  return (
    <button
      onClick={onClick}
      style={{
        padding: '6px 20px',
        borderRadius: 6,
        border: '1.5px solid',
        borderColor: active ? bgMap[tone] : '#e0e0e0',
        background: active ? bgMap[tone] : 'transparent',
        color: active ? fgMap[tone] : '#555',
        cursor: 'pointer',
        fontWeight: active ? 600 : 400,
        fontSize: 13,
      }}
    >
      {tone.charAt(0).toUpperCase() + tone.slice(1)}
    </button>
  )
}

export function TooltipShowcase() {
  const [variant, setVariant] = useState<Variant>('basic')
  const [tone, setTone] = useState<Tone>('inverse')

  const label = '알림 설정'
  const description = '중요한 변경 사항을 놓치지 않도록 도와드려요.'

  return (
    <section>
      <h2>Tooltip</h2>

      {/* Variant tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        <TabButton active={variant === 'basic'} onClick={() => setVariant('basic')}>Basic</TabButton>
        <TabButton active={variant === 'rich'} onClick={() => setVariant('rich')}>Rich</TabButton>
      </div>

      {/* Tone selector */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 52 }}>
        {TONES.map(t => (
          <ToneButton key={t} tone={t} active={tone === t} onClick={() => setTone(t)} />
        ))}
      </div>

      {/* 12-direction grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 100px)',
          gridTemplateRows: 'repeat(5, 64px)',
          gap: 4,
          width: 'fit-content',
          margin: '0 auto 48px',
        }}
      >
        {DIRECTIONS.map(({ placement, col, row }) => (
          <div
            key={placement}
            style={{
              gridColumn: col,
              gridRow: row,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip
              label={label}
              description={variant === 'rich' ? description : undefined}
              variant={variant}
              tone={tone}
              placement={placement}
            >
              <button
                style={{
                  padding: '4px 8px',
                  fontSize: 11,
                  borderRadius: 4,
                  border: '1px solid #d0d0d0',
                  cursor: 'pointer',
                  background: '#fff',
                  whiteSpace: 'nowrap',
                  color: '#333',
                }}
              >
                {placement}
              </button>
            </Tooltip>
          </div>
        ))}

        {/* Center target */}
        <div
          style={{
            gridColumn: '2 / 5',
            gridRow: '2 / 5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f7f7f7',
            borderRadius: 10,
            border: '1px dashed #ccc',
            fontSize: 12,
            color: '#bbb',
            letterSpacing: 1,
          }}
        >
          hover any
        </div>
      </div>

      {/* none */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 40 }}>
        <p style={{ fontSize: 12, color: '#888', margin: 0 }}>none — 화살표 없음</p>
        <Tooltip
          label={label}
          description={variant === 'rich' ? description : undefined}
          variant={variant}
          tone={tone}
          arrow={false}
          placement="none"
        >
          <Button tone="secondary" appearance="outline" size="sm">none</Button>
        </Tooltip>
      </div>

      {/* Tone comparison row */}
      <div style={{ marginTop: 40, borderTop: '1px solid #e0e0e0', paddingTop: 32 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: '#888', marginBottom: 20, textTransform: 'uppercase', letterSpacing: 1 }}>
          Tone 비교 — {variant}
        </p>
        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          {TONES.map(t => (
            <div key={t} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <p style={{ fontSize: 11, color: '#888', margin: 0, textTransform: 'capitalize' }}>{t}</p>
              <Tooltip
                label={label}
                description={variant === 'rich' ? description : undefined}
                variant={variant}
                tone={t}
                placement="top"
              >
                <Button tone="secondary" appearance="outline" size="sm">hover</Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
