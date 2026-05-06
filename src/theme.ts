/**
 * IGT Design System v2 — Theme Configuration Types
 *
 * 사용법:
 *   <html data-brand="finance" data-theme="dark" data-radius="formal" data-size="compact">
 *
 * 속성을 생략하면 기본값이 적용됩니다.
 *   data-brand  → "default"
 *   data-theme  → OS 설정 자동 적용 (system)
 *   data-radius → "default"
 *   data-size   → "comfortable"
 */

// ---------------------------------------------------------------------------
// data-brand
// ---------------------------------------------------------------------------

/**
 * 브랜드 컬러 팔레트를 제어합니다.
 * 서비스의 메인 컬러 정체성에 따라 선택하세요.
 *
 * @example
 * // 금융·보험·투자 서비스
 * <html data-brand="finance">
 *
 * // 특정 브랜드 컬러 없이 기본 IGT 팔레트 사용
 * <html> // 또는 data-brand="default"
 */
export type ThemeBrand =
  /** IGT 기본 팔레트. 브랜드 컬러가 아직 미정이거나, 범용 서비스에 적합 */
  | "default"
  /** 금융·보험·투자·핀테크. 신뢰감을 주는 컬러 팔레트 */
  | "finance"

// ---------------------------------------------------------------------------
// data-theme
// ---------------------------------------------------------------------------

/**
 * 라이트/다크 모드를 제어합니다.
 *
 * 권장 기본값은 "system"입니다. 서비스 성격상 모드를 고정해야 할 때만
 * "light" 또는 "dark"를 명시하세요.
 *
 * @example
 * // 대부분의 서비스 — OS 설정 자동 추적 (권장)
 * applyTheme({ ..., mode: "system" })
 *
 * // 항상 라이트로 고정 (e.g. 공공기관, 인쇄 중심 서비스)
 * applyTheme({ ..., mode: "light" })
 *
 * // 항상 다크로 고정 (e.g. 영상 편집 도구, 미디어 플레이어)
 * applyTheme({ ..., mode: "dark" })
 */
export type ThemeMode =
  /** OS/브라우저 설정을 자동으로 따름. 사용자가 라이트/다크를 바꾸면 즉시 반영. 권장 기본값 */
  | "system"
  /** 항상 라이트 모드. OS 설정 무관하게 밝은 배경 고정 */
  | "light"
  /** 항상 다크 모드. OS 설정 무관하게 어두운 배경 고정 */
  | "dark"

// ---------------------------------------------------------------------------
// data-radius
// ---------------------------------------------------------------------------

/**
 * 전체 컴포넌트의 모서리 둥글기(border-radius)를 일괄 제어합니다.
 * 서비스의 브랜드 톤앤매너와 신뢰도 수준에 따라 선택하세요.
 *
 * 실제 적용 값 (버튼 md 기준):
 *   default  → 8px
 *   soft     → 10px
 *   friendly → 12px
 *   playful  → 24px (모든 크기 동일)
 *   formal   → 0px  (모든 크기 동일)
 */
export type ThemeRadius =
  /** 기본값 (4–20px). 범용적이고 무난한 라운딩. 대부분의 B2B/SaaS에 적합 */
  | "default"
  /** 살짝 부드러운 라운딩 (6–24px). default보다 친근하지만 과하지 않음 */
  | "soft"
  /** 부드럽고 친근한 라운딩 (8–24px). 커머스, 소비자 앱, 생산성 도구 */
  | "friendly"
  /** 매우 둥근 라운딩 (모두 24px). 캐주얼하고 가벼운 인상. 게임·엔터·마케팅 랜딩 */
  | "playful"
  /** 각진 형태 (모두 0px). 딱딱하지만 권위 있는 인상. 공공기관·금융·법률·어드민 */
  | "formal"

// ---------------------------------------------------------------------------
// data-size
// ---------------------------------------------------------------------------

