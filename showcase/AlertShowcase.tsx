import { useState } from 'react'
import { Alert } from '../src/components/Alert/Alert'
import { Button } from '../src/components/Button/Button'

export function AlertShowcase() {
  const [warningVisible, setWarningVisible] = useState(true)
  const [errorVisible, setErrorVisible] = useState(true)

  return (
    <section>
      <h2>Alert</h2>

      {/* ── dismissible + onDismiss 상태 관리 ── */}
      <h3>dismissible + onDismiss 상태 관리</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {warningVisible ? (
          <Alert
            type="warning"
            title="인증이 만료될 예정이에요"
            description="30분 후 자동으로 로그아웃됩니다"
            dismissible
            onDismiss={() => setWarningVisible(false)}
          />
        ) : (
          <Button tone="secondary" appearance="outline" size="sm" onClick={() => setWarningVisible(true)}>경고 알림 다시 보기</Button>
        )}
        {errorVisible ? (
          <Alert
            type="error"
            title="저장에 실패했어요"
            description="네트워크 연결을 확인하고 다시 시도해 주세요"
            dismissible
            onDismiss={() => setErrorVisible(false)}
          />
        ) : (
          <Button tone="secondary" appearance="outline" size="sm" onClick={() => setErrorVisible(true)}>오류 알림 다시 보기</Button>
        )}
      </div>

      <h3>Type</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(['error', 'warning', 'info', 'success', 'neutral'] as const).map(type => (
          <Alert
            key={type}
            type={type}
            title={`type=${type} 알림 제목`}
            description="변경된 내용을 확인 후 필요한 조치를 진행해 주세요"
          />
        ))}
      </div>

      <h3>hasLeading=false</h3>
      <Alert type="error" title="아이콘 없는 알림" hasLeading={false} />

      <h3>dismissible=false</h3>
      <Alert type="info" title="닫기 버튼 없는 알림" dismissible={false} />

      <h3>description 없음</h3>
      <Alert type="success" title="제목만 있는 알림" />

      <h3>action 슬롯 (취소 + 확인)</h3>
      <Alert
        type="error"
        title="진행 상태가 변경되었어요"
        description="변경된 내용을 확인 후 필요한 조치를 진행해 주세요"
        action={
          <>
            <Button tone="secondary" appearance="outline" size="sm">취소</Button>
            <Button tone="danger" appearance="fill" size="sm">확인</Button>
          </>
        }
      />

      <h3>action 슬롯 (warning)</h3>
      <Alert
        type="warning"
        title="인증이 만료될 예정이에요"
        description="30분 후 자동으로 로그아웃됩니다"
        action={
          <>
            <Button tone="secondary" appearance="outline" size="sm">나중에</Button>
            <Button tone="primary" appearance="fill" size="sm">연장하기</Button>
          </>
        }
      />
    </section>
  )
}
