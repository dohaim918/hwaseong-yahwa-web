import { useEffect, useRef, useState } from "react"

export function useSectionReveal({ threshold = 0.5, revealThreshold = 0.7, onActive } = {}) {
  const ref = useRef(null)
  const onActiveRef = useRef(onActive)
  const [inView, setInView] = useState(false)
  const [animIn, setAnimIn] = useState(false)

  useEffect(() => {
    onActiveRef.current = onActive
  }, [onActive])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const activeIo = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) onActiveRef.current?.()
      },
      { threshold }
    )
    const revealIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.boundingClientRect.top >= 0) {
          setAnimIn(true)
        } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
          setAnimIn(false)
        }
      },
      { threshold: revealThreshold }
    )

    activeIo.observe(el)
    revealIo.observe(el)
    return () => {
      activeIo.disconnect()
      revealIo.disconnect()
    }
  }, [threshold, revealThreshold])

  return { ref, inView, animIn }
}
