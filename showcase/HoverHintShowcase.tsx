import { HoverHint } from '../src/components/HoverHint/HoverHint'

export function HoverHintShowcase() {
  return (
    <section>
      <h2>HoverHint</h2>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>inline (default)</p>
          <HoverHint layout="inline" headline="알림 설정" />
        </div>
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>block</p>
          <HoverHint
            layout="block"
            headline="알림 설정"
            description="중요한 변경 사항을 놓치지 않도록 도와드려요."
          />
        </div>
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>block (headline only)</p>
          <HoverHint layout="block" headline="알림 설정" />
        </div>
      </div>
    </section>
  )
}
