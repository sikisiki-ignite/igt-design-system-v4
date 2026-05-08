#!/usr/bin/env node
import { existsSync, writeFileSync } from 'fs'
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
