<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:02:52.876Z -->

# Navigation (TopNavigation)

상단 글로벌 네비게이션 바. leading(로고+navItems), center(검색 등), trailing(액션) 슬롯을 제공한다.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `size` | `'sm' \| 'md'` | `'sm'` | Size |
| `scrolled` | `boolean` | `false` | Scrolled |
| `layoutMode` | `'narrow' \| 'wide' \| 'full'` | `'full'` | LayoutMode |
| `logo` | `ReactNode` | — | ◇ Part / Logo |
| `navItems` | `ReactNode` | — | navGroup |
| `center` | `ReactNode` | — | center |
| `trailing` | `ReactNode` | — | trailing |
| `className` | `string` | — | — |

## 동작

- **`position: sticky; top: 0; z-index: 100`** — 스크롤 시 상단에 고정된다. 별도 prop 없이 컴포넌트 CSS에 내장.
- 컨테이너가 `height: 100vh`인 백오피스 레이아웃에서는 문서 자체가 스크롤되지 않으므로 sticky 효과가 자연스럽게 적용된다 (page-layout.md 참조).

## 크기별 규격

| size | 높이 | paddingInline |
|------|------|--------------|
| `sm` | 56px | 20px |
| `md` | 64px | 28px |

## NavItem 서브 컴포넌트

```tsx
<NavItem label="홈" href="/" current />
<NavItem label="서비스" onClick={handleClick} />
```

| prop | type | 설명 |
|------|------|------|
| `label` | `string` | 텍스트 |
| `href` | `string?` | 링크 (`<a>` 렌더) |
| `current` | `boolean?` | 현재 페이지 강조 |
| `onClick` | `() => void?` | 클릭 핸들러 |

## 사용 예시

```tsx
<Navigation
  size="sm"
  logo={<img src="/logo.svg" alt="IGT" height={28} />}
  navItems={
    <>
      <NavItem label="홈" href="/" current />
      <NavItem label="서비스" href="/services" />
    </>
  }
  trailing={<Button size="sm">로그인</Button>}
/>
```

## NOT in Figma (avoid)

- `state: 'login' | 'logout'` 직접 prop — trailing 슬롯으로 구성
- 모바일 메뉴 드로어 — Figma 미정의
