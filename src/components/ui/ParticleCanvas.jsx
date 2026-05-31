// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    mousePos — useRef({ x, y }) 마우스 위치 (선택)
//    opacity  — 캔버스 전체 투명도 (기본 1)
//    blendMode — mix-blend-mode (기본 'soft-light')
//
//  Canvas 기반 배경 파티클
//  핑크·앰버·화이트 빛 입자가 아래→위로 떠오름
//  마우스 근처 파티클은 밀려남
//
//  ✦ prefers-reduced-motion 켜진 사용자는 정적인 점 fallback
//  ✦ 디바이스 픽셀 비율(DPR) 반영 → 레티나에서 또렷
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/useResponsive"

// 파티클 색상 (Canvas API 는 hex 직접 못 씀 → rgb 배열)
const COLOR_MAP = {
  pink: [201, 84, 122],
  amber: [255, 159, 67],
  white: [240, 238, 255],
}
const COLOR_WEIGHTS = [
  ["pink", 0.55],
  ["amber", 0.25],
  ["white", 0.2],
]
const pickColor = () => {
  const r = Math.random()
  let acc = 0
  for (const [name, w] of COLOR_WEIGHTS) {
    acc += w
    if (r <= acc) return name
  }
  return "white"
}

const REF_H = 900
const getCount = (w) => (w < 480 ? 45 : w < 768 ? 65 : 100)
const spawn = (w, h) => ({
  x: Math.random() * w,
  y: h + 10,
  vy: -(Math.random() * 0.5 + 0.2) * (h / REF_H),
  vx: (Math.random() - 0.5) * 0.3 * (h / REF_H),
  life: 0,
  max: Math.random() * 1.4 + 0.8,
  r: Math.random() * 2.5 + 0.8,
  col: pickColor(),
})

export default function ParticleCanvas({ mousePos, opacity = 1, blendMode = "soft-light" }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")

    // ── DPR 보정: backing store 만 키우고 CSS 크기는 그대로
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // 화면 너비에 따라 파티클 수 조정 — 소형 화면 밀도 과다 방지
    const visibleW = () => canvas.offsetWidth
    const visibleH = () => canvas.offsetHeight
    const pts = Array.from({ length: getCount(visibleW()) }, () => {
      const p = spawn(visibleW(), visibleH())
      p.life = Math.random() * p.max
      p.y = Math.random() * visibleH()
      return p
    })

    // ── reduced motion: 정적인 점만 한 번 그리고 종료
    if (reducedMotion) {
      ctx.clearRect(0, 0, visibleW(), visibleH())
      pts.forEach((p) => {
        const [r, g, b] = COLOR_MAP[p.col]
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},0.4)`
        ctx.fill()
      })
      return () => ro.disconnect()
    }

    let frame = 0
    const draw = () => {
      frame++
      const w = visibleW()
      const h = visibleH()
      ctx.clearRect(0, 0, w, h)

      pts.forEach((p) => {
        // 위치 업데이트
        p.life += 0.003 + Math.random() * 0.002
        p.x += p.vx + Math.sin(frame * 0.01 + p.y * 0.01) * 0.25
        p.y += p.vy

        // 마우스 근처면 밀어냄
        if (mousePos?.current) {
          const dx = p.x - mousePos.current.x
          const dy = p.y - mousePos.current.y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d > 0 && d < 120) {
            p.x += (dx / d) * 0.6
            p.y += (dy / d) * 0.6
          }
        }

        // 수명 다하면 재생성
        if (p.life >= p.max) Object.assign(p, spawn(w, h))

        // 알파값 — 중간에 가장 밝고 양 끝에서 사라짐
        const t = p.life / p.max
        const alpha = Math.sin(t * Math.PI)
        const [r, g, b] = COLOR_MAP[p.col]

        // 방사형 그라디언트로 글로우 효과
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
        grd.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`)

        // 외곽 글로우
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // 중심 흰 점
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [mousePos, reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        mixBlendMode: blendMode,
        pointerEvents: "none",
      }}
    />
  )
}
