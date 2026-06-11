import styled from "@emotion/styled"
import { T, alpha, GRADIENT, revealUp, glass, flexCol, flexRow } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import SectionHeader from "@/components/ui/SectionHeader"
import FullSection from "@/components/layout/FullSection"
import SectionBar from "@/components/ui/SectionBar"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { VenueAccessItem, VenueInfoItem } from "@/pages/main/sections/venue/VenueItems"
import { GradSpan, GradLine } from "@/components/ui/Deco"
import { useResponsive } from "@/hooks/useResponsive"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import venueBg from "@/assets/images/venue/venue-bg.webp"

const t = UI_TEXT.venue

export default function VenueSection() {
  const { isMini } = useResponsive()
  const { ref: secRef, animIn } = useSectionAccent(2)

  return (
    <VenueShell ref={secRef} accent={T.amber}>
      <AnimatedBgImage src={venueBg} opacity={0.8} animate={animIn} />
      <BgOverlay />

      {/* 상단 바 */}
      <SectionBar
        label={t.sectionLabel}
        sub={t.sectionSub}
        link={t.guideLink}
        color={T.amber}
        visible={animIn}
      />

      {/* 오른쪽 콘텐츠 */}
      <ContentArea>
        <ContentRight>
          {/* THE NIGHT PATH + h2 + desc */}
          <SectionHeader
            animIn={animIn}
            animDelay={0.3}
            label={t.subLabel}
            labelAccent={T.amber}
            title={
              <>
                {t.h2.line1}
                <br />
                <GradSpan $g={GRADIENT.amberPink}>{t.h2.line2Grad}</GradSpan>
              </>
            }
            desc={t.desc}
            center
          />

          {/* info 박스 */}
          <InfoBox $animIn={animIn}>
            {Object.entries(t.info).map(([key, item]) => (
              <VenueInfoItem key={item.label} item={item} iconKey={key} compact={isMini} />
            ))}
          </InfoBox>

          {/* 오시는 길 */}
          <AccessWrap $animIn={animIn}>
            <AccessHead>
              <AccessTitle>{t.access.title}</AccessTitle>
              <GradLine $color={alpha(T.amber, 0.4)} $dir="right" />
            </AccessHead>
            <AccessList>
              {t.access.items.map((item) => (
                <VenueAccessItem key={item.label} item={item} />
              ))}
            </AccessList>
          </AccessWrap>
        </ContentRight>
      </ContentArea>
    </VenueShell>
  )
}

// ── 섹션 셸 (FullSection 확장) ─────────────────────────
const VenueShell = styled(FullSection)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

// ── 추가 배경 레이어 ──────────────────────────────────
const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  opacity: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    ${alpha(T.bgBase, 0.4)} 45%,
    ${alpha(T.bgBase, 0.88)} 80%,
    ${T.bgBase} 100%
  );

  @media (max-width: ${T.bp.mobile}) {
    opacity: 1;
  }
`

// ── 콘텐츠 영역 래퍼 ─────────────────────────────────
const ContentArea = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: relative;
  z-index: 10;
  min-height: 0;
  padding: 0 ${T.pagePad};

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: 1fr;
  }
`

// ── 오른쪽 콘텐츠 컨테이너 ────────────────────────────
const ContentRight = styled.div`
  grid-column: 2;
  position: relative;
  ${flexCol()}
  align-items: center;
  justify-content: center;

  @media (max-width: ${T.bp.mobile}) {
    grid-column: 1;
    padding-block: ${T.spacing[32]} ${T.spacing[48]};
  }

  @media (max-width: ${T.bp.mini}) {
    padding-block: ${T.spacing[20]} ${T.spacing[32]};
  }
`

// ── info 박스 ──────────────────────────────────────────
const InfoBox = styled.dl`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${T.contentW};
  margin: 0;
  padding: ${T.spacing[24]} ${T.spacing[20]};
  border: 1px solid ${alpha(T.amber, 0.2)};
  border-radius: ${T.radius.sm};
  background: ${alpha(T.bgDark, 0.4)};
  ${glass("8px")}
  ${({ $animIn }) => revealUp($animIn, 0.45)}

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[8]} ${T.spacing[4]};
  }
`

// ── 오시는 길 ─────────────────────────────────────────
const AccessWrap = styled.div`
  ${flexCol(T.spacing[24])}
  width: 100%;
  max-width: ${T.contentW};
  padding-block: ${T.spacing[48]} ${T.spacing[32]};
  ${({ $animIn }) => revealUp($animIn, 0.6)}

  @media (max-width: ${T.bp.mobile}) {
    padding-top: ${T.spacing[32]};
    gap: ${T.spacing[16]};
  }

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[24]} ${T.spacing[12]};
    gap: ${T.spacing[12]};
  }
`

const AccessHead = styled.div`
  ${flexRow(T.spacing[12])}
  width: 100%;
`

const AccessTitle = styled.span`
  font-size: ${T.fontSize.sm};
  color: ${alpha(T.amber, 0.6)};
  letter-spacing: 2px;
  white-space: nowrap;

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 1.5px;
  }
`

const AccessList = styled.ul`
  display: flex;
  gap: ${T.spacing[8]};
  width: 100%;

  @media (max-width: ${T.bp.mini}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${T.spacing[16]};
  }
`
