// scripts/generate-composition-patterns.mjs
//
// Why this exists:
//   html-components.html teaches *single component* DOM structures. But
//   real pages — search rows, filter rows, KPI shortcut grids, table action
//   bars — are *compositions* of multiple components. AI agents that only
//   see single-component snippets cannot infer composition intent
//   (which tone/emphasis pair the search button, which icon name, the
//   data-size combination, the layout container class).
//
// What this does:
//   Curates representative composition patterns from showcase/TitleTransferPage
//   as static HTML so external AI agents have a single ground-truth file for
//   "how IGT components are combined into actual back-office layouts."

import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

const patterns = [
  {
    name: 'Page shell (Navigation + LNB + Content)',
    note: '백오피스 페이지의 기본 골격. 상단 Navigation + 좌측 SideNavigation + 메인 콘텐츠 영역. 콘텐츠 패딩은 var(--spacing-48) 강제.',
    html: `<div class="bo-page" style="display:flex;flex-direction:column;min-height:100vh;background:var(--sys-background-subtle)">
  <!-- 상단 GNB -->
  <header class="navigation" data-size="sm" data-layout="full">
    <div class="navigation__content">
      <div class="navigation__leading">
        <div class="navigation__logo"><span>로고</span></div>
        <nav class="navigation__nav"><div>관리 시스템</div></nav>
      </div>
      <div class="navigation__trailing"><div>사용자 영역</div></div>
    </div>
  </header>

  <div class="bo-body" style="display:flex;flex:1;min-height:0">
    <!-- LNB (좌측 네비) -->
    <aside class="bo-lnb" style="width:240px;flex-shrink:0;border-right:1px solid var(--sys-border-neutral-subtle);background:var(--sys-background-base)">
      <nav class="side-nav" data-size="md" data-tone="neutral">
        <div class="side-nav__header"><span class="side-nav__header-text">메뉴 그룹</span></div>
        <div class="side-nav__list">
          <button type="button" class="side-nav__item" data-current="" data-tone="neutral" aria-current="page">
            <span class="side-nav__item-label">현재 메뉴</span>
          </button>
          <button type="button" class="side-nav__item" data-tone="neutral">
            <span class="side-nav__item-label">다른 메뉴</span>
          </button>
        </div>
      </nav>
    </aside>

    <!-- 메인 콘텐츠 -->
    <main class="bo-content" style="flex:1;padding:var(--spacing-48);display:flex;flex-direction:column;gap:var(--spacing-32);min-width:0;overflow-x:auto;background:var(--sys-background-base)">
      <!-- 페이지 제목, 섹션들 -->
    </main>
  </div>
</div>`,
  },

  {
    name: 'KPI shortcut grid (selectable stat cards)',
    note: '대시보드/조회 페이지 상단의 통계 숏컷 카드 그리드. **자체 .shortcut-card / .stat-card 작성 금지** — 반드시 .kpi-card 사용. data-selectable="true" + data-selected="true" 가 활성 상태.',
    html: `<div class="kpi-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:var(--spacing-12)">
  <!-- 활성 카드 -->
  <button type="button" class="kpi-card" data-selectable="true" data-selected="true" aria-pressed="true">
    <p class="kpi-card__label">전체</p>
    <p class="kpi-card__value">247</p>
    <p class="kpi-card__sub-info">용인 182 · 판교 65</p>
  </button>
  <!-- 비활성 카드들 -->
  <button type="button" class="kpi-card" data-selectable="true" aria-pressed="false">
    <p class="kpi-card__label">처리대기</p>
    <p class="kpi-card__value">38</p>
    <p class="kpi-card__sub-info">최근 1개월</p>
  </button>
  <button type="button" class="kpi-card" data-selectable="true" aria-pressed="false">
    <p class="kpi-card__label">완료</p>
    <p class="kpi-card__value">194</p>
    <p class="kpi-card__sub-info">최근 1개월</p>
  </button>
  <button type="button" class="kpi-card" data-selectable="true" aria-pressed="false">
    <p class="kpi-card__label">반려</p>
    <p class="kpi-card__value">12</p>
    <p class="kpi-card__sub-info">최근 1개월</p>
  </button>
  <button type="button" class="kpi-card" data-selectable="true" aria-pressed="false">
    <p class="kpi-card__label">실패</p>
    <p class="kpi-card__value">3</p>
    <p class="kpi-card__sub-info">최근 1개월</p>
  </button>
</div>`,
  },

  {
    name: 'Filter section (label + control rows + action bar)',
    note: '필터 섹션 패턴. **section은 background-base + border 조합** (background-subtle 만 쓰지 말 것). 각 행은 .filter-row, label은 .filter-row-label, 컨트롤은 .filter-row-control. 하단 액션은 초기화(secondary weak) + 검색(secondary strong + searchOutline2dp leadingIcon).',
    html: `<div class="filter-section" style="background:var(--sys-background-base);border:1px solid var(--sys-border-neutral-subtle);border-radius:var(--radius-md);padding:var(--spacing-24);display:flex;flex-direction:column;gap:var(--spacing-16)">

  <!-- 필터 행: 칩 그룹 -->
  <div class="filter-row" style="display:flex;align-items:flex-start;gap:var(--spacing-8)">
    <span class="filter-row-label" style="width:120px;flex-shrink:0;align-self:center;font-weight:600;color:var(--sys-content-neutral-default)">상태</span>
    <div class="filter-row-control" style="flex:1;min-width:0">
      <div style="display:flex;flex-wrap:wrap;gap:var(--spacing-8)">
        <button class="chip chip--choice" data-size="md" aria-pressed="false" type="button"><span class="chip__label">처리대기</span></button>
        <button class="chip chip--choice" data-size="md" aria-pressed="true" data-selected="true" type="button"><span class="chip__label">완료</span></button>
        <button class="chip chip--choice" data-size="md" aria-pressed="false" type="button"><span class="chip__label">반려</span></button>
      </div>
    </div>
  </div>

  <!-- 필터 행: 날짜 범위 -->
  <div class="filter-row" style="display:flex;align-items:center;gap:var(--spacing-8)">
    <span class="filter-row-label" style="width:120px;flex-shrink:0;font-weight:600;color:var(--sys-content-neutral-default)">기간</span>
    <div class="filter-row-control" style="flex:1;min-width:0;display:flex;align-items:center;gap:var(--spacing-8)">
      <!-- DatePicker md size — calendar icon은 자동 포함, SVG 직접 작성 금지 -->
      <div class="dp" data-size="md" data-variation="singleDate">
        <button type="button" class="dp__field" data-size="md">
          <div class="dp__date-area"><span class="dp__date-text" data-size="md"><span class="dp__placeholder">YYYY-MM-DD</span></span></div>
          <span class="dp__trailing-action" data-size="md" aria-hidden="true">
            <!-- calendarSolid 아이콘은 html-components.html → DatePicker 섹션의 정본 SVG를 그대로 복사 -->
          </span>
        </button>
      </div>
      <span style="color:var(--sys-content-neutral-muted)">~</span>
      <div class="dp" data-size="md" data-variation="singleDate">
        <button type="button" class="dp__field" data-size="md">
          <div class="dp__date-area"><span class="dp__date-text" data-size="md"><span class="dp__placeholder">YYYY-MM-DD</span></span></div>
          <span class="dp__trailing-action" data-size="md" aria-hidden="true"><!-- calendarSolid SVG --></span>
        </button>
      </div>
    </div>
  </div>

  <!-- 필터 행: 텍스트 검색 (Select + TextField composite) -->
  <div class="filter-row" style="display:flex;align-items:center;gap:var(--spacing-8)">
    <span class="filter-row-label" style="width:120px;flex-shrink:0;font-weight:600;color:var(--sys-content-neutral-default)">검색</span>
    <div class="filter-row-control" style="flex:1;min-width:0;display:flex;gap:var(--spacing-8)">
      <!-- Select: html-components.html → Select 섹션 정본 사용 -->
      <button class="select" data-appearance="outline" data-size="md" data-width="hug" type="button"><span class="select__value">차량번호</span></button>
      <!-- TextField -->
      <div class="tf" data-appearance="outline" data-size="md" style="flex:1;min-width:200px">
        <div class="tf__container"><input class="tf__input" placeholder="값을 입력하세요" /></div>
      </div>
    </div>
  </div>

  <hr style="border:none;border-top:1px solid var(--sys-border-neutral-subtle);margin:0">

  <!-- 액션 바: 초기화 + 검색(leadingIcon) -->
  <div style="display:flex;justify-content:flex-end;gap:var(--spacing-8)">
    <button class="btn" data-tone="secondary" data-appearance="fill" data-emphasis="weak" data-size="md" type="button">
      <span class="btn-label-wrap"><span class="btn-label">초기화</span></span>
    </button>
    <button class="btn" data-tone="secondary" data-appearance="fill" data-emphasis="strong" data-size="md" type="button">
      <span class="btn-icon btn-icon--leading" aria-hidden="true">
        <!-- searchOutline2dp 아이콘: html-components.html → Button (with leadingIcon) 정본 SVG 복사 -->
      </span>
      <span class="btn-label-wrap"><span class="btn-label">검색</span></span>
    </button>
  </div>
</div>`,
  },

  {
    name: 'Table action bar (count info + actions)',
    note: '테이블 위 액션 바. 좌측은 카운트/선택 정보, 우측은 액션 버튼들(다운로드/업로드/일괄처리). data-emphasis는 strong CTA가 한 개, 나머지는 weak/outline.',
    html: `<div class="table-action-bar" style="display:flex;align-items:center;justify-content:space-between;gap:var(--spacing-12);padding:0 var(--spacing-2)">
  <!-- 좌측: 카운트 -->
  <div style="display:flex;align-items:center;gap:var(--spacing-8);font-weight:600;color:var(--sys-content-neutral-default)">
    <span>총 <strong>247</strong>건</span>
    <span style="color:var(--sys-content-neutral-weak)">·</span>
    <span style="color:var(--sys-content-brand-default)">3건 선택됨</span>
  </div>
  <!-- 우측: 액션들 -->
  <div style="display:flex;align-items:center;gap:var(--spacing-8)">
    <button class="btn" data-tone="secondary" data-appearance="outline" data-emphasis="strong" data-size="md" type="button">
      <span class="btn-label-wrap"><span class="btn-label">다운로드</span></span>
    </button>
    <button class="btn" data-tone="secondary" data-appearance="outline" data-emphasis="strong" data-size="md" type="button">
      <span class="btn-label-wrap"><span class="btn-label">일괄 업로드</span></span>
    </button>
    <button class="btn" data-tone="primary" data-appearance="fill" data-emphasis="strong" data-size="md" type="button">
      <span class="btn-label-wrap"><span class="btn-label">선택건 처리</span></span>
    </button>
  </div>
</div>`,
  },

  {
    name: 'Section card (백오피스 섹션 컨테이너)',
    note: '백오피스 페이지에서 콘텐츠를 묶는 섹션 컨테이너. **box-shadow 금지** — background-base + border 1px 조합으로 시각 구분. 다크모드/테마 전환 시 background-subtle 만으로는 대비가 사라져 border 필수.',
    html: `<section class="bo-section" style="background:var(--sys-background-base);border:1px solid var(--sys-border-neutral-subtle);border-radius:var(--radius-md);padding:var(--spacing-24);display:flex;flex-direction:column;gap:var(--spacing-16)">
  <!-- 섹션 헤더 -->
  <div style="display:flex;align-items:center;justify-content:space-between">
    <h2 style="margin:0;font-size:var(--ref-font-size-18);font-weight:600;color:var(--sys-content-neutral-strong)">섹션 제목</h2>
    <button class="btn" data-tone="secondary" data-appearance="outline" data-emphasis="weak" data-size="sm" type="button">
      <span class="btn-label-wrap"><span class="btn-label">전체보기</span></span>
    </button>
  </div>
  <!-- 섹션 본문 -->
  <div><!-- 본문 콘텐츠 --></div>
</section>`,
  },
]

