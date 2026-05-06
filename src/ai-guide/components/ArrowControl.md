<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:23:46.123Z -->

# ArrowControl

이전/다음 방향 화살표 버튼. 캐러셀·슬라이더 등 탐색 컨트롤에 사용.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `direction` | `'prev' \| 'next'` | `'prev'` | 화살표 방향 |
| `variant` | `'surfaceFill' \| 'surfaceOutline' \| 'overlayLight' \| 'overlayDark'` | `'surfaceFill'` | 시각적 스타일 |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |

`ButtonHTMLAttributes<HTMLButtonElement>` 확장 — `onClick` 등 네이티브 버튼 속성 모두 사용 가능.

## 사용 예시

```tsx
// 기본 (이전/다음 쌍)
<ArrowControl direction="prev" />
<ArrowControl direction="next" />

// overlay 위에 사용
<ArrowControl direction="next" variant="overlayLight" size="sm" />

// 비활성화
<ArrowControl direction="prev" disabled />
```

## Variant

| variant | 설명 |
|---------|------|
| `surfaceFill` | 흰 배경 채움 (기본) |
| `surfaceOutline` | 테두리만 |
| `overlayLight` | 어두운 배경 위 밝은 버튼 |
| `overlayDark` | 밝은 배경 위 어두운 버튼 |

## Size별 아이콘 크기

| size | 아이콘 |
|------|--------|
| `xs` | 14px |
| `sm` | 16px |
| `md` | 20px |

## NOT in Figma (avoid)

- `focus` / `state` prop — Figma 내부 variant 상태, TSX에 미노출
- 커스텀 아이콘 교체 — direction이 아이콘을 결정
