import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, textGrad, sectionAccent, revealUp } from "@/styles/theme"
import { getCardData } from "@/data/nightData"
import { UI_TEXT } from "@/data/uiText"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { GradSpan } from "@/components/ui/GradSpan"
import SectionHeader from "@/components/ui/Sectiontext"
import SectionTicker from "@/components/ui/SectionTicker"
import { useResponsive } from "@/hooks/useResponsive"
import { useSectionReveal } from "@/hooks/useSectionReveal"
import NightCard from "./NightCard"
import ProgCarousel from "./ProgCarousel"

const cards = getCardData()
const t = UI_TEXT.progSection
const DEFAULT_TITLE_GRAD = textGrad(T.amber, T.pink)
const PROGRAM_CARD_H = "clamp(460px, calc(72dvh - 180px), 1400px)"

// ─────────────────────────────────────────────────────
//  ProgSection
// ─────────────────────────────────────────────────────
export default function ProgSection() {
  const [activeId, setActiveId] = useState(null)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const hasHover = activeId !== null
  const { setAccent } = useOutletContext()
  const { isMobileOrTablet } = useResponsive()
  const { ref: secRef, inView, animIn } = useSectionReveal()

  useEffect(() => {
    if (!inView) return
    const color = isMobileOrTablet
      ? cards[carouselIdx]?.color
      : cards.find((c) => c.id === activeId)?.color
    setAccent(color ?? T.pink)
  }, [activeId, carouselIdx, isMobileOrTablet, setAccent, inView])

  const activeCard = isMobileOrTablet ? cards[carouselIdx] : cards.find((c) => c.id === activeId)
  const titleGrad = activeCard?.style?.textGrad ?? DEFAULT_TITLE_GRAD

  return (
    <Sec ref={secRef}>
      <HdCards>
        <Hd>
          <SparkleImg src={PROGRAM_ASSETS.sparkle} alt="" $animIn={animIn} />
          <SectionHeader
            label={t.sectionLabel}
            labelAccent={T.pink}
            gap={T.spacing[16]}
            pb={T.spacing[12]}
            animIn={animIn}
            animDelay={0.05}
            title={
              <>
                {t.h2.gradStart}
                <GradSpan g={titleGrad}>{t.h2.gradEnd}</GradSpan>
              </>
            }
            desc={t.desc}
            center
          />
        </Hd>

        {isMobileOrTablet ? (
          <CarouselAnim $in={animIn}>
            <ProgCarousel
              cards={cards}
              activeIdx={carouselIdx}
              onActiveIdxChange={setCarouselIdx}
            />
          </CarouselAnim>
        ) : (
          <CardsRow onMouseLeave={() => setActiveId(null)}>
            {cards.map((card, idx) => (
              <NightCard
                key={card.id}
                card={card}
                active={activeId === card.id}
                hasHover={hasHover}
                onEnter={() => setActiveId(card.id)}
                animIn={animIn}
                animIdx={idx}
              />
            ))}
          </CardsRow>
        )}
      </HdCards>
      <SectionTicker text={t.bottomHint} color={T.sub} animIn={animIn} />
    </Sec>
  )
}

const Sec = styled.section`
  position: relative;
  overflow-x: clip;
  height: 100vh;
  height: 100dvh;
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
  opacity: ${({ $animIn }) => ($animIn ? 1 : 0)};
  transform: ${({ $animIn }) => ($animIn ? "scale(1)" : "scale(1.08)")};
  transition:
    opacity ${T.transition.bgReveal},
    transform ${T.transition.bgReveal},
    top ${T.transition.mid};

  @media (min-width: 1921px) {
    top: clamp(-70%, calc(-50% - ((100vw - 1920px) / 20)), -50%);
  }
  @media (min-width: 2560px) {
    top: clamp(-100%, calc(-70% - ((100vw - 2560px) / 10)), -70%);
  }
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
  min-height: 0;
  display: grid;
  grid-template-rows: auto ${PROGRAM_CARD_H};
  align-content: end;

  @media (max-width: ${T.bp.tablet}) {
    grid-template-rows: auto minmax(0, 1fr);
    align-content: stretch;
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
  height: 100%;
  min-height: 0;
  padding: 0 calc(${T.pagePad} + clamp(0px, calc((100vw - 1920px) / 8), 80px));
`

const CarouselAnim = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  ${({ $in }) => revealUp($in, 0.25)}
`

