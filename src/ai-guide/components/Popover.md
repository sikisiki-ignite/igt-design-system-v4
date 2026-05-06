<!-- Generated from figma-spec.json | extractedAt: 2026-05-04 | MCP보완: SLOT 내부 구조 수동 추가 -->

# Popover

Figma node: `2037:59954` (COMPONENT_SET)

## 구조

팝오버는 **컨테이너 + 슬롯** 구조입니다. `content` prop에 `PopoverSection / PopoverHeader / PopoverBody`를 조합해 삽입합니다.

```
Popover (컨테이너: padding 24px, flex column, gap 20px)
└── Slot (content prop으로 주입)
    ├── PopoverSection (flex column, gap 8px)
    │   ├── PopoverHeader (Body/14/semibold 자동 적용)
    │   └── PopoverBody   (Reading/14/regular 자동 적용, width 100%)
    └── PopoverSection (반복 가능, 섹션 간 gap 20px)
        ├── PopoverHeader
        └── PopoverBody
```

## Props

### `Popover`

| prop | type | default | 설명 |
|------|------|---------|------|
| `children` | `ReactNode` | — | 트리거 요소 |
| `content` | `ReactNode` | — | 팝오버 내부 콘텐츠 (PopoverSection 조합 권장) |
| `emphasis` | `'surface' \| 'inverse'` | `'surface'` | 배경 변형 |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | 표시 위치 |
| `sideOffset` | `number` | `8` | 트리거와의 거리(px) |
| `open` | `boolean` | — | 제어 모드 |
| `onOpenChange` | `(open: boolean) => void` | — | 제어 모드 콜백 |

### `PopoverSection`

| prop | type | 설명 |
|------|------|------|
| `children` | `ReactNode` | PopoverHeader + PopoverBody 조합 |

### `PopoverHeader`

| prop | type | 설명 |
|------|------|------|
| `children` | `ReactNode` | 제목 텍스트 (Body/14/semibold 자동 적용) |

### `PopoverBody`

| prop | type | 설명 |
|------|------|------|
| `children` | `ReactNode` | 본문 텍스트 (Reading/14/regular 자동 적용) |

## Emphasis 변형

| emphasis | 배경 토큰 | 헤더 색상 토큰 | 본문 색상 토큰 |
|----------|---------|------------|------------|
| `surface` | `--sys-surface-static` | `--sys-content-neutral-strong` | `--sys-content-neutral-default` |
| `inverse` | `--sys-surface-floating` | `--sys-contentOn-dark-default` | `--sys-contentOn-dark-subtle` |

## 사용 예시

### 단일 섹션

```tsx
import { Popover, PopoverSection, PopoverHeader, PopoverBody } from '@igt/design-system'

<Popover
  content={
    <PopoverSection>
      <PopoverHeader>알림 안내</PopoverHeader>
      <PopoverBody>일부 알림은 지연되어 도착할 수 있어요.</PopoverBody>
    </PopoverSection>
  }
>
  <Button>열기</Button>
</Popover>
```

### 멀티 섹션

```tsx
<Popover
  content={
    <>
      <PopoverSection>
        <PopoverHeader>알림 안내</PopoverHeader>
        <PopoverBody>일부 알림은 지연되어 도착할 수 있어요.</PopoverBody>
      </PopoverSection>
      <PopoverSection>
        <PopoverHeader>기능 사용 가이드</PopoverHeader>
        <PopoverBody>필요한 항목을 선택해 작업을 진행할 수 있어요.</PopoverBody>
      </PopoverSection>
    </>
  }
>
  <Button>열기</Button>
</Popover>
```

### inverse 변형

```tsx
<Popover emphasis="inverse" placement="top" content={...}>
  <Button>열기</Button>
</Popover>
```

## NOT in Figma (avoid)

- `PopoverSection` 없이 임의 `<div>` / `<p>` 직접 삽입 — 타이포그래피·간격 불일치 발생
- `font-size`, `font-weight`, `color` 인라인 스타일 직접 지정 — 토큰 미사용
- 헤더·본문 텍스트에 `text-*` 유틸리티 클래스 중복 적용 — 컴포넌트가 이미 적용함

## 스크립트 이슈 기록

`generate-figma-spec.mjs`가 `SLOT` 타입 노드에서 자식 순회를 중단하여 `section / header / body` 레이어가 `layerInventory`에 누락됨.  
이번 구현은 MCP 직접 조회로 보완. 스크립트 개선 필요: SLOT 내 placeholder 자식을 `slotContentPattern`으로 별도 추출해야 함.
