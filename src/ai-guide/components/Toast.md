<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:32:08.201Z -->

# Toast

일시적인 알림 메시지 컴포넌트. 화면 하단 또는 특정 위치에 플로팅으로 표시됩니다.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `type` | `'error' \| 'warning' \| 'info' \| 'success' \| 'neutral'` | `'neutral'` | 알림 유형 |
| `message` | `string` | — | 메시지 텍스트 (필수) |
| `dismissible` | `boolean` | `false` | 닫기 버튼 표시 여부 |
| `action` | `ReactNode` | — | 액션 버튼 슬롯 |
| `onDismiss` | `() => void` | — | 닫기 버튼 클릭 핸들러 |
| `className` | `string` | — | 추가 클래스명 |

## 사용 예시

```tsx
// 기본
<Toast message="저장되었어요" />

// type 지정
<Toast type="success" message="파일이 업로드되었어요" />

// 닫기 버튼 포함
<Toast
  type="error"
  message="오류가 발생했어요. 다시 시도해 주세요"
  dismissible
  onDismiss={() => setVisible(false)}
/>

// 액션 포함
<Toast
  type="info"
  message="새 메시지가 도착했어요"
  action={<TextButton size="sm">확인</TextButton>}
/>
```

## 스타일 특성

- 배경: 항상 `--sys-surface-floating` (다크)
- 텍스트: 항상 `--sys-contentOn-dark-default` (라이트)
- 아이콘 색상만 type별로 변경됨

| type | 아이콘 색상 토큰 |
|------|----------------|
| error | `--sys-border-status-danger-default` |
| warning | `--sys-container-status-warning-solid-default` |
| info | `--sys-border-brand-default` |
| success | `--sys-border-status-success-default` |
| neutral | `--sys-contentOn-dark-default` |

## NOT in Figma (avoid)

- `title` prop — Toast는 단일 메시지만 표시함. Alert/Banner를 사용할 것
- `variant` prop — Toast는 항상 다크 배경
- 자동 숨김(auto-dismiss) — 별도 타이머 구현 필요
