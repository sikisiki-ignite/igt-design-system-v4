<!-- Generated from figma-spec.json | extractedAt: 2026-05-01T17:47:18.197Z -->

# Menu / MenuItem

드롭다운·컨텍스트 메뉴 컨테이너. `Menu` + `MenuItem` 컴파운드 컴포넌트.

## Menu Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `size` | `'sm' \| 'md'` | `'md'` | — |
| `children` | `ReactNode` | — | MenuItem 목록 (필수) |

## MenuItem Props

| Prop | Type | Default | Figma prop |
|------|------|---------|------------|
| `tone` | `'neutral' \| 'accent' \| 'danger'` | `'neutral'` | — |
| `size` | `'sm' \| 'md'` | `'md'` | — |
| `leadingIconName` | `IconName` | — | 앞 아이콘 |
| `trailingIconName` | `IconName` | — | 뒤 아이콘 |
| `disabled` | `boolean` | — | HTML native |
| `children` | `ReactNode` | — | 레이블 텍스트 (필수) |

## Usage

```tsx
// 기본 메뉴
<Menu>
  <MenuItem onClick={handleEdit}>편집</MenuItem>
  <MenuItem onClick={handleCopy}>복사</MenuItem>
  <MenuItem tone="danger" onClick={handleDelete}>삭제</MenuItem>
</Menu>

// 아이콘 포함
<Menu>
  <MenuItem leadingIconName="editOutline3dp" onClick={handleEdit}>편집</MenuItem>
  <MenuItem leadingIconName="copyOutline3dp" onClick={handleCopy}>복사</MenuItem>
  <MenuItem
    leadingIconName="trashOutline3dp"
    tone="danger"
    onClick={handleDelete}
  >
    삭제
  </MenuItem>
</Menu>

// Trailing icon (서브메뉴 표시 등)
<Menu>
  <MenuItem trailingIconName="monoChevronRight">더 보기</MenuItem>
</Menu>

// Small size
<Menu size="sm">
  <MenuItem size="sm">항목 1</MenuItem>
  <MenuItem size="sm">항목 2</MenuItem>
</Menu>

// Disabled item
<Menu>
  <MenuItem disabled>비활성 항목</MenuItem>
</Menu>
```

## CSS classes

| Class | Role |
|-------|------|
| `.menu` | 컨테이너 (role="menu") |
| `.menu-item` | 개별 항목 버튼 (role="menuitem") |
| `.menu-item__leading-icon` | 앞 아이콘 wrapper |
| `.menu-item__label` | 레이블 텍스트 |
| `.menu-item__trailing-icon` | 뒤 아이콘 wrapper |

## Data attributes

| Attribute | Values | Purpose |
|-----------|--------|---------|
| `data-size` | sm, md | 크기 (Menu 및 MenuItem 모두) |
| `data-tone` | neutral, accent, danger | MenuItem 색상 (MenuItem에만) |

## NOT in Figma (avoid)

- 구분선(separator) — Figma에 없음, `<hr>` 직접 삽입 금지
- 체크마크 메뉴 아이템 — Figma에 없음
- 서브메뉴 중첩 — Figma에 없음 (trailingIcon으로 시각만 표현)
- Menu에 `size` 전달 시 MenuItem에도 동일 `size` 전달 필요 (자동 상속 없음)
