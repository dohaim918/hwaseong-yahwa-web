import { Link, useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, GRADIENT, sectionAccent, revealUp, SECTION_COLOR } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { GradSpan } from "@/components/ui/GradSpan"
import SectionHeader from "@/components/ui/Sectiontext"
import Button from "@/components/ui/Button"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { SectionDecoImg } from "@/components/ui/deco"
import { useSectionReveal } from "@/hooks/useSectionReveal"
import { useResponsive } from "@/hooks/useResponsive"
import Footer from "@/components/layout/Footer"
import ctaBg from "@/assets/images/main-cta-bg.png"
import sectionDeco from "@/assets/images/section-deco.png"

const t = UI_TEXT.mainCta

export default function MainCtaSection() {
  const { setAccent } = useOutletContext()
  const { isMini } = useResponsive()
  const { ref: secRef, animIn } = useSectionReveal({
    onActive: () => setAccent(SECTION_COLOR[5]),
  })

  return (
    <Sec ref={secRef}>
      {/* ── CTA 영역 (배경 + 콘텐츠) ── */}
      <CtaWrapper>
        <AnimatedBgImage src={ctaBg} opacity={0.75} animate={animIn} />
        <BgOverlay />
        <BgFade />

        <GlowRose $animIn={animIn} aria-hidden="true" />
        <GlowAmber $animIn={animIn} aria-hidden="true" />
        <CtaDeco src={sectionDeco} alt="" aria-hidden="true" $animIn={animIn} />

        {/* ── CTA 콘텐츠 ── */}
        <CtaArea>
          <Inner>
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
                  <GradSpan g={GRADIENT.amberPink}>
                    {isMini ? t.h2Mini.gradEnd : t.h2.gradEnd}
                  </GradSpan>
                </>
              }
              desc={t.desc}
              center
            />

            <Btns $animIn={animIn}>
              <Button as={Link} to="/programs" variant="gradient" accent={T.pink} size="lg">
                {t.ctaPrimary}
              </Button>
              <Button as={Link} to="/booking" variant="outline" accent={T.pink} size="lg">
                {t.ctaSecondary}
              </Button>
            </Btns>
          </Inner>
        </CtaArea>
      </CtaWrapper>

      {/* ── 푸터 ── */}
      <Footer />
    </Sec>
  )
}

const Sec = styled.section`
  position: relative;
  overflow: clip;
  min-height: 100dvh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-inline: calc(-1 * ${T.pagePad});
  ${sectionAccent(T.pink)}
`

const CtaWrapper = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${T.bgBase};
`

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

// 하단 엣지 페이드
const BgFade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  background: linear-gradient(180deg, transparent 88%, ${alpha(T.bgBase, 0.6)} 100%);
`

// 글로우 공통 베이스 — 위치·색상만 하위에서 오버라이드
const Glow = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 3;
  opacity: ${({ $animIn }) => ($animIn ? 1 : 0)};
  transition: opacity ${T.transition.bgReveal};

  @media (max-width: ${T.bp.tablet}) {
    display: none;
  }
`

const GlowRose = styled(Glow)`
  left: 6%;
  top: 8%;
  width: clamp(180px, 22.7vw, 436px);
  height: clamp(200px, 25vw, 481px);
  background: radial-gradient(ellipse at center, ${alpha(T.pink, 0.06)} 0%, transparent 65%);
`

const GlowAmber = styled(Glow)`
  right: 2%;
  top: 40%;
  width: clamp(180px, 24.5vw, 471px);
  height: clamp(200px, 27vw, 519px);
  background: radial-gradient(ellipse at center, ${alpha(T.amber, 0.04)} 0%, transparent 65%);
`

// transform에 scaleY(-1)이 있어 revealUp 대신 베이스의 opacity transition 사용
const CtaDeco = styled(SectionDecoImg)`
  top: ${T.navHeight};
  transform: translateX(-50%) scaleY(-1);

  @media (max-width: ${T.bp.mini}) {
    top: ${T.navHeightMini};
  }
`

const CtaArea = styled.div`
  position: relative;
  z-index: 5;
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${T.navHeight} ${T.pagePad} ${T.spacing[42]};
  border-top: 1px solid ${alpha(T.pink, 0.15)};

  @media (max-width: ${T.bp.tablet}) {
    padding-top: calc(${T.navHeight} + ${T.spacing[20]});
    padding-bottom: ${T.spacing[36]};
  }

  @media (max-width: ${T.bp.mobile}) {
    padding-top: calc(${T.navHeight} + ${T.spacing[16]});
    padding-bottom: ${T.spacing[32]};
  }

  @media (max-width: ${T.bp.mini}) {
    padding-top: calc(${T.navHeightMini} + ${T.spacing[12]});
    padding-bottom: ${T.spacing[24]};
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[8]};
  width: 100%;
  max-width: 720px;

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[4]};
  }
`

const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[24]};
  padding-top: ${T.spacing[32]};
  ${({ $animIn }) => revealUp($animIn, 0.38)}

  @media (max-width: ${T.bp.tablet}) {
    padding-top: ${T.spacing[24]};
  }

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[12]};
    padding-top: ${T.spacing[20]};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[8]};
    padding-top: ${T.spacing[16]};
  }
`
