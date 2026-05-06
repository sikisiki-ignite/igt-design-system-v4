<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T04:50:44.728Z -->

# Breadcrumb

경로 탐색을 위한 네비게이션 컴포넌트. 사용자의 현재 위치를 계층 구조로 표시한다.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `items` | `BreadcrumbItem[]` | required | (depth 1~6 items) |
| `separator` | `'chevron' \| 'slash' \| 'dot'` | `'chevron'` | Seperator |
| `leading` | `'none' \| 'home'` | `'none'` | Leading |
| `onHomeClick` | `(e) => void` | — | (home 아이콘 클릭) |
| `className` | `string` | — | — |

### BreadcrumbItem

| field | type | 설명 |
|-------|------|------|
| `label` | `string` | 표시 텍스트 |
| `href` | `string?` | 링크 URL (있으면 `<a>`, 없으면 `<button>`) |
| `onClick` | `(e) => void?` | 클릭 핸들러 |

## 사용 예시

```tsx
// 기본 (chevron separator)
<Breadcrumb
  items={[
    { label: '홈', href: '/' },
    { label: '제품', href: '/products' },
    { label: '상세' },
  ]}
/>

// slash separator + home leading
<Breadcrumb
  separator="slash"
  leading="home"
  onHomeClick={() => router.push('/')}
  items={[
    { label: '카테고리', href: '/category' },
    { label: '현재 페이지' },
  ]}
/>

// dot separator
<Breadcrumb
  separator="dot"
  items={[{ label: '설정', href: '/settings' }, { label: '계정' }]}
/>
```

## 동작 규칙

- `items`의 마지막 항목은 항상 `current` 스타일(포인터 없음, 진한 색)로 렌더된다
- `leading="home"` 시: 홈 아이콘 버튼 → 첫 번째 item 앞에 separator 자동 표시
- `leading="none"` 시: 첫 번째 item 앞에 separator 없음
- `item.href`가 있으면 `<a>`, 없으면 `<button type="button">` 렌더

## Separator 아이콘 매핑

| value | 아이콘 | 크기 |
|-------|--------|------|
| `chevron` | `chevronRightOutline2dp` | 14px |
| `slash` | `chevronRightSmallOutline2dp` | 14px |
| `dot` | `circleTinySolid` | 6px |

## NOT in Figma (avoid)

- `disabled` 상태 없음 — Figma 미정의
- 아이템 개수 제한 없음 (Figma는 최대 6 depth 표시)
- 말줄임(`truncation`) 없음 — Figma 미정의
