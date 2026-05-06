<!-- Generated from figma-spec.json | extractedAt: 2026-05-04T08:43:48.153Z -->

# Accordion

접기/펼치기 가능한 FAQ, 설명 목록 등에 사용하는 컴포넌트.

## Import

```tsx
import { Accordion, AccordionItem } from '@igt/design-system';
```

## Accordion Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | 헤더 크기 (padding, typography 연동) |
| `variation` | `'plain' \| 'contained'` | `'plain'` | 스타일 변형 |
| `children` | `React.ReactNode` | — | `AccordionItem` 목록 |
| `className` | `string` | — | — |

## AccordionItem Props

| Prop | Type | Default | Figma prop |
|------|------|---------|-------------|
| `title` | `string` | — | 헤더 제목 텍스트 (필수) |
| `children` | `React.ReactNode` | — | 펼쳤을 때 표시할 내용 (필수) |
| `leadingIcon` | `React.ReactNode` | — | 헤더 좌측 아이콘 |
| `defaultExpanded` | `boolean` | `false` | 초기 펼침 상태 |
| `disabled` | `boolean` | `false` | 비활성 상태 |

## Variation

| variation | 설명 |
|---|---|
| `plain` | 아이템 사이 구분선만 표시, 배경 투명 |
| `contained` | 각 아이템 둥근 배경, 아이템 간 gap 8px |

## Typography by size

| size | token |
|---|---|
| sm | `--semantic-body-14-regular` |
| md | `--semantic-body-15-regular` |
| lg | `--semantic-body-17-semibold` |

## 사용 예시

```tsx
<Accordion size="lg" variation="plain">
  <AccordionItem title="알림이 오지 않을 때는 어떻게 하나요?">
    설정 > 알림 > 허용으로 변경하시면 됩니다.
  </AccordionItem>
  <AccordionItem title="비밀번호를 잊어버렸어요" defaultExpanded>
    로그인 화면 하단의 비밀번호 찾기를 이용하세요.
  </AccordionItem>
</Accordion>

<Accordion variation="contained">
  <AccordionItem title="요금제 안내" leadingIcon={<InfoIcon />}>
    월정액 기준 안내...
  </AccordionItem>
</Accordion>
```

## NOT in Figma (avoid)

- 외부에서 expanded 상태 제어 (controlled mode) — 현재 내부 state만 지원
- `AccordionGroup`으로 한 개만 열리도록 제한 — 각 아이템이 독립적으로 동작
