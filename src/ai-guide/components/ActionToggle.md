<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:53:48.619Z -->

# ActionToggle

토글 가능한 액션 버튼. 팔로우·구독 등 선택 상태가 있는 CTA에 사용. 아이콘+텍스트 또는 아이콘만 표시.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `emphasis` | `'onDefault' \| 'onSelect'` | `'onDefault'` | Emphasis |
| `selected` | `boolean` | `false` | Selected |
| `iconOnly` | `boolean` | `false` | IconOnly |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `iconName` | `IconName` | — | LeadingIcon (필수) |
| `disabled` | `boolean` | — | Disabled (HTML native) |
| `children` | `ReactNode` | — | 레이블 텍스트 (iconOnly=false일 때 표시) |

## Emphasis 의미

| emphasis | 선택 전 | 선택 후 |
|----------|--------|--------|
| `onDefault` | brand color(채워짐) | neutral(비워짐) — 기본 선택 CTA |
| `onSelect` | neutral(비워짐) | brand color(채워짐) — 관심 추가/팔로우 |

## Usage

```tsx
// 기본 (onDefault · 비선택 = brand 강조)
<ActionToggle
  iconName="plusOutline3dp"
  selected={following}
  onClick={() => setFollowing(v => !v)}
>
  팔로우
</ActionToggle>

// onSelect emphasis (비선택 = neutral, 선택 = brand)
<ActionToggle
  emphasis="onSelect"
  iconName="heartOutline3dp"
  selected={liked}
  onClick={toggleLike}
>
  좋아요
</ActionToggle>

// Icon only
<ActionToggle
  iconOnly
  iconName="bookmarkOutline3dp"
  selected={saved}
  onClick={toggleSave}
  aria-label="저장"
/>

// Size
<ActionToggle iconName="plusOutline3dp" size="sm">팔로우</ActionToggle>
<ActionToggle iconName="plusOutline3dp" size="xs">팔로우</ActionToggle>

// Disabled
<ActionToggle iconName="plusOutline3dp" disabled>팔로우</ActionToggle>
```

## CSS classes

| Class | Role |
|-------|------|
| `.action-toggle` | Root button |
| `.action-toggle__icon` | 아이콘 wrapper |
| `.action-toggle__label` | 레이블 텍스트 |
| `.action-toggle__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-emphasis` | onDefault, onSelect | 색상 로직 |
| `data-selected` | true, false | 선택 상태 |
| `data-icon-only` | true, false | 아이콘 전용 모드 |
| `data-size` | xs, sm, md | 크기 |

## NOT in Figma (avoid)

- `state` prop — hover/pressed/loading/disabled는 CSS 또는 HTML로 처리
- `Focus` prop — CSS `:focus-visible`로 처리
- `iconOnly=true`일 때 `children` 전달 — 렌더되지 않음, `aria-label` 대신 사용
