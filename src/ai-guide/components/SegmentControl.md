<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:02:31.424Z -->

# SegmentControl

세그먼트 컨트롤 (Indicator 스타일). 선택된 세그먼트에 흰색 필 + 그림자가 적용된다.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `segments` | `SegmentItem[]` | required | (Item 1~5) |
| `activeIndex` | `number` | `0` | isSelected |
| `onSegmentChange` | `(index: number) => void` | — | — |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `width` | `'content' \| 'equal'` | `'content'` | Width |
| `content` | `'text' \| 'iconText' \| 'icon'` | `'text'` | Content |
| `className` | `string` | — | — |

### SegmentItem

| field | type | 설명 |
|-------|------|------|
| `label` | `string?` | 텍스트 (text, iconText 모드) |
| `icon` | `IconName?` | 아이콘 (iconText, icon 모드) |
| `disabled` | `boolean?` | 비활성화 |

## 크기별 규격

| size | 컨테이너 높이 | 타이포그래피 |
|------|------------|-----------|
| `xs` | 28px | `--semantic-label-12-semibold` |
| `sm` | 34px | `--semantic-label-14-semibold` |
| `md` | 40px | `--semantic-label-15-semibold` |

## 사용 예시

```tsx
<SegmentControl
  segments={[{ label: '일' }, { label: '주' }, { label: '월' }]}
  activeIndex={period}
  onSegmentChange={setPeriod}
  size="md"
/>
```

## NOT in Figma (avoid)

- `basic` 스타일 (보더 기반) — 별도 variant; 현재 구현은 Indicator(플로팅 필) 스타일만
