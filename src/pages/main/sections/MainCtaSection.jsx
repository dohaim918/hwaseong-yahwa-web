import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, GRADIENT } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { GradSpan, SectionDecoImg } from "@/components/ui/Deco"
import SectionHeader from "@/components/ui/SectionHeader"
import CtaSection from "@/components/layout/CtaSection"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import { useResponsive } from "@/hooks/useResponsive"
import sectionDeco from "@/assets/images/section-deco.webp"
import ctaBg from "@/assets/images/main-cta-bg.webp"

const t = UI_TEXT.mainCta

export default function MainCtaSection() {
  const { isMini } = useResponsive()
  const { ref: secRef, animIn } = useSectionAccent(5)

  return (
    <CtaSection
      secRef={secRef}
      accent={T.pink}
      animIn={animIn}
      bg={T.bgBase}
      bgImage={<AnimatedBgImage src={ctaBg} opacity={0.75} animate={animIn} />}
      maxWidth="720px"
      borderTop
      overlay={<BgOverlay />}
      deco={<CtaDeco src={sectionDeco} alt="" aria-hidden="true" $animIn={animIn} />}
      header={
        <SectionHeader
          label={t.sectionLabel}
          labelAccent={T.pink}
          gap={T.spacing[12]}
          pb="0"
          animIn={animIn}
          animDelay={0.05}
          title={
            <>
              {isMini ? t.h2Mini.gradStart : t.h2.gradStart}
              <GradSpan $g={GRADIENT.amberPink}>
                {isMini ? t.h2Mini.gradEnd : t.h2.gradEnd}
              </GradSpan>
            </>
          }
          desc={t.desc}
          center
        />
      }
      primaryAction={{ as: Link, to: "/programs" }}
      primaryLabel={t.ctaPrimary}
      secondaryAction={{ as: Link, to: "/booking" }}
      secondaryLabel={t.ctaSecondary}
    />
  )
}

// 이미지 위 컬러 오버레이 (violet·pink tint)
const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(ellipse 70% 50% at 50% 30%, ${alpha(T.violetDark, 0.5)} 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 20% 70%, ${alpha(T.pinkDark, 0.3)} 0%, transparent 55%);
`

// transform에 scaleY(-1)이 있어 revealUp 대신 베이스의 opacity transition 사용
const CtaDeco = styled(SectionDecoImg)`
  top: ${T.navHeight};
  transform: translateX(-50%) scaleY(-1);

  @media (max-width: ${T.bp.mini}) {
    top: ${T.navHeightMini};
  }
`
