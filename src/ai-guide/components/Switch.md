<!-- Generated from figma-spec.json | extractedAt: 2026-05-03T14:54:32.482Z -->

# Switch

토글 스위치 입력 컴포넌트. ON/OFF 상태를 나타냄.

## Props

| prop | type | default | 설명 |
|------|------|---------|------|
| `checked` | `boolean` | `false` | ON/OFF 상태 |
| `size` | `'sm' \| 'md'` | `'md'` | 크기 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | — | 상태 변경 핸들러 |

`InputHTMLAttributes<HTMLInputElement>` 확장 (단, `size`, `type`, `checked` 제외).

## 사용 예시

```tsx
// 비제어
<Switch />

// 제어
const [on, setOn] = useState(false)
<Switch checked={on} onChange={(e) => setOn(e.target.checked)} />

// 비활성화
<Switch checked disabled />

// sm 크기
<Switch size="sm" />
```

## NOT in Figma (avoid)

- `label` prop — Switch는 레이블 없음. 외부에서 `<label>` 또는 `aria-label`로 연결
- `color` / `tone` prop — 색상 변형 없음
- `indeterminate` 상태 — Checkbox에만 해당
