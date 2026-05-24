// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Anim.jsx — 스크롤 진입 감지 훅
//
//  useInView(options?)
//    — ref를 달아둔 요소가 화면에 들어오면 inView = true 로 전환 (한 번만)
//    — IntersectionObserver 래퍼. threshold 기본값 0.2
//
//  useActiveSection(onActive, threshold?)
//    — 섹션이 뷰포트에 들어올 때마다 onActive 콜백 실행 (반복)
//    — NavBar accent 색상 등록용. threshold 기본값 0.5
//
//  사용 예시:
//    const [secRef, inView] = useInView()
//    <section ref={secRef}>
//      <El $in={inView} $delay={0.3} />
//    </section>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useRef, useState, useEffect } from "react"

export function useInView({ threshold = 0.2, ...rest } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, ...rest }
    )
    io.observe(el)
    return () => io.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, inView]
}

export function useActiveSection(onActive, threshold = 0.5) {
  const ref = useRef(null)
  const callbackRef = useRef(onActive)

  useEffect(() => {
    callbackRef.current = onActive
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callbackRef.current?.()
      },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return ref
}
