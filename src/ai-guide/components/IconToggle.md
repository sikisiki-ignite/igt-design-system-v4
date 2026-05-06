<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:47:17.060Z -->

# IconToggle

아이콘 전용 토글 버튼. 좋아요·북마크·리액션 등 선택 상태가 있는 아이콘 인터랙션에 사용.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `intent` | `'reaction' \| 'accent' \| 'neutral'` | `'reaction'` | Intent |
| `selected` | `boolean` | `false` | Selected |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `iconName` | `IconName` | — | Icon layer (필수) |
| `disabled` | `boolean` | — | HTML native |

## Intent 의미

| intent | 선택 전 | 선택 후 | 용도 |
|--------|--------|--------|------|
| `reaction` | neutral | brand(강조) | 좋아요·박수·이모지 반응 |
| `accent` | neutral | accent 색상 | 즐겨찾기·강조 표시 |
| `neutral` | neutral | neutral(진해짐) | 토글 스위치 대체 |

## Usage

```tsx
// 좋아요 버튼 (reaction)
<IconToggle
  iconName="heartOutline3dp"
  selected={liked}
  onClick={toggleLike}
  aria-label="좋아요"
/>

// 북마크 (accent)
<IconToggle
  intent="accent"
  iconName="bookmarkOutline3dp"
  selected={saved}
  onClick={toggleSave}
  aria-label="저장"
/>

// Neutral toggle
<IconToggle
  intent="neutral"
  iconName="pinOutline3dp"
  selected={pinned}
  onClick={togglePin}
  aria-label="고정"
/>

// Size
<IconToggle iconName="heartOutline3dp" size="sm" aria-label="좋아요" />
<IconToggle iconName="heartOutline3dp" size="xs" aria-label="좋아요" />

// Disabled
<IconToggle iconName="heartOutline3dp" disabled aria-label="좋아요" />
```

## CSS classes

| Class | Role |
|-------|------|
| `.icon-toggle` | Root button |
| `.icon-toggle__icon` | 아이콘 wrapper |
| `.icon-toggle__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-intent` | reaction, accent, neutral | 색상 의미 |
| `data-selected` | true, false | 선택 상태 |
| `data-size` | xs, sm, md | 크기 |

## NOT in Figma (avoid)

- `Focus` prop — CSS `:focus-visible`로 처리
- `Interaction` prop — hover/pressed/disabled는 CSS pseudo-class로 처리
- 레이블 텍스트 — 아이콘 전용 컴포넌트, `aria-label` 속성으로 접근성 제공
