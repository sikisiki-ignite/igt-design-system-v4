<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:35:18.785Z -->

# SearchTrigger

검색창을 열기 위한 트리거 버튼. 검색 필드처럼 보이지만 실제로는 `<button>`. field(필드형)와 icon(아이콘형) 두 가지 variant.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `variant` | `'field' \| 'icon'` | `'field'` | Variant |
| `appearance` | `'default' \| 'subtle'` | `'default'` | Appearance |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `placeholder` | `string` | `'여기를 눌러 검색하세요'` | 검색창 안내 텍스트 |
| `disabled` | `boolean` | — | Disabled (HTML native) |

## Usage

```tsx
// 기본 (field · default · md)
<SearchTrigger onClick={openSearch} />

// 커스텀 placeholder
<SearchTrigger placeholder="제품을 검색하세요" onClick={openSearch} />

// Icon only
<SearchTrigger variant="icon" onClick={openSearch} />

// Subtle appearance (배경 없음)
<SearchTrigger appearance="subtle" onClick={openSearch} />

// Small size
<SearchTrigger size="sm" onClick={openSearch} />

// Disabled
<SearchTrigger disabled />
```

## CSS classes

| Class | Role |
|-------|------|
| `.search-trigger` | Root button |
| `.search-trigger__icon` | 돋보기 아이콘 wrapper |
| `.search-trigger__placeholder` | 안내 텍스트 (variant="field"에만 표시) |
| `.search-trigger__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-variant` | field, icon | 표시 형태 |
| `data-appearance` | default, subtle | 배경/테두리 스타일 |
| `data-size` | sm, md | 크기 |

## NOT in Figma (avoid)

- `state` prop — normal/hover/pressed는 CSS pseudo-class로 처리
- `Focus` prop — CSS `:focus-visible`로 처리
- 실제 입력 기능 없음 — `<input>` 대체 불가, 클릭 시 별도 Search 컴포넌트 열어야 함
