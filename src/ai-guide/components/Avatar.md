<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:36:22.613Z -->

# Avatar

사용자 프로필 이미지, 이니셜, 또는 아이콘을 표시하는 컴포넌트. 선택적으로 온라인 상태 배지를 표시합니다.

## Import

```tsx
import { Avatar } from '@igt/design-system';
```

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | 컨테이너 크기 |
| `shape` | `'circle' \| 'rounded'` | `'circle'` | 테두리 모양 |
| `src` | `string` | — | 이미지 URL. 제공 시 img 렌더 |
| `alt` | `string` | `''` | 이미지 alt 텍스트 |
| `initials` | `string` | — | src 없을 때 표시할 이니셜 (보통 1~2자) |
| `statusBadge` | `boolean` | `false` | 상태 배지 표시 여부 |
| `status` | `'active' \| 'attention' \| 'inactive' \| 'error'` | `'active'` | 상태 배지 색상 |
| `surfaceContext` | `'backgroundBase' \| 'backgroundSubtle' \| 'surfaceBase' \| 'surfaceRaised' \| 'surfaceOverlay'` | `'backgroundBase'` | 분리 링 색상 (배경 컨텍스트에 맞춤) |
| `className` | `string` | — | — |

## Content 우선순위

`src` → `initials` → 기본 아이콘 (person SVG)

## 사이즈별 크기

| size | 컨테이너 | 상태 배지 |
|------|---------|---------|
| xs | 24px | 6px |
| sm | 32px | 8px |
| md | 40px | 10px |
| lg | 48px | 12px |
| xl | 56px | 14px |

## 사용 예시

```tsx
// 이미지
<Avatar src="/profile.jpg" alt="홍길동" size="md" />

// 이니셜
<Avatar initials="HG" size="lg" shape="rounded" />

// 상태 배지 포함
<Avatar
  src="/profile.jpg"
  size="xl"
  statusBadge
  status="active"
/>

// surfaceContext 지정
<Avatar
  initials="AB"
  statusBadge
  status="inactive"
  surfaceContext="surfaceRaised"
/>
```

## NOT in Figma (avoid)

- `shape` × `size` 조합: rounded 시 각 size별 border-radius가 다름 (xs=sm, sm=md, md=xl, lg=3xl, xl=4xl)
- 상태 배지 없이 status prop만 지정해도 배지 미표시 (statusBadge=true 필수)
