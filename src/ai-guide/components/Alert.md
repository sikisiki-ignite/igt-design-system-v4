<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:31:41.123Z -->

# Alert

인라인 상태 알림 컴포넌트. 페이지 또는 섹션 내부에 배치되며 사용자에게 중요한 메시지를 전달합니다.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `type` | `'error' \| 'warning' \| 'info' \| 'success' \| 'neutral'` | `'error'` | 알림 유형 |
| `title` | `string` | — | 알림 제목 (필수) |
| `description` | `string` | — | 보조 설명 텍스트 |
| `hasLeading` | `boolean` | `true` | 아이콘 표시 여부 |
| `dismissible` | `boolean` | `true` | 닫기 버튼 표시 여부 |
| `action` | `ReactNode` | — | 액션 버튼 슬롯 |
| `onDismiss` | `() => void` | — | 닫기 버튼 클릭 핸들러 |
| `className` | `string` | — | 추가 클래스명 |

## 사용 예시

```tsx
// 기본
<Alert type="error" title="진행 상태가 변경되었어요" />

// 설명 포함
<Alert
  type="warning"
  title="인증이 필요해요"
  description="변경된 내용을 확인 후 필요한 조치를 진행해 주세요"
/>

// 액션 버튼 포함
<Alert
  type="info"
  title="업데이트가 있어요"
  description="새 버전을 확인해 주세요"
  action={<Button size="sm" variant="ghost">업데이트</Button>}
  onDismiss={() => setVisible(false)}
/>

// 아이콘 없음
<Alert type="neutral" title="알림" hasLeading={false} dismissible={false} />
```

## Type별 토큰

| type | 배경 토큰 | 아이콘 색상 토큰 |
|------|----------|----------------|
| error | `--sys-border-status-danger-disabled` | `--sys-border-status-danger-default` |
| warning | `--sys-container-status-warning-tint-default` | `--sys-container-status-warning-solid-default` |
| info | `--sys-border-brand-disabled` | `--sys-border-brand-default` |
| success | `--sys-container-status-success-tint-default` | `--sys-border-status-success-default` |
| neutral | `--sys-border-neutral-weak` | `--sys-content-neutral-muted` |

## NOT in Figma (avoid)

- `variant` prop (solid/subtle) — Alert에는 없음. Banner를 사용할 것
- 외곽선/border — Figma 스펙에 없음
- 커스텀 아이콘 — 아이콘은 type에 의해 자동 결정됨
