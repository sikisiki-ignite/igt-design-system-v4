import { Skeleton } from '../src/components/Skeleton/Skeleton'

export function SkeletonShowcase() {
  return (
    <section>
      <h2>Skeleton</h2>

      <h3>Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: '#999', width: 24 }}>{size}</span>
            <div style={{ flex: 1 }}>
              <Skeleton size={size} />
            </div>
          </div>
        ))}
      </div>

      <h3>너비 지정</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        <Skeleton size="xl" width="80%" />
        <Skeleton size="md" width="60%" />
        <Skeleton size="md" width="90%" />
        <Skeleton size="sm" width="40%" />
      </div>

      <h3>카드 플레이스홀더 예시</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, padding: 16, border: '1px solid #eee', borderRadius: 8 }}>
        <Skeleton size="xl" />
        <Skeleton size="md" width="80%" />
        <Skeleton size="md" width="60%" />
      </div>
    </section>
  )
}
