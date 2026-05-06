<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:47:22.222Z -->

# ButtonGroup

여러 Button을 일정 간격으로 묶는 레이아웃 컨테이너. 버튼 간 gap·방향·분배를 제어.

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `size` | `'lg' \| 'md' \| 'sm' \| 'xs'` | `'lg'` | Size |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| `distribution` | `'content' \| 'equal'` | `'content'` | Distribution |
| `children` | `ReactNode` | — | Button 목록 (필수) |

## Distribution 의미

| distribution | 동작 |
|-------------|------|
| `content` | 버튼이 콘텐츠 크기에 맞게 표시 |
| `equal` | 버튼이 컨테이너 폭을 균등 분할 |

## Usage

```tsx
// 기본 (horizontal · content · lg)
<ButtonGroup>
  <Button tone="secondary" appearance="outline">취소</Button>
  <Button>확인</Button>
</ButtonGroup>

// 수직 배치
<ButtonGroup direction="vertical">
  <Button>첫 번째</Button>
  <Button tone="secondary" appearance="outline">두 번째</Button>
</ButtonGroup>

// 균등 분배 (폼 하단 버튼 등)
<ButtonGroup distribution="equal">
  <Button tone="secondary" appearance="outline">취소</Button>
  <Button>저장</Button>
</ButtonGroup>

// Size 조절 (내부 Button size와 맞출 것)
<ButtonGroup size="sm">
  <Button size="sm" tone="secondary" appearance="outline">취소</Button>
  <Button size="sm">확인</Button>
</ButtonGroup>
```

## CSS classes

| Class | Role |
|-------|------|
| `.btn-group` | 컨테이너 (role="group") |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-size` | lg, md, sm, xs | Gap 크기 제어 |
| `data-direction` | horizontal, vertical | flex 방향 |
| `data-distribution` | content, equal | 자식 너비 제어 |

## Token structure

```
--action-buttonGroup-size-{size}-gap
```

## NOT in Figma (avoid)

- ButtonGroup `size`와 내부 Button `size`는 독립 — 자동 동기화 없음, 반드시 맞춰서 전달
- ButtonGroupAttached와 혼동 주의 — ButtonGroup은 간격 있는 독립 버튼, ButtonGroupAttached는 붙어있는 세그먼트형
