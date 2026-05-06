<!-- Generated from figma-spec.json | extractedAt: 2026-05-01 -->

# Button

## Props

| Prop | Type | Default | Figma prop |
|---|---|---|---|
| `tone` | `'primary' \| 'secondary' \| 'danger' \| 'overlayDark'` | `'primary'` | tone |
| `appearance` | `'fill' \| 'outline'` | `'fill'` | appearance |
| `emphasis` | `'strong' \| 'weak'` | `'strong'` | emphasis |
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'md'` | size |
| `iconOnly` | `boolean` | `false` | iconOnly |
| `isLoading` | `boolean` | `false` | isLoading |
| `leadingIcon` | `ReactNode` | — | LeadingIcon layer |
| `trailingIcon` | `ReactNode` | — | TrailingIcon layer |
| `disabled` | `boolean` | — | isDisabled (HTML native) |
| `children` | `ReactNode` | — | 버튼 텍스트 콘텐츠 |
| `className` | `string` | — | — |

## Usage

```tsx
// Primary fill strong (default)
<Button>확인</Button>

// Size variants
<Button size="xs">최소</Button>
<Button size="sm">소형</Button>
<Button size="lg">대형</Button>

// Tone + appearance
<Button tone="secondary" appearance="outline" emphasis="weak">취소</Button>
<Button tone="danger">삭제</Button>
<Button tone="overlayDark" appearance="fill">저장</Button>

// With icons
<Button leadingIcon={<SearchIcon />}>검색</Button>
<Button trailingIcon={<ChevronRightIcon />}>다음</Button>

// Icon only
<Button iconOnly><PlusIcon /></Button>

// States
<Button isLoading>저장 중</Button>
<Button disabled>비활성</Button>
```

## CSS classes

| Class | Role |
|---|---|
| `.btn` | Root button element |
| `.btn-icon` | Icon wrapper (leading/trailing/only) |
| `.btn-label-wrap` | Label padding container |
| `.btn-label` | Label text |
| `.btn-focus-ring` | Focus ring overlay (CSS only, aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|---|---|---|
| `data-tone` | primary, secondary, danger, overlayDark | Color variant targeting |
| `data-appearance` | fill, outline | Appearance targeting |
| `data-emphasis` | strong, weak | Emphasis targeting |
| `data-size` | xs, sm, md, lg | Size targeting |
| `data-icon-only` | present/absent | Icon-only mode |
| `data-loading` | present/absent | Loading state |

## Token structure

```
--action-button-color-tone-{tone}-{appearance}-{emphasis}-{container|border|text|icon}-{normal|hover|pressed|disabled}
--action-button-size-height-{xs|sm|md|lg}
--action-button-size-spacing-paddingInline-{xs|sm|md|lg}
--action-button-size-spacing-gapInline-{xs|sm|md|lg}
--action-button-size-spacing-textInsetInline-{xs|sm|md|lg}
--action-button-size-iconSize-{xs|sm|md|lg}
--action-button-size-radius-{xs|sm|md|lg}
--action-button-size-borderWidth-{xs|sm|md|lg}
```

## NOT in Figma (avoid)

- `state` prop — Figma의 normal/hover/pressed는 CSS pseudo-class로 처리. prop으로 노출하지 않는다.
- `overlayLight` tone — 토큰은 존재하나 Figma props에 없음. 사용 금지.
- `width` prop — Figma의 width=hug/fill은 레이아웃 컨텍스트가 결정. Button이 직접 제어하지 않는다.
- `isReadOnly` — Figma에 있으나 Button에서 의미 없음. 사용 금지.
