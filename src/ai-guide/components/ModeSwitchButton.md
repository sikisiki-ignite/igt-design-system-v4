<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:47:18.803Z -->

# ModeSwitchButton

단일 토글 버튼. 뷰 전환·모드 변경 등 on/off 상태 전환에 사용. 보통 여러 개를 나란히 배치하여 SegmentControl처럼 사용.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `selected` | `boolean` | `false` | Selected |
| `disabled` | `boolean` | — | HTML native |
| `children` | `ReactNode` | — | 레이블 텍스트 (필수) |

## Usage

```tsx
// 단일 토글
<ModeSwitchButton
  selected={isGrid}
  onClick={() => setIsGrid(true)}
>
  그리드
</ModeSwitchButton>

// 모드 스위치 그룹 (여러 개 나열)
<div role="group" aria-label="보기 방식">
  <ModeSwitchButton selected={view === 'grid'} onClick={() => setView('grid')}>
    그리드
  </ModeSwitchButton>
  <ModeSwitchButton selected={view === 'list'} onClick={() => setView('list')}>
    리스트
  </ModeSwitchButton>
</div>

// Disabled
<ModeSwitchButton disabled>비활성</ModeSwitchButton>
```

## CSS classes

| Class | Role |
|-------|------|
| `.mode-switch-btn` | Root button |
| `.mode-switch-btn__label` | 레이블 텍스트 |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-selected` | true, false | 선택 상태 |

## NOT in Figma (avoid)

- 아이콘 포함 — Figma에 텍스트 전용만 존재
- 단독 사용 시 SegmentControl 대신 — SegmentControl이 그룹 관리(aria, 상태 연동) 기능 포함
- `size` prop — Figma에 size 변형 없음
