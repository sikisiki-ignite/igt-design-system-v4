<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:32:02.160Z -->

# Skeleton

콘텐츠 로딩 중 자리를 차지하는 플레이스홀더 컴포넌트.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | 높이 크기 |
| `width` | `string` | — | 너비 인라인 스타일 (ex. `"200px"`, `"60%"`) |
| `className` | `string` | — | 추가 클래스명 |

## 사용 예시

```tsx
// 기본 (전체 너비)
<Skeleton size="xl" />

// 너비 지정
<Skeleton size="md" width="200px" />

// 여러 줄 텍스트 플레이스홀더
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
  <Skeleton size="lg" width="80%" />
  <Skeleton size="md" width="60%" />
  <Skeleton size="md" width="90%" />
</div>
```

## Size별 높이

| size | 높이 |
|------|------|
| xs | 8px |
| sm | 12px |
| md | 16px |
| lg | 20px |
| xl | 24px |

⚠️ **Figma 스펙 미추출 영역**: Skeleton의 높이 치수는 Figma spec에서 개별 레이어 dimension 데이터를 추출하지 못했습니다(layerInventory: []). 위 높이값은 ad-hoc으로 설정된 값입니다.

## 스타일 특성

- 배경: `--sys-border-neutral-weak`
- 형태: pill (border-radius: full)
- 너비: 기본 100%, `width` prop으로 커스텀 가능
- 애니메이션: opacity pulse (1.6s, ad-hoc — Figma에 명시 없음)

## NOT in Figma (avoid)

- `rounded` prop — 항상 pill 형태
- `variant` prop — Figma 스펙에 없음
- 텍스트 높이와의 매핑 — Figma에 명시적 텍스트 매핑 없음
