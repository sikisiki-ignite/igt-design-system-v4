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
2. 상세 가이드 확인: \`./${pkgRef}/CLAUDE.md\`
3. 레이아웃 패턴 확인: \`./${pkgRef}/src/ai-guide/page-layout.md\`
4. 실제 사용 예시: \`./${pkgRef}/playground.html\`

---

## HTML 파일 작업 시 (빌드 없는 프로토타이핑)

사용자가 "HTML 파일로 화면 만들어줘"처럼 단일 HTML을 요청할 때 적용합니다.

### 필수: CSS 토큰 연결

\`<style>\` 안에 CSS 변수를 직접 정의하지 않습니다.
반드시 아래 \`<link>\` 태그로 실제 토큰 파일을 연결합니다.

\`\`\`html
<!DOCTYPE html>
<html lang="ko" data-brand="default" data-theme="light" data-radius="default" data-size="comfortable">
<head>
  <link rel="stylesheet" href="./${pkgRef}/src/fonts/fonts.css">
  <link rel="stylesheet" href="./${pkgRef}/src/tokens/primitives.css">
  <link rel="stylesheet" href="./${pkgRef}/src/tokens/semantic.css">
  <link rel="stylesheet" href="./${pkgRef}/src/tokens/themes.css">
  <link rel="stylesheet" href="./${pkgRef}/src/tokens/typography.css">
  <link rel="stylesheet" href="./${pkgRef}/src/tokens/effects.css">
  <style>
    /* 여기서는 --sys-* 토큰만 사용. 새 CSS 변수 생성 금지. */
  </style>
</head>
\`\`\`

### 토큰 사용 규칙

| 용도 | 사용할 토큰 | 금지 |
|---|---|---|
| 배경 (페이지) | \`var(--sys-background-subtle)\` | \`#f1f5f9\`, \`gray\` |
| 배경 (섹션) | \`var(--sys-background-base)\` | \`#ffffff\`, \`white\` |
| 구분선 | \`var(--sys-border-neutral-default)\` | \`#e2e8f0\` |
| 구분선 (약한) | \`var(--sys-border-neutral-subtle)\` | |
| 텍스트 (강조) | \`var(--sys-content-neutral-strong)\` | \`#0f172a\` |
| 텍스트 (기본) | \`var(--sys-content-neutral-default)\` | \`#334155\` |
| 텍스트 (보조) | \`var(--sys-content-neutral-muted)\` | \`#64748b\` |
| 브랜드 색상 | \`var(--sys-container-brand-solid-default)\` | \`#3b5bdb\` |
| 위험 색상 | \`var(--sys-container-status-danger-solid-default)\` | \`#ef4444\` |
| 성공 색상 | \`var(--sys-container-status-success-solid-default)\` | \`#22c55e\` |
| 경고 색상 | \`var(--sys-container-status-warning-solid-default)\` | \`#f97316\` |

### 페이지 레이아웃 (백오피스)

\`\`\`css
/* 페이지 배경 */
.page { background: var(--sys-background-subtle); }

/* 섹션 — border로 구분, box-shadow 금지 */
.section {
  background: var(--sys-background-base);
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-md);
}

/* 컨텐츠 영역 패딩 */
.page-content { padding: var(--spacing-48); }
\`\`\`

### HTML 파일에서 절대 하지 말아야 할 것

\`\`\`css
/* ❌ :root 안에 커스텀 변수 생성 */
:root {
  --color-surface: #ffffff;
  --color-fg-default: #334155;
}

/* ❌ hex/rgb 하드코딩 */
color: #334155;
background: #f1f5f9;
border-color: #e2e8f0;

/* ❌ box-shadow로 섹션 구분 */
.section { box-shadow: 0 2px 8px rgba(0,0,0,.1); }
\`\`\`

---

## React / TypeScript 프로젝트 시

자세한 가이드는 \`./${pkgRef}/CLAUDE.md\`를 참조합니다.
요약:
- \`import { Button } from 'igt-design-system-v4'\`
- 커스텀 CSS, 인라인 스타일 금지
- 컴포넌트 props는 MCP \`get_component\`로 확인

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
6. **섹션 구분** — \`box-shadow\` 금지. \`background: var(--color-background-surface)\` + \`border: 1px solid var(--color-border-default)\` 사용
7. **상태** — 텍스트 직접 출력 금지, \`Badge\` 또는 \`Label\` 사용

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
