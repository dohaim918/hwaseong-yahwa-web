// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Pad  = Padding
//  sec  = section
//  rsv  = reservation (예약)
//  grad = gradient
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const T = {
  // ── 배경
  bgBase: "#050410", // 전체 배경
  bgCard: "#0a071a", // 카드 · 패널 배경

  // ── 핑크 (메인 1야)
  pink: "#c9547a",
  pinkDim: "#7a1f3d",

  // ── 앰버 (Venue 2야)
  amber: "#ff9f43",
  amberDim: "#7a4010",

  // ── 에메랄드 (About 3야)
  emerald: "#3dbf8a",
  emeraldDim: "#1a6b4a",

  // ── 바이올렛 (Gallery / 4야)
  violet: "#a78bfa",
  violetDim: "#5b3bb0",

  // ── 텍스트
  white: "#f0eeff", // 주 텍스트
  sub: "#8a7fa8", // 보조 텍스트
  muted: "#3a304a", // 비활성 / 힌트

  // ── 폰트
  fontSans: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
  fontSerif: "'Noto Serif KR', serif",
  fontMono: "monospace", // 티켓 번호, step 레이블

  // ── 레이아웃
  navHeight: "100px", // 상단 고정 네비
  // tabNavHeight: "66px", // 프로그램 페이지 탭 네비
  // panelWidth: "320px", // 예약 사이드 패널

  // 1920 풀width 이머시브 섹션 기준
  pagePad: "clamp(24px, calc(12.5vw - 80px), 160px)",
  // 1920px → 160px / 1280px → 80px / 832px 이하 → 24px 고정

  // rsv = reservation (예약 페이지 전용)
  rsvMaxWidth: "1280px",
  rsvPad: "clamp(24px, 6.25vw, 80px)",
  // 1280px → 80px / 384px 이하 → 24px 고정

  // 브레이크포인트 (max-width 기준 / 데스크탑 우선)
  bp: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1440px",
  },

  // ── 공통 spacing 값
  spacing: {
    1: "4px",
    2: "6px",
    3: "8px",
    4: "12px",
    5: "16px",
    6: "24px",
    7: "32px",
    8: "36px",
  },

  // ── 컴포넌트 공통 구조값
  cardGap: "clamp(10px, 1.5vw, 20px)", // 카드 사이 간격
  cardPadY: "clamp(20px, 3vw, 42px)", // 카드 상하 패딩
  secPadBottom: "80px",

  transition: {
    fast: "all 0.18s ease", // 즉각 반응 (호버, 색상)
    mid: "all 0.28s ease", // 일반 전환 (카드, 모달)
    slow: "all 0.4s ease", // 배경·색상 천천히
    spring: "all 0.42s cubic-bezier(0.22, 0.68, 0, 1.1)", // 패널 슬라이드
  },

  radius: {
    sm: "6px", // 배지, 스크롤바
    md: "10px", // 버튼, 인풋
    lg: "12px", // 카드, 패널
    xl: "18px", // 모달
    pill: "40px", // 배지
    full: "50%", // 원형
  },
}

// ── hex → rgba 변환 헬퍼
// 사용: alpha(T.pink, 0.25) → "rgba(201, 84, 122, 0.25)"
export const alpha = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

// ── 텍스트 그라디언트 헬퍼
// 사용: ${textGrad(T.emerald, T.amber)}
export const textGrad = (from, to, deg = 135) => `
  background: linear-gradient(${deg}deg, ${from}, ${to});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

// ── 텍스트 그라디언트 프리셋 (섹션 타이틀용)
export const GRADIENT = {
  emeraldAmber: textGrad(T.emerald, T.amber), // About 섹션
  amberPink: textGrad(T.amber, T.pink), // CTA 섹션
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

// ── 야(夜)별 스타일 통합
// 버튼 호버 → filter: brightness(1.2) - grad 하나로 해결
export const NIGHT_STYLE = {
  1: {
    color: T.pink,
    bg: alpha(T.pink, 0.08),
    border: `1px solid ${alpha(T.pink, 0.3)}`,
    grad: `linear-gradient(135deg, ${T.pink}, ${T.pinkDim})`,
    textGrad: textGrad(T.pink, T.amber),
    shadow: {
      default: `0 0 10px ${alpha(T.pink, 0.2)}, 0 4px 24px ${alpha(T.pink, 0.1)}`,
      hover: `0 0 24px ${alpha(T.pink, 0.6)}, 0 4px 32px ${alpha(T.pink, 0.3)}`,
    },
  },
  2: {
    color: T.amber,
    bg: alpha(T.amber, 0.08),
    border: `1px solid ${alpha(T.amber, 0.3)}`,
    grad: `linear-gradient(135deg, ${T.amber}, ${T.amberDim})`,
    textGrad: textGrad(T.amber, T.pink),
    shadow: {
      default: `0 0 10px ${alpha(T.amber, 0.2)}, 0 4px 24px ${alpha(T.amber, 0.1)}`,
      hover: `0 0 24px ${alpha(T.amber, 0.6)}, 0 4px 32px ${alpha(T.amber, 0.3)}`,
    },
  },
  3: {
    color: T.emerald,
    bg: alpha(T.emerald, 0.08),
    border: `1px solid ${alpha(T.emerald, 0.3)}`,
    grad: `linear-gradient(135deg, ${T.emerald}, ${T.emeraldDim})`,
    textGrad: textGrad(T.emerald, T.amber),
    shadow: {
      default: `0 0 10px ${alpha(T.emerald, 0.2)}, 0 4px 24px ${alpha(T.emerald, 0.1)}`,
      hover: `0 0 24px ${alpha(T.emerald, 0.6)}, 0 4px 32px ${alpha(T.emerald, 0.3)}`,
    },
  },
  4: {
    color: T.violet,
    bg: alpha(T.violet, 0.08),
    border: `1px solid ${alpha(T.violet, 0.3)}`,
    grad: `linear-gradient(135deg, ${T.violet}, ${T.violetDim})`,
    textGrad: textGrad(T.violet, T.pink),
    shadow: {
      default: `0 0 10px ${alpha(T.violet, 0.2)}, 0 4px 24px ${alpha(T.violet, 0.1)}`,
      hover: `0 0 24px ${alpha(T.violet, 0.6)}, 0 4px 32px ${alpha(T.violet, 0.3)}`,
    },
  },
}
