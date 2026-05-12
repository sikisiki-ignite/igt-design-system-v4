<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:03:11.508Z -->

# SideNavigation

사이드 네비게이션. 섹션 헤더 + NavItem 목록 구조.

> **너비 규칙**: 컴포넌트는 `width: 100%`로 컨테이너를 채운다. 컨테이너가 너비를 결정한다.
> - Figma 참조 너비: 220px (standalone 사용 시 컨테이너를 220px로 설정)
> - LNB 패널 안에서 사용 시: 패널이 padding을 가지면 SideNavigation은 그 내부 너비에 맞춰짐 (`250px 패널 + padding 24px` → SideNavigation 202px)
> - **절대 금지**: LNB 컨테이너 padding + SideNavigation 고정 너비 병용 → 오버플로로 좌우 패딩 비대칭 발생

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

**관리자 LNB에서는 항상 `tone="neutral"`을 사용한다.** `accent`는 브랜드 컬러가 강하게 필요한 특수 맥락에만 쓴다.

| tone | active 항목 배경 | active 아이콘/텍스트 | 사용 맥락 |
|------|----------------|------------------|---------|
| `neutral` (기본값) | 거의 투명한 회색 tint (`rgba(2,32,71,0.05)`) | 기본 텍스트 색상 | **백오피스·어드민 LNB 표준** |
| `accent` | 브랜드 블루 tint (`rgba(100,168,255,0.16)`) | 브랜드 블루 | 브랜드 강조가 필요한 특수 케이스 |

> `accent`는 "더 잘 보이게" 하려는 용도가 아니다. Figma 디자인 파일 기준은 항상 `neutral`이다.

## 사용 예시

```tsx
{/* ✅ 표준 어드민 LNB — neutral 고정 */}
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

{/* ⚠️ accent — 브랜드 강조 필요 시에만, 기본값이 아님 */}
<SideNavigation tone="accent" ... />
```

## NOT in Figma (avoid)

- 접히는(collapsible) 섹션 — Figma 미정의
- 중첩 `children` depth 3 이상 — Figma는 depth 1만 디자인
