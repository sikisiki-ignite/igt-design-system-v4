import { useState } from 'react'
import { Dialog, DialogProps } from '../src/components/Dialog/Dialog'
import { Button } from '../src/components/Button/Button'
import { TextField } from '../src/components/TextField/TextField'

type DialogKey = string

export function DialogShowcase() {
  const [openKey, setOpenKey] = useState<DialogKey | null>(null)

  function open(key: DialogKey) { setOpenKey(key) }
  function close() { setOpenKey(null) }

  const cases: Array<{
    key: DialogKey
    label: string
    props: Omit<DialogProps, 'open' | 'onOpenChange' | 'onPrimary' | 'onSecondary'>
  }> = [
    {
      key: 'sm-primary',
      label: 'sm · primary (confirm)',
      props: {
        size: 'sm',
        variation: 'primary',
        title: '현재 편집 중인 내용이 저장되지 않았어요',
        description: '이 페이지를 벗어나면 변경 사항이 모두 사라져요. 계속 진행할까요?',
        primaryLabel: '계속',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'sm-danger',
      label: 'sm · danger (destructive confirm)',
      props: {
        size: 'sm',
        variation: 'danger',
        title: '계정을 삭제할까요?',
        description: '삭제된 계정은 복구할 수 없어요. 정말 삭제하시겠어요?',
        primaryLabel: '삭제',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'sm-neutral',
      label: 'sm · neutral (low-emphasis)',
      props: {
        size: 'sm',
        variation: 'neutral',
        title: '변경 사항을 저장하지 않을까요?',
        description: '작업 내용이 사라져요.',
        primaryLabel: '저장 안 함',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'md-primary-close',
      label: 'md · primary + 닫기 버튼',
      props: {
        size: 'md',
        variation: 'primary',
        showCloseButton: true,
        title: '모달 다이얼로그',
        description: 'md 사이즈는 520px 폭의 모달로 사용됩니다. 닫기 버튼이 우상단에 표시됩니다.',
        primaryLabel: '확인',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'md-danger-close',
      label: 'md · danger + 닫기 버튼',
      props: {
        size: 'md',
        variation: 'danger',
        showCloseButton: true,
        title: '서비스를 해지하시겠어요?',
        description: '해지 시 모든 데이터가 영구적으로 삭제됩니다.',
        primaryLabel: '해지하기',
        secondaryLabel: '유지하기',
      },
    },
    {
      key: 'md-neutral-close',
      label: 'md · neutral + 닫기 버튼',
      props: {
        size: 'md',
        variation: 'neutral',
        showCloseButton: true,
        title: '설정 초기화',
        description: '모든 설정을 기본값으로 되돌립니다.',
        primaryLabel: '초기화',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'lg-primary-close',
      label: 'lg · primary + 닫기 버튼',
      props: {
        size: 'lg',
        variation: 'primary',
        showCloseButton: true,
        title: '대형 다이얼로그',
        description: 'lg 사이즈는 720px 폭입니다. 복잡한 콘텐츠를 포함할 때 사용하세요.',
        primaryLabel: '저장',
        secondaryLabel: '취소',
      },
    },
    {
      key: 'sm-primary-only',
      label: 'sm · primary 버튼만',
      props: {
        size: 'sm',
        variation: 'primary',
        title: '업데이트가 완료되었어요',
        description: '새로운 기능을 사용할 수 있습니다.',
        primaryLabel: '확인',
      },
    },
    {
      key: 'md-form',
      label: 'md · children 슬롯 (폼)',
      props: {
        size: 'md',
        variation: 'primary',
        showCloseButton: true,
        title: '사용자 정보 수정',
        primaryLabel: '저장',
        secondaryLabel: '취소',
        children: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <TextField label="이름" indicator="required" placeholder="홍길동" />
            <TextField label="이메일" indicator="required" placeholder="name@example.com" />
            <TextField label="부서" indicator="optional" placeholder="개발팀" />
          </div>
        ),
      },
    },
  ]

  return (
    <section>
      <h2>Dialog</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {cases.map((c) => (
          <Button
            key={c.key}
            tone="secondary"
            appearance="outline"
            onClick={() => open(c.key)}
          >
            {c.label}
          </Button>
        ))}
      </div>

      {cases.map((c) => (
        <Dialog
          key={c.key}
          open={openKey === c.key}
          onOpenChange={(o) => !o && close()}
          onPrimary={close}
          onSecondary={close}
          {...c.props}
        />
      ))}
    </section>
  )
}
