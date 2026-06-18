/* eslint-disable react-refresh/only-export-components */
// 재사용 데코 컴포넌트 모음: 선, 그라디언트 텍스트, 페이드 레이어, 카드 장식.

import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { glow, revealUp, flexRow, serif } from "@/styles/mixins"
import { StarIcon } from "@/components/ui/icons"

// 텍스트 일부에 그라디언트 스타일을 입힐 때 사용.
export const GradSpan = styled.span`
  ${({ $g }) => $g}
`

// section-deco 공용 베이스.
export const SectionDecoImg = styled.img`
  position: absolute;
  left: 50%;
  width: clamp(280px, 43.75vw, 420px);
  height: auto;
  pointer-events: none;
  mix-blend-mode: soft-light;
  z-index: 4;
  opacity: ${({ $animIn }) => ($animIn ? 0.6 : 0)};
  transition: opacity ${T.transition.bgReveal};
`

// 텍스트 양옆이나 구분선에 쓰는 그라디언트 라인.
export const GradLine = styled.div`
  height: 1px;
  flex-shrink: 0;
  ${({ $width }) => ($width ? `width: ${$width};` : `flex: 1;`)}
  background: ${({ $color, $dir }) =>
    $dir === "left"
      ? `linear-gradient(90deg, transparent, ${$color})`
      : `linear-gradient(90deg, ${$color}, transparent)`};
`

// 섹션/히어로 라벨 텍스트 양옆에 짧은 GradLine을 붙이는 행.
export function SectionLabelRow({ children, color, justify = "center", ...props }) {
  return (
    <SectionLabelRowWrap $justify={justify} {...props}>
      <SectionLabelLine $color={color} $dir="left" $width={T.spacing[32]} />
      {children}
      <SectionLabelLine $color={color} $dir="right" $width={T.spacing[32]} />
    </SectionLabelRowWrap>
  )
}

// SectionLabelRow 내부 flex 래퍼 (라벨 + 양옆 라인 정렬).
const SectionLabelRowWrap = styled.div`
  ${flexRow(T.spacing[8])}
  justify-content: ${({ $justify = "center" }) => $justify};
  width: 100%;
`

// 라벨 양옆 짧은 그라디언트 라인 — 미니에서는 숨김.
const SectionLabelLine = styled(GradLine)`
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

// 섹션 하단 짧은 문구 티커.
export function SectionTicker({ text, color = T.violet, animIn }) {
  return (
    <TickerRow $animIn={animIn}>
      <TickerLine $color={alpha(color, 0.5)} $dir="left" $width={T.spacing[42]} />
      <StarIcon size={14} color={alpha(color, 0.6)} />
      <TickerText $color={color}>{text}</TickerText>
      <StarIcon size={14} color={alpha(color, 0.6)} />
      <TickerLine $color={alpha(color, 0.5)} $dir="right" $width={T.spacing[42]} />
    </TickerRow>
  )
}

// SectionTicker 한 줄 래퍼 (등장 시 revealUp).
const TickerRow = styled.div`
  position: relative;
  z-index: 8;
  ${flexRow(T.spacing[12])}
  justify-content: center;
  padding-block: ${T.spacing[24]} clamp(40px, 7.4vh, 160px);
  ${({ $animIn }) => revealUp($animIn, 0.55)}
`

// 티커 양옆 그라디언트 라인 — 미니에서는 숨김.
const TickerLine = styled(GradLine)`
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

// 티커 가운데 문구 — 브레이크포인트별 폰트·자간 축소.
const TickerText = styled.span`
  ${serif(700)}
  font-size: ${T.fontSize.md};
  color: ${({ $color }) => alpha($color, 0.6)};
  letter-spacing: 4px;
  white-space: nowrap;
  line-height: 1;
  transform: translateY(1px);
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.sm};
    letter-spacing: 3px;
  }
  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 2px;
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 1.5px;
  }
`

