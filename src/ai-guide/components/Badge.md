<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:48:18.437Z -->

# Badge (CountBadge)

숫자 카운트를 표시하는 뱃지 컴포넌트. 알림 수, 미읽은 수 등에 사용합니다.

## Import

```tsx
import { Badge } from '@igt/design-system';
```

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `count` | `number` | — | 표시할 숫자 (필수) |
| `tone` | `'neutral' \| 'accent' \| 'urgent'` | `'urgent'` | 색상 톤 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | 크기 |
| `max` | `number` | `99` | 최대값. 초과 시 `${max}+` 형태로 표시 |
| `className` | `string` | — | — |

## 사용 예시

```tsx
<Badge count={5} />
<Badge count={99} tone="accent" size="md" />
<Badge count={1234} max={999} tone="neutral" size="sm" />
```

## Tone → Color

| tone | background token | text token |
|------|-----------------|-----------|
| `urgent` | `--dataDisplay-countBadge-color-urgent-container` (danger red) | `--dataDisplay-countBadge-color-urgent-text` (white) |
| `accent` | `--dataDisplay-countBadge-color-accent-container` (brand blue) | `--dataDisplay-countBadge-color-accent-text` (white) |
| `neutral` | `--dataDisplay-countBadge-color-neutral-container` (greyAlpha-100) | `--dataDisplay-countBadge-color-neutral-text` (grey-800) |

## Size → Dimensions (Figma 실측)

| size | height | min-width | padding-inline | typography class |
|------|--------|-----------|----------------|-----------------|
| `sm` | 20px | 20px | 6px | `text-caption-11-semibold` |
| `md` | 24px | 24px | 7px | `text-label-12-semibold` |
| `lg` | 28px | 28px | 8px | `text-label-14-semibold` |

## NOT in Figma (avoid)

- `dot` 형태 배지는 별도 dotBadge 컴포넌트로 분리 예정 (이 컴포넌트는 CountBadge만 구현)
- `icon` 타입 뱃지 없음
- `font: var(--semantic-*)` CSS shorthand 사용 금지 — shorthand 토큰이 존재하지 않음
- Tailwind `text-*` 클래스로 폰트 적용 시도 금지 — `@utility`가 런타임에 동작하지 않음
- CSS에서 개별 서브프로퍼티(`-fontFamily`, `-fontSize`, `-lineHeight`, `-fontWeight`, `-letterSpacing`)를 직접 사용할 것
