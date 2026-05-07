# AI 개발 가이드 — IGT Design System v4

이 프로젝트는 IGT Design System v4를 사용합니다.
화면을 만들 때 아래 규칙을 반드시 따르세요.

---

## 핵심 원칙

1. **모든 UI 컴포넌트는 `igt-design-system-v4`에서 import한다**
2. **커스텀 CSS, 인라인 스타일, Tailwind 색상/간격 클래스를 사용하지 않는다**
3. **컴포넌트를 쓰기 전에 반드시 `get_component`로 props를 확인한다**

---

## 패키지 설치

```bash
npm install github:sikisiki-ignite/igt-design-system-v4
```

---

## 테마 설정

`index.html` 루트에 아래 속성을 추가합니다.

```html
<html
  data-theme="light"
  data-radius="default"
  data-size="comfortable"
  data-brand="default"
>
```

| 속성 | 옵션 |
|---|---|
| `data-theme` | `light` \| `dark` |
| `data-radius` | `default` \| `soft` \| `friendly` \| `playful` \| `formal` |
| `data-size` | `comfortable` \| `compact` |

---

## 화면 개발 순서

화면을 만들 때 항상 이 순서를 따릅니다.

### 1. 기존 패턴 확인 (필수 — 가장 먼저)

```
list_patterns
```

매칭되는 패턴이 있으면 상세 구조를 가져옵니다:

```
get_pattern BackofficeListPage
```

패턴이 있으면 그 구조와 예시 코드를 기반으로 화면을 만듭니다.  
패턴이 없으면 2번으로 넘어갑니다.

### 2. 필요한 컴포넌트 파악

```
list_components
```

또는 키워드로 검색:

```
search_components 입력
search_components 날짜
search_components 모달
```

### 3. 각 컴포넌트의 props 확인

```
get_component TextField
get_component Button
get_component Dialog
```

### 4. 코드 작성

```tsx
import { TextField, Button } from 'igt-design-system-v4'

export function LoginPage() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <TextField label="이메일" type="email" placeholder="이메일 입력" />
      <TextField label="비밀번호" type="password" placeholder="비밀번호 입력" />
      <Button tone="primary" appearance="fill">로그인</Button>
    </div>
  )
}
```

---

## 레이아웃 규칙

- **Tailwind 레이아웃 유틸리티는 허용**: `flex`, `grid`, `items-center`, `justify-between`, `gap-*`, `p-*`, `w-*`, `h-*` 등
- **Tailwind 디자인 값은 금지**: `text-sm`, `text-blue-500`, `bg-gray-100`, `rounded-lg` 등 — 이런 값은 디자인 토큰이 자동으로 처리합니다

---

## Tooltip 사용 시 필수 설정

```tsx
import * as TooltipProvider from '@radix-ui/react-tooltip'

// 앱 최상단 컴포넌트에서
<TooltipProvider.Provider>
  <App />
</TooltipProvider.Provider>
```

---

## 하지 말아야 할 것

```tsx
// ❌ 다른 UI 라이브러리 사용
import { Button } from '@mui/material'
import { Input } from 'antd'

// ❌ 인라인 스타일로 색상/폰트 지정
<div style={{ color: '#1A73E8', fontSize: '14px' }}>

// ❌ Tailwind 색상/타이포그래피 클래스
<p className="text-blue-500 text-sm font-semibold">

// ❌ 임의로 새 컴포넌트 디자인
<div className="bg-gray-100 rounded-xl p-4 shadow-md">

// ✅ 올바른 방법
import { Label, Card } from 'igt-design-system-v4'
<Card variant="bordered"><Label color="blue">진행중</Label></Card>
```

---

## 문제가 생겼을 때

**"이 컴포넌트에 이 기능이 없어요"**  
→ `get_component 컴포넌트이름` 으로 실제 props를 다시 확인하세요.  
→ 없는 기능이면 가장 가까운 다른 컴포넌트를 `search_components` 로 찾으세요.

**"디자인이 이상해 보여요"**  
→ `data-theme`, `data-radius`, `data-size` 속성을 먼저 확인하세요.  
→ 커스텀 CSS가 시스템 스타일을 덮어쓰고 있지 않은지 확인하세요.

**"컴포넌트를 찾을 수 없어요"**  
→ MCP 서버가 연결됐는지 `list_components` 로 확인하세요.
