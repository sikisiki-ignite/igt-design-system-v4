<!-- Generated from figma-spec.json | extractedAt: 2026-05-06 | nodeId: 339:5220 -->

# Divider

콘텐츠 영역을 시각적으로 구분하는 구분선 컴포넌트.

## Import

```tsx
import { Divider } from '@igt/design-system';
```

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tone` | `'neutral' \| 'accent' \| 'danger'` | `'neutral'` | 색상 톤 |
| `emphasis` | `'weak' \| 'default' \| 'strong'` | `'weak'` | 강조 수준. `strong`은 선 굵기도 증가 |
| `variant` | `'solid' \| 'dashed'` | `'solid'` | 선 스타일 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 방향 |
| `inset` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'none'` | 양쪽 여백 (sm=8px, md=16px, lg=24px) |

## 사용 예시

```tsx
// 기본 (가로 구분선)
<Divider />

// 강조 수준별
<Divider emphasis="default" />
<Divider emphasis="strong" />

// 색상 톤
<Divider tone="accent" emphasis="default" />
<Divider tone="danger" emphasis="strong" />

// 점선
<Divider variant="dashed" />

// Inset (양쪽 여백)
<Divider inset="lg" />

// 세로 구분선 — 부모에 height 또는 align-items: stretch 필요
<div style={{ display: 'flex', height: 40 }}>
  <span>A</span>
  <Divider orientation="vertical" />
  <span>B</span>
</div>
```

## Emphasis × 색상

모든 emphasis의 선 굵기는 동일하게 1px. 색상만 다름.

| emphasis | 색상 강도 |
|----------|-----------|
| `weak` | 가장 연함 |
| `default` | 보통 |
| `strong` | 가장 진함 |

## NOT in Figma (avoid)

- `emphasis="strong"` + `variant="dashed"` 조합은 Figma에 없음 (기술적으로 동작하지만 사용 자제)
- 세로 구분선에서 부모 컨테이너 높이 없이 사용 — `height: 100%` 가 0이 되어 보이지 않음
