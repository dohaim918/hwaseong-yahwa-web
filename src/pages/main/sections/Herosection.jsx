import { useEffect } from "react"
import { Link, useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, textGradStops, NIGHT_STYLE } from "@/styles/theme"
import FullSection from "@/components/layout/FullSection"
import { ArrowRightIcon, StarIcon } from "@/components/ui/icons"
import Button from "@/components/ui/Button"
import ParticleCanvas from "@/components/ui/ParticleCanvas"
// import FortressWall from "@/components/ui/FortressWall"
import heroBg from "@/assets/images/hero-bg.png"

export default function HeroSection({ visible = true, mousePos }) {
  const { setAccent, setScrolled } = useOutletContext()

  useEffect(() => {
    setAccent(T.pink)
    setScrolled(false)
  }, [])

  return (
    <FullSection bgSrc={heroBg} bgOpacity={0.8}>
      <ParticleCanvas mousePos={mousePos} />
      <Orb />
      {/* <FortressWall /> */}

      <Content>
        <TopGroup>
          <Header>
            <Hanja>華城夜火</Hanja>
            <LabelRow>
              <LabelLine $dir="left" />
              <LabelText>2026 MEDIA ART FESTIVAL</LabelText>
              <LabelLine $dir="right" />
            </LabelRow>
          </Header>
          <Title>화성야화</Title>

          <Divider>
            <DividerLine $dir="left" />
            <StarIcon color={T.pink} opacity={0.9} />
            <DividerLine $dir="right" />
          </Divider>

          <SubGroup>
            <Sub>유네스코 세계유산이 미디어아트를 만나다</Sub>
            <EventDate>09.20 — 09.29 · UNESCO HWASEONG</EventDate>
          </SubGroup>
        </TopGroup>

        <CtaRow>
          <Link to="/programs">
            <Button size="lg" night={NIGHT_STYLE[1]} variant="gradient">
              프로그램 보기
            </Button>
          </Link>
          <Link to="/booking">
            <HeroBookBtn size="lg" accent={T.pink} variant="outline">
              예약하기
              <ArrowRightIcon size={17} />
            </HeroBookBtn>
          </Link>
        </CtaRow>
      </Content>

      <ScrollIndicator $visible={visible}>
        <ScrollLine />
        <ScrollChev />
        <ScrollLabel>SCROLL</ScrollLabel>
      </ScrollIndicator>
    </FullSection>
  )
}

const fadeUp = (delay = 0) => `animation: fadeUp 0.75s cubic-bezier(.22,.68,0,1.2) ${delay}s both;`

const Orb = styled.div`
  position: absolute;
  top: 12%;
  left: calc(50% - 250px);
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${alpha(T.pink, 0.07)} 0%,
    ${alpha(T.pink, 0.015)} 40%,
    transparent 70%
  );
  animation: orbFloat 6s ease-in-out infinite;
  pointer-events: none;
`

const Content = styled.div`
  position: relative;
  z-index: 10;
  max-width: 100%;
  text-align: center;
  padding: 0 ${T.spacing[24]};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[42]};
  transform: translateY(-60px);
  transition:
    transform ${T.transition.slow},
    gap ${T.transition.slow};

  @media (max-width: ${T.bp.tablet}) {
    transform: translateY(-30px);
    gap: ${T.spacing[32]};
  }

  @media (max-width: ${T.bp.mobile}) {
    transform: translateY(0);
    gap: ${T.spacing[24]};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[20]};
  }
`

const TopGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[24]};
  width: 100%;
  transition: gap ${T.transition.slow};

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[16]};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[20]};
  width: 100%;
  transition: gap ${T.transition.slow};

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const Hanja = styled.div`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.xs};
  letter-spacing: 12px;
  color: ${alpha(T.main, 0.27)};
  transition: letter-spacing ${T.transition.mid};
  ${fadeUp(0.15)}

  @media (max-width: ${T.bp.mini}) {
    letter-spacing: 6px;
  }
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  width: 100%;
  ${fadeUp(0.05)}
`

