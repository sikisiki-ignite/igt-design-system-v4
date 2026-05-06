<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T16:31:25.663Z -->

# IconButton

아이콘만 표시하는 정방형 액션 버튼. 항상 square. 텍스트 없음.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `tone` | `'primary' \| 'neutral'` | `'neutral'` | 색상 톤 |
| `appearance` | `'fill' \| 'outline'` | `'outline'` | 채움 방식 |
| `emphasis` | `'strong' \| 'weak'` | `'strong'` | 강조 수준 |
| `size` | `'md' \| 'sm' \| 'xs'` | `'md'` | 크기 |
| `shape` | `'rounded' \| 'circle'` | `'rounded'` | 모서리 형태 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `isLoading` | `boolean` | `false` | 로딩 상태 |
| `children` | `ReactNode` | — | 아이콘 요소 (필수) |

## 사용 예시

```tsx
// 기본
<IconButton><StarIcon /></IconButton>

// primary fill
<IconButton tone="primary" appearance="fill"><PlusIcon /></IconButton>

// circle shape
<IconButton shape="circle"><CloseIcon /></IconButton>

// 크기
<IconButton size="xs"><SearchIcon /></IconButton>
<IconButton size="sm"><SearchIcon /></IconButton>
<IconButton size="md"><SearchIcon /></IconButton>

// 상태
<IconButton disabled><TrashIcon /></IconButton>
<IconButton isLoading><SaveIcon /></IconButton>
```

## CSS 클래스 / data-attributes

| 클래스/속성 | 역할 |
|---|---|
| `.icon-btn` | 루트 버튼 |
| `.icon-btn__icon` | 아이콘 래퍼 |
| `.icon-btn__focus-ring` | 포커스 링 (`:focus-visible` 시 표시) |
| `data-tone` | `primary` \| `neutral` |
| `data-appearance` | `fill` \| `outline` |
| `data-emphasis` | `strong` \| `weak` |
| `data-size` | `xs` \| `sm` \| `md` |
| `data-shape` | `rounded` \| `circle` |
| `data-loading` | 로딩 상태 (속성 존재 여부) |

## 토큰 구조

```
--action-iconButton-size-container-{xs|sm|md}     → width / height
--action-iconButton-size-iconSize-{xs|sm|md}      → icon slot size
--action-iconButton-size-radius-{circle|rounded-*} → border-radius
--action-iconButton-color-tone-{primary|secondary}-{fill|outline}-{strong|weak}-{container|border|icon}-{normal|hover|pressed|disabled}
```

> Figma `neutral` tone → CSS `secondary` 토큰 경로 사용.

## NOT in Figma (avoid)

- `lg` 사이즈 없음 (xs/sm/md만 존재)
- `danger` tone 없음
- `overlayDark`/`overlayLight` tone 없음
- `leadingIcon` / `trailingIcon` 슬롯 없음 (텍스트 버튼 패턴)
- `width` 제어 prop 없음 (항상 정방형)
