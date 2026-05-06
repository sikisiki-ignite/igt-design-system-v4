<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T16:53:54.668Z -->

# FloatingButton

원형 FAB(Floating Action Button). icon 전용 또는 아이콘+레이블 extended 두 가지 형태.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `variant` | `'icon' \| 'extended'` | `'icon'` | Variant |
| `priority` | `'primaryFill' \| 'secondaryFill' \| 'secondaryOutline'` | `'primaryFill'` | priority |
| `size` | `'lg' \| 'md'` | `'lg'` | size |
| `iconName` | `IconName` | — | Icon layer (필수) |
| `isLoading` | `boolean` | `false` | isLoading |
| `disabled` | `boolean` | — | isDisabled (HTML native) |
| `children` | `string` | — | label-frame (extended variant에서만 표시) |

## Usage

```tsx
// 기본 (icon · primaryFill · lg)
<FloatingButton iconName="plusOutline3dp" />

// Extended: 아이콘 + 레이블
<FloatingButton variant="extended" iconName="plusOutline3dp">
  새 항목 추가
</FloatingButton>

// Priority 변형
<FloatingButton iconName="editOutline3dp" priority="secondaryFill" />
<FloatingButton iconName="editOutline3dp" priority="secondaryOutline" />

// Small size
<FloatingButton iconName="plusOutline3dp" size="md" />

// Loading
<FloatingButton iconName="plusOutline3dp" isLoading />

// Disabled
<FloatingButton iconName="plusOutline3dp" disabled />
```

## CSS classes

| Class | Role |
|-------|------|
| `.fab` | Root button |
| `.fab__icon` | Icon wrapper |
| `.fab__label` | Label text (extended only) |
| `.fab__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-variant` | icon, extended | Shape variant |
| `data-priority` | primaryFill, secondaryFill, secondaryOutline | Color variant |
| `data-size` | lg, md | Size |
| `data-loading` | present/absent | Loading state |

## Token structure

```
--action-floatingButton-color-{priority}-{container|border|icon}-{normal|hover|pressed|disabled}
--action-floatingButton-size-{lg|md}-containerSize
--action-floatingButton-size-{lg|md}-iconSize
```

## NOT in Figma (avoid)

- `state` prop — normal/hover/pressed는 CSS pseudo-class로 처리
- `isFocused` — CSS `:focus-visible`로 처리
- `children` with `variant="icon"` — icon variant에서는 레이블 무시됨
