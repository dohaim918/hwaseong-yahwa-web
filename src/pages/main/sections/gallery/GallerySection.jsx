import { useState } from "react"
import styled from "@emotion/styled"
import { useOutletContext } from "react-router-dom"
import { T, alpha, GRADIENT, sectionAccent, SECTION_COLOR } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import FullSection from "@/components/layout/FullSection"
import SectionBar from "@/components/ui/SectionBar"
import SectionHeader from "@/components/ui/Sectiontext"
import SectionTicker from "@/components/ui/SectionTicker"
import MvpModal from "@/components/ui/MvpModal"
import { GradSpan } from "@/components/ui/GradSpan"
import { useResponsive } from "@/hooks/useResponsive"
import { useSectionReveal } from "@/hooks/useSectionReveal"
import GalleryStage from "./GalleryStage"

import galleryDeco from "@/assets/images/gallery/gallery-deco.png"
import g1 from "@/assets/images/gallery/gallery1.png"
import g2 from "@/assets/images/gallery/gallery2.png"
import g3 from "@/assets/images/gallery/gallery3.png"
import g4 from "@/assets/images/gallery/gallery4.png"
import g5 from "@/assets/images/gallery/gallery5.png"
import g6 from "@/assets/images/gallery/gallery6.png"
import g7 from "@/assets/images/gallery/gallery7.png"

const GALLERY_IMAGES = [
  { src: g1, alt: "화성야화 — 성벽 야경" },
  { src: g2, alt: "화성야화 — 불빛 산책로" },
  { src: g3, alt: "화성야화 — 미디어아트" },
  { src: g4, alt: "화성야화 — 공연 장면" },
  { src: g5, alt: "화성야화 — 달빛 풍경" },
  { src: g6, alt: "화성야화 — 빛의 흔적" },
  { src: g7, alt: "화성야화 — 성곽 야경" },
  // { src: g8, alt: "화성야화 — 야간 풍경" },
  // { src: g9, alt: "화성야화 — 조명 장면" },
  // { src: g10, alt: "화성야화 — 화성 전경" },
  // { src: g11, alt: "화성야화 — 축제 장면" },
]

const t = UI_TEXT.gallery

export default function GallerySection() {
  const { setAccent } = useOutletContext()
  const { isMobileOrSmaller } = useResponsive()
  const { ref: secRef, inView, animIn } = useSectionReveal({
    onActive: () => setAccent(SECTION_COLOR[4]),
  })

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <GalleryShell ref={secRef}>
      {/* 배경 레이어 */}
      <BgGrad />
      <TopFade />
      <BottomEdgeFade />
      {/* edge fade는 side thumb 위에 올라와야 해서 Inner보다 높은 z-index */}
      <EdgeFade $side="left" />
      <EdgeFade $side="right" />

      {/* 상단 바 */}
      <SectionBar
        label={t.sectionLabel}
        sub={t.sectionSub}
        link={t.allLink}
        color={T.violet}
        visible={animIn}
      />

      {/* 콘텐츠 */}
      <Inner>
        <SectionHeader
          label={t.subLabel}
          labelAccent={T.violet}
          title={
            <>
              {t.h2.gradStart}
              <GradSpan g={GRADIENT.violetPink}>{t.h2.gradEnd}</GradSpan>
            </>
          }
          desc={t.desc}
          center
          animIn={animIn}
          animDelay={0.3}
          pb="0"
        />

        <GalleryStage
          images={GALLERY_IMAGES}
          animIn={animIn}
          inView={inView}
          viewSceneLabel={t.viewScene}
          onViewScene={() => setModalOpen(true)}
        />
      </Inner>

      {/* 하단 데코 이미지 */}
      <DecoImg src={galleryDeco} alt="" aria-hidden="true" />

      {/* 하단 티커 */}
      <SectionTicker
        text={isMobileOrSmaller ? t.tickerMobile : t.ticker}
        color={T.violet}
        animIn={animIn}
      />

      <MvpModal open={modalOpen} onClose={() => setModalOpen(false)} accent={T.violet} />
    </GalleryShell>
  )
}

const GalleryShell = styled(FullSection)`
  ${sectionAccent(T.violet)}
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 0;
  overflow: hidden;
`

// ── 하단 데코 이미지 (티커 배경 연꽃 문양)
const DecoImg = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(280px, 43.75vw, 420px);
  height: auto;
  pointer-events: none;
  z-index: 4;
  opacity: 0.6;
  mix-blend-mode: soft-light;
`

// ── 배경 레이어
const BgGrad = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(108% 108% at 50% 50%, #160c2e 0%, #0c0818 40%, ${T.bgBase} 100%),
    linear-gradient(180deg, #0d0820 0%, #080d1a 100%);
`

const TopFade = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: clamp(200px, 30vh, 320px);
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to bottom, ${alpha(T.bgBase, 0.85)} 0%, transparent 100%);
`

const BottomEdgeFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: clamp(120px, 18vh, 189px);
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to top, ${alpha(T.bgBase, 0.9)} 52%, transparent 100%);
`

// edge fade는 사이드 썸네일 위에만 덮이고 중앙 카드는 가리지 않게 조절
const EdgeFade = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(60px, 16vw, 300px);
  z-index: 6;
  pointer-events: none;
  ${({ $side }) =>
    $side === "left"
      ? `left: 0; background: linear-gradient(to right, ${alpha(T.bgBase, 0.75)} 0%, transparent 100%);`
      : `right: 0; background: linear-gradient(to left, ${alpha(T.bgBase, 0.75)} 0%, transparent 100%);`}
`

// ── 콘텐츠 Inner (z-index 없음 — stacking context 만들지 않아야 edge fade가 SideThumb 위에 올라옴)
const Inner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(${T.spacing[20]}, 3.2vh, ${T.spacing[32]});
  flex: 1;
  padding: clamp(${T.spacing[20]}, 3.2vh, ${T.spacing[32]}) 0;
  min-height: 0;

  @media (max-height: 820px) and (min-width: ${T.bp.mobile}) {
    gap: ${T.spacing[20]};
    padding: ${T.spacing[20]} 0;
  }
`
