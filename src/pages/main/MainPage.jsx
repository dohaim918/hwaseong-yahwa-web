import { useRef } from "react"
import HeroSection from "@/pages/main/sections/Herosection"

export default function MainPage() {
  const mousePos = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mousePos.current = { x: e.clientX, y: e.clientY }
  }

  return (
    <div onMouseMove={handleMouseMove}>
      <HeroSection visible mousePos={mousePos} />
    </div>
  )
}
