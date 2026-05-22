import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { Shimmer, Ring } from "@/components/ui/deco"

export default function CardDeco({ imgs, style, color, active, hasHover }) {
  return (
    <>
      <BgImg src={imgs.bg} alt="" />
      <BgGrad $g={style.bgGrad} />
      <Sym $active={active}>
        <img src={imgs.sym} alt="" />
      </Sym>
      <Ring $color={color} $active={active} $outer />
      <Ring $color={color} $active={active} />
      <Shimmer $bg={style.shimmer} $active={active} $top />
      <Shimmer $bg={style.shimmer} $active={active} />
      <Border $color={color} $active={active} />
      <MutedOverlay $show={hasHover && !active} />
    </>
  )
}

const BgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`

const BgGrad = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: ${({ $g }) => $g};
`

const Sym = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 1;
  transform: ${({ $active }) =>
    $active ? "translateY(0) scale(1.6)" : "translateY(18px) scale(1.6)"};
  mix-blend-mode: plus-lighter;
  transition: transform ${T.transition.mid};

  img {
    width: clamp(120px, calc(12.5vw + 60px), 220px);
    height: clamp(120px, calc(12.5vw + 60px), 220px);
    object-fit: contain;
    mix-blend-mode: plus-lighter;
    transition:
      width ${T.transition.mid},
      height ${T.transition.mid};
  }
`

const Border = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${T.radius.card};
  border: 1px solid;
  pointer-events: none;
  z-index: 10;
  transition: border-color ${T.transition.mid};
  border-color: ${({ $color, $active }) => alpha($color, $active ? 0.7 : 0.33)};
`

const MutedOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: ${T.radius.card};
  background: ${alpha(T.white, 0.6)};
  mix-blend-mode: hue;
  pointer-events: none;
  z-index: 6;
  transition: opacity ${T.transition.mid};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
`
