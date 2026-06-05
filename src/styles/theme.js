// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Pad  = Padding
//  sec  = section
//  rsv  = reservation (예약)
//  grad = gradient
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 프리셋(GRADIENT·HERO_GRAD·NIGHT_STYLE) 빌드에 내부적으로 사용
import { textGrad, textGradStops } from "@/styles/mixins"

export const T = {
  // ── 배경
  bgBase: "#050410", // 전체 배경
  bgCard: "#0a071a", // 카드 · 패널 배경
  bgDark: "#060412", // 어두운 영역 (히어로, 카드 그림자)

  // ── 핑크 (메인 1야)
  pink: "#d4527c",
  pinkDim: "#7a1f3d",
  pinkDark: "#50081c",

  // ── 앰버 (2야)
  amber: "#ffaa44",
  amberDim: "#7a4010",
  amberDark: "#411c02",

  // ── 에메랄드 (3야)
  emerald: "#3ec8a0",
  emeraldDim: "#1a6b4a",
  emeraldDark: "#042a1e",

  // ── 바이올렛 (4야)
  violet: "#9f7aff",
  violetDim: "#5b3bb0",
  violetDark: "#1c0844",

  // ── 텍스트
  main: "#f0eeff", // 주 텍스트
  white: "#ffffff", // 순수 흰색 (버튼·SVG 등)
  sub: "#8a7fa8", // 보조 텍스트
  muted: "#3a304a", // 비활성 / 힌트

  // ── 폰트
  fontSans: "'Noto Sans KR Variable', 'Apple SD Gothic Neo', sans-serif",
  fontSerif: "'Noto Serif KR Variable', serif",
  fontMono: "monospace", // 티켓 번호, step 레이블

  // ── 레이아웃
  navHeight: "100px", // 상단 고정 네비
  navHeightMini: "80px", // mini 브레이크포인트 네비
  tabNavHeight: "64px", // 프로그램 페이지 탭 네비
  tabNavHeightMini: "52px", // mini 브레이크포인트 탭 네비
  // panelWidth:   "320px",  // 예약 사이드 패널

  // 1920 풀width 이머시브 섹션 기준
  pagePad:
    "clamp(24px, max(min(calc(12.5vw - 36px), calc(3.9vw + 30px)), calc(12.5vw - 80px)), 160px)",
  // 1920px → 160px / 1280px → 80px / 768px → 60px / 480px 이하 → 24px 고정

  // rsv = reservation (예약 페이지 전용)
  rsvMaxWidth: "1280px",
  rsvPad: "clamp(24px, 6.25vw, 80px)", // 1280px → 80px / 384px 이하 → 24px 고정

  // 브레이크포인트 (max-width 기준 / 데스크탑 우선)
  bp: {
    mini: "480px",
    mobile: "768px",
    tablet: "1024px",
    desktop: "1280px",
  },

  // ── 폰트 사이즈
  fontSize: {
    xxs: "12px",
    xs: "14px",
    sm: "16px",
    md: "18px",
    lg: "clamp(18px, calc(0.5208vw + 14px), 24px)",
    xl: "clamp(20px, calc(1.0417vw + 12px), 32px)",
    xxl: "clamp(24px, calc(1.5625vw + 12px), 42px)", // 섹션 타이틀
    hero: "clamp(52px, 10vw, 110px)", // 히어로
  },

  // ── 공통 spacing 값
  spacing: {
    4: "4px",
    6: "6px",
    8: "8px",
    12: "12px",
    16: "16px",
    20: "20px",
    24: "24px",
    32: "32px",
    36: "36px",
    42: "42px",
    48: "48px",
  },

  // ── 컴포넌트 공통 구조값
  cardGap: "clamp(10px, 1.5vw, 20px)", // 카드 사이 간격
  cardPadY: "clamp(20px, 3vw, 42px)", // 카드 상하 패딩
  secPadBottom: "80px",
  progSecPadY: "clamp(24px, 5.56vh, 100px)", // 프로그램 상세 세로 여백 (Experience · Flow)
  progSecPadYCompact: "clamp(24px, 4vh, 48px)", // 태블릿·모바일: 카드 공간 확보
  contentW: "550px", // 섹션 내부 콘텐츠 컬럼 max-width (VenueSection 등)

  // ── 트랜지션
  transition: {
    fast: "0.2s ease",
    mid: "0.28s ease",
    slow: "0.4s ease",
    spring: "0.42s cubic-bezier(0.22, 0.68, 0, 1.1)",
    bgReveal: "1.4s cubic-bezier(0.22, 0.68, 0, 1.1)", // 배경 이미지 스크롤 리빌
  },

  radius: {
    xs: "6px",
    sm: "8px",
    md: "10px",
    lg: "12px",
    xl: "18px",
    card: "20px",
    pill: "40px",
    full: "50%",
  },
}

// ── hex → rgba 변환 헬퍼
// 사용: alpha(T.pink, 0.25) → "rgba(212, 82, 124, 0.25)"
export const alpha = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// ── accent 은은한 채움 배경 (태그·칩·패널 공통) — 사용: background: ${accentFill(accent)}
export const accentFill = (color) => alpha(color, 0.1)

// ── 숫자 2자리 제로패딩 헬퍼 — 사용: pad2(3) → "03"
export const pad2 = (n) => String(n).padStart(2, "0")

// ── CSS 조각 믹스인은 styles/mixins.js 로 분리 — 기존 import 호환을 위해 re-export
//    (textGrad/textGradStops 는 아래 프리셋에서 내부적으로도 사용 → 별도 import)
export {
  glass,
  focusRing,
  sectionAccent,
  vDivider,
  glow,
  textGrad,
  textGradStops,
  fadeUp,
  revealUp,
  gradientBorder,
  serif,
} from "@/styles/mixins"

