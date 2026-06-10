import { useEffect, useRef, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { SECTION_COLOR } from "@/styles/theme"

// Layout 하위 라우트 전용: Outlet context 의 setAccent 를 사용한다.
// 섹션 노출 감지 + NavBar accent 연결.
// color:null 이면 자동 accent를 끄고 반환된 setAccent로 직접 제어한다.
export function useSectionAccent(
  sectionIndex,
  { color = SECTION_COLOR[sectionIndex], onActive, threshold = 0.5, revealThreshold = 0.7 } = {}
) {
  const { setAccent } = useOutletContext()
  const ref = useRef(null)
  const onActiveRef = useRef(onActive)
  const wasInViewRef = useRef(false)
  const [inView, setInView] = useState(false)
  const [animIn, setAnimIn] = useState(false)

  useEffect(() => {
    onActiveRef.current = onActive
  }, [onActive])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        const top = entry.boundingClientRect.top
        const nextInView = ratio >= threshold

        if (nextInView !== wasInViewRef.current) {
          wasInViewRef.current = nextInView
          setInView(nextInView)
          if (nextInView) {
            if (color) setAccent(color)
            onActiveRef.current?.()
          }
        }

        if (ratio >= revealThreshold && top >= 0) setAnimIn(true)
        else if (ratio < revealThreshold && top > 0) setAnimIn(false)
      },
      { threshold: [threshold, revealThreshold] }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [color, revealThreshold, setAccent, threshold])

  return { ref, inView, animIn, setAccent }
}
