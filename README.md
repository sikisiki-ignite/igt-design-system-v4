# IGT Design System v4

AI가 일관된 디자인으로 화면을 만들어주는 시스템입니다.  
Claude Code에게 "로그인 화면 만들어줘"라고 요청하면, 이 시스템의 컴포넌트만 사용해서 화면을 만들어줍니다.

---

## 이 시스템이 하는 것

- Claude Code가 화면을 만들 때 **항상 동일한 컴포넌트, 동일한 디자인**을 사용하게 강제합니다
- 버튼, 입력창, 다이얼로그 등 59개 컴포넌트가 미리 만들어져 있습니다
- 다크모드, 브랜드 컬러, 레이아웃 밀도 등을 한 줄로 바꿀 수 있습니다

---

## 시작하기

> 아래 단계가 막히면 Claude Code에게 그대로 붙여넣고 도움을 요청하세요.

### 1단계. 이 레포 클론

터미널(또는 Claude Code)에서 실행합니다.

```bash
git clone https://github.com/sikisiki-ignite/igt-design-system-v4.git
cd igt-design-system-v4
npm install
```

### 2단계. MCP 서버 연결

Claude Code가 컴포넌트를 조회할 수 있도록 MCP 서버를 연결합니다.

홈 디렉토리의 `.claude/mcp.json` 파일에 아래 내용을 추가합니다.  
(파일이 없으면 새로 만드세요)

```json
{
  "mcpServers": {
    "igt-design-system": {
      "command": "node",
      "args": ["/여기에-클론한-경로/igt-design-system-v4/mcp/server.mjs"]
    }
  }
}
```

`/여기에-클론한-경로/` 부분을 실제 경로로 바꿔주세요.  
예: `/Users/john/Documents/igt-design-system-v4/mcp/server.mjs`

**대안 — 이미 npm으로 설치한 프로젝트가 있다면**

프로젝트 폴더에서 `npm install github:sikisiki-ignite/igt-design-system-v4` 로 설치한 경우,  
아래처럼 `node_modules` 경로를 사용할 수 있습니다.

```json
{
  "mcpServers": {
    "igt-design-system": {
      "command": "node",
      "args": ["/여기에-프로젝트-경로/node_modules/igt-design-system-v4/mcp/server.mjs"]
    }
  }
}
```

> **잘 됐는지 확인하는 방법:** Claude Code 대화창에 `list_components` 라고 입력했을 때  
> 컴포넌트 목록이 나오면 연결 성공입니다.

### 3단계. 새 프로젝트 시작

화면을 만들 새 프로젝트 폴더에 `CLAUDE.md` 파일을 복사합니다.

```bash
cp /여기에-클론한-경로/igt-design-system-v4/CLAUDE.md ./CLAUDE.md
```

이 파일이 있으면 Claude가 자동으로 이 디자인 시스템 규칙을 따릅니다.

---

## 화면 패턴 활용하기

자주 사용되는 화면 구조는 패턴으로 등록되어 있습니다.  
Claude에게 화면을 요청하기 전에 패턴이 있는지 먼저 확인하면, 구조와 컴포넌트 조합을 그대로 재사용할 수 있습니다.

```
list_patterns           ← 등록된 패턴 목록 확인
get_pattern BackofficeListPage   ← 특정 패턴 상세 보기
```

### 현재 등록된 패턴

| 패턴 | 설명 | 주요 컴포넌트 |
|---|---|---|
| `BackofficeListPage` | 백오피스 목록 조회 화면 — KPI 카드 + 상태 필터 + 기간/검색 + 테이블 | KpiCard, Checkbox, DatePicker, Table, Pagination |

### 패턴 활용 예시 프롬프트

```
명의이전 조회 화면 만들어줘.
BackofficeListPage 패턴 사용하고,
KPI 카드는 전체/대기/요청대기/미등록/실패 5개,
상태 필터는 Checkbox 7개로 구성해줘.
```

---

## Claude에게 화면 요청하는 방법

### 기본 요청 패턴

