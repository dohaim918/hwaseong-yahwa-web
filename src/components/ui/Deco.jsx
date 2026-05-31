/* eslint-disable react-refresh/only-export-components */
// 재사용 데코 컴포넌트 모음: 선, 그라디언트 텍스트, 페이드 레이어, 카드 장식.

import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"

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

  @media (max-width: ${T.bp.mini}) {
    ${({ $hideMini }) => $hideMini && `display: none;`}
  }
`

// 라벨 텍스트 양옆에 짧은 GradLine을 붙이는 행.
export function LabelRow({
  children,
  color,
  lineWidth = "28px",
  gap = T.spacing[12],
  hideMini = false,
  justify = "center",
  ...props
}) {
  return (
    <LabelRowWrap $gap={gap} $justify={justify} {...props}>
      <GradLine $color={color} $dir="left" $width={lineWidth} $hideMini={hideMini} />
      {children}
      <GradLine $color={color} $dir="right" $width={lineWidth} $hideMini={hideMini} />
    </LabelRowWrap>
  )
}

const LabelRowWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $justify = "center" }) => $justify};
  gap: ${({ $gap }) => $gap};
  width: 100%;
`

// 카드나 모달 위아래에 얇게 흐르는 빛 라인.
export const Shimmer = styled.div`
  position: absolute;
  left: 12%;
  right: 12%;
  height: 2px;
  border-radius: 2px;
  filter: blur(0.75px);
  pointer-events: none;
  z-index: 11;
  transition: opacity ${T.transition.mid};
  opacity: ${({ $active }) => ($active === false ? 0 : 1)};
  background: ${({ $bg }) => $bg};
  ${({ $top }) => ($top ? "top: 0;" : "bottom: 0;")}
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

const EDGE_FADE_SIZE = {
  top: "clamp(120px, 18vh, 200px)",
  bottom: "100px",
  left: "clamp(60px, 16vw, 300px)",
  right: "clamp(60px, 16vw, 300px)",
}

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
