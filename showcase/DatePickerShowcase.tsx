import { useState } from 'react'
import { DatePicker } from '../src/components/DatePicker/DatePicker'

export function DatePickerShowcase() {
  const [date, setDate] = useState('')
  const [rangeStart, setRangeStart] = useState('')
  const [rangeEnd, setRangeEnd] = useState('')

  return (
    <section>
      <h2>DatePicker</h2>

      {/* ── Variation × Size ── */}
      <h3>Variation × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {(['singleDate', 'range'] as const).map(variation => (
          <div key={variation}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>
              variation={variation}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(['lg', 'md'] as const).map(size => (
                <DatePicker
                  key={size}
                  variation={variation}
                  size={size}
                  placeholder={`size=${size} YYYY.MM.DD`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── States ── */}
      <h3 style={{ marginTop: 32 }}>States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <DatePicker label="날짜 선택" placeholder="YYYY.MM.DD" />
        <DatePicker label="값 있음" value="2026.05.04" />
        <DatePicker label="Helper text" message="날짜를 선택해 주세요" />
        <DatePicker label="Invalid" invalid message="올바른 날짜를 선택해 주세요" />
        <DatePicker label="Disabled" disabled />
        <DatePicker label="ReadOnly" value="2026.05.04" readOnly />
      </div>

      {/* ── Interactive single ── */}
      <h3 style={{ marginTop: 32 }}>Interactive (단일 날짜)</h3>
      <div style={{ maxWidth: 320 }}>
        <DatePicker
          label="날짜 선택"
          value={date}
          onChange={setDate}
          placeholder="YYYY.MM.DD"
        />
        {date && (
          <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
            선택된 날짜: {date}
          </div>
        )}
      </div>

      {/* ── Interactive range ── */}
      <h3 style={{ marginTop: 32 }}>Interactive (기간 선택)</h3>
      <div style={{ maxWidth: 480 }}>
        <DatePicker
          label="기간 선택"
          variation="range"
          value={rangeStart}
          endValue={rangeEnd}
          onRangeChange={(start, end) => { setRangeStart(start); setRangeEnd(end) }}
          placeholder="시작일"
          endPlaceholder="종료일"
        />
        {(rangeStart || rangeEnd) && (
          <div style={{ marginTop: 8, fontSize: 13, color: '#666' }}>
            {rangeStart} ~ {rangeEnd}
          </div>
        )}
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <div>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6, color: 'var(--sys-content-neutral-default)' }}>
            프로젝트 기간
          </label>
          <DatePicker variation="range" placeholder="시작일" endPlaceholder="종료일" />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 6, color: 'var(--sys-content-neutral-default)' }}>
              생년월일
            </label>
            <DatePicker size="md" placeholder="YYYY.MM.DD" />
          </div>
        </div>
      </div>
    </section>
  )
}
