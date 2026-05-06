<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T06:30:33.097Z -->

# HoverHint

어두운 배경의 인라인/블록 힌트 카드. 마우스 오버 시 표시하는 정보성 오버레이.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| headline | `string` | - | 헤드라인 텍스트 |
| description | `string` | - | 설명 텍스트 (block layout에서만 표시) |
| layout | `'inline' \| 'block'` | `'inline'` | 레이아웃 방향 |
| className | `string` | - | 추가 클래스 |

## Figma → Code 매핑

| Figma Layout | Code |
|-------------|------|
| inline | `'inline'` (headline만) |
| block | `'block'` (headline + description) |

## 사용 예시

```tsx
// inline: 한 줄 힌트
<HoverHint layout="inline" headline="알림 설정" />

// block: 제목 + 설명
<HoverHint
  layout="block"
  headline="알림 설정"
  description="중요한 변경 사항을 놓치지 않도록 도와드려요."
/>
```

## NOT in Figma (avoid)

- 밝은(light) 배경 변형 — Figma에 없음, 항상 dark(inverse) 배경
- 커스텀 콘텐츠 슬롯 — Figma는 텍스트만 정의
