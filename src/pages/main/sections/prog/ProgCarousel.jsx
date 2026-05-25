import styled from "@emotion/styled"
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
    <CarouselArea>
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
              type="button"
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
    </CarouselArea>
  )
}

const CarouselArea = styled.div`
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
`

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  overflow-x: clip;
  clip-path: inset(-80px 0 -120px 0);
`

const CarouselTrack = styled.div`
  display: flex;
  min-width: 0;
  height: 100%;
  will-change: transform;
  transition: transform 0.36s cubic-bezier(0.25, 0.1, 0.25, 1);
`

const CarouselItem = styled.button`
  flex-shrink: 0;
  min-width: 0;
  height: 100%;
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -4px;
  }
`