const LabelLine = styled.div`
  width: 28px;
  height: 1px;
  background: ${({ $dir }) =>
    $dir === "left"
      ? `linear-gradient(90deg, transparent, ${T.pink})`
      : `linear-gradient(90deg, ${T.pink}, transparent)`};
  transition: opacity ${T.transition.mid};

  @media (max-width: ${T.bp.mini}) {
    opacity: 0;
    pointer-events: none;
  }
`

const LabelText = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  letter-spacing: 4px;
  color: ${T.pink};
  white-space: nowrap;
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 2px;
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    font-weight: 500;
  }
`

const Title = styled.h2`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.hero};
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -2px;
  margin-top: ${T.spacing[8]};
  ${textGradStops(
    [`${T.main} 0%`, `${alpha(T.main, 0.8)} 40%`, `${alpha(T.pink, 0.8)} 70%`, `${T.amber} 100%`],
    134
  )}
  filter: drop-shadow(0 0 20px ${alpha(T.pink, 0.27)});
  transition: margin-top ${T.transition.slow};
  ${fadeUp(0.28)}

  @media (max-width: ${T.bp.mobile}) {
    margin-top: ${T.spacing[4]};
  }
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  width: 100%;
  ${fadeUp(0.42)}
`

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background: ${({ $dir }) =>
    $dir === "left"
      ? `linear-gradient(90deg, transparent, ${T.pink})`
      : `linear-gradient(90deg, ${T.pink}, ${alpha(T.pink, 0.13)})`};
`

const SubGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[12]};
  transition: gap ${T.transition.slow};

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[8]};
  }
`

const Sub = styled.p`
  font-size: ${T.fontSize.md};
  font-weight: 600;
  letter-spacing: 3px;
  color: ${alpha(T.main, 0.47)};
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};
  ${fadeUp(0.52)}

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.sm};
    letter-spacing: 1px;
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`

const EventDate = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 500;
  letter-spacing: 1px;
  color: ${alpha(T.sub, 0.6)};
  transition: font-size ${T.transition.mid};
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 0.5px;
  }
  ${fadeUp(0.62)}
`

const CtaRow = styled.div`
  display: flex;
  gap: ${T.spacing[24]};
  justify-content: center;
  align-items: flex-start;
  margin-top: ${T.spacing[12]};
  transition: gap ${T.transition.slow};
  ${fadeUp(0.75)}

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[12]};
  }
`

const HeroBookBtn = styled(Button)`
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, ${alpha(T.pink, 0.1)}, ${alpha(T.pink, 0.05)});

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    inset: 0;

    background: ${alpha(T.bgDark, 0.8)};
  }

  &:hover:not(:disabled) {
    background: ${alpha(T.pink, 0.5)};
  }
`

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: ${T.spacing[24]};
  inset-inline: 0;
  width: max-content;
  margin-inline: auto;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[16]};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${T.transition.mid};

  ${fadeUp(1.1)}

  @media (max-width: ${T.bp.mobile}) {
    bottom: ${T.spacing[16]};
  }
`

const ScrollLine = styled.div`
  width: 2px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, ${alpha(T.pink, 0.8)});
  margin-bottom: -26px;
  border-radius: ${T.radius.pill};
  animation: scrollBounce 2s ease-in-out infinite;
`

const ScrollChev = styled.div`
  width: 10px;
  height: 10px;
  border-right: 1px solid ${T.pink};
  border-bottom: 1px solid ${T.pink};
  transform: rotate(45deg);
  animation: scrollChevBounce 2s ease-in-out infinite;
`

const ScrollLabel = styled.span`
  font-size: ${T.fontSize.xxs};
  letter-spacing: 4px;
  color: ${alpha(T.pink, 0.3)};

  text-transform: uppercase;
`
