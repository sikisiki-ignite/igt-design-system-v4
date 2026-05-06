<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:35:25.942Z -->

# Link

앵커(`<a>`) 기반 인라인 링크. tone과 밑줄 방식 제어.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `tone` | `'brand' \| 'neutral'` | `'brand'` | Tone |
| `underline` | `'always' \| 'auto' \| 'none'` | `'always'` | Underline |
| `disabled` | `boolean` | — | State=disabled |
| `children` | `ReactNode` | — | 링크 텍스트 (필수) |
| `href` | `string` | — | AnchorHTMLAttributes |
| `target` | `string` | — | AnchorHTMLAttributes |

> `AnchorHTMLAttributes<HTMLAnchorElement>` 전체를 상속합니다.

## Usage

```tsx
// 기본 (brand tone · always underline)
<Link href="/terms">이용약관</Link>

// Neutral tone (일반 텍스트 색상)
<Link tone="neutral" href="/more">더 알아보기</Link>

// Underline 변형
<Link underline="auto" href="/help">도움말</Link>
<Link underline="none" href="/skip">건너뛰기</Link>

// 새 탭
<Link href="https://example.com" target="_blank">외부 링크</Link>

// 비활성 (href 없이 UI만 표시 시)
<Link disabled>비활성 링크</Link>
```

## CSS classes

| Class | Role |
|-------|------|
| `.link` | Root anchor |
| `.link__focus-ring` | Focus ring overlay (aria-hidden) |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-tone` | brand, neutral | Color variant |
| `data-underline` | always, auto, none | Underline style |

## Underline 동작

| underline | 동작 |
|-----------|------|
| `always` | 항상 밑줄 표시 |
| `auto` | hover 시만 밑줄 표시 |
| `none` | 밑줄 없음 |

## NOT in Figma (avoid)

- `state` prop — hover/pressed/disabled는 CSS pseudo-class로 처리
- `Focused` prop — CSS `:focus-visible`로 처리
- `disabled` 상태에서도 `<a>` 태그 유지됨 — `aria-disabled` + `tabIndex={-1}` 처리
