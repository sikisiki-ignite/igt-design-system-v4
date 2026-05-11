<!-- Composition component | figma-spec: 6135:126884 | 2026-05-08 -->
<!-- 캐노니컬 백오피스 페이지 레이아웃 레퍼런스 — 새 페이지 작업 시 이 패턴을 기준으로 삼는다 -->

# TitleTransferPage (캐노니컬 백오피스 페이지)

명의이전 신청 관리 화면. 백오피스 리스팅 페이지의 표준 레퍼런스.

Figma: `6135:126884` | TSX: `showcase/TitleTransferPage.tsx` | CSS: `showcase/TitleTransferPage.css`

---

## 페이지 구조

```
.ttp-layout (flex column, min-height: 100vh, bg: --sys-surface-static)
  └── Navigation size="sm" layoutMode="full"   ← 전체 너비
  .ttp-body (flex horizontal, flex: 1)
    ├── .ttp-lnb (250px, bg: --sys-background-subtle)
    │     └── SideNavigation tone="accent" size="md"
    └── .ttp-content (flex column, gap: --spacing-40, padding: --spacing-48, bg: --sys-background-base)
          ├── .ttp-title-section (h1만 — 버튼 없음)
          ├── .ttp-section (필터 영역, bg: --sys-background-subtle, radius: --radius-4)
          └── .ttp-count-container (테이블 영역)
                ├── .ttp-table-header-bar (카운트 + 액션 버튼)
                └── .ttp-table-group
                      ├── .ttp-table-scroll-wrapper (overflow-x: auto)
                      │     └── Table
                      └── .ttp-pagination-bar (padding: --spacing-24 0)
                            └── Pagination
```

---

## 사용된 IGT 컴포넌트 (전체 목록)

| 영역 | 컴포넌트 | 확정 props |
|---|---|---|
| 좌측 사이드바 | `SideNavigation` | `tone="accent" size="md" activeId="title-transfer"` |
| 상단 네비게이션 | `Navigation` + `NavItem` | `size="sm" layoutMode="full"` |
| 타이틀 좌측 소프트 액션 | `Button` | `tone="secondary" appearance="fill" emphasis="weak"` |
| 타이틀 우측 프라이머리 | `Button` | `tone="primary" appearance="fill" emphasis="strong"` |
| 필터 텍스트 입력 | `TextField` | `size="md"` |
| 필터 드롭다운 | `Select` | `width="fill"` (appearance 기본값 `outline`) |
| 날짜 범위 | `DatePicker` | `variation="range" size="md"` |
| 상태 칩 필터 | `ChipGroup` + `ChoiceChip` | `layout="wrap" size="md"` (ChipGroup·ChoiceChip 모두 `md`) |
| 필터 구분선 | `Divider` | `tone="neutral" emphasis="default"` |
| 필터 버튼 (2개만) | `ButtonGroup` + `Button` | `size="md" direction="horizontal" distribution="content"` |
| 페이지 사이즈 선택 | `Button` + `Menu` + `MenuItem` | `tone="secondary" appearance="outline" emphasis="weak" size="md"` + `trailingIcon` |
| 엑셀 다운로드 | `Button` | `tone="secondary" appearance="outline" emphasis="strong" size="md"` |
| 처리 상태 뱃지 | `Label` | `size="sm" color={STATUS_COLOR[status]}` |
| 데이터 테이블 | `Table` | `selectable size="md" rowKey="id"` — **반드시 비제어 모드** |
| 페이지네이션 | `Pagination` | `page total onChange size="md"` |

---

## 핵심 규칙 (위반 시 버그 발생)

### 1. Table — 반드시 비제어 모드

`selectedRows` prop을 외부에서 주입하면 Table 내부의 `toggleAll()`이 차단되어 헤더 체크박스 일괄 선택이 작동하지 않는다.

```tsx
// ❌ 금지: 제어 모드
<Table selectedRows={selectedRows} onRowSelect={(i, sel) => updateSet(i, sel)} />

// ✅ 올바름: 비제어 모드 (선택 개수만 별도 state로 추적)
const [selectedCount, setSelectedCount] = useState(0)
<Table
  selectable
  onRowSelect={(_, selected) => setSelectedCount(prev => selected ? prev + 1 : Math.max(0, prev - 1))}
  size="md"
  rowKey="id"
/>
```

### 2. 버튼 visibility — `outline/weak` 조합 금지

`secondary / outline / weak` = `--sys-border-none` = `transparent` = 완전 투명. 버튼이 화면에 보이지 않는다.

```tsx
// ❌ 금지: 완전 투명
<Button tone="secondary" appearance="outline" emphasis="weak">소프트 액션</Button>

// ✅ 올바름: 연한 배경 표시
<Button tone="secondary" appearance="fill" emphasis="weak">소프트 액션</Button>
```

### 3. 필터 버튼 2개만