// ── 섹션 상단 accent 라인 헬퍼 (중앙에서 양쪽으로 퍼지는 그라디언트 라인)
// peak = 가운데 진하기(0~1), deg = 각도(90 가로 / 180 세로), edge = 양끝 진하기(0~1, 0이면 투명)
export const accentLine = (color, { peak = 0.53, deg = 90, edge = 0 } = {}) =>
  `linear-gradient(${deg}deg, ${alpha(color, edge)}, ${alpha(color, peak)}, ${alpha(color, edge)})`

// 카드·모달 보더 상단/하단 포인트 라인 (중앙 white 피크 shimmer)
export const shimmerLine = (color) =>
  `linear-gradient(90deg, transparent 0%, ${color} 30%, ${T.white} 50%, ${color} 70%, transparent 100%)`

// ── 텍스트 그라디언트 프리셋 — 사용: ${GRADIENT.xxx}
export const GRADIENT = {
  emeraldAmber: textGrad(T.emerald, T.amber), // About 섹션
  amberPink: textGrad(T.amber, T.pink), // CTA 섹션
  violetPink: textGrad(T.violet, T.pink, 160), // Gallery 섹션
  whitePinkAmber: textGradStops(
    [`${T.main} 0%`, `${alpha(T.main, 0.8)} 40%`, `${alpha(T.pink, 0.8)} 70%`, `${T.amber} 100%`],
    134
  ),
  whitePink: textGradStops([`${T.main} 0%`, `${alpha(T.pink, 0.8)} 100%`], 145),
}

// ── 섹션 인덱스별 accent
export const SECTION_COLOR = [
  T.pink, // 0: Hero
  T.pink, // 1: Programs
  T.amber, // 2: Venue
  T.emerald, // 3: About
  T.violet, // 4: Gallery
  T.pink, // 5: CTA / Footer
]

// ── 야(夜) 히어로 타이틀 그라디언트 - 사용: ${n.heroGrad} in styled 템플릿 리터럴
const HERO_GRAD = {
  1: textGradStops(["#ff6f9d 25%", "#ffa3c1 40%", "#c9547a 60%", "#54001f 100%"], 180),
  2: textGradStops(["rgba(255,178,63,0.8) 25%", "#ffd97b 40%", "#ff9f43 60%", "#641100 91%"], 180),
  3: textGradStops(["#75ffc7 25%", "#b3ffe0 40%", "#3dbf8a 60%", "#006b73 80%"], 180),
  4: textGradStops(["#b58dff 25%", "#c59cff 40%", "#5b3fa6 60%", "#261448 100%"], 180),
}

// ── 야(夜)별 스타일 생성 팩토리
// 버튼 호버 → filter: brightness(1.2) 권장
const makeNight = (color, dim, dark, gradTo, heroGrad, glow) => ({
  color,
  // ⏸️ 보류(고려 중) — 현재 미사용. 카드 배경 역할은 bgGrad(반투명 스크림)가 차지함.
  //    불투명(0.92~0.97) 단색 카드 채움이 필요해지면 사용 검토.
  cardBg: `linear-gradient(175deg, ${alpha(dark, 0.92)}, ${alpha(T.bgDark, 0.97)})`,
  shimmer: shimmerLine(color),
  grad: `linear-gradient(135deg, ${color}, ${dim})`,
  textGrad: textGrad(color, gradTo),
  whiteTextGrad: textGradStops([`${T.main} 20%`, `${color} 60%`, `${gradTo} 100%`], 134),
  // FLOW 활성 행 타이틀 — 흰색에서 시작해 끝에서만 accent→gradTo
  flowTitleGrad: textGradStops([`${T.main} 0%`, `${alpha(color, 0.8)} 70%`, `${gradTo} 100%`], 156),
  heroGrad,
  bgGrad:
    `linear-gradient(175deg,${alpha(dark, 0.6)} 0%,${alpha(T.bgDark, 0.58)} 100%),` +
    `linear-gradient(175deg,${alpha(dark, 0)} 40%,${alpha(T.bgDark, 0.78)} 100%)`,
  glow,
  shadow: {
    default: `0 0 10px ${alpha(color, 0.2)}, 0 4px 24px ${alpha(color, 0.1)}`,
    hover: `0 0 24px ${alpha(color, 0.6)}, 0 4px 32px ${alpha(color, 0.3)}`,
  },
})

const NIGHT_GLOW = {
  1: `radial-gradient(ellipse at center,rgba(180,20,50,.55) 0%,rgba(120,8,25,.20) 45%,transparent 70%)`,
  2: `radial-gradient(ellipse at center,rgba(160,70,5,.55) 0%,rgba(100,40,2,.20) 45%,transparent 70%)`,
  3: `radial-gradient(ellipse at center,rgba(5,140,70,.45) 0%,rgba(4,80,40,.20) 45%,transparent 70%)`,
  4: `radial-gradient(ellipse at center,rgba(90,30,180,.50) 0%,rgba(50,10,120,.20) 45%,transparent 70%)`,
}

export const NIGHT_STYLE = {
  1: makeNight(T.pink, T.pinkDim, T.pinkDark, T.amber, HERO_GRAD[1], NIGHT_GLOW[1]),
  2: makeNight(T.amber, T.amberDim, T.amberDark, T.pink, HERO_GRAD[2], NIGHT_GLOW[2]),
  3: makeNight(T.emerald, T.emeraldDim, T.emeraldDark, T.amber, HERO_GRAD[3], NIGHT_GLOW[3]),
  4: makeNight(T.violet, T.violetDim, T.violetDark, T.pink, HERO_GRAD[4], NIGHT_GLOW[4]),
}