// 카드나 모달 위아래에 얇게 흐르는 빛 라인.
//   $bg    — 라인 그라디언트 (필수)
//   $top   — true면 top:0, 아니면 bottom:0
//   $active— false면 opacity 0 (기본 노출)
//   $full  — true면 좌우 풀폭(left/right:0), 아니면 12% 인셋
//   $blur  — 기본 true(blur 0.75px). false면 blur 제거
//   $blend — mix-blend-mode 지정 (예: "plus-lighter")
//   $glow  — 박스섀도우 글로우 색 (예: alpha(color, 0.55))
//   $z     — z-index (기본 11)
export const Shimmer = styled.div`
  position: absolute;
  ${({ $full }) => ($full ? "left: 0; right: 0;" : "left: 12%; right: 12%;")}
  height: 2px;
  border-radius: 2px;
  ${({ $blur = true }) => ($blur ? "filter: blur(0.75px);" : "")}
  ${({ $blend }) => ($blend ? `mix-blend-mode: ${$blend};` : "")}
  ${({ $glow }) => ($glow ? `box-shadow: 0 0 120px 16px ${$glow};` : "")}
  pointer-events: none;
  z-index: ${({ $z = 11 }) => $z};
  transition: opacity ${T.transition.mid};
  opacity: ${({ $active }) => ($active === false ? 0 : 1)};
  background: ${({ $bg }) => $bg};
  ${({ $top }) => ($top ? "top: 0;" : "bottom: 0;")}
`

// 카드 상/하단 빛줄기 한 쌍.
//   ...rest      — 공통 $-prop (양쪽 동일 적용)
//   bottomProps  — 하단만 다른 값 덮어쓰기 (예: 하단만 $glow)
export function ShimmerPair({ bottomProps, ...rest }) {
  return (
    <>
      <Shimmer $top {...rest} />
      <Shimmer {...rest} {...bottomProps} />
    </>
  )
}

// 아웃라인 pill 태그/버튼 (패딩 기반 — 높이 고정 안 함).
//   장소 핀(FlowTimeline)·팁 태그(FeaturedPanel)·배너 태그(BannerSection) 공용.
//   아이콘+텍스트는 자식으로 (gap 8). 클릭 필요 시 as="button" 으로.
//   $tight  — 위아래 패딩 축소 (팁 태그처럼 더 납작하게)
//   $accent — 지정 시 accent 채움(테두리·글자 + 은은한 배경) / 미지정 시 중립(T.sub)
//   $sm     — 작은 라벨 칩(xxs·bold·작은 padding·테두리 alpha) — RouteModal Tag·RouteDetailPanel Badge 용
//   $fill   — 배경 직접 오버라이드 (예: outlineFill(accent) 진한 채움 / alpha(c,0.18) 배지) — 없으면 기본 채움
export const OutlinePill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ $sm }) => ($sm ? T.spacing[6] : T.spacing[8])};
  flex-shrink: 0;
  padding: ${({ $sm, $tight }) =>
    $sm
      ? `${T.spacing[6]} ${T.spacing[12]}`
      : `${$tight ? "clamp(6px, 0.7vh, 9px)" : "clamp(10px, 1.1vh, 14px)"} clamp(${T.spacing[12]}, 1.4vw, ${T.spacing[24]})`};
  border: 1px solid
    ${({ $accent, $sm }) => ($accent ? ($sm ? alpha($accent, 0.4) : $accent) : alpha(T.sub, 0.3))};
  border-radius: ${T.radius.pill};
  /* $fill 우선 / accent: 은은한 accent 채움 / 중립: Button 아웃라인 variant 의 베이스 배경 */
  background: ${({ $accent, $fill }) => $fill ?? ($accent ? accentFill($accent) : alpha(T.bgDark, 0.4))};
  font-size: ${({ $sm }) => ($sm ? T.fontSize.xxs : "clamp(13px, 1vw, 18px)")};
  ${({ $sm }) => $sm && `font-weight: 700;`}
  line-height: 1;
  color: ${({ $accent }) => ($accent ? $accent : T.sub)};
  white-space: nowrap;
`

// 섹션 배경 빛덩어리 (radial glow) — 절대배치 + glow() 배경.
//   side  — "top"(상단 중앙) | "bottom"(하단 풀폭) 위치/정렬 프리셋
//   color — glow 색 (필수)
//   width/height — 크기 (top은 width 사용, bottom은 풀폭)
//   opacity/shape/stop — glow() 파라미터 (생략 시 glow 기본값)
//   blur  — filter blur 값 (예: "60px") / round — true면 border-radius:50%
export function SectionGlow({
  side = "top",
  color,
  width,
  height,
  opacity,
  shape,
  stop,
  blur,
  round,
  ...props
}) {
  return (
    <GlowLayer
      $side={side}
      $w={width}
      $h={height}
      $blur={blur}
      $round={round}
      $bg={glow(color, { opacity, shape, stop })}
      aria-hidden="true"
      {...props}
    />
  )
}

// SectionGlow 실제 레이어 — top(상단 중앙) / bottom(하단 풀폭) 위치 프리셋.
const GlowLayer = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background: ${({ $bg }) => $bg};
  ${({ $side, $w, $h }) =>
    $side === "top"
      ? `top: -1px; left: 50%; transform: translateX(-50%); ${$w ? `width: ${$w};` : ""} height: ${$h};`
      : `bottom: 0; left: 0; right: 0; height: ${$h};`}
  ${({ $round }) => ($round ? "border-radius: 50%;" : "")}
  ${({ $blur }) => ($blur ? `filter: blur(${$blur});` : "")}
`

