import { Card, KpiCard } from '../src/components/Card/Card'
import { Button } from '../src/components/Button/Button'

export function CardShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>

      {/* 기본 Card */}
      <div>
        <p className="sc-section-label">기본 Card</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <Card
            title="Card Title"
            description="Card description goes here"
            footer={<Button size="md">Action</Button>}
          >
            Card content with some information.
          </Card>

          <Card
            title="카드 제목"
            description="카드에 대한 부가 설명을 여기에 씁니다"
            footer={
              <>
                <Button size="md" appearance="outline">취소</Button>
                <Button size="md">확인</Button>
              </>
            }
          >
            카드 본문 내용이 여기에 들어갑니다.
          </Card>

          <Card variant="shadow" title="Shadow Card">
            border 없음, 그림자 있음
            <br /><br />
            shadow + bordered=false 카드
          </Card>
        </div>
      </div>

      {/* KPI Card */}
      <div>
        <p className="sc-section-label">KPI Card</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <KpiCard
            label="총 매출"
            value="1,284"
            unit="만원"
            delta="+12.3% 전월 대비"
            deltaType="positive"
          />
          <KpiCard
            label="신규 회원"
            value="342"
            unit="명"
            delta="-5.1% 전월 대비"
            deltaType="negative"
          />
          <KpiCard
            label="처리 건수"
            value="8,921"
            unit="건"
            delta="±0% 전월 동일"
            deltaType="neutral"
          />
          <KpiCard
            label="완료율"
            value="94.2"
            unit="%"
          />
        </div>
      </div>

    </div>
  )
}
