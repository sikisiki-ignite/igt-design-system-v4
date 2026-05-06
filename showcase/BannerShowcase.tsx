import { Banner } from '../src/components/Banner/Banner'
import { Button } from '../src/components/Button/Button'

export function BannerShowcase() {
  return (
    <section>
      <h2>Banner</h2>

      <h3>Type × Variant</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {(['error', 'warning', 'info', 'success'] as const).map(type =>
          (['subtle', 'solid'] as const).map(variant => (
            <Banner
              key={`${type}-${variant}`}
              type={type}
              variant={variant}
              title={`type=${type}, variant=${variant}`}
              description="변경된 내용을 확인 후 필요한 조치를 진행해 주세요"
            />
          ))
        )}
      </div>

      <h3>dismissible=false</h3>
      <Banner type="info" title="닫기 버튼 없는 배너" dismissible={false} />

      <h3>description 없음</h3>
      <Banner type="success" title="제목만 있는 배너" />

      <h3>action 슬롯 (subtle)</h3>
      <Banner
        type="error"
        variant="subtle"
        title="오류가 발생했어요"
        description="아래 버튼을 눌러 다시 시도해 주세요"
        action={
          <>
            <Button tone="secondary" appearance="outline" size="sm">취소</Button>
            <Button tone="danger" appearance="fill" size="sm">다시 시도</Button>
          </>
        }
      />

      <h3>action 슬롯 (solid)</h3>
      <Banner
        type="info"
        variant="solid"
        title="새 기능이 출시됐어요"
        description="지금 바로 확인해 보세요"
        action={
          <>
            <Button tone="secondary" appearance="outline" size="sm">나중에</Button>
            <Button tone="primary" appearance="fill" size="sm">확인하기</Button>
          </>
        }
      />
    </section>
  )
}
