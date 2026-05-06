import { useState } from 'react'
import { Checkbox } from '../src/components/Checkbox/Checkbox'

type CheckboxState = 'unchecked' | 'checked' | 'indeterminate'

interface CheckboxItemProps {
  size?: 'sm' | 'md'
  checked?: boolean | 'indeterminate'
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  label?: string
  helper?: string
  onChange?: () => void
}

function CheckboxItem({ size = 'md', checked = false, disabled, readOnly, invalid, label = '텍스트', helper = '메시지', onChange }: CheckboxItemProps) {
  // RadioItem과 동일한 Figma 실측값 적용 (RadioItem 2125:24863 기준, Checkbox도 동일 패턴)
  // md: label 15/600/22lh, description 14/400/20lh
  // sm: label 14/600/20lh, description 13/400/18lh
  const hitArea = size === 'sm' ? 24 : 28
  const label_fontSize = size === 'sm' ? 14 : 15
  const label_lineHeight = size === 'sm' ? '20px' : '22px'
  const desc_fontSize = size === 'sm' ? 13 : 14
  const desc_lineHeight = size === 'sm' ? '18px' : '20px'
  const labelColor = disabled ? 'var(--sys-content-neutral-disabled)' : 'var(--sys-content-neutral-default)'
  const helperColor = disabled ? 'var(--sys-content-neutral-disabled)' : invalid ? 'var(--sys-content-status-danger-default)' : 'var(--sys-content-neutral-subtle)'
  return (
    <label style={{ display: 'inline-flex', alignItems: 'flex-start', gap: 4, cursor: disabled || readOnly ? 'default' : 'pointer' }}>
      <Checkbox size={size} checked={checked} disabled={disabled} readOnly={readOnly} invalid={invalid} onChange={onChange ?? (() => {})} />
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ height: hitArea, display: 'flex', alignItems: 'center', fontSize: label_fontSize, fontWeight: 600, lineHeight: label_lineHeight, color: labelColor, boxSizing: 'border-box' }}>{label}</span>
        {helper && <span style={{ fontSize: desc_fontSize, fontWeight: 400, lineHeight: desc_lineHeight, color: helperColor }}>{helper}</span>}
      </span>
    </label>
  )
}

export function CheckboxShowcase() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)

  const states: Array<{ label: string; checked: boolean | 'indeterminate' }> = [
    { label: 'checked', checked: true },
    { label: 'unchecked', checked: false },
    { label: 'indeterminate', checked: 'indeterminate' },
  ]

  return (
    <section>
      <h2>Checkbox</h2>

      {/* ── Interactive ── */}
      <h3>Interactive</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Checkbox
          size="md"
          checked={checked}
          onChange={() => setChecked(v => v === false ? true : v === true ? 'indeterminate' : false)}
        />
        <span style={{ fontSize: 13, color: '#666' }}>현재: {String(checked)}</span>
      </div>

      {/* ── Bare control: Sizes ── */}
      <h3 style={{ marginTop: 32 }}>Sizes (bare control)</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <Checkbox size="sm" checked={true} onChange={() => {}} />
          <span style={{ fontSize: 11, color: '#999' }}>sm</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
          <Checkbox size="md" checked={true} onChange={() => {}} />
          <span style={{ fontSize: 11, color: '#999' }}>md</span>
        </div>
      </div>

      {/* ── Bare control: States ── */}
      <h3 style={{ marginTop: 32 }}>States (bare control)</h3>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <Checkbox size="md" checked={false} onChange={() => {}} />
        <Checkbox size="md" checked={true} onChange={() => {}} />
        <Checkbox size="md" checked="indeterminate" onChange={() => {}} />
      </div>

      {/* ── Composition: All states × 2 sizes ── */}
      <h3 style={{ marginTop: 40 }}>Composition — All States × Size</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', maxWidth: 760 }}>
        {(['sm', 'md'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Size: {size}</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Normal states */}
              {states.map(s => (
                <CheckboxItem key={s.label} size={size} checked={s.checked} label="텍스트" helper="메시지" />
              ))}

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Disabled</div>
                {states.map(s => (
                  <div key={s.label} style={{ marginBottom: 12 }}>
                    <CheckboxItem size={size} checked={s.checked} disabled label="텍스트" helper="메시지" />
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>ReadOnly</div>
                <CheckboxItem size={size} checked={false} readOnly label="텍스트" helper="메시지" />
                <div style={{ marginTop: 12 }}>
                  <CheckboxItem size={size} checked={true} readOnly label="텍스트" helper="메시지" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Invalid</div>
                <CheckboxItem size={size} checked={false} invalid label="텍스트" helper="메시지" />
                <div style={{ marginTop: 12 }}>
                  <CheckboxItem size={size} checked={true} invalid label="텍스트" helper="메시지" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Real-world usage ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시</h3>
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        {(['sm', 'md'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>size={size}</div>
            <CheckboxItem size={size} checked={false} readOnly label="외부 검색 공유 허용" helper="" />
            <CheckboxItem size={size} checked={false} label="외부 검색 공유 허용" helper="" onChange={() => {}} />
            <CheckboxItem size={size} checked={true} label="외부 검색 공유 허용" helper="" onChange={() => {}} />
            <CheckboxItem size={size} checked={false} disabled label="외부 검색 공유 허용" helper="" />
          </div>
        ))}
      </div>
    </section>
  )
}
