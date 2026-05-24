import styled from "@emotion/styled"
import { T, alpha, revealUp } from "@/styles/theme"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { StarIcon } from "@/components/ui/icons"
import CardDeco from "./CardDeco"

const getMaskGrad = (maskSide) =>
  maskSide ? `linear-gradient(to ${maskSide}, transparent 60%, black 90%)` : "none"

export default function NightCard({
  card,
  active,
  hasHover,
  onEnter = () => {},
  isCarousel,
  maskSide,
  animIn,
  animIdx = 0,
}) {
  const { id, nightCode, num, color, style, subtitle, keyword, hoverDesc, hoverCta } = card
  const imgs = PROGRAM_ASSETS.cards[id]

  return (
    <CardOuter
      $active={active}
      $hasHover={hasHover}
      $isCarousel={isCarousel}
      $maskSide={maskSide}
      $animIn={animIn}
      $animIdx={animIdx}
      onMouseEnter={onEnter}
      data-cursor-hover
    >
      <Glow $g={style.glow} $active={active} />
      <Card $active={active} $hasHover={hasHover} $color={color} $isCarousel={isCarousel}>
        <CardDeco imgs={imgs} style={style} color={color} active={active} hasHover={hasHover} />
        <Content $active={active}>
          <Top>
            <NightLabel $color={color}>{nightCode}</NightLabel>
            <NumWrap>
              <NumText $g={style.heroGrad} $big>
                {num}
              </NumText>
              <NumText $g={style.heroGrad}>야</NumText>
              <NightStar>
                <StarIcon size={18} color={color} />
              </NightStar>
            </NumWrap>
            <Sub $color={color}>{subtitle}</Sub>
          </Top>
          <Btm>
            <Kw $active={active}>
              <KwLabel $color={color}>KEYWORD</KwLabel>
              <KwText $color={color}>{keyword}</KwText>
            </Kw>
            <HoverInfo $active={active}>
              <HoverDesc>{hoverDesc}</HoverDesc>
              <CtaText $color={color}>{hoverCta} →</CtaText>
            </HoverInfo>
          </Btm>
        </Content>
      </Card>
    </CardOuter>
  )
}

const CardOuter = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  /* max-width: clamp(385px, 20vw, 540px); */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  transition:
    flex ${T.transition.mid},
    max-width ${T.transition.mid};
  ${({ $isCarousel, $animIn, $animIdx }) =>
    !$isCarousel && revealUp($animIn, 0.15 + $animIdx * 0.1)}
  ${({ $active, $hasHover, $isCarousel }) =>
    !$isCarousel &&
    $hasHover &&
    $active &&
    `flex: 0 0 clamp(260px, 22.9vw, 616px);
     max-width: clamp(260px, 22.9vw, 616px);`}

  ${({ $isCarousel }) =>
    $isCarousel &&
    `flex: 0 0 100%;
     max-width: 100%;
     height: 100%;`}

  mask-image: ${({ $maskSide }) => getMaskGrad($maskSide)};
  -webkit-mask-image: ${({ $maskSide }) => getMaskGrad($maskSide)};
`

const Glow = styled.div`
  position: absolute;
  bottom: -71px;
  left: -10%;
  right: -10%;
  height: 148px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  transition: opacity ${T.transition.mid};
  background: ${({ $g }) => $g};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
`

const Card = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $active, $hasHover, $isCarousel }) =>
    $isCarousel ? "100%" : $hasHover && $active ? "100%" : "90%"};
  border-radius: ${T.radius.card};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  opacity: ${({ $hasHover, $active }) => ($hasHover ? ($active ? 1 : 0.3) : 0.6)};
  transition:
    height ${T.transition.mid},
    opacity ${T.transition.mid},
    box-shadow ${T.transition.mid};
  ${({ $active, $color }) =>
    $active && `box-shadow: 0 0 40px ${alpha($color, 0.3)}, 0 32px 80px rgba(0,0,0,.75);`}
`

const Content = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: ${({ $active }) =>
    $active ? `${T.spacing[42]} ${T.spacing[24]}` : `${T.spacing[32]} ${T.spacing[24]}`};
  transition: padding ${T.transition.mid};

  @media (min-width: 1921px) {
    padding-block: ${({ $active }) =>
      $active
        ? "clamp(42px, calc(42px + (100vw - 1920px) * 0.0297), 80px)"
        : "clamp(32px, calc(32px + (100vw - 1920px) * 0.025), 64px)"};
    padding-inline: ${T.spacing[24]};
  }

  @media (max-width: ${T.bp.tablet}) {
    padding: ${({ $active }) =>
      $active
        ? `clamp(${T.spacing[24]}, calc(2.2vw + 13px), ${T.spacing[36]}) clamp(${T.spacing[16]}, calc(0.7vw + 12.5px), ${T.spacing[20]})`
        : `clamp(18px, calc(1.8vw + 9.5px), 28px) clamp(${T.spacing[16]}, calc(0.7vw + 12.5px), ${T.spacing[20]})`};
  }
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NightLabel = styled.span`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.xs};
  font-weight: 500;
  letter-spacing: 4px;
  padding-bottom: ${T.spacing[6]};
  text-align: center;
  color: ${({ $color }) => $color};
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 3px;
  }
  @media (max-width: ${T.bp.mini}) {
    letter-spacing: 2px;
  }
`

const NumWrap = styled.div`
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  transition: height ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    height: 60px;
  }
  @media (max-width: ${T.bp.mini}) {
    height: 52px;
  }
`

const NumText = styled.span`
  font-family: ${T.fontSerif};
  font-size: ${({ $big }) => ($big ? "clamp(44px, 6.8vw, 66px)" : "clamp(40px, 6.4vw, 62px)")};
  font-weight: ${({ $big }) => ($big ? 700 : 600)};
  line-height: 1.1;
  letter-spacing: 1px;
  ${({ $g }) => $g}
`

const NightStar = styled.span`
  position: absolute;
  top: -2px;
  right: -18px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Sub = styled.span`
  font-family: ${T.fontSerif};
  font-size: clamp(14px, 2.1vw, 20px);
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.03em;
  color: ${({ $color }) => $color};
`

const Btm = styled.div`
  display: grid;
  grid-template-areas: "slot";
  align-items: end;
`

const Kw = styled.div`
  grid-area: slot;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[8]};
  text-align: center;
  padding-bottom: ${T.spacing[8]};
  transition: opacity ${T.transition.fast};
  opacity: ${({ $active }) => ($active ? 0 : 1)};
  pointer-events: ${({ $active }) => ($active ? "none" : "auto")};
`

const KwLabel = styled.span`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.sm};
  font-weight: 500;
  letter-spacing: 0.1em;
  color: ${({ $color }) => $color};
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

const KwText = styled.span`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.md};
  font-weight: 600;
  color: ${({ $color }) => $color};
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.desktop}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.md};
  }
  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
`

const HoverInfo = styled.div`
  grid-area: slot;
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[6]};
  padding: ${T.spacing[8]} 0;
  transition: opacity ${T.transition.fast};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  @media (max-width: ${T.bp.mini}) {
    gap: 0;
  }
`

const HoverDesc = styled.p`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.sm};
  font-weight: 400;
  color: ${T.sub};
  text-align: center;
  line-height: clamp(22px, 3.5vw, 32px);
  white-space: pre-line;
  padding-top: ${T.spacing[8]};
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

const CtaText = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${T.spacing[8]};
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  letter-spacing: 1px;
  color: ${({ $color }) => $color};
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`
