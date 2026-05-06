# 아이콘 파이프라인

Figma API를 직접 호출해서 아이콘을 자동으로 가져오는 스크립트.
수동으로 SVG를 하나씩 export할 필요 없이 명령어 한 번으로 전체 아이콘을 동기화한다.

---

## 한 줄 요약

```bash
npm run fetch:icons
```

이걸 실행하면 Figma에서 아이콘 429개를 전부 가져와서 `src/icons/icons.ts`를 자동으로 만든다.

---

## 최초 설정 (처음 한 번만)

프로젝트 루트에 `.env` 파일 생성:

```
FIGMA_TOKEN=your_figma_personal_access_token_here
FIGMA_FILE_KEY=VIUhZbtjMzxEHzkpSvfIDR
```

> `.env`는 `.gitignore`에 포함되어 있어서 git에 올라가지 않는다.
> 새 환경에서 클론했을 때 `.env.example`을 복사해서 토큰만 채우면 된다.

---

## 아이콘 업데이트 방법

Figma에서 아이콘이 추가되거나 수정됐을 때:

```bash
npm run fetch:icons
```

`src/icons/icons.ts`가 덮어쓰기된다. 이 파일은 자동 생성이므로 직접 편집하지 않는다.

---

## 아이콘 사용 방법

```tsx
import { Icon } from 'igt-design-system-v2';

// 기본
<Icon name="arrowDownSolid" />

// 크기 지정
<Icon name="chevronRightOutline2dp" size={20} />

// 색상은 CSS color로 제어 (currentColor 방식)
<Icon name="checkSolid" size={16} style={{ color: 'var(--sys-content-brand-default)' }} />
```

---

## 아이콘 이름 규칙

Figma 컴포넌트 이름에서 prefix를 제거하고 camelCase로 변환한다.

| Figma 이름 | 코드에서 사용하는 이름 |
|------------|----------------------|
| `igt_core_icon_arrow_down_solid` | `arrowDownSolid` |
| `igt_core_icon_chevron_right_outline_2dp` | `chevronRightOutline2dp` |
| `igt_core_icon_check_circle_solid` | `checkCircleSolid` |

전체 목록은 `src/icons/icons.ts` 상단의 `IconName` 타입에서 확인 가능하다.

---

## 스크립트 동작 순서

```
1. Figma 파일 트리에서 아이콘 섹션 노드(622:35879) 조회
       ↓
2. igt_core_icon_* COMPONENT 목록 수집 (431개)
       ↓
3. nodeId로 SVG export URL 요청 (50개씩 배치)
       ↓
4. SVG 내용 다운로드 (10개 병렬)
       ↓
5. fill/stroke 색상 → currentColor 치환
       ↓
6. src/icons/icons.ts 생성
```

---

## 파일 구조

```
src/
  icons/
    icons.ts              ← 자동 생성 (편집 금지)
  components/
    Icon/
      Icon.tsx            ← <Icon> 컴포넌트

scripts/
  fetch-icons.mjs         ← Figma API 호출 스크립트

.env                      ← Figma 토큰 (git 제외)
.env.example              ← 토큰 없는 템플릿 (git 포함)
```

---

## Figma 파일 정보

| 항목 | 값 |
|------|----|
| 파일 키 | `VIUhZbtjMzxEHzkpSvfIDR` |
| 아이콘 섹션 노드 | `622:35879` (Component 페이지 › 8 Icons › core) |
| 컴포넌트 prefix | `igt_core_icon_` |
| 마지막 동기화 | 2026-04-28, 429개 |

> **주의:** Figma `/files/{fileKey}/components` API는 라이브러리에 publish되지 않아서 빈 배열을 반환한다.
> 이 때문에 파일 트리를 직접 조회하는 방식을 사용한다. 스크립트를 수정할 때 이 점을 기억할 것.

---

## 문제 해결

**`❌ FIGMA_TOKEN 환경변수가 없습니다`**
→ `.env` 파일이 없거나 토큰이 비어있음. `.env.example`을 복사해서 설정.

**`⚠️ N개 다운로드 실패`**
→ Figma에서 해당 노드의 SVG URL이 null로 반환된 경우. 대부분 빈 컴포넌트이므로 무시해도 됨.

**토큰 만료 / 403 오류**
→ Figma Settings › Security › Personal access tokens에서 새 토큰 발급 후 `.env` 업데이트.
