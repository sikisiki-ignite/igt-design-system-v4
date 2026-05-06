# IGT Design System v4

Figma에서 직접 추출한 스펙 기반으로 만든 디자인 시스템입니다.  
59개 컴포넌트, AI 코딩 최적화, 테마 시스템 포함.

---

## 목차

- [설치](#설치)
- [기본 설정](#기본-설정)
- [컴포넌트 목록](#컴포넌트-목록)
- [테마 시스템](#테마-시스템)
- [MCP 서버 연결 (AI 연동)](#mcp-서버-연결-ai-연동)
- [AI 개발 규칙](#ai-개발-규칙)

---

## 설치

```bash
npm install github:sikisiki-ignite/igt-design-system-v4
```

> React 18 이상이 peerDependency입니다.

---

## 기본 설정

### 1. HTML 루트에 테마 속성 추가

```html
<html
  data-theme="light"
  data-radius="default"
  data-size="comfortable"
  data-brand="default"
>
```

### 2. 컴포넌트 사용

```tsx
import { Button, TextField, Dialog } from 'igt-design-system-v4'

export function MyPage() {
  return (
    <div>
      <TextField label="이름" placeholder="이름을 입력하세요" />
      <Button tone="primary">확인</Button>
    </div>
  )
}
```

### 3. Tooltip 사용 시 Provider 필수

Tooltip 컴포넌트를 사용하는 경우, 앱 루트를 `TooltipProvider`로 감싸야 합니다.

```tsx
import * as TooltipProvider from '@radix-ui/react-tooltip'

export function App() {
  return (
    <TooltipProvider.Provider>
      <YourApp />
    </TooltipProvider.Provider>
  )
}
```

---

## 컴포넌트 목록

총 **59개** 컴포넌트.

| 카테고리 | 수 | 컴포넌트 |
|---|---|---|
| action | 15 | Button, IconButton, OverlayAction, FloatingButton, ArrowControl, SearchTrigger, TextButton, Link, ActionToggle, IconToggle, Menu, MenuItem, ModeSwitchButton, ButtonGroupAttached, ButtonGroup |
| input | 17 | TextField, TextArea, Search, Select, DatePicker, Checkbox, RadioBox, Switch, NumberStepper, Slider, Rating, TagInput, ActionChip, ChoiceChip, FilterChip, InputChip, MetaChip |
| navigation | 8 | Breadcrumb, PageIndicator, Pagination, Tab, SegmentControl, Navigation, SideNavigation, OrgTree |
| feedback | 5 | Alert, Banner, Toast, StateView, Skeleton |
| overlay | 6 | Dialog, Drawer, Backdrop, Tooltip, HoverHint, Popover |
| base | 8 | Avatar, Badge, Label, Accordion, Table, Card, KpiCard, Divider |

각 컴포넌트의 props, 사용 예시는 `src/ai-guide/components/{Name}.md` 를 참고하거나 [MCP 서버](#mcp-서버-연결-ai-연동)를 통해 조회하세요.

---

## 테마 시스템

HTML 루트의 `data-*` 속성으로 전체 테마를 제어합니다.  
CSS custom property만 바뀌므로 JS 없이 즉시 반영됩니다.

| 속성 | 옵션 | 설명 |
|---|---|---|
| `data-theme` | `light` \| `dark` | 라이트/다크 모드 |
| `data-radius` | `default` \| `soft` \| `friendly` \| `playful` \| `formal` | 모서리 둥글기 전체 조정 |
| `data-size` | `comfortable` \| `compact` | 전체 컴포넌트 밀도 조정 |
| `data-brand` | 브랜드 이름 문자열 | 브랜드 컬러 전환 |

```html
<!-- 예시: 다크모드 + 플레이풀 + 컴팩트 -->
<html data-theme="dark" data-radius="playful" data-size="compact">
```

---

## MCP 서버 연결 (AI 연동)

Claude Code에 MCP 서버를 연결하면 AI가 컴포넌트 목록, props, 사용 예시를 직접 조회할 수 있습니다.

### 1. 레포 클론

```bash
git clone https://github.com/sikisiki-ignite/igt-design-system-v4.git
cd igt-design-system-v4
npm install
```

### 2. `.claude/mcp.json` 에 추가

```json
{
  "mcpServers": {
    "igt-design-system": {
      "command": "node",
      "args": ["/절대경로/igt-design-system-v4/mcp/server.mjs"]
    }
  }
}
```

`/절대경로/` 부분을 실제 클론 경로로 교체하세요.  
예: `/Users/john/Documents/igt-design-system-v4/mcp/server.mjs`

### 3. 연결 확인

Claude Code 대화창에서 다음을 입력합니다.

```
list_components
```

59개 컴포넌트가 카테고리별로 출력되면 정상입니다.

### 사용 가능한 MCP 도구

| 도구 | 설명 | 예시 |
|---|---|---|
| `list_components` | 전체 또는 카테고리별 컴포넌트 목록 | `list_components input` |
| `get_component` | props, 설명, 사용 예시 조회 | `get_component TextField` |
| `search_components` | 키워드로 컴포넌트 검색 | `search_components 날짜` |
| `get_figma_spec` | Figma 기반 스펙(propMapping, gaps) 조회 | `get_figma_spec Button` |
| `get_theme_info` | 테마 속성 및 CSS 변수 가이드 조회 | `get_theme_info` |

---

## AI 개발 규칙

Claude Code 또는 다른 AI 코딩 도구로 이 디자인 시스템을 사용할 때 지켜야 할 규칙입니다.

**✅ 해야 할 것**
- 컴포넌트는 반드시 `igt-design-system-v4`에서 import
- 레이아웃 유틸리티는 Tailwind 허용 (`flex`, `items-center`, `gap-*` 등)
- 컴포넌트 코드 작성 전에 `get_component`로 props 먼저 확인
- 테마 관련 작업 전에 `get_theme_info` 확인

**❌ 하지 말 것**
- 커스텀 CSS로 색상, 간격, 폰트 직접 작성
- Tailwind 스케일 클래스로 디자인 토큰 대체 (`gap-2`, `text-sm` 등)
- 시스템에 없는 새 컴포넌트를 임의로 디자인
