<!-- Generated from figma-spec.json | extractedAt: 2026-05-05 -->

# Tooltip

마우스 오버 시 표시하는 말풍선 형태의 정보성 오버레이. basic(레이블만)과 rich(레이블+설명) 두 가지 variant, 3가지 tone, 12방향+none 배치를 지원.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| children | `ReactNode` | - | 트리거 요소 (필수) |
| label | `string` | - | 레이블 텍스트 (필수) |
| description | `string` | - | 설명 텍스트 (`variant="rich"`일 때만 표시) |
| variant | `'basic' \| 'rich'` | `'basic'` | basic: 레이블만 / rich: 레이블 + 설명 |
| tone | `'inverse' \| 'surface' \| 'accent'` | `'inverse'` | 색상 톤 |
| placement | `TooltipPlacement` | `'top'` | 말풍선 방향 (아래 참조) |
| arrow | `boolean` | `true` | 말풍선 꼭지(caret) 표시 여부 |
| open | `boolean` | - | 제어 모드 열림 상태 |
| onOpenChange | `(open: boolean) => void` | - | 열림 상태 변경 콜백 |
| delayDuration | `number` | `400` | 표시 딜레이(ms) |

## TooltipPlacement

```
'top-start' | 'top' | 'top-end'
'right-start' | 'right' | 'right-end'
'bottom-start' | 'bottom' | 'bottom-end'
'left-start' | 'left' | 'left-end'
'none'
```

`none`: 꼭지 없이 트리거 위에 표시 (내부적으로 top-center 고정).

## Tone

| Tone | 배경 | 텍스트 | 용도 |
|------|------|--------|------|
| `inverse` | `--sys-surface-floating` (dark) | 밝은 텍스트 | 기본. 대부분 상황 |
| `surface` | `--sys-surface-static` (light) | 일반 텍스트 | 밝은 UI 위에서 구분 필요 시 |
| `accent` | `--sys-border-brand-default` (brand) | 흰 텍스트 | 강조/브랜드 컨텍스트 |

## 사용 예시

```tsx
// 기본 (inverse, top, arrow)
<Tooltip label="저장">
  <Button>저장</Button>
</Tooltip>

// rich: 제목 + 설명
<Tooltip
  variant="rich"
  label="파일 삭제"
  description="삭제된 파일은 복구할 수 없습니다."
  tone="surface"
  placement="bottom"
>
  <IconButton icon="trash" />
</Tooltip>

// 방향 지정
<Tooltip label="설정" placement="right-start">
  <Button>설정</Button>
</Tooltip>

// 꼭지 없음
<Tooltip label="정보" arrow={false}>
  <span>?</span>
</Tooltip>

// 제어 모드
<Tooltip label="복사됨" open={copied} onOpenChange={setCopied}>
  <Button onClick={handleCopy}>복사</Button>
</Tooltip>
```

## 동작 메모

- `placement` start/end 정렬에서 콘텐츠가 1줄인 경우 자동으로 center 정렬로 전환 (scrollHeight 기준).
- `RadixTooltip.Provider`가 내부 포함되어 있어 별도 Provider 불필요.

## NOT in Figma (avoid)

- `description`을 `variant="basic"`에 전달해도 표시되지 않음 — `variant="rich"`에서만 유효
- `placement="none"` 시 arrow prop과 무관하게 꼭지 미표시
- 커스텀 콘텐츠 슬롯 — label/description 텍스트 외 JSX 삽입 불가
- `placement` start/end 세분화(`top-start`, `top-end` 등) — Figma에는 top/bottom/left/right/none 5가지만 존재. start/end는 Radix UI 코드 확장이며 Figma에 대응 토큰 없음
