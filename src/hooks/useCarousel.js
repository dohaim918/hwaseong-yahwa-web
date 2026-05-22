import { useState, useLayoutEffect, useRef } from "react"

export const C_GAP = 12
const MIN_CARD_W = 220

export function useCarousel(length, enabled, controlledIdx, onControlledIdxChange) {
  const [innerIdx, setInnerIdx] = useState(0)
  const [wrapW, setWrapW] = useState(0)
  const wrapRef = useRef(null)
  const touchStartX = useRef(null)
  const carouselIdx = controlledIdx ?? innerIdx
  const setCarouselIdx = onControlledIdxChange ?? setInnerIdx

  useLayoutEffect(() => {
    if (!wrapRef.current || !enabled) return
    setWrapW(wrapRef.current.offsetWidth)
    const ro = new ResizeObserver(([e]) => setWrapW(e.contentRect.width))
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [enabled])

  const rawCardW = wrapW > 0 ? Math.round((wrapW - C_GAP) / 1.8) : MIN_CARD_W
  const cardW = Math.max(MIN_CARD_W, rawCardW)
  const PEEK = wrapW > 0 ? Math.max(0, Math.round((wrapW - cardW) / 2)) : 60
  const trackX = PEEK - carouselIdx * (cardW + C_GAP)

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(dx) < 40) return
    if (dx < 0 && carouselIdx < length - 1) setCarouselIdx(carouselIdx + 1)
    if (dx > 0 && carouselIdx > 0) setCarouselIdx(carouselIdx - 1)
  }
  const onTouchCancel = () => {
    touchStartX.current = null
  }

  return {
    carouselIdx,
    setCarouselIdx,
    wrapRef,
    cardW,
    trackX,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
  }
}
