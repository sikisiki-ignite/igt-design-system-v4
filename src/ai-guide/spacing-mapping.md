# IGT 간격 토큰 가이드

<!-- spacing-mapping | source: tokens/primitives.css + tokens/themes.css + tokens/component.css | 2026-05-07 -->

## 원칙

- 컴포넌트 CSS → 반드시 **component 토큰** (`var(--action-button-size-spacing-paddingInline-md)`) 사용
- 조합 컴포넌트 레이아웃 → **primitive 토큰** (`var(--spacing-16)`) 사용
- 페이지 레이아웃 → `page-layout.md` 캐노니컬 패턴을 따름
- `--sys-spacing-*`은 **존재하지 않는다** — 이 이름을 만들어서 쓰지 않는다
- Tailwind `gap-4`, `p-2` 등 스케일 클래스로 토큰을 대체하지 않는다

---

## 1. Primitive 레이어: `--spacing-{n}`

`n`은 px 값 그대로다.

| 토큰 | 값 |
|------|----|
| `--spacing-none` | 0px |
| `--spacing-1` | 1px |
| `--spacing-2` | 2px |
| `--spacing-3` | 3px |
| `--spacing-4` | 4px |
| `--spacing-5` | 5px |
| `--spacing-6` | 6px |
| `--spacing-7` | 7px |
| `--spacing-8` | 8px |
| `--spacing-9` | 9px |
| `--spacing-10` | 10px |
| `--spacing-11` | 11px |
| `--spacing-12` | 12px |
| `--spacing-14` | 14px |
| `--spacing-16` | 16px |
| `--spacing-20` | 20px |
| `--spacing-24` | 24px |
| `--spacing-28` | 28px |
| `--spacing-32` | 32px |
| `--spacing-40` | 40px |
| `--spacing-48` | 48px |
| `--spacing-neg1` | -1px |
| `--spacing-neg2` | -2px |
| `--spacing-neg3` | -3px |
| `--spacing-neg4` | -4px |
| `--spacing-neg5` | -5px |
| `--spacing-neg6` | -6px |

---

## 2. Pattern 레이어

**정의 위치**: `tokens/themes.css` (data-size="compact" 블록에서 재정의됨)

컴포넌트 토큰이 직접 primitive를 참조하지 않고 이 pattern 레이어를 경유하는 이유:
- `data-size="compact"` 테마 전환 시 pattern 레이어 값만 바꾸면 모든 컴포넌트에 반영되기 때문

### buttonLike (버튼, 칩, ActionToggle)

토큰 패턴: `--pattern-actionBase-buttonLike-spacing-{property}-{size}`

| property | xs | sm | md | lg |
|----------|----|----|----|----|
| `paddingInline` | 5px | 8px | 10px | 12px |
| `gapInline` | 0px | 0px | 0px | 0px |
| `gapTextTrailing` | 0px | 0px | -2px | -4px |
| `textInsetInline` | 3px | 4px | 6px | 8px |

`gapTextTrailing`이 음수인 이유: 텍스트와 trailing 아이콘 사이 광학적 간격 보정.

### fieldBase (TextField, Select, SearchTrigger, DatePicker)

토큰 패턴: `--pattern-fieldBase-spacing-{property}-{size}`

| property | xs | sm | md | lg |
|----------|----|----|----|----|
| `paddingInline` | 8px | 8px | 9px | 10px |
| `paddingInline-withIcon` | — | 10px | 12px | 14px |
| `paddingBlock` | — | — | 12px | 14px |
| `textInsetInline` | 2px | 3px | 4px | 5px |
| `gapInline` | 2px | 3px | 4px | 5px |
| `gapStack` | — | 6px | 6px | 6px |
| `gapLabelToIndicator` | — | 2px | 3px | 4px |
| `prefixInsetInline` | 2px | 2px | 4px | 4px |
| `suffixInsetInline` | 2px | 2px | 4px | 4px |

`gapStack`: 필드 레이블과 입력 영역 사이 수직 간격.
`textInsetInline`: 입력 텍스트의 좌우 내부 여백.

### rowControlBase (MenuItem, SelectItem)

토큰 패턴: `--pattern-rowControlBase-spacning-{property}-{size}` (typo 주의: "spacning")

| property | sm | md |
|----------|----|----|
| `paddingInline` | 8px | 12px |
| `paddingBlock` | 8px | 11px |
| `textInsetInline` | 2px | 2px |
| `gapInline` | 4px | 6px |

### overlayBase / listPopover (Menu 팝오버, Select 팝오버)

