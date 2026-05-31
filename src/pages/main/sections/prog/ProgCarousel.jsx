import { useLayoutEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import NightCard from "./NightCard"
import ProgTabs from "./ProgTabs"

const GAP = 12
const MIN_CARD_W = 220

export default function ProgCarousel({ cards, activeIdx, onActiveChange }) {
  const [wrapW, setWrapW] = useState(0)
  const wrapRef = useRef(null)
  const touchStartX = useRef(null)

  useLayoutEffect(() => {
    const wrapper = wrapRef.current
    if (!wrapper) return

    setWrapW(wrapper.offsetWidth)
    let rafId = null
    const observer = new ResizeObserver(([entry]) => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        setWrapW(entry.contentRect.width)
      })
    })
    observer.observe(wrapper)
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  const cardW = Math.max(MIN_CARD_W, wrapW > 0 ? Math.round((wrapW - GAP) / 1.8) : MIN_CARD_W)
  const peek = wrapW > 0 ? Math.max(0, Math.round((wrapW - cardW) / 2)) : 60
  const trackX = peek - activeIdx * (cardW + GAP)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0 && activeIdx < cards.length - 1) onActiveChange(activeIdx + 1)
    if (dx > 0 && activeIdx > 0) onActiveChange(activeIdx - 1)
  }

  const activateItem = (idx) => {
    if (idx !== activeIdx) onActiveChange(idx)
  }

  return (
    <CarouselArea>
      <ProgTabs cards={cards} activeIdx={activeIdx} onChange={onActiveChange} />
      <CarouselWrapper
        ref={wrapRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={() => {
          touchStartX.current = null
        }}
      >
        <CarouselTrack style={{ transform: `translateX(${trackX}px)` }}>
          {cards.map((card, i) => (
            <CarouselItem
              key={card.id}
              type="button"
              style={{ width: `${cardW}px`, marginRight: `${GAP}px` }}
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
