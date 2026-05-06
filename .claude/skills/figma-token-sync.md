---
name: figma-token-sync
description: Figma 링크(또는 노드 ID)를 받아 CSS 토큰 파일과 1:1 검증·동기화하는 스킬. Figma 변수가 alias 참조이면 var()로, 직접 값이면 hex/rgba로 CSS에 반영해야 함을 검증한다. "피그마랑 맞춰줘", "토큰 검증", "figma sync", "CSS 토큰이 맞는지 확인", "피그마 보고 만들어줘" 같은 요청에 반드시 사용. 자의적으로 CSS를 만들거나 수정하기 전에 항상 이 스킬을 먼저 실행할 것.
---

# Figma Token Sync — 검증·동기화 프로세스

> **핵심 원칙**: CSS 토큰은 Figma 변수 데이터를 100% 따른다. Figma를 보지 않고 값을 추측하거나 hardcode하지 않는다.

---

## Step 1 — Figma 데이터 수집

### URL에서 파라미터 추출
Figma URL 형식: `figma.com/design/<fileKey>/...?node-id=<nodeId>`
- fileKey: URL 경로의 파일 키
- nodeId: `node-id=` 파라미터 값 (`6020-233840` 형식)

### MCP로 데이터 페치
```
mcp__figma__get_figma_data(fileKey, nodeId)
```

**결과가 너무 커서 파일로 저장되는 경우** (대부분 이 경우):
- 저장된 파일 경로가 반환됨
- 파일을 직접 grep하거나, 크기가 크면 **서브에이전트**를 사용해 청크 단위로 읽을 것
- 절대 "데이터가 너무 커서 분석 불가"라고 포기하지 말 것

---

## Step 2 — Figma 데이터 파싱

### 변수 컬렉션 구조 파악
Figma 데이터에서 찾아야 할 패턴:

**변수명 패턴** (JSON 내 text 노드):
```
"text": "color/brand/500"      → 토큰 이름
"text": "#3182F6"              → 해석된 hex 값
"text": "color/blue/500"       → alias 원본 (이것이 있으면 alias 토큰)
```

**alias 여부 판단**:
- 문서 프레임의 `{primitive-name}` 텍스트 노드에 다른 토큰 이름이 있으면 → alias 토큰
- 없거나 직접 hex만 있으면 → 직접 값 토큰

**grep으로 빠르게 추출**:
```bash
# 토큰 이름 찾기
grep -o '"color/[^"]*"' <file>
grep -o '"sys/[^"]*"' <file>
grep -o '"pattern/[^"]*"' <file>

# alias 참조 찾기 (primitive-name 근처)
grep -A2 "primitive-name\|{primitive" <file>
```

---

## Step 3 — 네이밍 변환 규칙

Figma 변수명 → CSS 변수명 변환:

| Figma | CSS |
|-------|-----|
| `color/grey/50` | `--color-grey-50` |
| `color/greyAlpha/50` | `--color-greyAlpha-50` (**camelCase 보존**) |
| `color/brand/500` | `--color-brand-500` |
| `color/brandDark/500` | `--color-brandDark-500` (**camelCase 보존**) |
| `sys/container/brand-solid-heavy` | `--sys-container-brand-solid-heavy` |
| `pattern/button/bg-default` | `--pattern-button-bg-default` |

**변환 규칙**:
1. `/`를 `-`로 변환
2. camelCase는 그대로 보존 (하이픈으로 쪼개지 않음)
3. 앞에 `--` 접두사 추가

---

## Step 4 — CSS 값 결정 규칙

| Figma 변수 타입 | CSS 값 형태 |
|----------------|------------|
| alias (다른 변수 참조) | `var(--color-blue-500)` 형태 |
| 직접 색상 (hex) | `#3182F6` 형태 |
| 직접 색상 (rgba, alpha < 1) | `rgba(49, 130, 246, 0.16)` 형태 |
| 직접 값 (px, 숫자 등) | `16px`, `0px` 그대로 |

**alias 변환 예시**:
- Figma: `color/brand/500` → aliases → `color/blue/500`
- CSS: `--color-brand-500: var(--color-blue-500);`

**절대 금지**: alias 토큰에 hardcode hex 값을 쓰는 것
```css
/* ❌ 틀림 - alias인데 hardcode */
--color-brand-500: #3182F6;

/* ✅ 맞음 - alias는 var() 참조 */
--color-brand-500: var(--color-blue-500);
```

---

## Step 5 — CSS 파일과 비교

### 비교 대상 파일
- `/Users/sikisiki/Documents/IGTdesignsystem-v2/src/tokens/primitives.css`
- `/Users/sikisiki/Documents/IGTdesignsystem-v2/src/tokens/semantic.css`

### 비교 항목
1. **누락 토큰**: Figma에 있지만 CSS에 없는 것
2. **잉여 토큰**: CSS에 있지만 Figma에 없는 것 (alias shim 제외)
3. **값 불일치**: 같은 이름인데 값이 다른 것
4. **구조 오류**: alias여야 하는데 hardcode되어 있는 것 (또는 반대)

### semantic 토큰 추가 검증
Figma semantic 토큰은 light/dark 두 모드를 가진다. CSS 비교 시:
- `:root` 블록 → Figma light 모드 alias와 비교
- `[data-theme="dark"]` 블록 → Figma dark 모드 alias와 비교
- 두 블록 모두 빠짐없이 확인할 것

### 리포트 형식
```
## Figma Token Sync 결과

### ✅ 일치: N개
### ❌ 구조 오류 (alias ↔ hardcode 불일치): N개
  - --color-brand-500: CSS=`#3182F6` (hardcode) → Figma=alias to `color/blue/500`
### ⚠️ 값 불일치: N개
  - --color-grey-80: CSS=`#F7F8F9` → Figma=`#F5F6F7`
### ➕ CSS에 없는 토큰: N개
  - --color-new-token-500
### ➖ Figma에 없는 토큰: N개 (의도적 shim 제외)
  - --color-brand-alpha-50 (하위호환 alias → 유지 권장)
```

---

## Step 6 — 자동 수정

불일치가 발견되면:
1. 각 항목을 사용자에게 보여주고 수정 여부 확인
2. 단순 값 수정은 바로 진행
3. 구조 변경(alias ↔ hardcode 전환)은 반드시 사용자 확인 후 진행
4. 수정 후 변경 목록 리스트업

---

## 주의사항

- **서브에이전트 활용**: Figma 데이터가 10,000줄 이상이면 서브에이전트에 파싱 위임
- **하위호환 alias 보존**: CSS에 `--color-brandAlpha-50: var(--color-brand-alpha-50)` 같은 camelCase alias는 Figma에 없어도 삭제하지 않음 (의도적 shim)
- **dark 모드 분리**: semantic 토큰의 `[data-theme="dark"]` 블록은 light와 별도로 비교
- **brand override 블록**: `[data-brand="*"]` 블록은 primitive alias를 오버라이드하는 구조가 맞는지 확인