```
[화면 이름] 화면 만들어줘.
포함할 내용: [내용1], [내용2], [내용3]
```

### 예시 프롬프트

**로그인 화면**
```
로그인 화면 만들어줘.
포함할 내용: 이메일 입력, 비밀번호 입력, 로그인 버튼, 비밀번호 찾기 링크
```

**대시보드 화면**
```
관리자 대시보드 만들어줘.
상단에 KPI 카드 3개 (총 사용자, 오늘 가입, 활성 사용자),
아래에 사용자 목록 테이블, 페이지네이션 포함
```

**설정 화면**
```
사용자 설정 화면 만들어줘.
이름, 이메일, 전화번호 입력 필드,
알림 받기 스위치, 저장 버튼 포함
```

**모달/다이얼로그**
```
삭제 확인 다이얼로그 만들어줘.
"정말 삭제할까요?" 메시지, 취소/삭제 버튼 포함
```

### 페이지는 React + Vite 환경에서 만든다

IGT 디자인 시스템은 **실제 서비스 제작용**입니다. AI 바이브코딩으로 정적 HTML 페이지를 만들 때 일관성이 무너지는 사례가 반복되어, **페이지 단위 결과물은 React로 일원화**합니다. 빌드 환경이 없으면 AI에게 셋업까지 시켜주세요:

```
Vite + React + TypeScript 환경 만들고 igt-design-system-v4를 설치해줘.
그 위에 명의이전 조회 페이지를 만들어줘.
샘플은 showcase/TitleTransferPage.tsx 패턴을 따라줘.
```

> **컴포넌트 DOM 구조만 빠르게 확인하고 싶을 때**는 `dist/html-components.html`을 참고용 스니펫 라이브러리로 활용할 수 있습니다. 단, 페이지 레이아웃을 정적 HTML로 조립하는 용도가 아닙니다.

### 테마 바꾸기

```
data-theme을 dark로 바꿔줘
data-radius를 playful로 바꿔줘
data-size를 compact로 바꿔줘
```

---

## 테스트 체크리스트

Claude가 만들어준 화면을 확인할 때 아래 항목을 점검합니다.

**디자인 일관성**
- [ ] 버튼 스타일이 모두 동일한가?
- [ ] 입력 필드 모양이 일관적인가?
- [ ] 색상이 시스템 밖의 색을 쓰고 있지 않은가?

**테마 반응**
- [ ] `data-theme="dark"` 로 바꿨을 때 전체가 다크모드로 바뀌는가?
- [ ] `data-radius` 를 바꿨을 때 모든 컴포넌트의 모서리가 함께 바뀌는가?

**시스템 이탈 여부**
- [ ] import 문에 `igt-design-system-v4` 이외의 UI 라이브러리가 없는가?
- [ ] 인라인 스타일이나 임의의 CSS가 추가되어 있지 않은가?

---

## 컴포넌트 전체 목록

| 카테고리 | 컴포넌트 |
|---|---|
| 액션 (15) | Button, IconButton, OverlayAction, FloatingButton, ArrowControl, SearchTrigger, TextButton, Link, ActionToggle, IconToggle, Menu, MenuItem, ModeSwitchButton, ButtonGroupAttached, ButtonGroup |
| 입력 (17) | TextField, TextArea, Search, Select, DatePicker, Checkbox, RadioBox, Switch, NumberStepper, Slider, Rating, TagInput, ActionChip, ChoiceChip, FilterChip, InputChip, MetaChip |
| 내비게이션 (8) | Breadcrumb, PageIndicator, Pagination, Tab, SegmentControl, Navigation, SideNavigation, OrgTree |
| 피드백 (5) | Alert, Banner, Toast, StateView, Skeleton |
| 오버레이 (6) | Dialog, Drawer, Backdrop, Tooltip, HoverHint, Popover |
| 기본 (8) | Avatar, Badge, Label, Accordion, Table, Card, KpiCard, Divider |

특정 컴포넌트에 대해 더 알고 싶으면 Claude Code에 `get_component 컴포넌트이름` 을 입력하세요.  
예: `get_component Dialog`
