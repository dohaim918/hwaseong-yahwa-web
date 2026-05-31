import styled from "@emotion/styled"
import { T, GRADIENT, sectionAccent } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import FullSection from "@/components/layout/FullSection"
import SectionBar from "@/components/ui/SectionBar"
import SectionHeader from "@/components/ui/SectionHeader"
import SectionTicker from "@/components/ui/SectionTicker"
import { useMvpModal } from "@/components/ui/MvpModal"
import { useResponsive } from "@/hooks/useResponsive"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import GalleryStage from "./GalleryStage"

import { EdgeFade, GradSpan, SectionDecoImg } from "@/components/ui/Deco"
import sectionDeco from "@/assets/images/section-deco.png"
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
]

const t = UI_TEXT.gallery

export default function GallerySection() {
  const { isSmall } = useResponsive()
  const mvpModal = useMvpModal()
  const { ref: secRef, inView, animIn } = useSectionAccent(4)

  return (
    <GalleryShell ref={secRef}>
      {/* 배경 레이어 */}
      <BgGrad />
      <EdgeFade side="top" size="clamp(200px, 30vh, 320px)" opacity={0.85} z={1} />
      <EdgeFade side="bottom" size="clamp(120px, 18vh, 189px)" opacity={0.9} z={1} />
      {/* 좌우 edge fade — side thumb 위에 올라와야 해서 z=6 */}
      <EdgeFade side="left" opacity={0.75} z={6} />
      <EdgeFade side="right" opacity={0.75} z={6} />

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
              <GradSpan $g={GRADIENT.violetPink}>{t.h2.gradEnd}</GradSpan>
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
          onViewScene={() => mvpModal.open(T.violet)}
        />
      </Inner>

      {/* 하단 데코 이미지 */}
      <DecoImg src={sectionDeco} alt="" aria-hidden="true" $animIn={animIn} />

      {/* 하단 티커 */}
      <SectionTicker text={isSmall ? t.tickerMobile : t.ticker} color={T.violet} animIn={animIn} />
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
const DecoImg = styled(SectionDecoImg)`
  bottom: 0;
  transform: translateX(-50%);
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
