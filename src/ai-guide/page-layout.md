# IGT 백오피스 페이지 레이아웃 패턴

<!-- Page layout guide | canonical: TitleTransferPage | 2026-05-08 -->

## 핵심 원칙

백오피스 페이지는 **border 기반 계층**을 사용한다. elevation(box-shadow)으로 섹션을 분리하지 않는다.

백오피스 페이지의 `data-size` 기본값은 **`compact`**다. 데이터 밀도가 높은 어드민 환경 기준이며, `comfortable`은 서비스/마케팅 페이지용이다.

---

## 페이지 구조 패턴

```
LAYOUT (vertical, min-height: 100vh)
├── TopNavigation   ← 전체 너비 (LNB 포함)
└── body (flex: 1, horizontal)
    ├── LNB (250px, padding 24)
    └── contents (padding 48, gap 40)   ← 공통 컨텐츠 영역
        ├── title section (h1만 — 버튼 없음)
        ├── section...
        └── count-container
              ├── table-header-bar (카운트 + 액션 버튼)
              └── table-group
```

> **핵심**: TopNavigation은 LNB와 나란히 있는 것이 아니라 **전체 너비 최상단**에 위치한다. LNB는 body 영역 안에서 contents와 가로로 배치된다.

### CSS 구조

```css
.page-layout {
  display: flex;
  flex-direction: column;          /* ← 세로 배치: GNB → body */
  height: 100vh;                   /* ← min-height 아님: 뷰포트 고정 */
}

.page-body {
  display: flex;                   /* ← 가로 배치: LNB | contents */
  flex: 1;
  min-height: 0;                   /* ← flex 자식이 부모 height 초과 방지 */
}

.page-lnb {
  width: 250px;
  flex-shrink: 0;
  background: var(--sys-background-subtle);
  padding: var(--spacing-24) var(--spacing-12);
  overflow-y: auto;                /* ← LNB 항목이 많을 경우 내부 스크롤 */
}
```

### 컨텐츠 영역 공통 패딩: `--spacing-48`

LNB + TopNavigation 이후의 **컨텐츠 영역(contents frame)은 사방 48px 패딩을 사용한다.** 이는 모든 백오피스 페이지의 공통 규칙이다.

```css
.page-content {
  flex: 1;
  padding: var(--spacing-48);      /* ← 백오피스 공통 컨텐츠 패딩 */
  overflow-y: auto;                /* ← 컨텐츠 영역만 스크롤, nav/LNB 고정 */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-40);
  background: var(--sys-background-base);
}
```

> **Figma 근거**: Figma node `6135:126884` 위치 분석. `contents` 프레임은 LNB 우측 경계 및 TopNavigation 하단으로부터 상하좌우 모두 48px 안쪽에 위치한다.

### 섹션 (필터 박스)

```css
.filter-section {
  background: var(--sys-background-subtle);
  border-radius: var(--radius-4);
  padding: var(--spacing-24);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}
```

**금지**: `box-shadow`로 섹션을 분리하지 않는다.
**금지**: `background: white`를 하드코딩하지 않는다. 반드시 토큰 사용.

---

## 버튼 배치 규칙

### title section — h1만 위치

```tsx
/* ✅ 올바름 */
<div className="page-title-section">
  <h1 className="page-title">페이지 제목</h1>
</div>

/* ❌ 금지: 액션 버튼을 title section에 배치 */
<div className="page-title-section">
  <h1>페이지 제목</h1>
  <ButtonGroup>...</ButtonGroup>   {/* ← 여기 넣으면 안 됨 */}
</div>
```

**예외**: 신규 항목 생성 버튼("등록", "추가" 등 전역 액션)만 title section 우측에 위치 가능.

### table-header-bar — 액션 버튼 위치

테이블에 작용하는 모든 버튼(다운로드, 업로드, 일괄 처리 등)은 **table-header-bar 우측**에 위치한다.

```tsx
<div className="table-header-bar">
  <div className="count-info">
    <span>N건</span>
  </div>
  <div className="table-actions">
    {/* 액션 버튼들이 여기 위치 */}
    <Button>다운로드</Button>
    <Button>일괄 업로드</Button>
    <Button tone="primary">선택건 처리</Button>
    {/* 페이지 사이즈 선택 — 항상 가장 우측 */}
    <div ref={pageSizeRef}>...</div>
  </div>
</div>
```

---

## 표준 섹션 유형

### 숏컷 카드 그리드

```css
.shortcut-grid {
  display: grid;
  grid-template-columns: repeat(N, 1fr);
  gap: var(--spacing-12);
}

.shortcut-card {
  background: var(--sys-background-base);
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-16) var(--spacing-20);
  /* box-shadow 없음 */
}

.shortcut-card:hover {
  border-color: var(--sys-border-neutral-muted);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* hover에만 허용 */
}
```

### 필터 섹션

