<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T05:01:33.665Z -->

# Pagination

페이지네이션 컨트롤. 이전/다음 화살표와 페이지 번호 버튼을 제공한다.

## Props

| prop | type | default | Figma prop |
|------|------|---------|-----------|
| `page` | `number` | required | (current page) |
| `total` | `number` | required | (total pages) |
| `onChange` | `(page: number) => void` | required | — |
| `variant` | `'default' \| 'minimal'` | `'default'` | Variant |
| `size` | `'sm' \| 'md'` | `'md'` | Size |
| `siblingCount` | `number` | `1` | — |
| `className` | `string` | — | — |

## 크기별 규격

| size | 아이템 크기 | 화살표 크기 | 아이콘 크기 |
|------|-----------|-----------|-----------|
| `sm` | 28px | 28px | 20px |
| `md` | 36px | 36px | 24px |

## Variant

- `default`: 이전/다음 화살표 + 페이지 번호 버튼 (ellipsis 자동 표시)
- `minimal`: 이전/다음 화살표 + "현재 / 전체" 텍스트

## 사용 예시

```tsx
// default
<Pagination page={5} total={20} onChange={setPage} size="md" />

// minimal
<Pagination page={3} total={10} onChange={setPage} variant="minimal" />
```

## NOT in Figma (avoid)

- `siblingCount` — Figma 미정의, 코드 전용 prop
- `trailingEllipsis` / `leadingEllipsis` 직접 제어 — 자동으로 계산됨