토큰 패턴: `--pattern-overlayBase-listPopoverBase-spacing-{property}-{size}`

| property | sm | md |
|----------|----|----|
| `paddingInline` | 6px | 6px |
| `paddingBlock` | 6px | 8px |
| `gapInline` | 0px | 0px |

---

## 3. Component 레이어

**정의 위치**: `tokens/component.css`

컴포넌트 CSS에서는 이 레이어만 참조한다. pattern 토큰을 직접 쓰지 않는다.

패턴: `--{comp}-size-spacing-{property}-{size}`

예시:
```css
/* ✅ 올바른 사용 */
gap: var(--action-button-size-spacing-gapInline-md);
padding-inline: var(--action-button-size-spacing-paddingInline-md);

/* ❌ pattern 직접 참조 */
padding-inline: var(--pattern-actionBase-buttonLike-spacing-paddingInline-md);

/* ❌ primitive 직접 참조 */
padding-inline: var(--spacing-10);

/* ❌ 하드코딩 */
padding-inline: 10px;
```

---

## 4. Layout-level 용도별 기준값

**정의 위치**: `ai-guide/page-layout.md` 캐노니컬 패턴

| 용도 | 토큰 | 값 |
|------|------|----|
| 페이지 padding | `--spacing-24` | 24px |
| 섹션 간 gap | `--spacing-16` | 16px |
| 섹션 내부 padding | `--spacing-20` `--spacing-24` | 20px / 24px |
| 필터 row 내 gap | `--spacing-16` | 16px |
| 카드 그리드 gap | `--spacing-12` | 12px |

페이지 레이아웃에서는 primitive 토큰을 직접 사용한다. component 토큰이나 pattern 토큰을 참조하지 않는다.

---

## 네이밍 컨벤션

| property 이름 | 의미 | CSS 속성 |
|--------------|------|---------|
| `paddingInline` | 좌우 padding | `padding-inline` |
| `paddingBlock` | 상하 padding | `padding-block` |
| `gapInline` | 가로 방향 아이템 간 gap | `gap` (flex row) |
| `gapStack` | 세로 방향 아이템 간 gap | `gap` (flex column) |
| `textInsetInline` | 텍스트 콘텐츠의 좌우 내부 여백 | `padding-inline` on label wrapper |
| `gapTextTrailing` | 텍스트와 trailing 요소 간 gap (음수 가능) | `margin-inline-end` or negative gap |
| `gapLabelToIndicator` | 레이블과 필수/선택 표시자 간 gap | `gap` |
| `prefixInsetInline` | prefix 아이콘 좌우 내부 여백 | `padding-inline` on prefix |
| `suffixInsetInline` | suffix 아이콘 좌우 내부 여백 | `padding-inline` on suffix |

---

## data-size="compact" 재정의

`[data-size="compact"]` 블록에서 pattern 레이어의 모든 spacing 값이 줄어든다.
component 토큰은 pattern을 경유하므로 자동으로 반영된다.

컴포넌트 CSS에서 size variant별 직접 분기를 추가하지 않는다 — compact 모드는 theme 토큰이 처리한다.

---

## 컨텍스트별 사용 규칙 요약

| 컨텍스트 | 사용해야 할 레이어 | 예시 |
|----------|-----------------|------|
| 컴포넌트 내부 (Flow A) | component 토큰 | `var(--action-button-size-spacing-paddingInline-md)` |
| 조합 컴포넌트 레이아웃 (Flow B) | primitive 토큰 | `var(--spacing-16)` |
| 페이지 레이아웃 | primitive 토큰 + Layout-level 기준값 표 참조 | `var(--spacing-24)`, `var(--spacing-16)` |
| 새 컴포넌트 spacing 정의 | figma-spec.json → component 토큰 생성 | Flow A Step 3 |

---

## NOT in design (피해야 할 패턴)

```css
/* ❌ --sys-spacing-* 이름 지어서 만들기 — 이 레이어는 존재하지 않는다 */
gap: var(--sys-spacing-md);

/* ❌ Tailwind 스케일 클래스로 spacing 대체 */
<div className="gap-4 p-3">

/* ❌ 하드코딩 */
gap: 16px;
padding: 10px 12px;

/* ❌ pattern 토큰을 컴포넌트 CSS에서 직접 참조 */
padding-inline: var(--pattern-actionBase-buttonLike-spacing-paddingInline-md);

/* ❌ Flow B에서 다른 컴포넌트의 component 토큰 참조 */
gap: var(--action-button-size-spacing-gapInline-md); /* 버튼 내부 토큰을 외부에서 참조 */
```
