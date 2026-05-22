import { useRef, useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import HeroSection from "@/pages/main/sections/Herosection"
import ProgSection from "@/pages/main/sections/prog/ProgSection"
import { SECTION_COLOR } from "@/styles/theme"

export default function MainPage() {
  const mousePos = useRef({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState(0)
  const { setAccent, mainRef } = useOutletContext()

  useEffect(() => {
    const el = mainRef?.current
    if (!el) return
    const onScroll = () => {
      const idx = Math.round(el.scrollTop / el.clientHeight)
      setActiveSection(idx)
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [mainRef])

  useEffect(() => {
    setAccent(SECTION_COLOR[activeSection] ?? SECTION_COLOR[0])
  }, [activeSection, setAccent])

  return (
    <div onMouseMove={(e) => { mousePos.current = { x: e.clientX, y: e.clientY } }}>
      <HeroSection mousePos={mousePos} />
      <ProgSection />
    </div>
  )
}
