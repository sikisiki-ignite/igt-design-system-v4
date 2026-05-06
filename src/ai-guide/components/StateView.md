<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T02:32:06.920Z -->

# StateView

빈 상태 또는 오류 상태를 시각화하는 컴포넌트. 아이콘·헤드라인·본문·액션 버튼으로 구성됩니다.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `variant` | `'error' \| 'empty'` | `'error'` | 상태 유형 |
| `density` | `'standard' \| 'compact'` | `'standard'` | 밀도 |
| `headline` | `string` | — | 헤드라인 텍스트 (필수) |
| `body` | `string` | — | 보조 설명 텍스트 |
| `icon` | `ReactNode` | — | 아이콘 슬롯 |
| `action` | `ReactNode` | — | 액션 버튼 슬롯 |
| `className` | `string` | — | 추가 클래스명 |

## 사용 예시

```tsx
// 오류 상태
<StateView
  variant="error"
  headline="일시적으로 정보를 불러오지 못했어요"
  body="시스템에 문제가 생겨 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
  icon={<Icon name="failureSolid" size={40} />}
  action={<Button variant="ghost" size="sm">다시 시도</Button>}
/>

// 빈 상태 (compact)
<StateView
  variant="empty"
  density="compact"
  headline="아직 항목이 없어요"
  icon={<Icon name="documentPaperSolid" size={40} />}
/>
```

## Density

| density | gap |
|---------|-----|
| standard | `--spacing-20` |
| compact | `--spacing-12` |

## 텍스트 토큰

| 요소 | 토큰 | 색상 토큰 |
|------|------|----------|
| headline | `--semantic-heading-20-bold` | `--sys-surface-floating` |
| body | `--semantic-body-15-regular` | `--sys-content-neutral-muted` |

## NOT in Figma (avoid)

- `type` prop — StateView는 variant(error/empty)만 있음
- `title`/`description` prop 분리 — headline/body를 사용할 것
- 배경색 — StateView는 배경 없음 (투명)
