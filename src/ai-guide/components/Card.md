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

숫자 지표를 강조 표시하는 카드.

### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `label` | `string` | — | 상단 레이블 (필수) |
| `value` | `string \| number` | — | 주요 수치 (필수) |
| `unit` | `string` | — | 수치 뒤 단위 (만원, 명, % 등) |
| `delta` | `string` | — | 하단 변화량 텍스트 |
| `deltaType` | `'positive' \| 'negative' \| 'neutral'` | `'neutral'` | 변화량 색상 |

### 사용 예시

```tsx
// 증가 (초록)
<KpiCard label="총 매출" value="1,284" unit="만원" delta="+12.3% 전월 대비" deltaType="positive" />

// 감소 (빨강)
<KpiCard label="신규 회원" value="342" unit="명" delta="-5.1% 전월 대비" deltaType="negative" />

// delta 없음
<KpiCard label="완료율" value="94.2" unit="%" />
```

## NOT in Figma (avoid)

- Figma 디자인 없음 — sys 토큰 기반 composition 컴포넌트
- `Card` 내부에 `KpiCard` 중첩 — 두 컴포넌트는 독립적으로 사용
