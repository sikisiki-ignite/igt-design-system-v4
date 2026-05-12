<!-- Composition component | no figma-spec | 2026-05-06 -->

# Card / KpiCard

콘텐츠를 담는 컨테이너 컴포넌트. border-radius는 `data-radius` 테마에 자동 반응.

## Import

```tsx
import { Card, KpiCard } from '@igt/design-system';
```

---

## Card

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `variant` | `'bordered' \| 'shadow'` | `'bordered'` | 외곽선 또는 그림자 |
| `title` | `string` | — | 카드 제목 |
| `description` | `string` | — | 제목 아래 부가 설명 |
| `children` | `ReactNode` | — | 본문 내용 |
| `footer` | `ReactNode` | — | 하단 액션 영역 (버튼 등) |

### 사용 예시

```tsx
// bordered (기본)
<Card title="제목" description="설명">
  본문 내용
</Card>

// shadow
<Card variant="shadow" title="Shadow Card">
  그림자 스타일 카드
</Card>

// footer에 버튼
<Card
  title="확인이 필요합니다"
  footer={
    <>
      <Button appearance="outline">취소</Button>
      <Button>확인</Button>
    </>
  }
>
  본문 내용
</Card>
```

---

## KpiCard

숫자 지표를 강조 표시하는 카드. `selectable` 모드에서는 목록 상단의 상태별 필터 카드로 동작한다.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 상단 레이블 (필수) |
| `value` | `string \| number` | — | 주요 수치 (필수) |
| `unit` | `string` | — | 수치 뒤 단위 (만원, 명, % 등) |
| `delta` | `string` | — | 하단 변화량 텍스트 (`subInfo`와 함께 쓰지 않는다) |
| `deltaType` | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` | 변화량 색상 |
| `subInfo` | `string` | — | 하단 보조 정보 (예: "용인 스탁 허브 6 \| 부평 CXP 6") |
| `selectable` | `boolean` | — | 클릭 가능한 필터 카드 모드. `true`이면 `<button>`으로 렌더 |
| `selected` | `boolean` | — | 선택 상태 (`selectable=true`일 때만 유효) |
| `onSelect` | `() => void` | — | 선택 핸들러 |

### 사용 예시

```tsx
// 증가 (초록)
<KpiCard label="총 매출" value="1,284" unit="만원" delta="+12.3% 전월 대비" deltaType="positive" />

// 감소 (빨강)
<KpiCard label="신규 회원" value="342" unit="명" delta="-5.1% 전월 대비" deltaType="negative" />

// delta 없음
<KpiCard label="완료율" value="94.2" unit="%" />

// 필터 카드 (단일 선택 radio 패턴)
const [selected, setSelected] = useState('all')

<div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
  <KpiCard
    label="전체"
    value="12"
    unit="건"
    subInfo="용인 스탁 허브 6 | 부평 CXP 6"
    selectable
    selected={selected === 'all'}
    onSelect={() => setSelected('all')}
  />
  <KpiCard
    label="명의이전대기"
    value="2"
    unit="건"
    subInfo="용인 스탁 허브 1 | 부평 CXP 1"
    selectable
    selected={selected === 'pending'}
    onSelect={() => setSelected('pending')}
  />
</div>
```

## KpiCard Selectable — 페이지 컨텍스트 배치 규칙

KpiCard selectable 행을 페이지에 배치할 때 반드시 아래 간격을 따른다.

| 위치 | 토큰 | 값 | 설명 |
|------|------|----|------|
| 카드 간 간격 (row gap) | `var(--spacing-12)` | 12px | KpiCard row의 `gap` |
| KPI 행 → 필터 섹션 | `var(--spacing-16)` | 16px | KPI row와 filter section 사이 `gap` |

```tsx
{/* KPI 카드 row + 필터: 두 요소를 column gap 16으로 묶는다 */}
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
        selected={selectedCard === item.id}
        onSelect={() => setSelectedCard(item.id)}
      />
    ))}
  </div>

  {/* 필터 섹션 */}
  <div className="filter-section">...</div>
</div>
```

## NOT in Figma (avoid)

- Figma 디자인 없음 — sys 토큰 기반 composition 컴포넌트
- `Card` 내부에 `KpiCard` 중첩 — 두 컴포넌트는 독립적으로 사용
- `delta`와 `subInfo`를 동시에 사용 — 의미가 충돌함 (delta=변화량, subInfo=내역/구성)
- `selectable` 없이 `selected` / `onSelect` 전달 — 의미 없음, selectable 함께 전달
