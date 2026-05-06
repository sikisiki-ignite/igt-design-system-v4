import { useState } from 'react'
import {
  ActionChip,
  ChoiceChip,
  FilterChip,
  InputChip,
  MetaChip,
  ChipGroup,
} from '../src/components/Chip/Chip'

const sizes = ['xs', 'sm', 'md'] as const

function ChoiceChipDemo({ label }: { label: string }) {
  const [selected, setSelected] = useState(false)
  return (
    <ChoiceChip
      label={label}
      selected={selected}
      onClick={() => setSelected(v => !v)}
    />
  )
}

function FilterChipDemo({ label }: { label: string }) {
  const [selected, setSelected] = useState(false)
  return (
    <FilterChip
      label={label}
      selected={selected}
      trailingIcon="chevronDownOutline3dp"
      onClick={() => setSelected(v => !v)}
    />
  )
}

export function ChipShowcase() {
  const [inputChips, setInputChips] = useState(['React', 'TypeScript', 'Figma'])

  return (
    <section>
      <h2>Chip</h2>

      {/* ── ActionChip ── */}
      <h3>ActionChip — Size × State</h3>
      {sizes.map(size => (
        <div key={size} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>size={size}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <ActionChip size={size} label="액션명" />
            <ActionChip size={size} label="Leading" leadingIcon="hashOutline3dp" />
            <ActionChip size={size} label="Trailing" trailingIcon="chevronDownOutline3dp" />
            <ActionChip size={size} label="Both" leadingIcon="hashOutline3dp" trailingIcon="chevronDownOutline3dp" />
            <ActionChip size={size} label="Disabled" disabled />
          </div>
        </div>
      ))}

      {/* ── ChoiceChip ── */}
      <h3 style={{ marginTop: 32 }}>ChoiceChip (multi-select) — Size × State</h3>
      {sizes.map(size => (
        <div key={size} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>size={size}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <ChoiceChip size={size} label="Unselected" />
            <ChoiceChip size={size} label="Selected" selected leadingIcon="checkOutline3dp" />
            <ChoiceChip size={size} label="With trailing" trailingIcon="chevronDownOutline3dp" />
            <ChoiceChip size={size} label="Disabled" disabled />
            <ChoiceChip size={size} label="Disabled selected" selected disabled />
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>ChoiceChip interactive</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['디자인', '개발', '마케팅', '기획', '운영'].map(label => (
          <ChoiceChipDemo key={label} label={label} />
        ))}
      </div>

      {/* ── FilterChip ── */}
      <h3 style={{ marginTop: 32 }}>FilterChip — Size × State</h3>
      {sizes.map(size => (
        <div key={size} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>size={size}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <FilterChip size={size} label="카테고리" trailingIcon="chevronDownOutline3dp" />
            <FilterChip size={size} label="카테고리" value="디자인" selected trailingIcon="chevronDownOutline3dp" />
            <FilterChip size={size} label="카테고리" trailingIcon="chevronDownOutline3dp" disabled />
            <FilterChip size={size} label="카테고리" value="디자인" selected trailingIcon="chevronDownOutline3dp" disabled />
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>FilterChip interactive</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {['상태', '기간', '담당자', '우선순위'].map(label => (
          <FilterChipDemo key={label} label={label} />
        ))}
      </div>

      {/* ── InputChip ── */}
      <h3 style={{ marginTop: 32 }}>InputChip — Tone × Size</h3>
      {(['neutral', 'accent'] as const).map(tone => (
        <div key={tone} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>tone={tone}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {sizes.map(size => (
              <InputChip
                key={size}
                size={size}
                tone={tone}
                label={`size=${size}`}
                onRemove={() => {}}
              />
            ))}
            <InputChip size="md" tone={tone} label="No remove" />
            <InputChip size="md" tone={tone} label="Disabled" disabled onRemove={() => {}} />
          </div>
        </div>
      ))}

      <h3 style={{ marginTop: 24 }}>InputChip — 태그 입력 예시</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 12, border: '1px dashed #ddd', borderRadius: 8 }}>
        {inputChips.map(chip => (
          <InputChip
            key={chip}
            label={chip}
            tone="accent"
            onRemove={() => setInputChips(prev => prev.filter(c => c !== chip))}
          />
        ))}
        {inputChips.length === 0 && (
          <span style={{ fontSize: 13, color: '#999' }}>모든 태그가 삭제되었습니다</span>
        )}
      </div>

      {/* ── MetaChip ── */}
      <h3 style={{ marginTop: 32 }}>MetaChip — Size × State</h3>
      {sizes.map(size => (
        <div key={size} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 8 }}>size={size}</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <MetaChip size={size} label="상태" value="진행중" />
            <MetaChip size={size} label="담당자" value="홍길동" leadingIcon="hashOutline3dp" />
            <MetaChip size={size} label="기간" value="7일" disabled />
          </div>
        </div>
      ))}

      {/* ── ChipGroup ── */}
      <h3 style={{ marginTop: 32 }}>ChipGroup layout=wrap</h3>
      <div style={{ maxWidth: 400, border: '1px dashed #ddd', padding: 16, borderRadius: 8 }}>
        <ChipGroup layout="wrap" size="md">
          {['전체', '디자인', '개발', '마케팅', '기획', '운영'].map(cat => (
            <ActionChip key={cat} label={cat} />
          ))}
        </ChipGroup>
      </div>

      <h3 style={{ marginTop: 24 }}>ChipGroup layout=scroll</h3>
      <div style={{ maxWidth: 360, border: '1px dashed #ddd', padding: 16, borderRadius: 8 }}>
        <ChipGroup layout="scroll" size="sm">
          {['React', 'TypeScript', 'Figma', 'CSS', 'Tailwind', 'Next.js', 'Node.js'].map(tag => (
            <ActionChip key={tag} size="sm" label={tag} />
          ))}
        </ChipGroup>
      </div>
    </section>
  )
}
