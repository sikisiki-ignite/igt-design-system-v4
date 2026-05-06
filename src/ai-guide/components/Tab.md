<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:02:00.932Z -->

# Tab

탭 네비게이션. 선택된 탭 아래 인디케이터(언더라인)와 트랙을 표시한다.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `tabs` | `TabItem[]` | required | (Tab 1~5 items) |
| `activeIndex` | `number` | `0` | Selected |
| `onTabChange` | `(index: number) => void` | — | — |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | Size |
| `distribution` | `'content' \| 'equal'` | `'content'` | Distribution |
| `className` | `string` | — | — |

### TabItem

| field | type | 설명 |
|-------|------|------|
| `label` | `string` | 탭 텍스트 |
| `count` | `number?` | 뱃지 숫자 |
| `disabled` | `boolean?` | 비활성화 |

## 크기별 높이

| size | 아이템 높이 | 타이포그래피 |
|------|-----------|-----------|
| `sm` | 32px | `--semantic-label-14-semibold` |
| `md` | 40px | `--semantic-label-15-semibold` |
| `lg` | 48px | `--semantic-label-17-semibold` |

## Distribution

- `content`: 탭 너비 = 컨텐츠 기준 (기본)
- `equal`: 각 탭이 동일 너비 (`flex: 1`)

## 사용 예시

```tsx
<Tab
  tabs={[
    { label: '전체' },
    { label: '진행중', count: 3 },
    { label: '완료', disabled: true },
  ]}
  activeIndex={activeTab}
  onTabChange={setActiveTab}
  size="lg"
/>
```

## NOT in Figma (avoid)

- 탭 아이콘 — Figma 미정의
- 스크롤 가능한 탭 — Figma 미정의
