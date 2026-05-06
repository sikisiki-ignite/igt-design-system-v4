import { useState, useRef } from 'react'
import { Toast } from '../src/components/Toast/Toast'
import { Button } from '../src/components/Button/Button'

function ToastActionBtn({ children, onClick }: { children: string; onClick?: () => void }) {
  return (
    <button type="button" className="toast__action-btn" onClick={onClick}>
      {children}
    </button>
  )
}

export function ToastShowcase() {
  const [singleVisible, setSingleVisible] = useState(false)
  const [undoVisible, setUndoVisible] = useState(false)
  const [toasts, setToasts] = useState<Array<{ id: number; message: string }>>([])
  const toastIdRef = useRef(0)

  function showSingle() {
    setSingleVisible(true)
    setTimeout(() => setSingleVisible(false), 3000)
  }

  function addToast(message: string) {
    const id = ++toastIdRef.current
    setToasts(prev => [...prev, { id, message }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }

  function dismissToast(id: number) {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <section>
      <h2>Toast</h2>

      {/* ── 트리거 — 단건 auto-dismiss (3초) ── */}
      <h3>트리거 — 단건 auto-dismiss</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button tone="primary" appearance="fill" size="md" onClick={showSingle}>저장</Button>
      </div>
      {singleVisible && (
        <div style={{ marginTop: 12 }}>
          <Toast type="success" message="저장되었어요" dismissible onDismiss={() => setSingleVisible(false)} />
        </div>
      )}

      {/* ── 트리거 — 다건 쌓기 ── */}
      <h3>트리거 — 다건 쌓기</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button tone="secondary" appearance="outline" size="md" onClick={() => addToast('파일이 업로드되었어요')}>업로드</Button>
        <Button tone="secondary" appearance="outline" size="md" onClick={() => addToast('링크가 복사되었어요')}>링크 복사</Button>
        <Button tone="danger" appearance="outline" size="md" onClick={() => addToast('오류가 발생했어요')}>오류 발생</Button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
        {toasts.map(t => (
          <Toast key={t.id} type="neutral" message={t.message} dismissible onDismiss={() => dismissToast(t.id)} />
        ))}
      </div>

      {/* ── 트리거 — 실행 취소 (수동 dismiss) ── */}
      <h3>트리거 — 실행 취소 (수동 dismiss)</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button tone="secondary" appearance="outline" size="md" onClick={() => setUndoVisible(true)}>항목 삭제</Button>
      </div>
      {undoVisible && (
        <div style={{ marginTop: 12 }}>
          <Toast
            type="neutral"
            message="항목이 삭제되었어요"
            action={<ToastActionBtn onClick={() => setUndoVisible(false)}>실행 취소</ToastActionBtn>}
            dismissible
            onDismiss={() => setUndoVisible(false)}
          />
        </div>
      )}

      <h3>Type</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        {(['error', 'warning', 'info', 'success', 'neutral'] as const).map(type => (
          <Toast key={type} type={type} message={`type=${type} 메시지입니다`} />
        ))}
      </div>

      <h3>dismissible=true</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Toast type="success" message="저장되었어요" dismissible />
        <Toast type="error" message="오류가 발생했어요. 다시 시도해 주세요" dismissible />
      </div>

      <h3>action 슬롯</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <Toast
          type="info"
          message="새 메시지가 도착했어요"
          action={<ToastActionBtn>확인</ToastActionBtn>}
        />
        <Toast
          type="success"
          message="인증 이메일이 발송되었어요"
          action={<ToastActionBtn>확인</ToastActionBtn>}
        />
        <Toast
          type="neutral"
          message="변경 사항이 저장되었어요"
          action={<ToastActionBtn>실행 취소</ToastActionBtn>}
        />
      </div>
    </section>
  )
}
