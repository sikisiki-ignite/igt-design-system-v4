import { StateView } from '../src/components/StateView/StateView'
import { Icon } from '../src/components/Icon/Icon'
import { Button } from '../src/components/Button/Button'

const variantIconMap = {
  error: 'warning',
  empty: 'documentPaperSolid',
} as const

export function StateViewShowcase() {
  return (
    <section>
      <h2>StateView</h2>

      <h3>Variant</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {(['error', 'empty'] as const).map(variant => (
          <div key={variant} style={{ border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 16 }}>variant={variant}</div>
            <StateView
              variant={variant}
              icon={<Icon name={variantIconMap[variant]} size={40} />}
              headline={variant === 'error' ? '일시적으로 정보를 불러오지 못했어요' : '아직 항목이 없어요'}
              body={variant === 'error' ? '시스템에 문제가 생겨 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.' : undefined}
              action={<Button tone="secondary" appearance="fill" emphasis="weak" size="sm">다시 시도</Button>}
            />
          </div>
        ))}
      </div>

      <h3>Density</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {(['standard', 'compact'] as const).map(density => (
          <div key={density} style={{ border: '1px solid #eee', padding: 24, borderRadius: 8 }}>
            <div style={{ fontSize: 11, color: '#999', marginBottom: 16 }}>density={density}</div>
            <StateView
              variant="error"
              density={density}
              icon={<Icon name="warning" size={40} />}
              headline="일시적으로 정보를 불러오지 못했어요"
              body="잠시 후 다시 시도해 주세요."
            />
          </div>
        ))}
      </div>

      <h3>body 없음</h3>
      <StateView
        variant="empty"
        icon={<Icon name="documentPaperSolid" size={40} />}
        headline="아직 항목이 없어요"
      />
    </section>
  )
}
