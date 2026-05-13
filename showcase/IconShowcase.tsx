import { useMemo, useState } from 'react'
import { Icon } from '../src/components/Icon/Icon'
import { icons, type IconName } from '../src/icons/icons'

const ALL_NAMES = Object.keys(icons) as IconName[]

function getCategory(name: string): string {
  const match = name.match(/^([a-z]+)/)
  if (!match) return 'other'
  return match[1]
}

const CATEGORIES = Array.from(new Set(ALL_NAMES.map(getCategory))).sort()

export function IconShowcase() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_NAMES.filter(name => {
      if (activeCategory !== 'all' && getCategory(name) !== activeCategory) return false
      if (q && !name.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, activeCategory])

  const grouped = useMemo(() => {
    const map = new Map<string, IconName[]>()
    for (const name of filtered) {
      const cat = getCategory(name)
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(name)
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]))
  }, [filtered])

  const copyName = (name: string) => {
    navigator.clipboard?.writeText(name)
  }

  return (
    <div>
      <div className="sc-page-title">Icon Showcase</div>
      <p style={{ color: 'var(--sys-content-neutral-muted)', marginTop: 0 }}>
        총 <strong>{ALL_NAMES.length}</strong>개 아이콘. 클릭하면 이름이 클립보드에 복사됩니다.
      </p>

      <div className="sc-section">
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="아이콘 이름 검색 (예: chevron, calendar)"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1,
              minWidth: 240,
              padding: '8px 12px',
              border: '1px solid var(--sys-border-neutral-default)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--sys-background-base)',
              color: 'var(--sys-content-neutral-default)',
              fontFamily: 'inherit',
              fontSize: 14,
            }}
          />
          <select
            value={activeCategory}
            onChange={e => setActiveCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid var(--sys-border-neutral-default)',
              borderRadius: 'var(--radius-md)',
              background: 'var(--sys-background-base)',
              color: 'var(--sys-content-neutral-default)',
              fontFamily: 'inherit',
              fontSize: 14,
            }}
          >
            <option value="all">전체 카테고리 ({ALL_NAMES.length})</option>
            {CATEGORIES.map(cat => {
              const count = ALL_NAMES.filter(n => getCategory(n) === cat).length
              return <option key={cat} value={cat}>{cat} ({count})</option>
            })}
          </select>
        </div>

        <div style={{ color: 'var(--sys-content-neutral-muted)', fontSize: 13, marginBottom: 12 }}>
          {filtered.length}개 표시 중
        </div>

        {grouped.length === 0 ? (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--sys-content-neutral-muted)' }}>
            일치하는 아이콘이 없습니다.
          </div>
        ) : (
          grouped.map(([category, names]) => (
            <div key={category} style={{ marginBottom: 32 }}>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--sys-content-neutral-muted)',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginBottom: 12,
                paddingBottom: 6,
                borderBottom: '1px solid var(--sys-border-neutral-subtle)',
              }}>
                {category} <span style={{ fontWeight: 400 }}>· {names.length}</span>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 8,
              }}>
                {names.map(name => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => copyName(name)}
                    title={`클릭하여 복사: ${name}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 8px',
                      border: '1px solid var(--sys-border-neutral-subtle)',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--sys-background-base)',
                      color: 'var(--sys-content-neutral-default)',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--sys-border-brand-default)'
                      e.currentTarget.style.background = 'var(--sys-background-brand-subtle)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--sys-border-neutral-subtle)'
                      e.currentTarget.style.background = 'var(--sys-background-base)'
                    }}
                  >
                    <Icon name={name} size={24} aria-hidden />
                    <span style={{
                      fontSize: 11,
                      color: 'var(--sys-content-neutral-muted)',
                      wordBreak: 'break-all',
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}>
                      {name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
