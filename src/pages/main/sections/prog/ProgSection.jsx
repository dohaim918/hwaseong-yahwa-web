import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, textGrad, sectionAccent } from "@/styles/theme"
import { getCardData } from "@/data/nightData"
import { UI_TEXT } from "@/data/uiText"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { GradSpan } from "@/components/ui/GradSpan"
import { GradLine } from "@/components/ui/deco"
import SectionHeader from "@/components/ui/Sectiontext"
import { useResponsive } from "@/hooks/useResponsive"
import NightCard from "./NightCard"
import ProgCarousel from "./ProgCarousel"
import { StarIcon } from "@/components/ui/icons"

const cards = getCardData()
const t = UI_TEXT.progSection
const DEFAULT_TITLE_GRAD = textGrad(T.amber, T.pink)

// ─────────────────────────────────────────────────────
//  ProgSection
// ─────────────────────────────────────────────────────
export default function ProgSection() {
  const [activeId, setActiveId] = useState(null)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const hasHover = activeId !== null
  const { setAccent } = useOutletContext()
  const { isMobileOrTablet } = useResponsive()

  useEffect(() => {
    const color = isMobileOrTablet
      ? cards[carouselIdx]?.color
      : cards.find((c) => c.id === activeId)?.color
    setAccent(color ?? T.pink)
  }, [activeId, carouselIdx, isMobileOrTablet, setAccent])

  const activeCard = isMobileOrTablet ? cards[carouselIdx] : cards.find((c) => c.id === activeId)
  const titleGrad = activeCard?.style?.textGrad ?? DEFAULT_TITLE_GRAD

  return (
    <Sec>
      <HdCards>
        <Hd>
          <SparkleImg src={PROGRAM_ASSETS.sparkle} alt="" />
          <SectionHeader
            label={t.sectionLabel}
            title={
              <>
                {t.h2.gradStart}
                <GradSpan g={titleGrad}>{t.h2.gradEnd}</GradSpan>
              </>
            }
            desc={t.desc}
            center
            // hideLabelMini
          />
        </Hd>

        {isMobileOrTablet ? (
          <ProgCarousel cards={cards} activeIdx={carouselIdx} onActiveIdxChange={setCarouselIdx} />
        ) : (
          <CardsRow onMouseLeave={() => setActiveId(null)}>
            {cards.map((card) => (
              <NightCard
                key={card.id}
                card={card}
                active={activeId === card.id}
                hasHover={hasHover}
                onEnter={() => setActiveId(card.id)}
              />
            ))}
          </CardsRow>
        )}
      </HdCards>
      <ProgBottom>
        <BottomDeco>
          <GradLine $color={alpha(T.sub, 0.5)} $dir="left" $width={T.spacing[42]} $hideMini />
          <StarIcon size={14} color={alpha(T.sub, 0.6)} />
        </BottomDeco>
        <BottomText>{t.bottomHint}</BottomText>
        <BottomDeco>
          <StarIcon size={14} color={alpha(T.sub, 0.6)} />
          <GradLine $color={alpha(T.sub, 0.5)} $dir="right" $width={T.spacing[42]} $hideMini />
        </BottomDeco>
      </ProgBottom>
    </Sec>
  )
}

const Sec = styled.section`
  position: relative;
  overflow-x: clip;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  margin-left: calc(-1 * ${T.pagePad});
  margin-right: calc(-1 * ${T.pagePad});
  ${sectionAccent(T.pink)}

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60%;
    background: radial-gradient(
      ellipse 80% 30% at 50% 100%,
      ${alpha(T.pink, 0.12)} 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }
`

const Hd = styled.div`
  position: relative;
  z-index: 1;
  padding-bottom: ${T.spacing[12]};

  &::before {
    content: "";
    position: absolute;
    top: 44%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: clamp(500px, 60vw, 900px);
    height: clamp(220px, 28vw, 420px);
    background: radial-gradient(ellipse at center, ${alpha(T.pink, 0.12)} 0%, transparent 70%);
    z-index: -1;
    pointer-events: none;
  }
`

const SparkleImg = styled.img`
  position: absolute;
  top: -50%;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: -2;
  transition:
    transform ${T.transition.mid},
    top ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    transform: scale(1.4);
    top: -30%;
  }
  @media (max-width: ${T.bp.mobile}) {
    transform: scale(2);
    top: -20%;
  }
  @media (max-width: ${T.bp.mini}) {
    transform: scale(3);
    top: 0;
  }
`

const HdCards = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${T.bp.tablet}) {
    justify-content: flex-start;
    padding-top: calc(${T.navHeight} + clamp(${T.spacing[48]}, 10vh, 80px));
  }

  @media (max-width: ${T.bp.mini}) {
    padding-top: calc(${T.navHeightMini} + clamp(${T.spacing[48]}, 10vh, 80px));
  }
`

const CardsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${T.spacing[20]};
  align-items: center;
  height: clamp(400px, 56vh, 900px);
  padding: 0 ${T.pagePad};
`

const ProgBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  padding-top: ${T.spacing[24]};
  padding-bottom: clamp(40px, 7.4vh, 160px);
`

const BottomDeco = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[4]};
`

const BottomText = styled.span`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.md};
  font-weight: 700;
  color: ${alpha(T.sub, 0.6)};
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
