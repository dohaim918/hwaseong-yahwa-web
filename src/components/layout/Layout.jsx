// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NavBar accent, scrolled 상태를 모든 페이지와 공유
//  useOutletContext로 각 페이지에서 set 함수 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react"
import { Outlet } from "react-router-dom"
import styled from "@emotion/styled"
import NavBar from "@/components/layout/NavBar"
import CustomCursor from "@/components/ui/CustomCursor"
import { T } from "@/styles/theme"

export default function Layout() {
  const [accent, setAccent] = useState(T.pink)
  // undefined: NavBar 내부 window.scrollY 감지
  // MainPage에서 setScrolled 호출 후: prop 값 우선
  const [scrolled, setScrolled] = useState(undefined)

  return (
    <>
      <CustomCursor accent={accent} />
      <NavBar accent={accent} scrolled={scrolled} />
      <Main>
        <Outlet context={{ setAccent, setScrolled }} />
      </Main>
    </>
  )
}

const Main = styled.main`
  padding: ${T.navHeight} ${T.pagePad} 0;
`

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  각 페이지에서 사용법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  import { useOutletContext } from 'react-router-dom'
//  const { setAccent, setScrolled } = useOutletContext()
//
//  ── MainPage
//  useEffect(() => {
//    setAccent(SECTION_COLOR[activeSection])
//    setScrolled(activeSection > 0)
//  }, [activeSection])
//
//  ── ProgramsPage
//  useEffect(() => {
//    setAccent(NIGHT_STYLE[currentNight].color)
//    // setScrolled 호출 안 함 → NavBar 내부 감지
//  }, [currentNight])