```tsx
<ButtonGroup size="md" direction="horizontal" distribution="content">
  <Button tone="secondary" appearance="fill" emphasis="weak" onClick={handleReset}>초기화</Button>
  <Button tone="secondary" appearance="fill" emphasis="strong" onClick={handleSearch}>검색</Button>
</ButtonGroup>
```

### 4. 페이지 사이즈 선택 — `Button secondary/outline/weak` + `Menu` 드롭다운

```tsx
// ❌ 금지: TextButton 사용
<TextButton variant="chevron">20개씩</TextButton>

// ✅ 올바름: Button + Menu
const [pageSize, setPageSize] = useState(20)
const [pageSizeOpen, setPageSizeOpen] = useState(false)
const pageSizeRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (!pageSizeOpen) return
  const handler = (e: MouseEvent) => {
    if (pageSizeRef.current && !pageSizeRef.current.contains(e.target as Node)) {
      setPageSizeOpen(false)
    }
  }
  document.addEventListener('mousedown', handler)
  return () => document.removeEventListener('mousedown', handler)
}, [pageSizeOpen])

<div style={{ position: 'relative' }} ref={pageSizeRef}>
  <Button
    tone="secondary" appearance="outline" emphasis="weak" size="md"
    trailingIcon={<Icon name="chevronDownSmallOutline2dp" size={16} />}
    onClick={() => setPageSizeOpen(v => !v)}
  >
    {pageSize}개씩
  </Button>
  {pageSizeOpen && (
    <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 100 }}>
      <Menu size="md">
        {[10, 20, 50].map(s => (
          <MenuItem key={s} onClick={() => { setPageSize(s); setPage(1); setPageSizeOpen(false) }}>
            {s}개씩
          </MenuItem>
        ))}
      </Menu>
    </div>
  )}
</div>
```

---

## CSS 클래스 구조

| 클래스 | 역할 | 핵심 값 |
|---|---|---|
| `.ttp-layout` | 전체 flex **column** 컨테이너 | `--sys-surface-static` |
| `.ttp-body` | GNB 하단 가로 배치 영역 | `display: flex`, `flex: 1` |
| `.ttp-lnb` | LNB 250px 고정 | `--sys-background-subtle`, padding: `--spacing-24` |
| `.ttp-content` | 컨텐츠 영역 | gap: `--spacing-40`, padding: `--spacing-48`, bg: `--sys-background-base` |
| `.ttp-title-section` | 페이지 타이틀 h1만 | `justify-content: space-between` |
| `.ttp-page-title` | 페이지 제목 h1 | `--semantic-heading-20-bold-*` 서브프로퍼티 전체 |
| `.ttp-section` | 필터 박스 | bg: `--sys-background-subtle`, radius: `--radius-4`, padding: `--spacing-24` |
| `.ttp-filter-grid-row` | 2열 필터 행 | `grid-template-columns: 1fr 1fr`, gap: `60px` |
| `.ttp-field-label` | 필드 레이블 span | `--semantic-label-14-semibold-*`, color: `--sys-content-neutral-muted` |
| `.ttp-button-group` | 필터 버튼 중앙 정렬 | `justify-content: center` |
| `.ttp-count-container` | 테이블 영역 전체 | `flex-direction: column`, gap: `--spacing-12` |
| `.ttp-table-header-bar` | 카운트 + 액션 행 | `justify-content: space-between` |
| `.ttp-count-total` | 전체 개수 텍스트 | `--semantic-body-14-semibold-*`, `--sys-content-neutral-default` |
| `.ttp-count-bullet` | · 구분자 | `--sys-content-neutral-weak` |
| `.ttp-count-selected` | 선택 개수 텍스트 | `--sys-content-brand-default` |
| `.ttp-table-actions` | 우측 액션 버튼 묶음 | gap: `--spacing-16` |
| `.ttp-table-scroll-wrapper` | 테이블 수평 스크롤 | `overflow-x: auto` 만 — border/radius 없음 |
| `.ttp-pagination-bar` | 페이지네이션 바 | `justify-content: center`, padding: `--spacing-24` 0 |

---

## NOT in Figma (avoid)

- **액션 버튼(다운로드·업로드·일괄 처리)을 `.ttp-title-section`에 배치** — 반드시 `.ttp-table-actions`(table-header-bar 우측)에 위치
- **`ttp-layout`을 `flex-direction: row`로 설정** — column이 맞음. LNB는 `.ttp-body` 안에 있어야 함
- 필터 버튼 3개 이상 (전체초기화·조회하기 등) — `초기화 + 검색` 2개만
- 페이지 사이즈에 `TextButton` 사용 — `Button secondary/outline/weak` + `Menu`
- `Table`에 `selectedRows` prop 전달 — 비제어 모드 강제
- `secondary/outline/weak` 버튼 — 투명 테두리로 보이지 않음
- `.ttp-table-scroll-wrapper`에 `border` / `border-radius` 추가 — IGT Table 자체 테두리 없음
- ChipGroup/ChoiceChip `size="sm"` — 필터 칩은 `size="md"`