```css
.filter-section {
  /* section 패턴 그대로 */
  background: var(--sys-background-base);
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-20) var(--spacing-24);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
}

.filter-row {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-16);
}

.filter-rows {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-14); /* Figma 6170:2288 Dropdown Group Container itemSpacing=14 */
}

.filter-row {
  display: flex;
  align-items: flex-start; /* paddingTop:11로 수직 정렬 처리 */
  gap: var(--spacing-8);   /* Figma: cont.itemSpacing=8 */
}

.filter-row-label {
  width: 140px;            /* Figma: label frame width=140 */
  flex-shrink: 0;
  padding-top: 11px;       /* Figma: label paddingTop=11 — 모든 행 동일, 40px 인풋과 수직 정렬 */
  /* Figma text node (6170:2293) 실측: fontSize=15, fontWeight=600, lineHeight=18 */
  /* → --semantic-label-15-semibold */
  font-family: var(--semantic-label-15-semibold-fontFamily);
  font-size: var(--semantic-label-15-semibold-fontSize);
  line-height: var(--semantic-label-15-semibold-lineHeight);
  font-weight: var(--semantic-label-15-semibold-fontWeight);
  letter-spacing: var(--semantic-label-15-semibold-letterSpacing);
  color: var(--sys-content-neutral-default); /* Figma: VariableID:3:3 = rgba(0,12,30,0.80) */
}

.filter-row-control {
  flex: 1;
  min-width: 0;
}

.filter-actions {
  display: flex;
  justify-content: flex-end;   /* Figma: ButtonGroup justifyContent=flex-end */
  gap: var(--spacing-8);
}
```

### 테이블 헤더 바

```css
.table-header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-12);
  padding: 0 var(--spacing-2);
  /* background 없음 — page background-base 그대로 노출 */
}
```

### Table + Pagination 그룹

Table과 Pagination은 **반드시 gap 0인 wrapper로 묶는다.** `ttp-count-container`처럼 부모에 gap이 있으면 Table↔Pagination 사이에도 gap이 생기기 때문이다.

```css
/* ── Table + Pagination 그룹 ── */
.table-group {
  display: flex;
  flex-direction: column;
  /* gap 없음 — Table과 Pagination 사이 간격 0 */
}

/* ── Pagination bar ── */
.pagination-bar {
  display: flex;
  justify-content: center;
  padding: var(--spacing-24) 0;
}
```

```tsx
<div className="table-group">
  <Table ... />
  <div className="pagination-bar">
    <Pagination ... />
  </div>
</div>
```

### 테이블 래퍼

IGT `Table` 컴포넌트는 내부적으로 `overflow-x: auto`를 처리한다. **페이지에서 wrapper를 추가할 경우 스타일을 붙이지 않는다.**

```css
.table-scroll-wrapper {
  overflow-x: auto;
  /* border, border-radius, background 없음 — Table 컴포넌트 원형에 없는 스타일 */
}
```

---

## 토큰 참조

| 역할 | 토큰 | 값(기본 테마) |
|------|------|-------------|
| 페이지 배경 | `--sys-background-subtle` | `#f5f5f5` |
| 섹션 배경 | `--sys-background-base` | `#ffffff` |
| 기본 보더 | `--sys-border-neutral-subtle` | `rgba(0,0,0,0.08)` |
| 강조 보더 | `--sys-border-neutral-muted` | `rgba(0,0,0,0.18)` |
| 텍스트 강조 | `--sys-content-neutral-strong` | `#111111` |
| 텍스트 보조 | `--sys-content-neutral-muted` | `rgba(0,0,0,0.4)` |
| 모서리 반경 | `--radius-md` | `8px` (data-radius에 따라 가변) |
| 모서리 반경(소) | `--radius-sm` | `6px` (data-radius에 따라 가변) |
| **컨텐츠 영역 패딩** | **`--spacing-48`** | **48px — 백오피스 공통** |

---

## NOT in design (피해야 할 패턴)

```css
/* ❌ 수평 필터 행 라벨에 label-14-semibold 사용 */
/* label-14-semibold(weight:600)는 인풋 위 필드 라벨 전용 */
/* 수평 행 라벨은 body-14-regular(weight:400) 사용 */
.filter-row-label {
  font-family: var(--semantic-label-14-semibold-fontFamily); /* ← 금지 */
}

/* ❌ 테이블 wrapper에 외곽 border/radius 추가 */
.table-scroll-wrapper {
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-md);
  /* IGT Table 원형에 없는 스타일 — Table figma-spec.json 확인 */
}

/* ❌ 컨텐츠 영역 패딩을 24px로 사용 */
.page-content {
  padding: var(--spacing-24); /* → var(--spacing-48) 사용 */
}

/* ❌ 레이아웃에 min-height 사용 — nav/LNB가 스크롤과 함께 사라짐 */
.page-layout {
  min-height: 100vh; /* → height: 100vh 사용. overflow-y:auto는 .page-content에 */
}

/* ❌ elevation으로 섹션 분리 */
.section {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

/* ❌ 하드코딩된 색상 */
.section {
  background: #ffffff;
  border: 1px solid #e5e7eb;
}

/* ❌ 이중 그림자 + 배경색 중첩 */
.card {
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.08);
}
```

---

## 캐노니컬 예시

`/showcase/TitleTransferPage.tsx` + `TitleTransferPage.css`

새 백오피스 페이지 작업 시 이 파일을 먼저 읽고 구조를 동일하게 적용한다.
