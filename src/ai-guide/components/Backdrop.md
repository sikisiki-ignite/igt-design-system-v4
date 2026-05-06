<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T06:30:17.990Z -->

# Backdrop

전체 화면 어두운 오버레이. Dialog, Drawer, Modal 등의 배경으로 사용.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| strength | `'default' \| 'strong'` | `'default'` | 오버레이 어두운 정도 |
| onClick | `() => void` | - | 클릭 핸들러 |
| className | `string` | - | 추가 클래스 |

## Figma → Code 매핑

| Figma Strength | Code |
|---------------|------|
| default | `'default'` |
| strong | `'strong'` |

## 사용 예시

```tsx
<Backdrop strength="default" onClick={handleClose} />
<Backdrop strength="strong" />
```

## NOT in Figma (avoid)

- 부분 오버레이(inset 있는 경우) — Figma에 없음
- 색상 변형 외 커스텀 배경 — 토큰 외 배경 사용 금지
