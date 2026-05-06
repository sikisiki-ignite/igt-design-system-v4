<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:03:11.508Z -->

# SideNavigation

사이드 네비게이션. 섹션 헤더 + NavItem 목록 구조. 너비 220px 고정.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `items` | `SideNavItemData[]` | required | NavItem list |
| `activeId` | `string` | — | State: current |
| `onSelect` | `(id: string) => void` | — | — |
| `header` | `string` | — | NavSectionHeader |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | Tone |
| `className` | `string` | — | — |

### SideNavItemData

| field | type | 설명 |
|-------|------|------|
| `id` | `string` | 고유 식별자 |
| `label` | `string` | 텍스트 |
| `icon` | `IconName?` | 선행 아이콘 |
| `depth` | `number?` | 들여쓰기 깊이 (1=최상위) |
| `disabled` | `boolean?` | 비활성화 |
| `children` | `SideNavItemData[]?` | 하위 항목 (재귀 렌더) |

## 크기별 높이

| size | NavItem 높이 | 아이콘 크기 |
|------|------------|-----------|
| `sm` | 32px | 14px |
| `md` | 40px | 16px |

## Tone

- `neutral`: current 항목 중립 색상
- `accent`: current 항목 브랜드 강조 색상

## 사용 예시

```tsx
<SideNavigation
  header="메인 메뉴"
  tone="neutral"
  activeId="dashboard"
  onSelect={setActiveNav}
  items={[
    { id: 'dashboard', label: '대시보드', icon: 'homeOutline2dp' },
    { id: 'users', label: '사용자 관리', icon: 'personOutline2dp' },
    { id: 'settings', label: '설정', disabled: true },
  ]}
/>
```

## NOT in Figma (avoid)

- 접히는(collapsible) 섹션 — Figma 미정의
- 중첩 `children` depth 3 이상 — Figma는 depth 1만 디자인
