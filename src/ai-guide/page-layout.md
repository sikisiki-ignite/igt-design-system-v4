# IGT 백오피스 페이지 레이아웃 패턴

<!-- Page layout guide | canonical: TitleTransferPage | 2026-05-08 -->

## 핵심 원칙

백오피스 페이지는 **border 기반 계층**을 사용한다. elevation(box-shadow)으로 섹션을 분리하지 않는다.

---

## 페이지 구조 패턴

```
LAYOUT (horizontal)
├── LNB (250px, padding 24)
└── main (flex: 1, vertical)
    ├── TopNavigation (56px)
    └── contents (padding 48, gap 40)   ← 공통 컨텐츠 영역
        ├── title section
        ├── section...
        └── section...
```

### 컨텐츠 영역 공통 패딩: `--spacing-48`

LNB + TopNavigation 이후의 **컨텐츠 영역(contents frame)은 사방 48px 패딩을 사용한다.** 이는 모든 백오피스 페이지의 공통 규칙이다.

```css
.page-content {
  flex: 1;
  padding: var(--spacing-48);      /* ← 백오피스 공통 컨텐츠 패딩 */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-40);
  background: var(--sys-background-base);
}
```

> **Figma 근거**: Figma node `6135:126884` 위치 분석. `contents` 프레임은 LNB 우측 경계 및 TopNavigation 하단으로부터 상하좌우 모두 48px 안쪽에 위치한다.

### 페이지 셸 (`.page`)

```css
.page {
  min-height: 100vh;
  padding: var(--spacing-24);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
  background: var(--sys-background-subtle);   /* gray */
}
```

### 섹션 (`.section`)

```css
.section {
  background: var(--sys-background-base); /* white */
  border: 1px solid var(--sys-border-neutral-subtle);
  border-radius: var(--radius-md);
  padding: var(--spacing-20) var(--spacing-24);
}
```

**금지**: `box-shadow`로 섹션을 분리하지 않는다.
**금지**: `background: white`를 하드코딩하지 않는다. 반드시 `var(--color-background-surface)` 사용.

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

.filter-label {
  flex-shrink: 0;
  width: 100px;
  padding-top: var(--spacing-4);
  font-weight: 600;
  color: var(--color-text-secondary);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-8);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--sys-border-neutral-subtle);
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
