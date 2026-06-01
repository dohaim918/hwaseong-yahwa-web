import styled from "@emotion/styled"
import { T } from "@/styles/theme"

// 스크롤 진입 시 서서히 드러나는 풀섹션 배경 이미지
export default function AnimatedBgImage({
  src,
  opacity = 1,
  mobileOpacity,
  blendMode = "normal",
  animate = true,
  alt = "",
  ...props
}) {
  return (
    <BgImg
      src={src}
      alt={alt}
      $opacity={opacity}
      $mobileOpacity={mobileOpacity}
      $blendMode={blendMode}
      $animate={animate}
      {...props}
    />
  )
}

const BgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: ${({ $blendMode }) => $blendMode};
  opacity: ${({ $animate, $opacity = 1 }) => ($animate ? $opacity : 0)};
  transform: ${({ $animate }) => ($animate ? "scale(1)" : "scale(1.08)")};
  transition:
    opacity ${T.transition.bgReveal},
    transform ${T.transition.bgReveal};

  @media (max-width: ${T.bp.mobile}) {
    opacity: ${({ $animate, $mobileOpacity, $opacity = 1 }) =>
      $animate ? ($mobileOpacity ?? $opacity) : 0};
  }
`
