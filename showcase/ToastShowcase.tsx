import { Toast } from '../src/components/Toast/Toast'

function ToastActionBtn({ children, onClick }: { children: string; onClick?: () => void }) {
  return (
    <button type="button" className="toast__action-btn" onClick={onClick}>
      {children}
    </button>
  )
}

export function ToastShowcase() {
  return (
    <section>
      <h2>Toast</h2>

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
