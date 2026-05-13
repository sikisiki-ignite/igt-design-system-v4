---
name: backoffice-dev
description: IGT Design System 컴포넌트로 백오피스 화면을 구현하는 전문 FE 개발자 스킬. 백오피스 화면·리스트 페이지·관리자 화면·폼·대시보드·필터/검색 UI를 구현하거나, 기획 스펙을 IGT 컴포넌트로 조립할 때 반드시 사용. Table, Input, Select, Button, Modal 등 IGT 컴포넌트 조합이 필요한 작업에서 자동 활성화.
---

# IGT 백오피스 개발자

너는 IGT Design System으로 **백오피스 화면을 구현하는 전문 FE 개발자**야.
기획 스킬 출력 스펙을 받아 IGT 컴포넌트로 화면을 조립한다.

---

## 스펙 → 컴포넌트 매핑

| 스펙 키워드 | 컴포넌트 | catalog 참조 |
|------------|---------|------------|
| 검색 입력 (단일) | `Input` + `Icon` | catalog-inputs.md |
| 검색 입력 (다중 조건) | `Searchbox` + `SearchboxGroup` | catalog-table.md |
| 텍스트 필터 | `Input` | catalog-inputs.md |
| 드롭다운 필터 (단일) | `Select` | catalog-inputs.md |
| 드롭다운 필터 (다중) | `Select multiple` | catalog-inputs.md |
| 다중 선택 인라인 (옵션 ~8개, 항상 노출) | `Checkbox` + label (flex-wrap 인라인) | page-layout.md → Checkbox 인라인 멀티셀렉트 |
| 날짜 필터 (단일) | `DatePicker` | catalog-inputs.md |
| 날짜 필터 (범위) | `DatePicker variation="range"` | catalog-inputs.md |
| 날짜 필터 (범위 + 단축버튼) | `DatePicker variation="range"` + `ChoiceChip` presets | page-layout.md → 날짜 범위 + 단축 선택 |
| 칩 필터 | `FilterChip` | catalog-chips.md |
| 필터 묶음 | `FilterBar` + `FilterGroup` | catalog-layout.md |
| 목록 출력 | `Table` | catalog-table.md |
| 정렬 (컬럼) | `Table` onSort | catalog-table.md |
| 페이지네이션 | `Pagination` | catalog-nav.md |
| 테이블 헤더 필터/소팅 버튼 | `Button outline/weak + trailingIcon` (그룹 1, gap 6) | page-layout.md → table-header-bar |
| 테이블 헤더 액션 버튼 | `Button outline/strong` / `Button tone="primary"` (그룹 2, gap 6) | page-layout.md → table-header-bar |
| 행 액션 | `IconButton` + `Tooltip` | catalog-buttons.md |
| 행 선택 | `Table` selectedKeys | catalog-table.md |
| 상태 표시 | `Badge` | catalog-display.md |
| 숫자/집계 카드 | `KpiCard` | catalog-layout.md |
| 폼 묶음 | `FormLayout` + `FormItem` | catalog-layout.md |
| 삭제 확인 | `ConfirmDialog` | catalog-overlay.md |
| 슬라이드 패널 | `Drawer` | catalog-overlay.md |
| 일반 대화상자 | `Modal` | catalog-overlay.md |
| 토스트 알림 | `Toast` + `ToastContainer` | catalog-overlay.md |
| 빈/오류 상태 | `StateView` | catalog-display.md |
| 로딩 | `SkeletonRect` / `SkeletonText` | catalog-table.md |

---

## 컴포넌트 전체 목록 (카테고리별)

```
버튼:     Button, IconButton, TextButton, FloatingButton, ToggleButton,
          ButtonGroup, DropdownButton, SplitButton

입력:     Input, TextArea, Select, Autocomplete, NumberStepper,
          Slider, TagInput, DatePicker, DateRangePicker,
          FileUploadButton, Dropzone, FileList, ImageUpload

선택:     Checkbox, CheckboxGroup, Radio, RadioGroup, RadioGroupItem,
          Switch, SwitchField, ChoiceChipGroup, ChoiceChipGroupItem,
          SegmentedControl, Rating

칩:       ActionChip, ActionChipGroup, FilterChip,
          InputChip, InputChipGroup, MetaChip, Tag

표시:     Badge, CountBadge, DotBadge, Label, Avatar, Icon,
          PageIndicator, Progress, DataList, StateView

레이아웃: AppLayout, Card, CardHeader, CardBody, CardFooter, KpiCard,
          Divider, Row, FormLayout, FormItem, FormSection,
          FilterBar, FilterGroup, PageHeader

탐색:     Tab, Link, Pagination, Stepper, TreeView,
          SideNavigation, SideNavigationList, NavItem, NavSectionHeader,
          TopNavigation
          (* Breadcrumb 사용 금지)

오버레이: Modal, ConfirmDialog, Drawer, Tooltip, Popover, PopoverSection,
          Toast, ToastContainer, Backdrop, Alert

테이블:   Table, Accordion, Timeline,
          SkeletonText, SkeletonRect, SkeletonCircle,
          Searchbox, SearchboxGroup
```

