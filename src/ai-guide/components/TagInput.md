<!-- Composition component | no figma-spec | 2026-05-06 -->

# TagInput

텍스트를 입력하고 Enter 또는 쉼표(,)로 태그를 추가하는 입력 컴포넌트.  
Backspace로 마지막 태그를 삭제한다.

**기반 컴포넌트**: `InputChip`, TextField 토큰 (`--input-textField-*`)

## Import

```tsx
import { TagInput } from '@igt/design-system';
```

## Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `tags` | `string[]` | — | 현재 태그 배열 (controlled, 필수) |
| `onChange` | `(tags: string[]) => void` | — | 태그 변경 핸들러 (필수) |
| `placeholder` | `string` | `'입력 후 Enter'` | 태그가 없을 때 표시되는 placeholder |
| `label` | `string` | — | 필드 레이블 |
| `indicator` | `'required' \| 'optional'` | — | 레이블 옆 필수/선택 표시 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'lg'` | 컨테이너 크기 |
| `invalid` | `boolean` | `false` | 에러 상태 (빨간 테두리 + 메시지) |
| `disabled` | `boolean` | `false` | 비활성화 |
| `message` | `string` | — | 하단 도움말/에러 텍스트 |
| `maxTags` | `number` | — | 최대 태그 수. 도달 시 입력 비활성화 |
| `tone` | `'neutral' \| 'accent'` | `'neutral'` | 태그(InputChip) 색상 톤 |

## 사용 예시

```tsx
// 기본 (controlled)
const [tags, setTags] = useState<string[]>([])
<TagInput tags={tags} onChange={setTags} label="키워드" />

// 초기값 있음
const [tags, setTags] = useState(['React', 'TypeScript'])
<TagInput tags={tags} onChange={setTags} />

// 최대 개수 제한
<TagInput
  tags={tags} onChange={setTags}
  maxTags={5}
  message="최대 5개까지 입력 가능합니다."
/>

// 에러 상태
<TagInput
  tags={tags} onChange={setTags}
  invalid
  message="허용되지 않는 태그가 포함되어 있습니다."
/>

// 비활성화
<TagInput tags={['읽기전용', '태그']} onChange={() => {}} disabled />

// accent 톤
<TagInput tags={tags} onChange={setTags} tone="accent" />
```

## NOT in Figma (avoid)

- Figma 디자인 없음 — Flow B 컴포지션 컴포넌트
- `size="xs"` — InputChip이 xs를 sm으로 매핑하므로 시각적 차이 없음
- 비제어(uncontrolled) 사용 — `tags` + `onChange`는 항상 함께 사용
