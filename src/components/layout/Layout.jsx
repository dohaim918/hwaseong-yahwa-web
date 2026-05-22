// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NavBar accent 상태를 모든 페이지와 공유
//  useOutletContext로 각 페이지에서 set 함수 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState, useRef } from "react"
import { Outlet } from "react-router-dom"
import styled from "@emotion/styled"
import NavBar from "@/components/layout/NavBar"
import CustomCursor from "@/components/ui/CustomCursor"
import { T } from "@/styles/theme"

export default function Layout() {
  const [accent, setAccent] = useState(T.pink)
  const mainRef = useRef(null)

  return (
    <>
      <CustomCursor accent={accent} />
      <NavBar accent={accent} />
      <Main ref={mainRef}>
        <Outlet context={{ setAccent, mainRef }} />
      </Main>
    </>
  )
}

const Main = styled.main`
  padding: ${T.navHeight} ${T.pagePad} 0;

  @media (max-width: ${T.bp.mini}) {
    padding-top: ${T.navHeightMini};
  }
  height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  각 페이지에서 사용법
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  import { useOutletContext } from 'react-router-dom'
//  const { setAccent, mainRef } = useOutletContext()
//
//  ── MainPage
//  mainRef → Main 스크롤 컨테이너 ref (스크롤 감지용)
//  useEffect(() => {
//    setAccent(SECTION_COLOR[activeSection])
//  }, [activeSection])
//
//  ── ProgramsPage
//  useEffect(() => {
//    setAccent(NIGHT_STYLE[currentNight].color)
//  }, [currentNight])
