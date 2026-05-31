// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  CustomCursor — 꽃 (야화 테마 커서)
//  ────────────────────────────────────
//  · 마우스 화면 밖이면 raf 정지 (CPU 절약), 들어오면 재시작
//  · 첫 진입·재진입 시 lerp 지연 없이 즉시 점프 (sentinel: cx < 0)
//  · prefers-reduced-motion 시 raf 없이 마우스 위치를 즉시 반영
//  · 터치 기기(pointer:coarse) 에서는 렌더링 안 함
//
//  GlobalStyles 의 `body.has-custom-cursor *` 에만 cursor:none 이 걸려 있어,
//  컴포넌트가 마운트되지 못하면 OS 커서가 그대로 보임 (fallback).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from "react"
import { T } from "@/styles/theme"
import { useFinePointer, useReducedMotion } from "@/hooks/useResponsive"

const PETAL = "M 0,0 C -4,-2.5 -4.5,-9 0,-13 C 4.5,-9 4,-2.5 0,0"
const ANGLES = [0, 72, 144, 216, 288]
const HOVER_SEL = "button, a, [role='button'], [data-cursor-hover]"
const OUT = -200 // 화면 밖 sentinel — 첫 진입·재진입 시 cx<0 가드로 즉시 점프

export default function CustomCursor({ accent = T.pink }) {
  const isFine = useFinePointer()
  const isStatic = useReducedMotion()
  const ref = useRef(null)

  // body 클래스 토글 — GlobalStyles 의 cursor:none 트리거
  useEffect(() => {
    if (!isFine) return
    document.body.classList.add("has-custom-cursor")
    return () => document.body.classList.remove("has-custom-cursor")
  }, [isFine])

  useEffect(() => {
    const el = ref.current
    if (!isFine || !el) return

    // 단일 state 객체 — px/py: 실제 마우스, cx/cy: 화면 좌표(lerp), r: 회전, sc: 스케일, hov: 호버
    const s = { px: OUT, py: OUT, cx: OUT, cy: OUT, r: 0, sc: 1, hov: false }
    let raf = null

    const tick = () => {
      if (s.cx >= 0) {
        s.cx += (s.px - s.cx) * 0.18
        s.cy += (s.py - s.cy) * 0.18
        s.r = (s.r + (s.hov ? 2 : 0.5)) % 360
        s.sc += ((s.hov ? 1.4 : 1) - s.sc) * 0.1
        el.style.transform = `translate(${s.cx}px,${s.cy}px) rotate(${s.r}deg) scale(${s.sc})`
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => (raf ??= requestAnimationFrame(tick))
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf)
      raf = null
    }

    const onMove = ({ clientX: x, clientY: y }) => {
      // 첫 이벤트 / 화면 밖 복귀 시 cur 즉시 점프 (lerp 지연 우회)
      if (s.cx < 0 || isStatic) {
        s.cx = x
        s.cy = y
      }
      s.px = x
      s.py = y
      if (isStatic) {
        el.style.transform = `translate(${x}px,${y}px)`
        return
      }
      start()
    }
    const onOver = (e) => {
      s.hov = !!e.target.closest?.(HOVER_SEL)
    }
    const onLeave = () => {
      stop()
      s.hov = false
      s.cx = OUT
      s.cy = OUT
      el.style.transform = `translate(${OUT}px,${OUT}px)`
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    if (!isStatic) window.addEventListener("mouseover", onOver, { passive: true })
    document.addEventListener("mouseleave", onLeave)

    return () => {
      window.removeEventListener("mousemove", onMove)
      if (!isStatic) window.removeEventListener("mouseover", onOver)
      document.removeEventListener("mouseleave", onLeave)
      stop()
    }
  }, [isFine, isStatic])

  if (!isFine) return null

  return (
    <div ref={ref} aria-hidden="true" style={ROOT_STYLE}>
      <svg
        width="36"
        height="36"
        viewBox="-18 -18 36 36"
        aria-hidden="true"
        focusable="false"
        style={SVG_STYLE}
      >
        <defs>
          <filter id="cg">
            <feGaussianBlur stdDeviation="1.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ANGLES.map((a) => (
          <path
            key={a}
            d={PETAL}
            fill={accent}
            opacity={0.75}
            filter="url(#cg)"
            transform={`rotate(${a})`}
            style={FILL_TRANS}
          />
        ))}
        <circle r="2.5" fill={accent} filter="url(#cg)" style={FILL_TRANS} />
      </svg>
    </div>
  )
}

// ── 정적 스타일 모듈 스코프로 — 매 렌더 객체 재생성 회피
const ROOT_STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 9999,
  pointerEvents: "none",
  willChange: "transform",
}
const SVG_STYLE = {
  position: "absolute",
  transform: "translate(-50%,-50%)",
  overflow: "visible",
}
const FILL_TRANS = { transition: `fill ${T.transition.mid}` }
