<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:41:12.316Z -->

# Label

분류 태그, 카테고리 레이블 표시에 사용하는 필 컴포넌트. 8가지 색상과 2가지 톤(soft/outline)을 지원합니다.

## Import

```tsx
import { Label } from '@igt/design-system';
```

## Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | 표시할 텍스트 (필수) |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'xl'` | 크기 |
| `tone` | `'soft' \| 'outline'` | `'soft'` | 스타일 톤 |
| `color` | `'grey' \| 'yellow' \| 'green' \| 'teal' \| 'blue' \| 'red' \| 'purple' \| 'orange'` | `'grey'` | 색상 테마 |
| `leadingIcon` | `React.ReactNode` | — | 텍스트 앞에 표시할 아이콘 |
| `className` | `string` | — | — |

## Typography by size

| size | token |
|------|-------|
| xs | `--semantic-micro-9-semibold` |
| sm | `--semantic-caption-11-semibold` |
| md | `--semantic-label-12-semibold` |
| lg | `--semantic-label-13-semibold` |
| xl | `--semantic-label-14-semibold` |

## 사용 예시

```tsx
<Label>분류</Label>
<Label color="blue" tone="soft" size="md">진행중</Label>
<Label color="red" tone="outline" size="lg">긴급</Label>
<Label color="green" size="sm" leadingIcon={<CheckIcon />}>완료</Label>
```

## Color → Token 매핑

| Figma color | 토큰 prefix |
|---|---|
| grey | `--dataDisplay-label-color-neutral-*` |
| yellow | `--dataDisplay-label-color-yellow-*` |
| green | `--dataDisplay-label-color-green-*` |
| teal | `--dataDisplay-label-color-teal-*` |
| blue | `--dataDisplay-label-color-blue-*` |
| red | `--dataDisplay-label-color-red-*` |
| purple | `--dataDisplay-label-color-purple-*` |
| orange | `--dataDisplay-label-color-orange-*` |

## NOT in Figma (avoid)

- 클릭 이벤트/onPress prop 없음 — Label은 표시 전용
- `disabled` 상태 없음
- 아이콘만 표시하는 variant 없음 (텍스트 필수)