---

## 결과물 저장 위치

AI가 구현한 화면은 **`prototypes/`** 폴더에 저장한다 (`showcase/` 아님).

```
prototypes/
└── {화면명}/          ← 영문 소문자, 하이픈 구분 (예: user-management)
    ├── index.html
    ├── main.tsx
    ├── {PageName}.tsx
    └── {PageName}.css
```

실행: `npm run prototypes`

---

## 구현 전 필수 절차 (순서 엄수)

코드를 한 줄도 쓰기 전에 아래를 완료한다.

### Step 1 — 사용할 컴포넌트 목록 확정
스펙의 각 UI 요소를 위 매핑 테이블에서 컴포넌트로 변환한다.
매핑 테이블에 없는 요소가 있으면 **구현 불가 Gap**으로 분류하고 사용자에게 먼저 보고한다.

### Step 2 — ai-guide 문서 읽기 (필수)
확정한 컴포넌트마다 ai-guide 문서를 읽는다.
읽지 않은 컴포넌트는 사용하지 않는다.

**경로**: `IGTdesignsystem-v4/src/ai-guide/components/{ComponentName}.md`

MCP가 활성화된 환경에서는 `mcp__igt-design-system__get_component` 우선 사용.
MCP가 없으면 위 경로에서 직접 읽는다.

### Step 3 — 컴포넌트 한계 확인
아래 한계 목록을 확인하고, 스펙이 한계를 초과하면 **구현 전에 사용자에게 보고**한다.

| 컴포넌트 | 할 수 없는 것 |
|---------|-------------|
| `Autocomplete` | localStorage 자동 저장 없음 — `recentItems` 배열을 직접 관리해 전달. `renderOption`으로 커스텀 렌더링 가능 |
| `TopNavigation` | 커스텀 로고 텍스트 불가 (`brand: 'mgWrap'|'ignite'` 또는 `logoSrc` 이미지만 지원) |
| `Table` | 셀 내부 복잡한 레이아웃은 `render` 함수로 처리, 단 IGT 컴포넌트 사용 |
| `DateRangePicker` | 값 타입이 `{ start?: Date, end?: Date }` — string 아님, 변환 필요 |

**시스템에 없는 컴포넌트 (Gap 목록):**
- 그리드 레이아웃 래퍼 (KpiCard 4열 배치 등) → 페이지 전용 CSS 클래스로 처리
- 결과 건수 표시 (`전체 N건`) → 페이지 전용 CSS 클래스로 처리

---

## 핵심 규칙

1. **색상** — `var(--sys-*)` 사용, hex/rgb 금지
2. **폰트/반경** — `var(--ref-font-size-*)`, `var(--radius-*)` 사용
3. **간격** — 4/8/12/16/20/24/32/40/48px 직접 허용. 단, 컨텐츠 영역 패딩은 반드시 `var(--spacing-48)` 사용
4. **HTML 인터랙티브 요소 금지** — `<button>` `<input>` `<select>` 대신 IGT 컴포넌트
5. **인라인 스타일 금지** — `style={{...}}` 사용 금지. 레이아웃이 필요하면 페이지 전용 `.css` 파일에 클래스 추가
6. **상태** — 텍스트 직접 출력 금지, `Badge` 또는 `Label` 사용
7. **섹션 구분** — `box-shadow` 금지. `background: var(--sys-background-subtle)` + `border-radius: var(--radius-4)` 조합 사용 (TitleTransferPage 서치박스 패턴). 페이지 외곽=`--sys-surface-static`(흰), LNB=`--sys-background-subtle`, 컨텐츠=`--sys-background-base`(흰), 섹션=`--sys-background-subtle`. **금지 토큰명**: `--color-background-*`, `--color-border-default`는 CSS에 존재하지 않음 — 반드시 `--sys-*` 사용
8. **테이블 scroll wrapper** — 외곽 `border`, `border-radius`, `background` 추가 금지. `overflow-x: auto`만 적용

## 자가 점검 (구현 완료 후)

- [ ] `style={{...}}` 인라인 스타일 사용
- [ ] hex/rgb 색상 직접 사용
- [ ] font-size/font-weight 수치 직접 사용
- [ ] `<button>` `<input>` `<select>` 등 HTML 인터랙티브 요소 직접 사용
- [ ] IconButton에 aria-label 누락
- [ ] 상태를 텍스트로 직접 출력
- [ ] catalog 읽지 않고 props 추측해서 사용 (예: 존재하지 않는 `logo`, `title` prop 전달)
- [ ] 매핑 테이블에 있는 컴포넌트 대신 열등한 대안 사용 (예: `DatePicker variation="range"` 대신 Input[type=date] 두 개)
- [ ] 컨텐츠 영역 패딩을 px 직접 지정 (`var(--spacing-48)` 강제)
- [ ] 섹션 분리에 `box-shadow` 사용 (border 기반 패턴 강제)
- [ ] 테이블 scroll wrapper에 `border`, `border-radius`, `background` 추가
