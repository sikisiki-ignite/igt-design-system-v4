<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T07:55:15.718Z -->

# Dialog

모달 다이얼로그. Backdrop + Header + Body + Footer 구조. Radix Dialog 기반.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| open | `boolean` | - | 표시 여부 |
| onOpenChange | `(open: boolean) => void` | - | 상태 변경 핸들러 |
| size | `'sm' \| 'md' \| 'lg'` | `'sm'` | 다이얼로그 폭 |
| variation | `'primary' \| 'neutral' \| 'danger'` | `'primary'` | 주 버튼 색상 톤 |
| title | `string` | - | 헤더 제목 (필수) |
| description | `string` | - | 본문 설명 텍스트 |
| children | `ReactNode` | - | 본문 추가 콘텐츠 슬롯 |
| primaryLabel | `string` | - | 주 액션 버튼 레이블 |
| onPrimary | `() => void` | - | 주 액션 핸들러 |
| secondaryLabel | `string` | - | 보조 액션 버튼 레이블 |
| onSecondary | `() => void` | - | 보조 액션 핸들러 |
| showCloseButton | `boolean` | size !== 'sm' | 우상단 닫기(×) 버튼 표시 여부 |

## Figma → Code 매핑

### Size

| Figma | Code | 폭 | 닫기 버튼 기본값 |
|-------|------|-----|----------------|
| sm (confirm) | `'sm'` | 360px | 없음 |
| md (modal) | `'md'` | 520px | 있음 |
| lg | `'lg'` | 720px | 있음 |

### Variation (Footer 버튼 톤)

| Figma Variation | Code | primaryLabel 색상 |
|----------------|------|------------------|
| primary | `'primary'` | 브랜드 블루 (`--sys-border-brand-default`) |
| neutral | `'neutral'` | 중성 회색 (`--sys-border-neutral-weak`) |
| danger | `'danger'` | 위험 빨강 (`--sys-border-status-danger-default`) |

## 사용 예시

```tsx
// 확인 다이얼로그 (sm · primary) — 닫기 버튼 없음
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  size="sm"
  title="현재 편집 중인 내용이 저장되지 않았어요"
  description="이 페이지를 벗어나면 변경 사항이 모두 사라져요. 계속 진행할까요?"
  primaryLabel="계속"
  onPrimary={handleConfirm}
  secondaryLabel="취소"
  onSecondary={() => setIsOpen(false)}
/>

// 파괴적 확인 (sm · danger)
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  size="sm"
  variation="danger"
  title="계정을 삭제할까요?"
  description="삭제된 계정은 복구할 수 없어요."
  primaryLabel="삭제"
  onPrimary={handleDelete}
  secondaryLabel="취소"
  onSecondary={() => setIsOpen(false)}
/>

// 모달 (md · primary · 닫기 버튼 자동) — 커스텀 본문
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  size="md"
  title="사용자 설정"
  primaryLabel="저장"
  onPrimary={handleSave}
  secondaryLabel="취소"
  onSecondary={() => setIsOpen(false)}
>
  <SettingsForm />
</Dialog>

// 모달 (md · neutral · 닫기 버튼 명시)
<Dialog
  open={isOpen}
  onOpenChange={setIsOpen}
  size="md"
  variation="neutral"
  showCloseButton={true}
  title="설정 초기화"
  description="모든 설정을 기본값으로 되돌립니다."
  primaryLabel="초기화"
  onPrimary={handleReset}
  secondaryLabel="취소"
  onSecondary={() => setIsOpen(false)}
/>
```

## NOT in Figma (avoid)

- `hasBody` prop — Figma 내부 제어용, 코드에서는 description/children 유무로 결정
- 아이콘 헤더 — Figma에 없음
- 버튼 3개 이상 — Footer는 최대 2버튼 (secondary + primary)
