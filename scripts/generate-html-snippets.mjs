// scripts/generate-html-snippets.mjs
//
// Why this exists:
//   External AI agents that produce static HTML (not React) only receive
//   `dist/igt.css` and tend to fall back to native <input> + inline styles
//   for multi-element components like Checkbox/Switch/Select because they
//   cannot reliably reconstruct the multi-layer DOM from prose docs.
//
// What this does:
//   Uses React renderToStaticMarkup on the built dist/index.js to extract
//   the *exact* HTML that the components emit, then bundles representative
//   variants per component into `dist/html-components.html`. Any AI that
//   can fetch one file gets ground-truth DOM with class names, data-*
//   attributes, and child structure intact.

import { renderToStaticMarkup } from 'react-dom/server'
import { createElement as h, Fragment } from 'react'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import * as IGT from '../dist/index.js'

const __dir = dirname(fileURLToPath(import.meta.url))
const noop = () => {}

const components = [
  {
    name: 'Checkbox',
    note: '체크박스. native <input>을 직접 쓰지 말고 .checkbox 래퍼 구조를 그대로 사용.',
    variants: [
      { label: 'unchecked (default)', props: { checked: false, onChange: noop } },
      { label: 'checked', props: { checked: true, onChange: noop } },
      { label: 'indeterminate', props: { checked: 'indeterminate', onChange: noop } },
      { label: 'size=sm', props: { checked: true, size: 'sm', onChange: noop } },
      { label: 'disabled', props: { checked: true, disabled: true, readOnly: true } },
      { label: 'readOnly', props: { checked: true, readOnly: true } },
      { label: 'invalid (unchecked)', props: { checked: false, invalid: true, onChange: noop } },
    ],
  },
  {
    name: 'Switch',
    note: '온/오프 스위치. <input type="checkbox"> 와 toggle 알릤 조합 직접 작성 금지.',
    variants: [
      { label: 'off (default)', props: { checked: false, onChange: noop } },
      { label: 'on', props: { checked: true, onChange: noop } },
      { label: 'size=sm', props: { checked: true, size: 'sm', onChange: noop } },
      { label: 'disabled', props: { checked: true, disabled: true, readOnly: true } },
    ],
  },
  {
    name: 'TextField',
    note: '텍스트 입력 필드. native <input>에 .tf__input 만 붙이는 식 금지 — wrapper(.tf) + .tf__container + .tf__input 3-레이어 필수.',
    variants: [
      { label: 'default', props: { placeholder: '값을 입력하세요' } },
      { label: 'with label', props: { label: '이름', placeholder: '이름을 입력하세요' } },
      { label: 'with value', props: { value: '입력된 값', onChange: noop } },
      { label: 'size=sm', props: { placeholder: '검색', size: 'sm' } },
      { label: 'disabled', props: { value: '비활성', disabled: true, readOnly: true } },
      { label: 'readOnly', props: { value: '읽기 전용', readOnly: true } },
      { label: 'invalid (with message)', props: { value: '잘못된 값', invalid: true, message: '필수 항목입니다', onChange: noop } },
    ],
  },
  {
    name: 'Select',
    note: 'Radix 기반 드롭다운. SSR은 닫힌 trigger만 렌더 — 옵션 메뉴는 클릭 시 동적 생성된다. options prop 배열에 {value, label} 전달.',
    variants: [
      { label: 'default (closed, placeholder 표시)', props: { onChange: noop, options: [{ value: 'a', label: '옵션 A' }, { value: 'b', label: '옵션 B' }] } },
      { label: 'with value (선택된 상태)', props: { value: 'a', onChange: noop, options: [{ value: 'a', label: '옵션 A' }, { value: 'b', label: '옵션 B' }] } },
      { label: 'size=sm', props: { size: 'sm', onChange: noop, options: [{ value: 'a', label: '옵션 A' }] } },
      { label: 'disabled', props: { value: 'a', disabled: true, options: [{ value: 'a', label: '옵션 A' }] } },
      { label: 'invalid', props: { invalid: true, onChange: noop, options: [{ value: 'a', label: '옵션 A' }] } },
    ],
  },
  {
    name: 'DatePicker',
    note: '날짜 선택. <input type="date"> 직접 사용 아닌 IGT DatePicker 구조 사용.',
    variants: [
      { label: 'default', props: { value: '', onChange: noop, placeholder: 'YYYY-MM-DD' } },
      { label: 'with value', props: { value: '2026-05-12', onChange: noop } },
    ],
  },
  {
    name: 'RadioBox',
    note: '단일 라디오 컨트롤. native <input type="radio"> 직접 사용 금지.',
    variants: [
      { label: 'unselected', props: { checked: false, name: 'demo', value: 'a', onChange: noop } },
      { label: 'selected', props: { checked: true, name: 'demo', value: 'a', onChange: noop } },
      { label: 'size=sm', props: { checked: true, size: 'sm', name: 'demo', value: 'a', onChange: noop } },
      { label: 'disabled', props: { checked: true, disabled: true, readOnly: true, name: 'demo', value: 'a' } },
    ],
  },
  {
    name: 'ActionChip',
    note: '액션 트리거용 칩. label prop으로 텍스트 전달 (children 아님).',
    variants: [
      { label: 'default', props: { label: '액션', onClick: noop } },
      { label: 'size=sm', props: { label: '액션', size: 'sm', onClick: noop } },
      { label: 'with leading icon', props: { label: '액션', leadingIcon: 'hashOutline3dp', onClick: noop } },
      { label: 'disabled', props: { label: '액션', disabled: true } },
    ],
  },
  {
    name: 'ChoiceChip',
    note: '선택용 칩(다중/단일 선택). label prop + selected boolean. aria-pressed로 상태 노출.',
    variants: [
      { label: 'unselected', props: { label: '옵션', onClick: noop } },
      { label: 'selected', props: { label: '옵션', selected: true, onClick: noop } },
      { label: 'size=sm + selected', props: { label: '옵션', size: 'sm', selected: true, onClick: noop } },
      { label: 'disabled', props: { label: '옵션', disabled: true } },
    ],
  },
  {
    name: 'FilterChip',
    note: '필터용 칩. selected + dismiss 아이콘 패턴.',
    variants: [
      { label: 'unselected', props: { label: '필터', onClick: noop } },
      { label: 'selected', props: { label: '필터', selected: true, onClick: noop } },
    ],
  },

  // ── Layout / Overlay ──────────────────────────
  {
    name: 'Dialog',
    note: '모달 다이얼로그. .dialog-overlay + .dialog (data-size, data-variation) + 헤더/본문/푸터 3-구역.',
    manualReason: 'Radix Dialog.Portal이 SSR에서 빈 출력을 만들어 컴포넌트 소스(Dialog.tsx) 기반으로 정적 작성.',
    manualVariants: [
      {
        label: 'basic (primary)',
        html: `<div class="dialog-overlay"></div>
<div class="dialog" data-size="sm" data-variation="primary" role="dialog" aria-modal="true">
  <div class="dialog__header">
    <h2 class="dialog__title">확인</h2>
  </div>
  <div class="dialog__footer">
    <button type="button" class="dialog__btn dialog__btn--primary">확인</button>
  </div>
</div>`,
      },
      {
        label: 'with description + cancel',
        html: `<div class="dialog-overlay"></div>
<div class="dialog" data-size="sm" data-variation="primary" role="dialog" aria-modal="true" aria-describedby="dialog-description">
  <div class="dialog__header">
    <h2 class="dialog__title">삭제하시겠습니까?</h2>
  </div>
  <div class="dialog__body">
    <p id="dialog-description" class="dialog__description">이 작업은 되돌릴 수 없습니다.</p>
  </div>
  <div class="dialog__footer">
    <button type="button" class="dialog__btn dialog__btn--secondary">취소</button>
    <button type="button" class="dialog__btn dialog__btn--primary">삭제</button>
  </div>
</div>`,
      },
      {
        label: 'danger variation',
        html: `<div class="dialog-overlay"></div>
<div class="dialog" data-size="sm" data-variation="danger" role="dialog" aria-modal="true" aria-describedby="dialog-description">
  <div class="dialog__header">
    <h2 class="dialog__title">계정 삭제</h2>
  </div>
  <div class="dialog__body">
    <p id="dialog-description" class="dialog__description">모든 데이터가 영구히 사라집니다.</p>
  </div>
  <div class="dialog__footer">
    <button type="button" class="dialog__btn dialog__btn--secondary">취소</button>
    <button type="button" class="dialog__btn dialog__btn--primary">삭제</button>
  </div>
</div>`,
      },
      {
        label: 'size=md (with close button)',
        html: `<div class="dialog-overlay"></div>
<div class="dialog" data-size="md" data-variation="primary" role="dialog" aria-modal="true">
  <div class="dialog__header">
    <h2 class="dialog__title">상세 정보</h2>
    <button type="button" class="dialog__close" aria-label="닫기">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div class="dialog__body">
    <div class="dialog__slot"><!-- 본문 콘텐츠 슬롯 --></div>
  </div>
  <div class="dialog__footer">
    <button type="button" class="dialog__btn dialog__btn--primary">확인</button>
  </div>
</div>`,
      },
    ],
  },
  {
    name: 'Drawer',
    note: '사이드 슬라이드 패널. .drawer-overlay + .drawer (data-placement, data-size) + 헤더/본문/푸터.',
    manualReason: 'Radix Dialog.Portal이 SSR에서 빈 출력을 만들어 컴포넌트 소스(Drawer.tsx) 기반으로 정적 작성.',
    manualVariants: [
      {
        label: 'right side (default, sm)',
        html: `<div class="drawer-overlay"></div>
<div class="drawer" data-placement="right" data-size="sm" role="dialog" aria-modal="true">
  <div class="drawer__header">
    <div class="drawer__header-content">
      <h2 class="drawer__title">설정</h2>
    </div>
    <button type="button" class="drawer__dismiss" aria-label="닫기">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div class="drawer__body"><!-- 본문 콘텐츠 --></div>
  <div class="drawer__footer">
    <div class="drawer__footer-divider"></div>
    <div class="drawer__footer-actions" data-variation="primary" data-layout="inlineEnd">
      <div class="drawer__footer-end-group">
        <button type="button" class="drawer__btn drawer__btn--primary">저장</button>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        label: 'left placement, size=lg',
        html: `<div class="drawer-overlay"></div>
<div class="drawer" data-placement="left" data-size="lg" role="dialog" aria-modal="true" aria-describedby="drawer-description">
  <div class="drawer__header">
    <div class="drawer__header-content">
      <h2 class="drawer__title">메뉴</h2>
      <p id="drawer-description" class="drawer__subtitle">메뉴 항목을 선택하세요</p>
    </div>
    <button type="button" class="drawer__dismiss" aria-label="닫기">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div class="drawer__body"><!-- 본문 콘텐츠 --></div>
</div>`,
      },
      {
        label: '3-action footer (between layout)',
        html: `<div class="drawer-overlay"></div>
<div class="drawer" data-placement="right" data-size="sm" role="dialog" aria-modal="true">
  <div class="drawer__header">
    <div class="drawer__header-content">
      <h2 class="drawer__title">편집</h2>
    </div>
    <button type="button" class="drawer__dismiss" aria-label="닫기"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  </div>
  <div class="drawer__body"><!-- 본문 --></div>
  <div class="drawer__footer">
    <div class="drawer__footer-divider"></div>
    <div class="drawer__footer-actions" data-variation="primary" data-layout="between">
      <button type="button" class="drawer__btn drawer__btn--tertiary">삭제</button>
      <div class="drawer__footer-end-group">
        <button type="button" class="drawer__btn drawer__btn--secondary">취소</button>
        <button type="button" class="drawer__btn drawer__btn--primary">저장</button>
      </div>
    </div>
  </div>
</div>`,
      },
    ],
  },

  // ── Navigation / Pagination / Table ──────────
  {
    name: 'Navigation',
    note: 'Top navigation bar. logo/navItems/center/trailing 슬롯에 ReactNode 전달. 자체 .navigation/.nav-* 정의 금지.',
    variants: [
      { label: 'basic', props: { logo: h('span', { className: 'nav-logo' }, 'IGT'), navItems: h('div', null, '메뉴') } },
      { label: 'size=md', props: { size: 'md', logo: h('span', null, '로고'), navItems: h('div', null, '메뉴'), trailing: h('div', null, '사용자') } },
    ],
  },
  {
    name: 'Pagination',
    note: '페이지네이션. page/total/onChange 필수. 자체 .pagination + button 그룹 직접 작성 금지.',
    variants: [
      { label: 'basic (page 1 of 10)', props: { page: 1, total: 10, onChange: noop } },
      { label: 'middle page (5 of 20)', props: { page: 5, total: 20, onChange: noop } },
      { label: 'size=sm', props: { page: 3, total: 10, size: 'sm', onChange: noop } },
      { label: 'minimal variant', props: { page: 3, total: 10, variant: 'minimal', onChange: noop } },
    ],
  },
  {
    name: 'Table',
    note: '데이터 테이블. columns은 {key, header} 객체 배열. 자체 <table>+<thead> 직접 작성 금지. TableCell/TableHeader는 내부 자동 렌더.',
    variants: [
      { label: 'basic', props: {
        columns: [{ key: 'name', header: '이름' }, { key: 'role', header: '역할' }, { key: 'email', header: '이메일' }],
        data: [{ name: '홍길동', role: '관리자', email: 'hong@example.com' }, { name: '이몽룡', role: '사용자', email: 'lee@example.com' }],
      } },
      { label: 'selectable', props: {
        columns: [{ key: 'name', header: '이름' }, { key: 'status', header: '상태' }],
        data: [{ name: '항목1', status: '진행중' }, { name: '항목2', status: '완료' }],
        selectable: true,
        onRowSelect: noop,
      } },
      { label: 'size=md (compact)', props: {
        columns: [{ key: 'a', header: 'A' }, { key: 'b', header: 'B' }],
        data: [{ a: '1', b: '2' }],
        size: 'md',
      } },
    ],
  },

  // ── Feedback / Alert ──────────────────────────
  {
    name: 'Banner',
    note: '페이지 상단 알림 배너. type=error/warning/info/success. 자체 div.banner 작성 금지.',
    variants: [
      { label: 'error (default subtle)', props: { type: 'error', title: '오류가 발생했어요' } },
      { label: 'info solid + description', props: { type: 'info', variant: 'solid', title: '새 기능이 출시됐어요', description: '지금 바로 확인해 보세요' } },
      { label: 'success non-dismissible', props: { type: 'success', title: '저장 완료', dismissible: false } },
    ],
  },
  {
    name: 'Alert',
    note: '인라인 알림. Banner와 다르게 콘텐츠 영역 안에서 사용. type/hasLeading/dismissible 조합.',
    variants: [
      { label: 'error (default)', props: { type: 'error', title: '진행 상태가 변경되었어요' } },
      { label: 'warning with description', props: { type: 'warning', title: '인증이 필요해요', description: '변경된 내용을 확인 후 조치해 주세요' } },
      { label: 'neutral, no icon, no dismiss', props: { type: 'neutral', title: '알림', hasLeading: false, dismissible: false } },
    ],
  },
  {
    name: 'HoverHint',
    note: '필드 옆 작은 도움말 텍스트. title attribute로 도망 금지.',
    variants: [
      { label: 'inline (headline only)', props: { headline: '필수 항목입니다' } },
      { label: 'block (with description)', props: { headline: '입력 형식', description: 'YYYY-MM-DD 형식으로 입력하세요', layout: 'block' } },
    ],
  },

  // ── Disclosure / Selector ─────────────────────
  {
    name: 'Accordion',
    note: '접기/펼치기 목록. children은 AccordionItem 배열. <details>/<summary>로 도망 금지.',
    variants: [
      { label: 'plain (default)', props: {
        children: [
          h(IGT.AccordionItem, { key: '1', title: '알림이 오지 않을 때는 어떻게 하나요?' }, '설정 > 알림 > 허용으로 변경하세요.'),
          h(IGT.AccordionItem, { key: '2', title: '비밀번호를 잊어버렸어요', defaultExpanded: true }, '로그인 화면 하단의 비밀번호 찾기를 이용하세요.'),
        ],
      } },
      { label: 'contained variation', props: {
        variation: 'contained',
        children: [
          h(IGT.AccordionItem, { key: '1', title: '요금제 안내' }, '월 9,900원부터 시작하세요'),
          h(IGT.AccordionItem, { key: '2', title: '결제 방법' }, '신용카드, 계좌이체를 지원합니다'),
        ],
      } },
    ],
  },
  {
    name: 'SegmentControl',
    note: 'Tabs 대안. segments 배열 + activeIndex. button group/radio로 도망 금지.',
    variants: [
      { label: 'text only (3 items)', props: { segments: [{ label: '일' }, { label: '주' }, { label: '월' }], activeIndex: 0, onSegmentChange: noop } },
      { label: 'size=sm + activeIndex=1', props: { segments: [{ label: '전체' }, { label: '진행중' }, { label: '완료' }], activeIndex: 1, size: 'sm', onSegmentChange: noop } },
      { label: 'iconText + width=equal', props: { segments: [{ label: '리스트', icon: 'listOutline2dp' }, { label: '메뉴', icon: 'menuOutline2dp' }], activeIndex: 0, content: 'iconText', width: 'equal', onSegmentChange: noop } },
    ],
  },
  {
    name: 'Menu',
    note: 'Dropdown menu 콘텐츠. children은 MenuItem 배열. ul/li 직접 작성 금지.',
    variants: [
      { label: 'basic 3 items', props: {
        children: [
          h(IGT.MenuItem, { key: '1', onClick: noop }, '편집'),
          h(IGT.MenuItem, { key: '2', onClick: noop }, '복사'),
          h(IGT.MenuItem, { key: '3', tone: 'danger', onClick: noop }, '삭제'),
        ],
      } },
      { label: 'with icons', props: {
        children: [
          h(IGT.MenuItem, { key: '1', leadingIconName: 'heartOutline2dp', onClick: noop }, '즐겨찾기'),
          h(IGT.MenuItem, { key: '2', leadingIconName: 'homeOutline2dp', onClick: noop }, '홈으로'),
        ],
      } },
      { label: 'size=sm + disabled item', props: {
        size: 'sm',
        children: [
          h(IGT.MenuItem, { key: '1', size: 'sm', onClick: noop }, '항목 1'),
          h(IGT.MenuItem, { key: '2', size: 'sm', disabled: true }, '비활성 항목'),
        ],
      } },
    ],
  },

  // ── Hover/Click overlay (Radix-based) ─────────
  {
    name: 'Popover',
    note: 'Radix 기반 팝오버. SSR은 닫힌 trigger만 렌더 — 콘텐츠는 클릭 시 동적 생성. children=trigger, content=콘텐츠.',
    variants: [
      { label: 'basic', props: {
        children: h('button', { className: 'btn', 'data-tone': 'secondary', 'data-appearance': 'outline', 'data-emphasis': 'strong', 'data-size': 'md' }, '열기'),
        content: '팝오버 내용',
      } },
    ],
  },
  {
    name: 'Tooltip',
    note: 'Radix 기반 툴팁. SSR은 닫힌 trigger만 렌더. title 속성 사용 금지 — Tooltip 컴포넌트로 감싸야 키보드/AT 접근 가능.',
    variants: [
      { label: 'basic', props: {
        children: h('button', { className: 'btn', 'data-tone': 'secondary', 'data-appearance': 'outline', 'data-emphasis': 'strong', 'data-size': 'md' }, '도움말'),
        label: '클릭하여 펼치기',
      } },
      { label: 'rich variant', props: {
        children: h('button', { className: 'btn', 'data-tone': 'secondary', 'data-appearance': 'outline', 'data-emphasis': 'strong', 'data-size': 'md' }, '정보'),
        label: '제목',
        description: '추가 설명 텍스트',
        variant: 'rich',
      } },
    ],
  },

  // ── Numeric / Rating / Search ─────────────────
  {
    name: 'NumberStepper',
    note: '수량 입력. -/+ 버튼 + 숫자 input 자체 구성 금지.',
    variants: [
      { label: 'soft (default)', props: { value: 1, min: 0, max: 99, onChange: noop } },
      { label: 'outline emphasis', props: { value: 3, emphasis: 'outline', onChange: noop } },
      { label: 'size=sm', props: { value: 5, size: 'sm', onChange: noop } },
      { label: 'disabled', props: { value: 0, disabled: true } },
    ],
  },
  {
    name: 'Rating',
    note: '별점. value (0~max), max default 5. 자체 별 5개 button 배열 금지.',
    variants: [
      { label: 'readOnly', props: { value: 4, readOnly: true } },
      { label: 'interactive', props: { value: 3, onChange: noop } },
      { label: 'size=sm', props: { value: 4, size: 'sm', readOnly: true } },
      { label: 'disabled', props: { value: 3, disabled: true } },
    ],
  },
  {
    name: 'SearchTrigger',
    note: '검색 트리거(검색바 버튼). 자체 search-composite 구성 금지. 클릭 시 별도 Search dialog 열림.',
    variants: [
      { label: 'field (default)', props: { onClick: noop } },
      { label: 'custom placeholder', props: { placeholder: '제품을 검색하세요', onClick: noop } },
      { label: 'icon only', props: { variant: 'icon', onClick: noop } },
      { label: 'subtle appearance', props: { appearance: 'subtle', onClick: noop } },
      { label: 'size=sm', props: { size: 'sm', onClick: noop } },
      { label: 'disabled', props: { disabled: true } },
    ],
  },
]

const renderVariant = (Comp, { label, props }) => {
  try {
    const html = renderToStaticMarkup(h(Comp, props))
    return `  <!-- ${label} -->\n  ${html}`
  } catch (e) {
    return `  <!-- ${label}: render failed — ${e.message.split('\n')[0]} -->`
  }
}

const sections = components.map(({ name, note, variants, manualReason, manualVariants }) => {
  // Manual HTML path — for components that don't survive SSR (e.g. Radix Portal-based)
  if (manualVariants) {
    const rendered = manualVariants
      .map(({ label, html }) => `  <!-- ${label} -->\n${html.split('\n').map(l => '  ' + l).join('\n')}`)
      .join('\n\n')
    return `\n<!-- ═══ ${name} ═══ -->
<!-- ${note} -->
<!-- NOTE (manual template): ${manualReason} -->
${rendered}`
  }

  const Comp = IGT[name]
  if (!Comp) {
    return `\n<!-- ═══ ${name} ═══ -->\n<!-- NOT EXPORTED from dist/index.js -->`
  }

  const rendered = variants.map((v) => renderVariant(Comp, v)).join('\n\n')

  return `\n<!-- ═══ ${name} ═══ -->
<!-- ${note} -->
${rendered}`
}).join('\n')

const html = `<!DOCTYPE html>
<html lang="ko" data-brand="default" data-theme="light" data-radius="default" data-size="compact">
<head>
  <meta charset="UTF-8">
  <title>IGT Design System — HTML Snippets (Generated)</title>
  <link rel="stylesheet" href="./igt.css">
  <style>
    body { font-family: var(--typography-fontFamily-primary), sans-serif; padding: 24px; }
    .snippet-grid { display: flex; flex-direction: column; gap: 32px; }
  </style>
</head>
<body>

<h1>IGT Design System — HTML Snippets</h1>
<p>이 파일은 <code>scripts/generate-html-snippets.mjs</code>가 React SSR로 자동 생성했습니다. 다중 요소 컴포넌트의 정확한 HTML 구조가 필요할 때 이 파일의 스니펫을 복사해 쓰세요.</p>
<p><strong>금지:</strong> .checkbox / .switch / .tf / .select / .chip 등의 자체 CSS 재정의, native &lt;input&gt; + inline style로 도망가기, data-* 속성 누락.</p>

<div class="snippet-grid">
${sections}
</div>

</body>
</html>
`

const outPath = join(__dir, '..', 'dist', 'html-components.html')
writeFileSync(outPath, html, 'utf8')
console.log(`✓ Generated: dist/html-components.html (${html.length.toLocaleString()} bytes, ${components.length} components)`)
