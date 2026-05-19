// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    mousePos — useRef({ x, y }) 마우스 위치
//               부모에서 ref로 전달 (선택)
//
//  Canvas 기반 배경 파티클
//  핑크·앰버·화이트 빛 입자가 아래→위로 떠오름
//  마우스 근처 파티클은 밀려남
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef } from "react"

// 파티클 색상 (Canvas API는 hex 직접 못 씀 → rgb 배열)
const COLOR_MAP = {
  pink: [201, 84, 122],
  amber: [255, 159, 67],
  white: [240, 238, 255],
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
  r: Math.random() * 2.5 + 0.8, // 크기 (v1 유지)
  col: Math.random() > 0.45 ? "pink" : Math.random() > 0.5 ? "amber" : "white",
})

export default function ParticleCanvas({ mousePos, opacity = 1, blendMode = "soft-light" }) {
  const cvRef = useRef(null)
  const animRef = useRef(null)

  useEffect(() => {
    const cv = cvRef.current
    if (!cv) return
    const ctx = cv.getContext("2d")

    // 캔버스 크기를 부모에 맞춤
    const resize = () => {
      cv.width = cv.offsetWidth
      cv.height = cv.offsetHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // 화면 너비에 따라 파티클 수 조정 — 소형 화면 밀도 과다 방지
    const pts = Array.from({ length: getCount(cv.width) }, () => {
      const p = spawn(cv.width, cv.height)
      p.life = Math.random() * p.max
      p.y = Math.random() * cv.height
      return p
    })

    let frame = 0

    const draw = () => {
      frame++
      ctx.clearRect(0, 0, cv.width, cv.height)

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
          if (d < 120) {
            p.x += (dx / d) * 0.6
            p.y += (dy / d) * 0.6
          }
        }

        // 수명 다하면 재생성
        if (p.life >= p.max) Object.assign(p, spawn(cv.width, cv.height))

        // 알파값 — 중간에 가장 밝고 양 끝에서 사라짐
        const t = p.life / p.max
        const alpha = Math.sin(t * Math.PI) * 1.0 // 밝기 올림
        const [r, g, b] = COLOR_MAP[p.col]

        // 방사형 그라디언트로 글로우 효과
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5) // 글로우 범위 늘림
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
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={cvRef}
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
