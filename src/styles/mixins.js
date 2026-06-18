// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  mixins — styled 템플릿에 ${...}로 꽂는 CSS 조각 헬퍼 모음
//  (단일 값 헬퍼·토큰은 theme.js / 그려지는 컴포넌트는 Deco.jsx)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { T, alpha, accentFill, accentLine, textGrad, textGradStops } from "@/styles/theme"

export { textGrad, textGradStops }

// ── flex column — 가장 흔한 패턴 (gap 옵션) / 사용: ${flexCol(T.spacing[8])}
export const flexCol = (gap = 0) => `
  display: flex;
  flex-direction: column;
  ${gap ? `gap: ${gap};` : ""}
`

// ── flex row — 가장 흔한 패턴 (gap·align 옵션) / 사용: ${flexRow(T.spacing[8])}
export const flexRow = (gap = 0, align = "center") => `
  display: flex;
  align-items: ${align};
  ${gap ? `gap: ${gap};` : ""}
`

// ── 글래스(블러) 배경 — webkit prefix 동반 / 사용: ${glass("8px")}
export const glass = (blur = "8px") => `
  backdrop-filter: blur(${blur});
  -webkit-backdrop-filter: blur(${blur});
`

// ── focus-visible 공통 아웃라인 (전역 통일 — 2px · offset 2px)
export const focusRing = (color, radius = "2px") => `
  &:focus-visible {
    outline: 2px solid ${color};
    outline-offset: 2px;
    border-radius: ${radius};
  }
`

// ── CTA 화살표 이동 — 방향에 맞는 SVG를 hover 시 2px 이동
export const hoverLastIconX = (dir = "right") => {
  const isLeft = dir === "left"
  const selector = isLeft ? "> svg:first-of-type" : "> svg:last-child"
  const distance = isLeft ? "-2px" : "2px"

  return `
    ${selector} {
      transition: transform ${T.transition.fast};
    }

    &:hover:not(:disabled) ${selector} {
      transform: translateX(${distance});
    }
  `
}

// ── 섹션 상단 accent 라인 — ::before로 주입 / 사용: ${sectionAccent(T.pink)}
export const sectionAccent = (color) => `
  &::before {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 2px;
    background: ${accentLine(color)};
    z-index: 11;
  }
`

// ── 항목 사이 세로 구분선 — 마지막 항목 제외 ::after 1px 라인
export const vDivider = (color, { height = "90px", opacity = 0.1, right = "0" } = {}) => `
  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: ${right};
    width: 1px;
    height: ${height};
    background: ${alpha(color, opacity)};
    transform: translateY(-50%);
  }
`

// ── 은은한 radial glow 배경 값 — 사용: background: ${glow(T.pink, { opacity: 0.12 })};
export const glow = (color, { opacity = 0.1, shape = "ellipse at center", stop = 70 } = {}) =>
  `radial-gradient(${shape}, ${alpha(color, opacity)} 0%, transparent ${stop}%)`

// ── fadeUp 애니메이션 — 사용: ${fadeUp(0.3)} (delay 단위: 초)
export const fadeUp = (delay = 0) =>
  `animation: fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) ${delay}s both;`

// ── 스크롤 다운 방향 등장 — inView=false 숨김 / true 재생(fadeUp 재사용)
export const revealUp = (inView, delay = 0) =>
  inView ? fadeUp(delay) : `opacity: 0; transform: translateY(26px);`

// ── serif 폰트 + 굵기 (라벨·제목·값 공통) — 사용: ${serif()} / ${serif(700)}
export const serif = (weight = 600) => `
  font-family: ${T.fontSerif};
  font-weight: ${weight};
`

// ── 그라디언트 테두리 — 배경은 건드리지 않고 테두리(링)만 그라디언트
export const gradientBorder = (gradient, { width = "1px", radius = "inherit" } = {}) => `
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${radius};
    padding: ${width};
    background: ${gradient};
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`

// ── 선택형 표면 — 카드·슬롯·결제수단처럼 selected 상태가 있는 버튼/패널
export const selectableSurface = (
  accent,
  selected,
  { radius = T.radius.lg, idleBg = T.bgCard, idleBorder = alpha(T.white, 0.07) } = {}
) => `
  border-radius: ${radius};
  background: ${selected ? accentFill(accent) : idleBg};
  border: 1px solid ${selected ? accent : idleBorder};

  &:hover:not(:disabled) {
    border-color: ${selected ? accent : alpha(accent, 0.5)};
  }

  ${focusRing(alpha(accent, 0.7), radius)}
`