// accent 색 원형 점 + 자동 glow (size*2 box-shadow).
//   $color   — accent 색 (필수)
//   $size    — 점 지름 px (기본 6)
//   $opacity — 투명도 (기본 1)
export const AccentDot = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size = 6 }) => $size}px;
  height: ${({ $size = 6 }) => $size}px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 ${({ $size = 6 }) => $size * 2}px ${({ $color }) => $color};
  opacity: ${({ $opacity = 1 }) => $opacity};
`

// 카드 active/hover 상태를 보여주는 원형 테두리.
export const Ring = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  pointer-events: none;
  z-index: 2;
  transition: opacity ${T.transition.mid};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  border-color: ${({ $color, $outer }) => alpha($color, $outer ? 0.28 : 0.2)};

  ${({ $outer }) =>
    $outer
      ? `width: clamp(152px, calc(10.75vw + 100px), 238px);
         height: clamp(152px, calc(10.75vw + 100px), 238px);
         top: calc(50% - clamp(76px, calc(5.375vw + 50px), 119px));
         left: calc(50% - clamp(76px, calc(5.375vw + 50px), 119px));`
      : `width: clamp(126px, calc(9.25vw + 82px), 200px);
         height: clamp(126px, calc(9.25vw + 82px), 200px);
         top: calc(50% - clamp(63px, calc(4.625vw + 41px), 100px));
         left: calc(50% - clamp(63px, calc(4.625vw + 41px), 100px));`}

  @media (max-width: ${T.bp.mini}) {
    opacity: ${({ $active }) => ($active ? 0.6 : 0)};
  }
`

// EdgeFade 방향별 기본 두께.
const EDGE_FADE_SIZE = {
  top: "clamp(120px, 18vh, 200px)",
  bottom: "100px",
  left: "clamp(60px, 16vw, 300px)",
  right: "clamp(60px, 16vw, 300px)",
}

// EdgeFade 방향별 그라디언트 생성 (해당 모서리 색 → 투명).
const edgeFadeBg = (side, color, opacity) => {
  const c = alpha(color, opacity)
  switch (side) {
    case "top":
      return `linear-gradient(to bottom, ${c} 0%, transparent 100%)`
    case "bottom":
      return `linear-gradient(to top, ${c} 0%, transparent 100%)`
    case "left":
      return `linear-gradient(to right, ${c} 0%, transparent 100%)`
    case "right":
      return `linear-gradient(to left, ${c} 0%, transparent 100%)`
    default:
      return "none"
  }
}

// EdgeFade 실제 레이어 — 방향별 위치·크기·배경 적용.
const EdgeFadeLayer = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: ${({ $z = 4 }) => $z};
  ${({ $side, $size, $color = T.bgBase, $opacity = 0.85 }) => {
    const size = $size ?? EDGE_FADE_SIZE[$side]
    const bg = edgeFadeBg($side, $color, $opacity)
    switch ($side) {
      case "top":
        return `top: 0; left: 0; right: 0; height: ${size}; background: ${bg};`
      case "bottom":
        return `bottom: 0; left: 0; right: 0; height: ${size}; background: ${bg};`
      case "left":
        return `top: 0; bottom: 0; left: 0; width: ${size}; background: ${bg};`
      case "right":
        return `top: 0; bottom: 0; right: 0; width: ${size}; background: ${bg};`
      default:
        return ""
    }
  }}
`

// 섹션 모서리를 자연스럽게 어둡게 잇는 페이드 레이어.
export function EdgeFade({ side, size, color, opacity, z, ...props }) {
  return (
    <EdgeFadeLayer
      $side={side}
      $size={size}
      $color={color}
      $opacity={opacity}
      $z={z}
      aria-hidden="true"
      {...props}
    />
  )
}

// 시각적으로 숨기되 스크린리더에는 읽히는 텍스트 (visually-hidden).
// 예: odometer/릴처럼 시각 요소만 보이고 실제 값은 SR에게 따로 전달할 때.
// 사용: <SrOnly>{실제값}</SrOnly>
export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
