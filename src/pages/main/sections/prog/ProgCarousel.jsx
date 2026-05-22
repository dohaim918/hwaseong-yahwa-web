import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import { useCarousel, C_GAP } from "@/hooks/useCarousel"
import NightCard from "./NightCard"
import ProgTabs from "./ProgTabs"

export default function ProgCarousel({ cards, activeIdx, onActiveIdxChange }) {
  const { wrapRef, cardW, trackX, onTouchStart, onTouchEnd, onTouchCancel } = useCarousel(
    cards.length,
    true,
    activeIdx,
    onActiveIdxChange
  )

  const activateItem = (idx) => {
    if (idx !== activeIdx) onActiveIdxChange(idx)
  }

  return (
    <>
      <ProgTabs cards={cards} activeIdx={activeIdx} onChange={onActiveIdxChange} />
      <CarouselWrapper
        ref={wrapRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <CarouselTrack style={{ transform: `translateX(${trackX}px)` }}>
          {cards.map((card, i) => (
            <CarouselItem
              key={card.id}
              style={{ width: `${cardW}px`, marginRight: `${C_GAP}px` }}
              $isActive={i === activeIdx}
              aria-current={i === activeIdx ? "true" : undefined}
              onClick={() => activateItem(i)}
            >
              <NightCard
                card={card}
                active={i === activeIdx}
                hasHover
                isCarousel
                maskSide={i < activeIdx ? "right" : i > activeIdx ? "left" : null}
              />
            </CarouselItem>
          ))}
        </CarouselTrack>
      </CarouselWrapper>
    </>
  )
}

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow-x: clip;
  clip-path: inset(-80px 0 -120px 0);

  @media (max-width: ${T.bp.tablet}) {
    flex: 1;
    min-height: 0;
  }
`

const CarouselTrack = styled.div`
  display: flex;
  will-change: transform;
  transition: transform 0.36s cubic-bezier(0.25, 0.1, 0.25, 1);

  @media (max-width: ${T.bp.tablet}) {
    height: 100%;
  }
`

const CarouselItem = styled.div`
  flex-shrink: 0;
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};

  @media (max-width: ${T.bp.tablet}) {
    height: 100%;
  }
`