/**
 * 전체 컴포넌트의 크기와 여백을 일괄 제어합니다.
 * 한 화면에 표시해야 하는 정보 밀도에 따라 선택하세요.
 *
 * 실제 적용 값 (버튼 높이 기준):
 *   comfortable  xs=24 / sm=32 / md=40 / lg=48px
 *   compact      xs=20 / sm=28 / md=32 / lg=40px
 */
export type ThemeSize =
  /** 기본값. 여백이 넓고 읽기 편함. 일반 웹/앱, 콘텐츠 중심 서비스 */
  | "comfortable"
  /** 크기와 여백이 작음. 데이터 테이블·어드민·대시보드처럼 정보 밀도가 높은 서비스 */
  | "compact"

// ---------------------------------------------------------------------------
// ThemeConfig — 한 번에 관리하는 통합 타입
// ---------------------------------------------------------------------------

/**
 * 서비스 전체 테마 설정.
 * 이 객체의 값을 <html> 태그의 data-* 속성에 적용하세요.
 *
 * @example
 * // 백오피스 어드민
 * const theme: ThemeConfig = {
 *   brand:  "default",
 *   mode:   "dark",
 *   radius: "formal",
 *   size:   "compact",
 * }
 *
 * // 쇼핑몰
 * const theme: ThemeConfig = {
 *   brand:  "default",
 *   mode:   "light",
 *   radius: "friendly",
 *   size:   "comfortable",
 * }
 *
 * // 금융 앱
 * const theme: ThemeConfig = {
 *   brand:  "finance",
 *   mode:   "light",
 *   radius: "formal",
 *   size:   "comfortable",
 * }
 */
export interface ThemeConfig {
  brand:  ThemeBrand
  mode:   ThemeMode
  radius: ThemeRadius
  size:   ThemeSize
}

// ---------------------------------------------------------------------------
// applyTheme — <html> 태그에 ThemeConfig를 한 번에 적용하는 유틸
// ---------------------------------------------------------------------------

/**
 * ThemeConfig를 받아 <html> 태그의 data-* 속성을 일괄 적용합니다.
 * mode: "system"이면 OS 설정을 자동으로 추적합니다.
 *
 * @example
 * applyTheme({ brand: "finance", mode: "system", radius: "formal", size: "compact" })
 */
export function applyTheme(config: ThemeConfig): void {
  const root = document.documentElement
  root.dataset.brand  = config.brand
  root.dataset.radius = config.radius
  root.dataset.size   = config.size

  if (config.mode === "system") {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    root.dataset.theme = mq.matches ? "dark" : "light"
    mq.addEventListener("change", e => {
      root.dataset.theme = e.matches ? "dark" : "light"
    })
  } else {
    root.dataset.theme = config.mode
  }
}

// ---------------------------------------------------------------------------
// PRESETS — 서비스 유형별 권장 조합 (튜닝 필요)
// ---------------------------------------------------------------------------

/**
 * 서비스 유형별 권장 테마 프리셋.
 * 실제 비주얼을 확인한 후 조합을 조정하세요.
 */
export const THEME_PRESETS = {
  /** 백오피스·어드민·내부 대시보드 */
  backoffice: {
    brand:  "default",
    mode:   "system",  // 사용자 OS 설정 자동 추적
    radius: "default",
    size:   "compact",
  },

  /** 일반 SaaS·생산성 도구 */
  saas: {
    brand:  "default",
    mode:   "system",
    radius: "default",
    size:   "comfortable",
  },

  /** 커머스·쇼핑몰 */
  commerce: {
    brand:  "default",
    mode:   "system",
    radius: "friendly",
    size:   "comfortable",
  },

  /** 금융·핀테크·보험 */
  finance: {
    brand:  "finance",
    mode:   "system",
    radius: "formal",
    size:   "comfortable",
  },

  /** 콘텐츠·미디어·엔터테인먼트 */
  media: {
    brand:  "default",
    mode:   "system",
    radius: "soft",
    size:   "comfortable",
  },
} satisfies Record<string, ThemeConfig>
