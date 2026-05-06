# IGT Design System v4 — 컴포넌트 구축 규칙

---

## 토큰 시스템 준수

- 색상, 간격, 타이포그래피는 반드시 CSS 변수 사용
- `src/tokens/` 가 유일한 토큰 소스
- 임의의 hex 값, px 하드코딩 금지
- 토큰 계층: `--ref-*` → `--sys-*` → `--[comp]-*`
- 컴포넌트 CSS에서 직접 `--ref-*` 사용 금지
- **예외 — spacing:** `--ref-space-*` 직접 참조 허용

## 테마 시스템

- 색상 테마: `[data-theme="dark"]`
- 크기 테마: `[data-size="compact"]` / `[data-size="comfortable"]`
- 반경 테마: `[data-radius="playful"]` / `[data-radius="formal"]` 등
- 각 컴포넌트는 이 테마 변경만으로 외형이 바뀌어야 함

## 컴포넌트 구조 규칙

- 각 컴포넌트는 `src/components/[Name]/` 폴더에 위치
- 파일 구성: `[Name].tsx`, `[Name].css`, `index.ts`, `figma-spec.json`, `[Name].guide.md`
- CSS 클래스명은 `igt-` 접두사 사용
- `data-*` 속성으로 variant/state 제어

## 컴포넌트 토큰 규칙

- 각 컴포넌트는 자신만의 토큰을 가진다
- 토큰은 반드시 `--sys-*`를 참조한다
- Button과 Input이 같은 높이를 쓰더라도 토큰은 분리한다

```css
/* 올바른 예 */
--btn-height-md: var(--sys-height-md);
--input-height-md: var(--sys-height-md);

/* 잘못된 예 */
/* Button과 Input이 --sys-height-md를 직접 참조 — 컴포넌트 토큰 없음 */
```

## Tailwind 사용 범위

- **허용**: 레이아웃 유틸리티 (`flex`, `items-center`, `justify-between`, `grid` 등)
- **금지**: 스케일 값 클래스 (`gap-2`, `p-4`, `text-sm`, `bg-blue-500` 등)
- 스케일 값은 반드시 토큰 변수 사용: `style={{ gap: 'var(--btn-gap)' }}` 또는 CSS 파일

---

## 구현 워크플로우 (Figma Gate 필수)

### Step 0-A — Figma Gate (이 단계 없이 코드 작업 금지)

```
src/components/{Name}/figma-spec.json 존재 확인
```

- 없으면: Step 0-B~F 실행 후 진행
- 있으면: Step 1 진행

---

### Step 0-B — 스크립트 실행으로 figma-spec.json 자동 생성

```bash
npm run gen:spec -- <ComponentName>
# 또는 nodeId 직접 지정:
node scripts/generate-figma-spec.mjs <ComponentName> --node-id <figmaNodeId>
```

스크립트가 자동 처리: Figma fetch → layer traversal → layoutSpec → styleValues + 토큰 역매핑 → gaps[]

### Step 0-C — 생성 결과 검토

- `propMapping.figmaToCode` 값이 코드 관례와 맞는지 확인 (예: `"Large"` → `"lg"`)
- `gaps[]` 확인 — `resolved: false` 항목 있으면 에스컬레이션

---

### Step 1 — figma-spec.json에서 props 정의

TSX interface는 `figma-spec.json`의 `propMapping`에서만 파생
기존 TSX 보완 방식 금지 — **figma-spec.json이 우선**

### Step 2 — JSX 구조 작성

`layerInventory` 기준으로 JSX 생성 (AI 추측 금지)

### Step 3 — CSS 작성

`styleValues[resolved: true]` 기준 + `layoutSpec` 값 사용
Tailwind: 레이아웃 유틸리티만 허용

### Step 4 — ai-guide 문서 생성

`figma-spec.json` 기준으로 `src/ai-guide/components/{Name}.md` 작성
문서 상단: `<!-- Generated from figma-spec.json | extractedAt: {date} -->`

### Step 5 — TypeScript 검증

`npx tsc --noEmit` → 오류 0개

### Step 6 — figma-spec.json gaps[] 업데이트

수정한 갭 항목을 `status: "fixed"`로 변경

---

## Figma 참조

- fileKey: `VIUhZbtjMzxEHzkpSvfIDR`
- 디자인 의도가 불명확할 때는 임의 해석 금지 — 사용자에게 확인
