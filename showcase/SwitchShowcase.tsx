import { useState } from 'react'
import { Switch } from '../src/components/Switch/Switch'

// Figma SwitchField (505:17247) 실측값 기준
// layout: horizontal, gap=8, alignItems=center
// md: label 14/600/20lh, description 12/400/16lh
// sm: label 13/600/18lh, description 11/500/14lh
interface SwitchItemProps {
  size?: 'sm' | 'md'
  checked?: boolean
  disabled?: boolean
  label?: string
  description?: string
  onChange?: () => void
}

function SwitchItem({ size = 'md', checked = false, disabled, label = '텍스트', description = '간단한 설명', onChange }: SwitchItemProps) {
  const label_fontSize = size === 'sm' ? 13 : 14
  const label_lineHeight = size === 'sm' ? '18px' : '20px'
  const desc_fontSize = size === 'sm' ? 11 : 12
  const desc_fontWeight = size === 'sm' ? 500 : 400
  const desc_lineHeight = size === 'sm' ? '14px' : '16px'
  const labelColor = disabled ? 'var(--sys-content-neutral-disabled)' : 'var(--sys-content-neutral-default)'
  const descColor = disabled ? 'var(--sys-content-neutral-disabled)' : 'var(--sys-content-neutral-subtle)'

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'default' : 'pointer' }}>
      <Switch size={size} checked={checked} disabled={disabled} onChange={onChange ?? (() => {})} />
      <span style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: label_fontSize, fontWeight: 600, lineHeight: label_lineHeight, color: labelColor }}>{label}</span>
        {description && <span style={{ fontSize: desc_fontSize, fontWeight: desc_fontWeight, lineHeight: desc_lineHeight, color: descColor }}>{description}</span>}
      </span>
    </label>
  )
}

function SwitchDemo(props: Omit<SwitchItemProps, 'onChange'>) {
  const [checked, setChecked] = useState(props.checked ?? false)
  return <SwitchItem {...props} checked={checked} onChange={() => setChecked(v => !v)} />
}

export function SwitchShowcase() {
  const [settings, setSettings] = useState({
    notification: true,
    email: false,
    autoSave: true,
    darkMode: false,
    analytics: true,
  })

  const toggle = (key: keyof typeof settings) =>
    setSettings(s => ({ ...s, [key]: !s[key] }))

  return (
    <section>
      <h2>Switch</h2>

      {/* ── Interactive ── */}
      <h3>Interactive</h3>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <SwitchDemo size="md" />
        <SwitchDemo size="sm" />
      </div>

      {/* ── Bare control: On / Off × Size ── */}
      <h3 style={{ marginTop: 32 }}>On / Off × Size</h3>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        {(['md', 'sm'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>{size}</span>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Switch size={size} checked={false} onChange={() => {}} />
              <Switch size={size} checked={true} onChange={() => {}} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Disabled ── */}
      <h3 style={{ marginTop: 32 }}>Disabled</h3>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Switch size="md" checked={false} disabled />
        <Switch size="md" checked={true} disabled />
        <Switch size="sm" checked={false} disabled />
        <Switch size="sm" checked={true} disabled />
      </div>

      {/* ── Composition: SwitchField ── */}
      <h3 style={{ marginTop: 40 }}>Composition — SwitchField × Size</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px 48px', maxWidth: 600 }}>
        {(['md', 'sm'] as const).map(size => (
          <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#999', textTransform: 'uppercase', letterSpacing: 1 }}>Size: {size}</span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <SwitchItem size={size} checked={true} label="텍스트" description="간단한 설명" />
              <SwitchItem size={size} checked={false} label="텍스트" description="간단한 설명" onChange={() => {}} />

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Label only</div>
                <SwitchItem size={size} checked={true} label="텍스트" description="" />
                <div style={{ marginTop: 12 }}>
                  <SwitchItem size={size} checked={false} label="텍스트" description="" onChange={() => {}} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 12 }}>Disabled</div>
                <SwitchItem size={size} checked={true} disabled label="텍스트" description="간단한 설명" />
                <div style={{ marginTop: 12 }}>
                  <SwitchItem size={size} checked={false} disabled label="텍스트" description="간단한 설명" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Real-world usage ── */}
      <h3 style={{ marginTop: 48 }}>실사용 예시</h3>

      {/* 알림 설정 패널 */}
      <div style={{ maxWidth: 480 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-content-neutral-default)', marginBottom: 4 }}>알림 설정</div>
        <div style={{ fontSize: 12, color: 'var(--sys-content-neutral-subtle)', marginBottom: 20 }}>받고 싶은 알림을 선택하세요</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { key: 'notification' as const, label: '푸시 알림', description: '새 메시지와 업데이트를 즉시 받아보세요' },
            { key: 'email' as const, label: '이메일 수신', description: '주간 요약 및 마케팅 정보를 이메일로 받아요' },
            { key: 'analytics' as const, label: '사용 데이터 수집', description: '서비스 개선을 위한 익명 데이터 수집에 동의해요' },
          ].map(({ key, label, description }, i) => (
            <div key={key} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '16px 0',
              borderTop: i === 0 ? '1px solid var(--sys-border-neutral-muted)' : undefined,
              borderBottom: '1px solid var(--sys-border-neutral-muted)',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--sys-content-neutral-default)', lineHeight: '20px' }}>{label}</span>
                <span style={{ fontSize: 12, color: 'var(--sys-content-neutral-subtle)', lineHeight: '16px' }}>{description}</span>
              </div>
              <Switch size="md" checked={settings[key]} onChange={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>

      {/* 개인정보 / 계정 설정 */}
      <div style={{ maxWidth: 480, marginTop: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-content-neutral-default)', marginBottom: 20 }}>계정 설정</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <SwitchDemo size="md" checked={true} label="자동 저장" description="작업 내용을 실시간으로 자동 저장해요" />
          <SwitchDemo size="md" checked={false} label="다크 모드" description="어두운 테마를 사용해요" />
          <SwitchDemo size="md" checked={false} disabled label="2단계 인증 (관리자 전용)" description="계정 보안을 강화해요" />
        </div>
      </div>

      {/* sm 사이즈 실사용 */}
      <div style={{ maxWidth: 480, marginTop: 40 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--sys-content-neutral-default)', marginBottom: 20 }}>알림 (compact / sm)</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SwitchDemo size="sm" checked={true} label="댓글 알림" />
          <SwitchDemo size="sm" checked={false} label="좋아요 알림" />
          <SwitchDemo size="sm" checked={true} label="팔로우 알림" />
          <SwitchDemo size="sm" checked={false} disabled label="광고성 알림 (동의 필요)" />
        </div>
      </div>
    </section>
  )
}
