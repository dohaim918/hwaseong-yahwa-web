// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ProgramsPage  —  4야 전환형 셸
//  ────────────────────────────────────────────────────────────
//  책임:
//    1. URL(?night=1~4)과 currentId 양방향 sync
//    2. 야 전환 시 setAccent + 맨 위로 스크롤
//    3. 배너 가시성 추적 → NightTabBar 노출 토글
//
//  자식 섹션은 currentId만 받아서 nightData 헬퍼로 자기 데이터를 가져옴.
//  탭바·배너 외 모든 시각 요소는 이 파일에 두지 않는다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useRef, useState, useCallback } from "react"
import { useSearchParams, useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, NIGHT_STYLE } from "@/styles/theme"
import { NIGHTS } from "@/data/nightData"
import NightTabBar from "@/pages/programs/NightTabBar"
import BannerSection from "@/pages/programs/sections/BannerSection"

const VALID_IDS = [1, 2, 3, 4]
const DEFAULT_ID = 1

export default function ProgramsPage() {
  const { setAccent, mainRef } = useOutletContext()
  const [searchParams, setSearchParams] = useSearchParams()

  // ── URL → currentId (1~4 외엔 DEFAULT_ID로 fallback)
  const urlNight = parseInt(searchParams.get("night"), 10)
  const currentId = VALID_IDS.includes(urlNight) ? urlNight : DEFAULT_ID

  // ── 배너 가시성 (탭바 노출 트리거)
  const [bannerVisible, setBannerVisible] = useState(true)
  const bannerRef = useRef(null)

  // ── accent 동기화 (NavBar·탭바·전역 accent)
  useEffect(() => {
    setAccent(NIGHT_STYLE[currentId].color)
  }, [currentId, setAccent])

  // ── 배너 50% 이상 보일 때 탭바 숨김
  //    배너는 더 이상 remount되지 않으므로(아래 key 제거) observer는 1회만 연결.
  useEffect(() => {
    const root = mainRef.current
    const target = bannerRef.current
    if (!root || !target) return

    const observer = new IntersectionObserver(
      ([entry]) => setBannerVisible(entry.intersectionRatio > 0.5),
      { root, threshold: [0.5] }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [mainRef])

  // ── 야 전환: URL 갱신 + 맨 위로 (범위 밖·동일 야는 무시)
  const handleSelectNight = useCallback(
    (id) => {
      if (!VALID_IDS.includes(id) || id === currentId) return
      const nextSearchParams = new URLSearchParams(searchParams)
      nextSearchParams.set("night", String(id))
      setSearchParams(nextSearchParams, { replace: false })
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    },
    [currentId, searchParams, setSearchParams, mainRef]
  )

  return (
    <>
      <NightTabBar
        nights={NIGHTS}
        currentId={currentId}
        onSelect={handleSelectNight}
        visible={!bannerVisible}
      />

      {/* ── 1. 배너 섹션 (remount 없이 night prop만 갱신) ── */}
      <BannerSection
        ref={bannerRef}
        night={NIGHTS[currentId - 1]}
        nights={NIGHTS}
        onSelect={handleSelectNight}
      />

      {/* ── 2~4. 나머지 섹션 (이후 단계에서 실제 컴포넌트로 교체) ── */}
      <PHSection aria-label="EXPERIENCE (작업 중)">
        <PHInner>
          <PHTag>2 · EXPERIENCE</PHTag>
          <PHDesc>이 밤에서 만나는 특별한 경험</PHDesc>
        </PHInner>
      </PHSection>

      <PHSection aria-label="FLOW OF NIGHT (작업 중)">
        <PHInner>
          <PHTag>3 · FLOW OF NIGHT</PHTag>
          <PHDesc>{NIGHTS[currentId - 1].flowOfNight.h2}</PHDesc>
        </PHInner>
      </PHSection>

      <PHSection aria-label="FINAL INVITATION (작업 중)">
        <PHInner>
          <PHTag>4 · FINAL INVITATION</PHTag>
          <PHDesc>화성의 밤, 지금 만나보세요</PHDesc>
        </PHInner>
      </PHSection>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
//  Placeholder Section — 이후 단계에서 실제 섹션 컴포넌트로 교체
//  FullSection과 동일한 100vh + scroll-snap 동작을 흉내.
//  (Main에 좌우 padding이 없으므로 margin-inline 트릭 불필요 — 자연 풀너비)
// ─────────────────────────────────────────────────────────────

const PHSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  flex-shrink: 0;
  background: linear-gradient(180deg, ${T.bgBase} 0%, ${T.bgCard} 50%, ${T.bgBase} 100%);

  @media (max-width: ${T.bp.mobile}) {
    height: 100dvh;
    min-height: 600px;
  }
`

const PHInner = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[16]};
`

const PHTag = styled.span`
  font-family: ${T.fontMono};
  font-size: ${T.fontSize.xs};
  letter-spacing: 0.3em;
  color: ${T.sub};
`

const PHDesc = styled.p`
  font-size: ${T.fontSize.md};
  color: ${T.sub};
`
