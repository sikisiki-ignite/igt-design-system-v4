# IGT Design System v4 — Claude 행동 지침

---

## 구축 규칙

@.claude/build-rules.md

---

## 핵심 규칙

### 1. 토큰 참조 계층 (엄격하게 준수)
```
컴포넌트 CSS → --[comp]-* → --sys-* → (절대 ref 직접 참조 금지)
예외: spacing은 --ref-space-* 직접 참조 허용
```

### 2. 작업 시작 전 체크
- `figma-spec.json` 존재 확인 — 없으면 코드 작업 금지, 생성 절차 먼저 실행
- 있으면 `layerInventory`, `styleValues` 확인 후 작업 시작

### 3. 컴포넌트 완성 기준
TSX + CSS + AI 가이드 문서 3개 + figma-spec.json — 모두 있어야 완성

---

## 금지 사항

- `figma-spec.json` 없이 컴포넌트 코드 작업
- `layerInventory` 없이 JSX 구조 추측
- `resolved: false` 스타일 값 임의 코드화
- Tailwind 스케일 클래스로 디자인 토큰 대체 (`gap-2` 대신 토큰 변수 사용)
- `--ref-*` 직접 참조 (spacing 제외)
- hex 값 하드코딩
- 가이드 문서 없이 컴포넌트만 완성 처리
