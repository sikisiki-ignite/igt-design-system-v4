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
