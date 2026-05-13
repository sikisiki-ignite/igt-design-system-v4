#!/usr/bin/env node
import { existsSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const packageDir = dirname(dirname(fileURLToPath(import.meta.url)))

// node_modules 안에 설치된 경우 → INIT_CWD(npm install 실행 위치)가 프로젝트 루트
// 직접 클론한 경우 → 패키지 디렉토리의 한 단계 위가 바이브코딩 루트
const isNpmDependency = packageDir.includes('node_modules')
const targetDir = isNpmDependency
  ? (process.env.INIT_CWD ?? join(packageDir, '..', '..'))
  : join(packageDir, '..')

const targetPath = join(targetDir, 'CLAUDE.md')

if (existsSync(targetPath)) {
  console.log(`[IGT DS] CLAUDE.md already exists at ${targetPath} — skipped`)
  process.exit(0)
}

const pkgRef = isNpmDependency ? 'node_modules/igt-design-system-v4' : 'igt-design-system-v4'

const content = `# IGT Design System — 프로젝트 가이드

IGT Design System v4가 \`${pkgRef}/\`에 설치되어 있습니다.
화면을 만들기 전에 이 파일을 반드시 읽으세요.

---

## 중요: 작업 시작 전 확인 순서

1. 이 파일 숙지
2. **페이지 정답 샘플 (필독)**: \`./${pkgRef}/showcase/TitleTransferPage.tsx\` + \`TitleTransferPage.css\` — 백오피스 페이지 캐노니컬 레퍼런스. 새 페이지 만들기 전에 반드시 이 파일을 먼저 읽고 같은 패턴을 따른다.
3. **레이아웃 규칙**: \`./${pkgRef}/src/ai-guide/page-layout.md\`
4. **컴포넌트 DOM 참고 스니펫**: \`./${pkgRef}/dist/html-components.html\` — 단일 컴포넌트(Button, Checkbox, KpiCard, SideNavigation 등 29개)의 DOM 구조 참고용. **페이지 조립용이 아님**.
5. 상세 가이드: \`./${pkgRef}/CLAUDE.md\`
6. 테마 시연: \`./${pkgRef}/playground.html\`

**페이지 작업 원칙**: 페이지 단위 결과물은 **React + Vite 환경에서 작성**한다. 빌드 환경이 없으면 셋업부터 진행한다. 정적 HTML로 페이지를 조립하면 컴포넌트 캡슐화·토큰 강제·레이아웃 패턴이 무너져 샘플과 다른 결과물이 나온다 (실제 사고 이력 있음, 2026-05-13).

---

## (선택) HTML 단편 작업 시

### Step 1. HTML 위치 결정 (경로 계산 필수)

HTML 파일은 **반드시 프로젝트 루트**에 만든다.
서브 디렉토리(src/pages/ 등)에 만들면 CSS 경로가 깨진다.

올바른 위치: \`{프로젝트 루트}/화면명.html\`
금지 위치: \`src/pages/화면명/화면명.html\`

### Step 2. CSS 1줄 연결 (필수)

\`<style>\` 안에 CSS 변수를 직접 정의하지 않는다.
**반드시 아래 1줄 \`<link>\`로 연결한다.** 토큰 + 모든 컴포넌트 CSS가 포함되어 있다.

\`\`\`html
<!DOCTYPE html>
<html lang="ko" data-brand="default" data-theme="light" data-radius="default" data-size="comfortable">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./${pkgRef}/dist/igt.css">
  <style>
    /* 레이아웃 전용 — 색상/폰트/반경은 var(--sys-*) 토큰 사용 */
  </style>
</head>
\`\`\`

### Step 3. IGT 클래스명 사용 (핵심 규칙)

IGT는 컴포넌트마다 CSS 클래스를 미리 정의해 두었다.
**임의 클래스명을 만들지 않는다.** 반드시 아래 이름을 그대로 사용한다.

| 컴포넌트 | HTML 클래스 | 예시 |
|---------|-----------|------|
| Button | \`.btn\` | \`<button class="btn" data-tone="primary" data-appearance="fill" data-emphasis="strong">\` |
| IconButton | \`.icon-btn\` | \`<button class="icon-btn" data-tone="neutral" data-appearance="outline">\` |
| Badge | \`.badge\` | \`<span class="badge" data-tone="urgent" data-size="md">\` |
| Chip (선택형) | \`.chip chip--choice\` | \`<button class="chip chip--choice" data-selected>\` |
| Chip (필터형) | \`.chip chip--filter\` | \`<button class="chip chip--filter">\` |
| Table | \`.table-wrapper > .table\` | \`<div class="table-wrapper"><table class="table">\` |
| Card | \`.card\` | \`<div class="card">\` |
| TextField | \`.tf\` | \`<div class="tf">\` |

**컴포넌트 HTML 구조가 불확실할 때 가장 빠른 방법:**
\`./${pkgRef}/dist/html-components.html\` 파일에서 해당 컴포넌트 섹션을 찾아 스니펫을 그대로 복사한다. 25개 컴포넌트의 모든 variant가 정확한 DOM 구조로 들어 있다.

특히 다중 요소 컴포넌트 (\`Checkbox\`, \`Switch\`, \`Select\`, \`Dialog\`, \`Drawer\`, \`Pagination\`, \`Table\` 등)는 **절대 native HTML로 자체 작성하지 말고** 반드시 \`dist/html-components.html\`의 스니펫을 복사한다. 자체 \`<input type="checkbox">\` + 인라인 스타일로 작성하면 IGT 시스템 작동 안 함.

❌ **절대 금지 — 임의 발명 클래스:**
\`\`\`html
<!-- ❌ .ds-btn, .my-button, .igt-btn 등 IGT에 없는 클래스 -->
<button class="ds-btn ds-btn--primary">검색</button>

<!-- ✅ IGT 클래스 그대로 사용 -->
<button class="btn" data-tone="primary" data-appearance="fill">검색</button>
\`\`\`

### Step 4. 아이콘 사용 규칙 (핵심)

**사용자가 아이콘 이름을 명시하지 않으면 아이콘을 추가하지 않는다.**
기억에서 SVG path를 짜내거나 "맥락에 어울려 보이는" SVG를 박지 말 것. AI가 임의로 추가한 SVG는 IGT 아이콘 카탈로그와 정합되지 않고, 시각·시멘틱 사고를 일으킨다.

\`\`\`html
<!-- ❌ AI가 임의로 박은 SVG (모든 메뉴에 동일한 햄버거 SVG, 맥락 무시) -->
<button class="side-nav__item">
  <svg width="16" height="16"><path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor"/></svg>
  <span class="side-nav__item-label">명의이전 조회</span>
</button>

<!-- ✅ icon 슬롯이 optional 인 컴포넌트는 비워둠 (기본 상태) -->
<button class="side-nav__item">
  <span class="side-nav__item-label">명의이전 조회</span>
</button>

<!-- ✅ 사용자가 icon 이름을 명시한 경우만 — html-components.html의 스니펫 그대로 복사 -->
<!-- ./${pkgRef}/dist/html-components.html → SideNavigation → "with explicit icons" variant -->
\`\`\`

**적용 범위 — icon 슬롯이 optional 인 모든 컴포넌트:**
- \`SideNavigation\` 항목 icon
- \`Button\` / \`Chip\` 의 leadingIcon / trailingIcon
- \`Menu\` 의 leadingIcon
- \`TextField\` / \`Select\` 의 prefix / suffix icon
- 기타 모든 슬롯형 icon

**규칙 4가지:**
1. **기본은 비워둠** — icon 옵션이 optional 이면 디폴트는 icon 없음
2. **사용자가 icon 이름을 명시한 경우에만 추가** — 예: "검색 버튼에 \`searchOutline2dp\` 넣어줘"
3. **SVG는 직접 작성하지 않고** \`./${pkgRef}/dist/html-components.html\` 의 해당 variant 스니펫을 복사 (path 데이터가 IGT 카탈로그와 일치)
4. **사용자 요청이 모호하면 추측 금지 — 어떤 아이콘을 원하는지 묻기**

icon 이름은 컴포넌트(\`DatePicker\` 의 \`calendarSolid\`, \`SearchTrigger\` 의 \`searchOutline2dp\` 등) 기본값으로 이미 박혀 있다. 외부에서 별도 지정이 필요한 슬롯에만 위 규칙이 적용된다.

### 토큰 사용 규칙 (레이아웃 CSS 작성 시)

> **토큰 매핑은 \`showcase/TitleTransferPage.css\`가 정답**. 의심되면 그 파일을 본다.

| 용도 | 사용할 토큰 | 금지 |
|---|---|---|
| 페이지 외곽 배경 | \`var(--sys-surface-static)\` (흰색) | \`#ffffff\`, \`white\` 하드코딩 |
| LNB 배경 | \`var(--sys-background-subtle)\` (옅은 회색) | 하드코딩 |
| 컨텐츠 영역 배경 | \`var(--sys-background-base)\` (흰색) | 하드코딩 |
| 섹션(필터 박스) 배경 | \`var(--sys-background-subtle)\` (옅은 회색, 서치박스 패턴) | \`#ffffff\` 카드, box-shadow |
| 구분선 | \`var(--sys-border-neutral-default)\` | \`#e2e8f0\` |
| 텍스트 (강조) | \`var(--sys-content-neutral-strong)\` | \`#0f172a\` |
| 텍스트 (기본) | \`var(--sys-content-neutral-default)\` | \`#334155\` |
| 텍스트 (보조) | \`var(--sys-content-neutral-muted)\` | \`#64748b\` |
| 브랜드 색상 | \`var(--sys-container-brand-solid-default)\` | \`#3b5bdb\` |
| 위험 색상 | \`var(--sys-container-status-danger-solid-default)\` | \`#ef4444\` |
| 성공 색상 | \`var(--sys-container-status-success-solid-default)\` | \`#22c55e\` |

### 페이지 레이아웃 (백오피스 — TitleTransferPage 캐노니컬 패턴)

\`\`\`css
.page-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--sys-surface-static);  /* 페이지 외곽 = 흰색 */
}

.page-lnb {
  background: var(--sys-background-subtle);  /* LNB = 옅은 회색 */
  width: 250px;
}

.page-content {
  background: var(--sys-background-base);  /* 컨텐츠 = 흰색 */
  padding: var(--spacing-48);              /* 백오피스 공통 */
  flex: 1;
}

/* 섹션 (필터 박스 등) — 서치박스 패턴, box-shadow/카드형 금지 */
.section {
  background: var(--sys-background-subtle);  /* 섹션 = 옅은 회색 */
  border-radius: var(--radius-4);
  padding: var(--spacing-24);
}
\`\`\`

**금지 토큰명** (CSS에 존재하지 않음): \`--color-background-base\`, \`--color-background-surface\`, \`--color-border-default\`. 반드시 \`--sys-*\` 사용.

---

## React / TypeScript 프로젝트 시

\`import { Button } from 'igt-design-system-v4'\` — CSS 자동 주입됨, 별도 CSS import 불필요.

- \`index.html\`의 \`<html>\` 태그에 루트 속성 추가 (아래 참고)
- 커스텀 CSS, 인라인 스타일 금지
- 컴포넌트 props는 MCP \`get_component\` 또는 \`./${pkgRef}/src/ai-guide/components/{이름}.md\` 확인

---

## \`<html>\` 루트 속성 (필수)

| 속성 | 기본값 | 옵션 |
|---|---|---|
| \`data-brand\` | \`default\` | 브랜드 변형 |
| \`data-theme\` | \`light\` | \`light\` / \`dark\` |
| \`data-radius\` | \`default\` | \`default\` / \`soft\` / \`friendly\` / \`playful\` / \`formal\` |
| \`data-size\` | \`comfortable\` | \`comfortable\` / \`compact\` |

속성이 없으면 테마 전환과 브랜드 컬러가 동작하지 않습니다.
`

writeFileSync(targetPath, content, 'utf8')
console.log(`[IGT DS] ✓ CLAUDE.md created at ${targetPath}`)

// backoffice-dev 스킬 생성
const commandsDir = join(targetDir, '.claude', 'commands')
const skillPath = join(commandsDir, 'backoffice-dev.md')

if (existsSync(skillPath)) {
  console.log(`[IGT DS] backoffice-dev.md already exists — skipped`)
} else {
  mkdirSync(commandsDir, { recursive: true })
  const skillContent = `---
name: backoffice-dev
description: IGT Design System 컴포넌트로 백오피스 화면을 구현하는 전문 FE 개발자 스킬. 백오피스 화면·리스트 페이지·관리자 화면·폼·대시보드·필터/검색 UI를 구현하거나, 기획 스펙을 IGT 컴포넌트로 조립할 때 반드시 사용. Table, Input, Select, Button, Modal 등 IGT 컴포넌트 조합이 필요한 작업에서 자동 활성화.
---

# IGT 백오피스 개발자

너는 IGT Design System으로 **백오피스 화면을 구현하는 전문 FE 개발자**야.
기획 스펙을 받아 IGT 컴포넌트로 화면을 조립한다.

---

## 스펙 → 컴포넌트 매핑

| 스펙 키워드 | 컴포넌트 |
|------------|---------|
| 검색 입력 (단일) | \`TextField\` + \`Icon\` |
| 검색 입력 (다중 조건) | \`Search\` |
| 텍스트 필터 | \`TextField\` |
| 드롭다운 필터 (단일) | \`Select\` |
| 날짜 필터 (단일) | \`DatePicker\` |
| 날짜 필터 (범위) | \`DatePicker variation="range"\` |
| 칩 필터 | \`FilterChip\` |
| 목록 출력 | \`Table\` |
| 페이지네이션 | \`Pagination\` |
| 행 액션 | \`IconButton\` + \`Tooltip\` |
| 상태 표시 | \`Badge\` |
| 숫자/집계 카드 | \`KpiCard\` |
| 삭제 확인 | \`Dialog\` |
| 슬라이드 패널 | \`Drawer\` |
| 토스트 알림 | \`Toast\` |
| 빈/오류 상태 | \`StateView\` |
| 로딩 | \`SkeletonRect\` / \`SkeletonText\` |

---

## 구현 전 필수 절차 (순서 엄수)

코드를 한 줄도 쓰기 전에 아래를 완료한다.

### Step 1 — 사용할 컴포넌트 목록 확정
스펙의 각 UI 요소를 위 매핑 테이블에서 컴포넌트로 변환한다.
매핑 테이블에 없는 요소가 있으면 **구현 불가 Gap**으로 분류하고 사용자에게 먼저 보고한다.

### Step 2 — ai-guide 문서 읽기 (필수)
확정한 컴포넌트마다 ai-guide 문서를 읽는다.
읽지 않은 컴포넌트는 사용하지 않는다.

**경로**: \`./${pkgRef}/src/ai-guide/components/{ComponentName}.md\`

MCP가 활성화된 환경에서는 \`mcp__igt-design-system__get_component\` 우선 사용.
MCP가 없으면 위 경로에서 직접 읽는다.

### Step 3 — 컴포넌트 한계 확인
아래 한계 목록을 확인하고, 스펙이 한계를 초과하면 **구현 전에 사용자에게 보고**한다.

| 컴포넌트 | 할 수 없는 것 |
|---------|-------------|
| \`TopNavigation\` | 커스텀 로고 텍스트 불가 (\`brand: 'mgWrap'|'ignite'\` 또는 \`logoSrc\` 이미지만 지원) |
| \`Table\` | 셀 내부 복잡한 레이아웃은 \`render\` 함수로 처리, 단 IGT 컴포넌트 사용 |
| \`DatePicker\` | range 모드 값 타입: \`{ start?: Date, end?: Date }\` — string 아님 |

---

## 결과물 저장 위치

구현한 화면은 프로젝트의 **\`src/pages/{화면명}/\`** 아래에 저장한다.

\`\`\`
src/pages/
└── {화면명}/          ← 영문 소문자, 하이픈 구분 (예: user-management)
    ├── {PageName}.tsx
    └── {PageName}.css
\`\`\`

showcase/ 또는 node_modules/ 안에 추가하지 않는다.

---

## 핵심 규칙

1. **색상** — \`var(--sys-*)\` 사용, hex/rgb 금지
2. **폰트/반경** — \`var(--ref-font-size-*)\`, \`var(--radius-*)\` 사용
3. **컨텐츠 영역 패딩** — 반드시 \`var(--spacing-48)\` 사용
4. **HTML 인터랙티브 요소 금지** — \`<button>\` \`<input>\` \`<select>\` 대신 IGT 컴포넌트
5. **인라인 스타일 금지** — \`style={{...}}\` 사용 금지. 레이아웃은 페이지 전용 .css에 클래스 추가
6. **섹션 구분** — \`box-shadow\` 금지. 페이지 외곽=\`--sys-surface-static\`(흰), LNB=\`--sys-background-subtle\`, 컨텐츠=\`--sys-background-base\`(흰), 섹션=\`--sys-background-subtle\` (서치박스 패턴). 정답 샘플: \`showcase/TitleTransferPage.css\`. **금지 토큰명**: \`--color-background-*\`, \`--color-border-default\`는 CSS에 없음
7. **상태** — 텍스트 직접 출력 금지, \`Badge\` 또는 \`Label\` 사용
8. **아이콘** — 사용자가 icon 이름을 명시하지 않으면 추가하지 않음. optional icon 슬롯은 비워두는 게 기본. \`<Icon name="..." />\` 이름은 IGT 카탈로그(\`src/components/Icon/Icon.tsx\`의 \`IconName\` 타입)에 있는 것만 사용 — 카탈로그에 없는 아이콘은 추측 금지, 사용자에게 묻기

## 자가 점검 (구현 완료 후)

- [ ] \`style={{...}}\` 인라인 스타일 사용
- [ ] hex/rgb 색상 직접 사용
- [ ] \`<button>\` \`<input>\` \`<select>\` 등 HTML 인터랙티브 요소 직접 사용
- [ ] ai-guide 읽지 않고 props 추측해서 사용
- [ ] 컨텐츠 영역 패딩을 px 직접 지정 (\`var(--spacing-48)\` 강제)
- [ ] 섹션 분리에 \`box-shadow\` 사용
- [ ] showcase/ 또는 node_modules/ 안에 파일 추가
`
  writeFileSync(skillPath, skillContent, 'utf8')
  console.log(`[IGT DS] ✓ backoffice-dev.md created at ${skillPath}`)
}
