import { Link, useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, textGradStops, NIGHT_STYLE, fadeUp, SECTION_COLOR } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import FullSection from "@/components/layout/FullSection"
import { ArrowRightIcon, StarIcon } from "@/components/ui/icons"
import { AccentLabelRow, GradLine } from "@/components/ui/deco"
import Button from "@/components/ui/Button"
import ParticleCanvas from "@/components/ui/ParticleCanvas"
import { useSectionReveal } from "@/hooks/useSectionReveal"
import heroBg from "@/assets/images/hero-bg.png"

const t = UI_TEXT.hero

export default function HeroSection({ mousePos }) {
  const { setAccent } = useOutletContext()
  const { ref: secRef } = useSectionReveal({
    onActive: () => setAccent(SECTION_COLOR[0]),
  })

  return (
    <FullSection ref={secRef} bgSrc={heroBg} bgOpacity={0.8}>
      <ParticleCanvas mousePos={mousePos} />
      <Orb />

      <Content>
        <TopGroup>
          <Header>
            <Hanja>{t.hanjaLabel}</Hanja>
            <HeroLabelRow color={T.pink} hideMini>
              <LabelText>{t.festivalLabel}</LabelText>
            </HeroLabelRow>
          </Header>
          <Title>{t.h2.plain}</Title>

          <Divider>
            <GradLine $color={T.pink} $dir="left" />
            <StarIcon color={T.pink} opacity={0.9} />
            <GradLine $color={T.pink} $dir="right" />
          </Divider>

          <SubGroup>
            <Sub>{t.sub}</Sub>
            <EventDate>
              {t.date} · {t.location}
            </EventDate>
          </SubGroup>
        </TopGroup>

        <CtaRow>
          <Button as={Link} to="/programs" size="lg" night={NIGHT_STYLE[1]} variant="gradient">
            {t.ctaPrimary}
          </Button>
          <Button as={Link} to="/booking" size="lg" accent={T.pink} variant="outline">
            {UI_TEXT.nav.ctaLabel}
            <ArrowRightIcon size={17} />
          </Button>
        </CtaRow>
      </Content>

      <ScrollIndicator>
        <ScrollLine />
        <ScrollChev />
        <ScrollLabel>SCROLL</ScrollLabel>
      </ScrollIndicator>
    </FullSection>
  )
}

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

const HeroLabelRow = styled(AccentLabelRow)`
  ${fadeUp(0.05)}
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
