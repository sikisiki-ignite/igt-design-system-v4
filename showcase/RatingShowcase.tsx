import { useState } from 'react'
import { Rating } from '../src/components/Rating/Rating'

function RatingDemo(props: { size?: 'xs' | 'sm' | 'md'; initial?: number }) {
  const [value, setValue] = useState(props.initial ?? 0)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Rating size={props.size} value={value} onChange={setValue} />
      <span style={{ fontSize: 12, color: '#666' }}>{value} / 5</span>
    </div>
  )
}

export function RatingShowcase() {
  return (
    <section>
      <h2>Rating</h2>

      {/* ── Value states ── */}
      <h3>Value (0–5) — md</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {([0, 1, 2, 3, 4, 5] as const).map(v => (
          <div key={v} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Rating value={v} readOnly />
            <span style={{ fontSize: 12, color: '#666' }}>value={v}</span>
          </div>
        ))}
      </div>

      {/* ── Sizes ── */}
      <h3 style={{ marginTop: 32 }}>Sizes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(['xs', 'sm', 'md'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Rating size={size} value={3} readOnly />
            <span style={{ fontSize: 11, color: '#999', textTransform: 'uppercase' }}>size={size}</span>
          </div>
        ))}
      </div>

      {/* ── Disabled ── */}
      <h3 style={{ marginTop: 32 }}>Disabled</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Rating value={0} disabled />
        <Rating value={3} disabled />
        <Rating value={5} disabled />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 32 }}>Interactive</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <RatingDemo size="xs" initial={3} />
        <RatingDemo size="sm" initial={4} />
        <RatingDemo size="md" initial={0} />
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 리뷰 폼</h3>
      <div style={{ maxWidth: 480 }}>
        {[
          { label: '서비스 만족도', size: 'md' as const },
          { label: '배송 속도', size: 'md' as const },
          { label: '가격 대비 품질', size: 'md' as const },
        ].map(({ label, size }) => {
          const [val, setVal] = useState(0)
          return (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--sys-border-neutral-muted)' }}>
              <span style={{ fontSize: 14, color: 'var(--sys-content-neutral-default)' }}>{label}</span>
              <Rating size={size} value={val} onChange={setVal} />
            </div>
          )
        })}
      </div>

      {/* ── Read-only display ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 리뷰 카드</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        {[
          { name: '김민준', rating: 5, comment: '정말 만족스러운 서비스입니다!' },
          { name: '이서연', rating: 4, comment: '전반적으로 좋았어요.' },
          { name: '박지호', rating: 3, comment: '보통이에요.' },
        ].map(({ name, rating, comment }) => (
          <div key={name} style={{ padding: 16, border: '1px solid var(--sys-border-neutral-muted)', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Rating value={rating} size="sm" readOnly />
              <span style={{ fontSize: 12, color: '#999' }}>{name}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--sys-content-neutral-default)' }}>{comment}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
