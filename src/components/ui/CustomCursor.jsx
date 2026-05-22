// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CustomCursor — 꽃 (야화 테마 커서)

//  props:
//    accent — 현재 섹션 accent 색상 (기본값: T.pink)
//
//  GlobalStyles에서 cursor: none !important 필수
//  모바일에서는 렌더링 안 함 (터치 기기)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from "react"
import { T } from "@/styles/theme"

// 꽃잎 — 중심(0,0)에서 위로 뻗는 물방울 path, 5장
const PETAL_PATH = "M 0,0 C -4,-2.5 -4.5,-9 0,-13 C 4.5,-9 4,-2.5 0,0"
const PETAL_ANGLES = [0, 72, 144, 216, 288]

// viewport 크기가 아닌 실제 입력 방식으로 판단 (pointer: fine = 마우스/트랙패드)
const isPointerFine = window.matchMedia("(pointer: fine)").matches

export default function CustomCursor({ accent = T.pink }) {
  const cursorRef = useRef(null)
  const pos = useRef({ x: -200, y: -200 }) // 실제 마우스 위치
  const cur = useRef({ x: -200, y: -200 }) // 현재 커서 위치 (lerp 적용)
  const rot = useRef(0)
  const sc = useRef(1)
  const isHov = useRef(false)
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e) => {
      isHov.current = !!(
        e.target.closest("button") ||
        e.target.closest("a") ||
        e.target.closest("[data-cursor-hover]") ||
        getComputedStyle(e.target).cursor === "pointer"
      )
    }

    const animate = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.13
      cur.current.y += (pos.current.y - cur.current.y) * 0.13
      rot.current += isHov.current ? 2 : 0.5
      sc.current += ((isHov.current ? 1.4 : 1) - sc.current) * 0.1

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cur.current.x}px, ${cur.current.y}px) rotate(${rot.current}deg) scale(${sc.current})`
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (!raf.current) raf.current = requestAnimationFrame(animate)
    }

    const onLeave = () => {
      cancelAnimationFrame(raf.current)
      raf.current = null
      isHov.current = false
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mouseenter", onEnter)
    document.addEventListener("mouseleave", onLeave)
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseenter", onEnter)
      document.removeEventListener("mouseleave", onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  // 터치 기기에서는 렌더링 안 함
  if (!isPointerFine) return null

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: 0,
        height: 0,
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <svg
        width="36"
        height="36"
        viewBox="-18 -18 36 36"
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
      >
        <defs>
          <filter id="cursor-glow">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 꽃잎 5장 */}
        {PETAL_ANGLES.map((angle, i) => (
          <path
            key={i}
            d={PETAL_PATH}
            fill={accent}
            opacity={0.75}
            filter="url(#cursor-glow)"
            transform={`rotate(${angle})`}
            style={{ transition: `fill ${T.transition.slow}` }}
          />
        ))}

        {/* 중심 원 */}
        <circle
          cx="0"
          cy="0"
          r="2.5"
          fill={accent}
          opacity={1}
          filter="url(#cursor-glow)"
          style={{ transition: `fill ${T.transition.slow}` }}
        />
      </svg>
    </div>
  )
}
