// 메인·프로그램 마지막 CTA + Footer 공용 골격.

import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { glow, revealUp, flexCol, flexRow } from "@/styles/mixins"
import { EdgeFade } from "@/components/ui/Deco"
import Button from "@/components/ui/Button"
import Footer from "@/components/layout/Footer"
import { ColumnSection } from "@/components/layout/FullSection"
import { ArrowRightIcon } from "@/components/ui/icons"

export default function CtaSection({
  secRef,
  accent,
  animIn,
  bg = T.bgDark,
  bgImage,
  overlay,
  deco,
  maxWidth = "720px",
  tabBar = false,
  borderTop = false,
  footerAccent,
  header,
  primaryAction,
  primaryLabel,
  secondaryAction,
  secondaryLabel,
  belowButtons,
}) {
  return (
    <ColumnSection ref={secRef} accent={accent}>
      <CtaWrapper $bg={bg}>
        {bgImage}
        {overlay}
        <EdgeFade side="bottom" size="12%" opacity={0.6} z={4} />

        <GlowRose $accent={accent} $animIn={animIn} aria-hidden="true" />
        <GlowAmber $animIn={animIn} aria-hidden="true" />
        {deco}

        <CtaArea $accent={accent} $tabBar={tabBar} $borderTop={borderTop}>
          <Inner $maxWidth={maxWidth}>
            {header}

            <Btns $animIn={animIn}>
              <Button {...primaryAction} accent={accent} variant="gradient" size="lg">
                {primaryLabel}
              </Button>
              <Button {...secondaryAction} accent={accent} variant="outline" size="lg">
                {secondaryLabel}
                <ArrowRightIcon size={17} />
              </Button>
            </Btns>

            {belowButtons}
          </Inner>
        </CtaArea>
      </CtaWrapper>

      <Footer accent={footerAccent} />
    </ColumnSection>
  )
}

// 고정 100dvh — 형제 섹션과 동일한 스냅 단위. CTA(flex:1) + Footer 하단 고정.
const CtaWrapper = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  ${flexCol()}
  overflow: hidden;
  background: ${({ $bg }) => $bg};
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
  background: ${({ $accent }) => glow($accent, { opacity: 0.06, stop: 65 })};
`

const GlowAmber = styled(Glow)`
  right: 2%;
  top: 40%;
  width: clamp(180px, 24.5vw, 471px);
  height: clamp(200px, 27vw, 519px);
  background: ${glow(T.amber, { opacity: 0.04, stop: 65 })};
`

// CtaArea 패딩 — 상단 fixed UI(nav/tab)만 피하고, 좌우는 pagePad 토큰으로 통일.
const ctaPadTop = (tab, mini = false) =>
  tab
    ? `calc(${mini ? T.navHeightMini : T.navHeight} + ${mini ? T.tabNavHeightMini : T.tabNavHeight})`
    : mini
      ? T.navHeightMini
      : T.navHeight

const CtaArea = styled.div`
  position: relative;
  z-index: 5;
  flex: 1;
  min-height: 0;
  ${flexRow()}
  justify-content: center;
  padding: ${({ $tabBar }) => `${ctaPadTop($tabBar)} ${T.pagePad} 0`};
  ${({ $borderTop, $accent }) => ($borderTop ? `border-top: 1px solid ${alpha($accent, 0.15)};` : "")}

  @media (max-width: ${T.bp.mini}) {
    padding: ${({ $tabBar }) => `${ctaPadTop($tabBar, true)} ${T.pagePad} 0`};
  }
`

const Inner = styled.div`
  ${flexCol(`clamp(${T.spacing[4]}, 0.8vh, ${T.spacing[8]})`)}
  align-items: center;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth};
`

const Btns = styled.div`
  ${flexRow(T.spacing[24])}
  justify-content: center;
  padding-top: clamp(${T.spacing[16]}, 2.5vh, ${T.spacing[32]});
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
