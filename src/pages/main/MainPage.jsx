import { useRef } from "react"
import HeroSection from "@/pages/main/sections/Herosection"
import ProgSection from "@/pages/main/sections/prog/ProgSection"
import VenueSection from "@/pages/main/sections/venue/VenueSection"
import AboutSection from "@/pages/main/sections/about/AboutSection"
// import GallerySection from "@/pages/main/sections/GallerySection"

export default function MainPage() {
  const mousePos = useRef({ x: 0, y: 0 })

  return (
    <div onMouseMove={(e) => { mousePos.current = { x: e.clientX, y: e.clientY } }}>
      <HeroSection mousePos={mousePos} />
      <ProgSection />
      <VenueSection />
      <AboutSection />
      {/* <GallerySection /> */}
    </div>
  )
}
