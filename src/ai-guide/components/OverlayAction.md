<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T16:44:48.763Z -->

# OverlayAction

이미지나 미디어 위에 올라가는 원형 아이콘 버튼. 반투명 배경으로 배경 콘텐츠가 비쳐 보임.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `polarity` | `'dark' \| 'light'` | `'dark'` | 배경 색상 방향. dark = 어두운 반투명, light = 밝은 반투명 |
| `size` | `'md' \| 'sm' \| 'xs'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `isLoading` | `boolean` | `false` | 로딩 상태 |
| `children` | `ReactNode` | — | 아이콘 요소 (필수) |

## 사용 예시

```tsx
// 다크 배경 위
<OverlayAction polarity="dark"><PlayIcon /></OverlayAction>

// 라이트 배경 위
<OverlayAction polarity="light"><CloseIcon /></OverlayAction>

// 크기
<OverlayAction size="xs"><ChevronIcon /></OverlayAction>
```

## CSS 클래스 / data-attributes

| 클래스/속성 | 역할 |
|---|---|
| `.overlay-action` | 루트 버튼 (항상 원형) |
| `.overlay-action__icon` | 아이콘 래퍼 |
| `.overlay-action__focus-ring` | 포커스 링 |
| `data-polarity` | `dark` \| `light` |
| `data-size` | `xs` \| `sm` \| `md` |
| `data-loading` | 로딩 상태 |

## 토큰 구조

```
--action-overlayAction-size-container-{xs|sm|md}
--action-overlayAction-size-iconSize-{xs|sm|md}
--action-overlayAction-size-radius-circle
--pattern-actionBase-common-tone-overlay{Dark|Light}-fill-{container|icon}-{normal|hover|pressed|disabled}
```

## NOT in Figma (avoid)

- `tone`, `appearance`, `emphasis` 없음 (polarity만 존재)
- `shape` 없음 (항상 원형)
- 텍스트 슬롯 없음 (아이콘 전용)
- `lg` 사이즈 없음
