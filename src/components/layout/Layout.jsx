// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NavBar accent 상태를 모든 페이지와 공유
//  useOutletContext로 각 페이지에서 set 함수 호출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//
//  mainRef — Main 스크롤 컨테이너 DOM ref
//  MainPage는 현재 IntersectionObserver 기반이라 사용 안 하지만,
//  ProgramsPage에서 야별 전환 시 scrollTo(0) 또는 특정 섹션 스크롤이
//  필요할 수 있으므로 OutletContext에 유지해 둔다.

import { useState, useRef, Suspense, useLayoutEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import styled from "@emotion/styled"
import NavBar from "@/components/layout/NavBar"
import CustomCursor from "@/components/ui/CustomCursor"
import RouteLoader from "@/components/ui/RouteLoader"
import { MvpModalProvider } from "@/components/ui/MvpModal"
import { T, focusRing } from "@/styles/theme"

export default function Layout() {
  const [accent, setAccent] = useState(T.pink)
  const mainRef = useRef(null)
  const { pathname } = useLocation()

  // 라우트가 바뀌어도 Main 스크롤 컨테이너는 유지된다.
  // 그래서 /programs → / → /programs 이동 시 이전 섹션 위치가 남지 않도록 pathname 변경 때만 초기화한다.
  useLayoutEffect(() => {
    const main = mainRef.current
    if (!main) return
    main.scrollTop = 0
  }, [pathname])

  return (
    <MvpModalProvider>
      <SkipLink href="#main-content">본문 바로가기</SkipLink>
      <CustomCursor accent={accent} />
      <NavBar accent={accent} />
      <Main ref={mainRef} id="main-content" tabIndex="-1">
        {/* 페이지 lazy 로딩은 여기서만 일어나도록 — Layout (NavBar/Cursor) 은 항상 마운트 유지 */}
        <Suspense fallback={<RouteLoader />}>
          <Outlet context={{ setAccent, mainRef }} />
        </Suspense>
      </Main>
    </MvpModalProvider>
  )
}

// ── Main 은 풀너비 스크롤 컨테이너
//    좌우 패딩은 각 섹션 안의 콘텐츠 래퍼가 ${T.pagePad} 로 책임진다.
//    (예전엔 Main 에 padding 을 줬다가 각 섹션이 음수 마진으로 빠져나오는
//     이중 부정 패턴이었음 — 현재는 자연스럽게 풀너비)
const Main = styled.main`
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  &:focus {
    outline: none;
  }
`

// ── Skip-to-content
//    기본 상태는 화면 밖. 키보드 포커스(Tab) 시에만 좌상단으로 등장.
const SkipLink = styled.a`
  position: fixed;
  top: ${T.spacing[12]};
  left: ${T.spacing[12]};
  z-index: 1000;
  padding: ${T.spacing[8]} ${T.spacing[16]};
  background: ${T.bgCard};
  color: ${T.main};
  border: 1px solid ${T.pink};
  border-radius: ${T.radius.sm};
  font-size: ${T.fontSize.xs};
  font-weight: 700;
  text-decoration: none;
  transform: translateY(-200%);
  transition: transform ${T.transition.fast};

  &:focus-visible {
    transform: translateY(0);
  }
  ${focusRing(T.pink)}
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
