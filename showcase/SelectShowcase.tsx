import { useState } from 'react'
import { Select } from '../src/components/Select/Select'

const statusOptions = [
  { value: 'todo', label: '할 일' },
  { value: 'in-progress', label: '진행 중' },
  { value: 'done', label: '완료' },
  { value: 'canceled', label: '취소됨', disabled: true },
]

const priorityOptions = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' },
  { value: 'urgent', label: '긴급' },
]

const countryOptions = [
  { value: 'kr', label: '대한민국' },
  { value: 'us', label: '미국' },
  { value: 'jp', label: '일본' },
  { value: 'cn', label: '중국' },
  { value: 'de', label: '독일' },
]

export function SelectShowcase() {
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('medium')

  return (
    <section>
      <h2>Select</h2>

      {/* ── Appearance × Size ── */}
      <h3>Appearance × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['fill', 'outline', 'plain'] as const).map(appearance => (
          <div key={appearance}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              appearance={appearance}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {(['xs', 'sm', 'md'] as const).map(size => (
                <Select
                  key={size}
                  appearance={appearance}
                  size={size}
                  options={statusOptions}
                  placeholder={`size=${size}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── States ── */}
      <h3 style={{ marginTop: 32 }}>States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
        <Select options={statusOptions} placeholder="Normal" />
        <Select options={statusOptions} defaultValue="in-progress" placeholder="With Value" />
        <Select options={statusOptions} placeholder="Invalid" invalid />
        <Select options={statusOptions} placeholder="Disabled" disabled />
        <Select options={statusOptions} value="done" readOnly placeholder="ReadOnly" />
      </div>

      {/* ── Width ── */}
      <h3 style={{ marginTop: 32 }}>Width</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        <Select options={statusOptions} placeholder="width=hug (default)" width="hug" />
        <Select options={statusOptions} placeholder="width=fill" width="fill" />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 32 }}>Interactive</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', maxWidth: 480 }}>
        <div>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Status (uncontrolled start)</div>
          <Select
            options={statusOptions}
            value={status}
            onChange={setStatus}
            placeholder="상태 선택"
          />
          {status && (
            <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>선택됨: {status}</div>
          )}
        </div>
        <div>
          <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Priority (controlled)</div>
          <Select
            options={priorityOptions}
            value={priority}
            onChange={setPriority}
            appearance="fill"
          />
          <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>값: {priority}</div>
        </div>
      </div>

      {/* ── Disabled items ── */}
      <h3 style={{ marginTop: 32 }}>Disabled Items</h3>
      <div style={{ maxWidth: 280 }}>
        <Select
          options={[
            { value: 'active', label: '활성' },
            { value: 'inactive', label: '비활성', disabled: true },
            { value: 'pending', label: '대기 중' },
            { value: 'archived', label: '보관됨', disabled: true },
          ]}
          placeholder="상태 선택"
        />
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6, color: 'var(--sys-content-neutral-default)' }}>
            국가
          </label>
          <Select options={countryOptions} placeholder="국가 선택" appearance="outline" width="fill" />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Select options={statusOptions} placeholder="상태" size="sm" />
          <Select options={priorityOptions} placeholder="우선순위" size="sm" appearance="plain" />
        </div>
      </div>
    </section>
  )
}
