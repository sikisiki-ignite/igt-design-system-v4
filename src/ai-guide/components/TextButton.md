<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:35:23.075Z -->

# TextButton

텍스트 전용 버튼. chevron(화살표)·underline(밑줄)·plain(기본) 세 가지 variant와 4가지 tone.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `variant` | `'chevron' \| 'underline' \| 'plain'` | `'chevron'` | Variant |
| `tone` | `'neutral' \| 'neutralMuted' \| 'accent' \| 'danger'` | `'neutral'` | Tone |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'lg'` | Size |
| `leadingIconName` | `IconName` | — | LeadingIcon (hasLeading=true일 때) |
| `disabled` | `boolean` | — | Disabled (HTML native) |
| `children` | `ReactNode` | — | Text (필수) |

## Usage

```tsx
// 기본 (chevron · neutral · lg)
<TextButton>더 보기</TextButton>

// Variant 변형
<TextButton variant="underline">자세히 보기</TextButton>
<TextButton variant="plain">닫기</TextButton>

// Tone 변형
<TextButton tone="accent">링크 이동</TextButton>
<TextButton tone="neutralMuted">부가 정보</TextButton>
<TextButton tone="danger">삭제</TextButton>

// Leading icon
<TextButton leadingIconName="downloadOutline3dp">다운로드</TextButton>

// Size
<TextButton size="sm">작은 버튼</TextButton>
<TextButton size="xs">최소 버튼</TextButton>

// Disabled
<TextButton disabled>비활성</TextButton>
```

## CSS classes

| Class | Role |
|-------|------|
| `.text-btn` | Root button |
| `.text-btn__leading-icon` | 앞 아이콘 wrapper |
| `.text-btn__label-trailing` | 레이블+트레일링 아이콘 묶음 |
| `.text-btn__label` | 텍스트 레이블 |
| `.text-btn__trailing-icon` | chevron 아이콘 (variant="chevron" 자동) |
| `.text-btn__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-variant` | chevron, underline, plain | Visual style |
| `data-tone` | neutral, neutralMuted, accent, danger | Color |
| `data-size` | xs, sm, md, lg | Size |

## Token structure

```
--action-textButton-color-{tone}-text-{normal|hover|pressed|disabled}
--action-textButton-color-{tone}-icon-{normal|hover|pressed|disabled}
--action-textButton-size-{size}-fontSize (via --semantic-label-*)
--action-textButton-size-{size}-iconSize
```

## NOT in Figma (avoid)

- `state` prop — normal/hover/pressed/disabled는 CSS pseudo-class로 처리
- `Focus` prop — CSS `:focus-visible`로 처리
- trailing icon 커스터마이즈 — chevron variant는 항상 `monoChevronRight` 고정
