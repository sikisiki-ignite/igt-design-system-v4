import { useState } from 'react'
import { Search } from '../src/components/Search/Search'

export function SearchShowcase() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])

  const handleSearch = (value: string) => {
    if (value.trim()) {
      setResults(['검색 결과 1', '검색 결과 2', '검색 결과 3'].map(r => `"${value}" - ${r}`))
    } else {
      setResults([])
    }
  }

  return (
    <section>
      <h2>Search</h2>

      {/* ── Appearance × Size ── */}
      <h3>Appearance × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        {(['fill', 'outline'] as const).map(appearance => (
          <div key={appearance}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>appearance={appearance}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(['sm', 'md', 'lg'] as const).map(size => (
                <Search
                  key={size}
                  appearance={appearance}
                  size={size}
                  placeholder={`size=${size} 검색`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── States ── */}
      <h3 style={{ marginTop: 32 }}>States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 400 }}>
        <Search placeholder="Normal" />
        <Search placeholder="With value" value="검색어 입력됨" onClear={() => {}} />
        <Search placeholder="Invalid" invalid />
        <Search placeholder="Disabled" disabled />
        <Search placeholder="ReadOnly" value="읽기 전용" readOnly />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 32 }}>Interactive (Enter to search)</h3>
      <div style={{ maxWidth: 480 }}>
        <Search
          value={query}
          placeholder="검색어를 입력하고 Enter"
          onChange={e => setQuery(e.target.value)}
          onClear={() => { setQuery(''); setResults([]) }}
          onSearch={handleSearch}
        />
        {results.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {results.map((r, i) => (
              <div key={i} style={{ padding: '10px 12px', border: '1px solid var(--sys-border-neutral-muted)', borderRadius: 8, fontSize: 14, color: 'var(--sys-content-neutral-default)' }}>
                {r}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시</h3>
      <div style={{ maxWidth: 480 }}>
        <Search size="lg" placeholder="팀원, 프로젝트, 문서 검색..." />
        <div style={{ marginTop: 20 }}>
          <Search size="sm" appearance="outline" placeholder="테이블 내 검색" />
        </div>
      </div>
    </section>
  )
}
