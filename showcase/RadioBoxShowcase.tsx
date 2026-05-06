import { useState } from 'react'
import { RadioBox } from '../src/components/RadioBox/RadioBox'

interface RadioItemProps {
  size?: 'sm' | 'md'
  checked?: boolean
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  label?: string
  helper?: string
  name?: string
  onChange?: () => void
}

function RadioItem({ size = 'md', checked = false, disabled, readOnly, invalid, label = '텍스트', helper = '간단한 설명', name, onChange }: RadioItemProps) {
  // Figma RadioItem (2125:24863) 실측값 기준
  // md: label 15/600/22lh, description 14/400/20lh
  // sm: label 14/600/20lh, description 13/400/18lh
  // hit area(28md/24sm)와 visual control(20md/16sm) 차이가 4px → gap:4 = 시각적 8px
  const hitArea = size === 'sm' ? 24 : 28
  const label_fontSize = size === 'sm' ? 14 : 15
  const label_lineHeight = size === 'sm' ? '20px' : '22px'
  const desc_fontSize = size === 'sm' ? 13 : 14
  const desc_lineHeight = size === 'sm' ? '18px' : '20px'
  const labelColor = disabled ? 'var(--sys-content-neutral-disabled)' : 'var(--sys-content-neutral-default)'
  const helperColor = disabled ? 'var(--sys-content-neutral-disabled)' : invalid ? 'var(--sys-content-status-danger-default)' : 'var(--sys-content-neutral-subtle)'
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4, cursor: disabled || readOnly ? 'default' : 'pointer' }}>
      <RadioBox size={size} checked={checked} disabled={disabled} readOnly={readOnly} invalid={invalid} name={name} onChange={onChange ?? (() => {})} />
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ height: hitArea, display: 'flex', alignItems: 'center', fontSize: label_fontSize, fontWeight: 600, lineHeight: label_lineHeight, color: labelColor, boxSizing: 'border-box' }}>{label}</span>
        {helper && <span style={{ fontSize: desc_fontSize, fontWeight: 400, lineHeight: desc_lineHeight, color: helperColor }}>{helper}</span>}
      </span>
    </label>
  )
}

export function RadioBoxShowcase() {
  const [selected, setSelected] = useState<'a' | 'b' | 'c'>('a')
  const [payment, setPayment] = useState<string>('card')

  return (
    <section>
      <h2>RadioBox</h2>

      {/* ── Interactive ── */}
      <h3>Interactive (group)</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {(['a', 'b', 'c'] as const).map(v => (
          <RadioBox
            key={v}
            name="demo"
            size="md"
            checked={selected === v}
            onChange={() => setSelected(v)}
          />
        ))}
        <span style={{ fontSize: 13, color: '#666' }}>선택: {selected}</span>
      </div>

      {/* ── Bare control: Sizes ── */}
      <h3 style={{ marginTop: 32 }}>Sizes (bare control)</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <RadioBox size="sm" checked={true} onChange={() => {}} />
          <span style={{ fontSize: 11, color: '#999' }}>sm</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <RadioBox size="md" checked={true} onChange={() => {}} />
          <span style={{ fontSize: 11, color: '#999' }}>md</span>
        </div>
      </div>

      {/* ── Bare control: States ── */}
      <h3 style={{ marginTop: 32 }}>States (bare control)</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <RadioBox size="md" checked={false} onChange={() => {}} />
        <RadioBox size="md" checked={true} onChange={() => {}} />
      </div>

      {/* ── Composition: All states × 2 sizes ── */}
      <h3 style={{ marginTop: 40 }}>Composition — All States × Size</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', maxWidth: 760 }}>
        {(['sm', 'md'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Size: {size}</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Normal states */}
              <RadioItem size={size} checked={true} label="텍스트" helper="간단한 설명" />
              <RadioItem size={size} checked={false} label="텍스트" helper="간단한 설명" onChange={() => {}} />

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Disabled</div>
                <RadioItem size={size} checked={true} disabled label="텍스트" helper="간단한 설명" />
                <div style={{ marginTop: 12 }}>
                  <RadioItem size={size} checked={false} disabled label="텍스트" helper="간단한 설명" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>ReadOnly</div>
                <RadioItem size={size} checked={true} readOnly label="텍스트" helper="간단한 설명" />
                <div style={{ marginTop: 12 }}>
                  <RadioItem size={size} checked={false} readOnly label="텍스트" helper="간단한 설명" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Invalid</div>
                <RadioItem size={size} checked={false} invalid label="텍스트" helper="간단한 설명" onChange={() => {}} />
                <div style={{ marginTop: 12 }}>
                  <RadioItem size={size} checked={true} invalid label="텍스트" helper="간단한 설명" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Real-world usage ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 결제수단 선택</h3>
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        {(['sm', 'md'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>size={size}</div>
            <div style={{ fontSize: size === 'sm' ? 12 : 13, color: 'var(--sys-content-neutral-subtle)', marginBottom: 12 }}>결제수단 선택</div>
            {[
              { value: 'card', label: '신용카드' },
              { value: 'transfer', label: '계좌이체' },
              { value: 'deposit', label: '무통장 입금' },
              { value: 'kakao', label: '간편결제 (카카오페이)' },
            ].map(opt => (
              <div key={opt.value} style={{ marginBottom: 12 }}>
                <RadioItem
                  size={size}
                  name={`payment-${size}`}
                  checked={payment === opt.value}
                  label={opt.label}
                  helper=""
                  onChange={() => setPayment(opt.value)}
                />
              </div>
            ))}
            <div style={{ fontSize: size === 'sm' ? 11 : 12, color: 'var(--sys-content-neutral-subtle)', marginTop: 4 }}>주문 완료 후 변경할 수 없어요</div>
          </div>
        ))}
      </div>
    </section>
  )
}
