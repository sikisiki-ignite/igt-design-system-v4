import { useState } from 'react'
import { Card, KpiCard } from '../src/components/Card/Card'
import { Button } from '../src/components/Button/Button'

const FILTER_ITEMS = [
  { id: 'all',     label: '전체',         value: '12',    unit: '건', subInfo: '용인 스탁 허브 6 | 부평 CXP 6' },
  { id: 'pending', label: '명의이전대기',  value: '2',     unit: '건', subInfo: '용인 스탁 허브 1 | 부평 CXP 1' },
  { id: 'pay',     label: '대금지급요청대기', value: '2',  unit: '건', subInfo: '용인 스탁 허브 1 | 부평 CXP 1' },
  { id: 'doc',     label: '증서 미등록',   value: '2',     unit: '건', subInfo: '용인 스탁 허브 2 | 부평 CXP 0' },
  { id: 'fail',    label: '대금지급실패',  value: '3',     unit: '건', subInfo: '용인 스탁 허브 0 | 부평 CXP 3' },
]

export function CardShowcase() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedCtxFilter, setSelectedCtxFilter] = useState('all')

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

      {/* KPI Card — Selectable (필터 카드) */}
      <div>
        <p className="sc-section-label">KPI Card — Selectable (필터 카드)</p>
        <div style={{ display: 'flex', gap: 'var(--spacing-12)', overflowX: 'auto' }}>
          {FILTER_ITEMS.map(item => (
            <KpiCard
              key={item.id}
              label={item.label}
              value={item.value}
              unit={item.unit}
              subInfo={item.subInfo}
              selectable
              selected={selectedFilter === item.id}
              onSelect={() => setSelectedFilter(item.id)}
            />
          ))}
        </div>
      </div>

      {/* KPI Card Selectable — 페이지 컨텍스트 배치 */}
      <div>
        <p className="sc-section-label">KPI Card Selectable — 페이지 컨텍스트 배치</p>

        {/* 페이지 프레임 시뮬레이션 */}
        <div style={{
          background: 'var(--sys-container-neutral-tint-default)',
          borderRadius: 12,
          padding: 'var(--spacing-48)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-24)',
        }}>

          {/* 타이틀 영역 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--semantic-heading-24-bold-fontFamily)',
              fontSize: 'var(--semantic-heading-24-bold-fontSize)',
              lineHeight: 'var(--semantic-heading-24-bold-lineHeight)',
              fontWeight: 'var(--semantic-heading-24-bold-fontWeight)',
              color: 'var(--sys-content-neutral-strong)',
            }}>
              명의이전 조회 (판매)
            </h1>
          </div>

          {/* KPI 카드 row + 필터 영역: gap 16 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>

            {/* KPI 카드 row: 카드 간 gap 12 */}
            <div style={{ display: 'flex', gap: 'var(--spacing-12)', overflowX: 'auto' }}>
              {FILTER_ITEMS.map(item => (
                <KpiCard
                  key={item.id}
                  label={item.label}
                  value={item.value}
                  unit={item.unit}
                  subInfo={item.subInfo}
                  selectable
                  selected={selectedCtxFilter === item.id}
                  onSelect={() => setSelectedCtxFilter(item.id)}
                />
              ))}
            </div>

            {/* 필터 영역 */}
            <div style={{
              background: 'var(--layout-card-color-container)',
              border: 'var(--borderWidth-1) solid var(--layout-card-color-border)',
              borderRadius: 'var(--layout-card-size-radius)',
              padding: 'var(--spacing-24)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-16)',
            }}>
              {/* 필터 행 placeholder */}
              {['매매사 등록지', '명의이전 상태', '기간', '검색'].map(label => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
                  <span style={{
                    flexShrink: 0,
                    width: 120,
                    fontFamily: 'var(--semantic-label-13-medium-fontFamily)',
                    fontSize: 'var(--semantic-label-13-medium-fontSize)',
                    fontWeight: 'var(--semantic-label-13-medium-fontWeight)',
                    color: 'var(--sys-content-neutral-muted)',
                  }}>
                    {label}
                  </span>
                  <div style={{
                    flex: 1,
                    height: 36,
                    background: 'var(--sys-container-neutral-tint-default)',
                    borderRadius: 6,
                  }} />
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* 간격 명세 */}
        <div style={{
          marginTop: 12,
          display: 'flex',
          gap: 24,
          fontFamily: 'var(--semantic-label-13-medium-fontFamily)',
          fontSize: 'var(--semantic-label-13-medium-fontSize)',
          color: 'var(--sys-content-neutral-subtle)',
        }}>
          <span>카드 간 간격: <code>var(--spacing-12)</code> (12px)</span>
          <span>KPI 영역 → 필터 영역: <code>var(--spacing-16)</code> (16px)</span>
        </div>
      </div>

    </div>
  )
}
