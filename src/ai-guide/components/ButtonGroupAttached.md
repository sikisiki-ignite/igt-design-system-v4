<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:47:22.526Z -->

# ButtonGroupAttached

버튼들이 서로 붙어있는 세그먼트 그룹. 필터·뷰 전환 등 밀착형 버튼 묶음에 사용.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `variant` | `'soft' \| 'outline'` | `'soft'` | Variant |
| `size` | `'xs' \| 'sm' \| 'md'` | `'md'` | Size |
| `children` | `ReactNode` | — | Button 목록 (필수) |

## Variant 의미

| variant | 외형 |
|---------|------|
| `soft` | 채워진 배경, 경계 없음 |
| `outline` | 테두리만, 투명 배경 |

## Usage

```tsx
// 기본 (soft · md)
<ButtonGroupAttached>
  <Button size="md" tone="secondary">월</Button>
  <Button size="md" tone="secondary">분기</Button>
  <Button size="md">연</Button>
</ButtonGroupAttached>

// Outline variant
<ButtonGroupAttached variant="outline">
  <Button size="md" appearance="outline">그리드</Button>
  <Button size="md" appearance="outline">리스트</Button>
</ButtonGroupAttached>

// Small size
<ButtonGroupAttached size="sm">
  <Button size="sm" tone="secondary">전체</Button>
  <Button size="sm">선택</Button>
</ButtonGroupAttached>
```

## CSS classes

| Class | Role |
|-------|------|
| `.bga` | 컨테이너 (role="group") |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-variant` | soft, outline | 외형 변형 |
| `data-size` | xs, sm, md | 크기 |

## NOT in Figma (avoid)

- `DENSITY` prop (STANDARD/COMPACT) — Figma 내부 속성, 코드에 미노출
- `Items` prop — Figma에서 2~5개 미리보기용, 실제 자식 수가 결정
- ButtonGroup과 혼동 주의 — ButtonGroupAttached는 버튼이 서로 붙음, ButtonGroup은 gap이 있음