const sections = patterns.map(({ name, note, html }) => `
<!-- ═══ ${name} ═══ -->
<!-- ${note} -->
${html.split('\n').join('\n')}
`).join('\n')

const out = `<!DOCTYPE html>
<html lang="ko" data-brand="default" data-theme="light" data-radius="default" data-size="compact">
<head>
  <meta charset="UTF-8">
  <title>IGT Design System — Composition Patterns</title>
  <link rel="stylesheet" href="./igt.css">
  <style>
    body { font-family: var(--typography-fontFamily-primary), sans-serif; padding: 24px; background: var(--sys-background-subtle); }
    .pattern-wrap { display: flex; flex-direction: column; gap: 48px; }
  </style>
</head>
<body>

<h1>IGT Design System — Composition Patterns</h1>
<p>이 파일은 <strong>여러 IGT 컴포넌트가 조합되어 만드는 페이지 패턴</strong>의 정본입니다. 개별 컴포넌트 DOM은 <code>html-components.html</code>을 보세요. 백오피스 페이지를 만들 때 아래 패턴을 골격으로 삼고, 내부 컴포넌트는 <code>html-components.html</code>의 정본 스니펫으로 채우세요.</p>
<p><strong>금지:</strong> 자체 .shortcut-card / .stat-card / .ds-* 클래스 작성, box-shadow로 섹션 분리, optional icon 슬롯에 임의 SVG 박기.</p>

<div class="pattern-wrap">
${sections}
</div>

</body>
</html>
`

const outPath = join(__dir, '..', 'dist', 'composition-patterns.html')
writeFileSync(outPath, out, 'utf8')
console.log(`✓ Generated: dist/composition-patterns.html (${out.length.toLocaleString()} bytes, ${patterns.length} patterns)`)
