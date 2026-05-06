<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:31:55.067Z -->

# Banner

페이지 상단이나 섹션 전체 너비를 차지하는 알림 배너 컴포넌트.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `type` | `'error' \| 'warning' \| 'info' \| 'success'` | `'error'` | 알림 유형 |
| `variant` | `'subtle' \| 'solid'` | `'subtle'` | 배경 스타일 |
| `title` | `string` | — | 배너 제목 (필수) |
| `description` | `string` | — | 보조 설명 텍스트 |
| `dismissible` | `boolean` | `true` | 닫기 버튼 표시 여부 |
| `action` | `ReactNode` | — | 액션 버튼 슬롯 |
| `onDismiss` | `() => void` | — | 닫기 버튼 클릭 핸들러 |
| `className` | `string` | — | 추가 클래스명 |

## 사용 예시

```tsx
// 기본 (subtle)
<Banner type="error" title="오류가 발생했어요" />

// solid variant
<Banner
  type="info"
  variant="solid"
  title="새 기능이 출시됐어요"
  description="지금 바로 확인해 보세요"
/>

// 액션 포함
<Banner
  type="warning"
  title="세션이 곧 만료돼요"
  description="30분 후 자동으로 로그아웃됩니다"
  action={<Button size="sm">연장하기</Button>}
/>
```

## Type × Variant 배경 토큰

| type | subtle | solid |
|------|--------|-------|
| error | `--sys-border-status-danger-weak` | `--sys-border-status-danger-default` |
| info | `--sys-border-brand-weak` | `--sys-border-brand-default` |
| success | `--sys-container-status-success-tint-strong` | `--sys-border-status-success-default` |
| warning | `--sys-container-status-warning-tint-strong` | `--sys-container-status-warning-solid-default` |

solid variant에서 텍스트/아이콘/닫기 버튼은 모두 `--sys-surface-static` (흰색)으로 표시됩니다.

## NOT in Figma (avoid)

- `neutral` type — Banner에는 없음. Alert을 사용할 것
- `hasLeading` prop — 아이콘은 항상 표시됨
- 커스텀 아이콘 — type에 의해 자동 결정됨
