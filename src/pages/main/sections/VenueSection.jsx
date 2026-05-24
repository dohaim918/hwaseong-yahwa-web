import { Fragment } from "react"
import { useOutletContext } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, GRADIENT, sectionAccent, revealUp, SECTION_COLOR } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import SectionHeader from "@/components/ui/Sectiontext"
import { GradSpan } from "@/components/ui/GradSpan"
import FullSection from "@/components/layout/FullSection"
import SectionBar from "@/components/ui/SectionBar"
import {
  MapPinIcon,
  ClockIcon,
  TicketIcon,
  SubwayIcon,
  BusIcon,
  CarIcon,
} from "@/components/ui/icons"
import { useResponsive } from "@/hooks/useResponsive"
import { useSectionReveal } from "@/hooks/useSectionReveal"
import venueBg from "@/assets/images/venue/venue-bg.png"

const t = UI_TEXT.venue

const ACCESS_ICONS = { subway: SubwayIcon, bus: BusIcon, car: CarIcon }
const INFO_ICONS = { location: MapPinIcon, hours: ClockIcon, price: TicketIcon }
const CONTENT_W = "550px"

export default function VenueSection() {
  const { setAccent } = useOutletContext()
  const { isMini } = useResponsive()
  const { ref: secRef, animIn } = useSectionReveal({
    onActive: () => setAccent(SECTION_COLOR[2]),
  })

  return (
    <VenueShell ref={secRef}>
      {/* <BgFallback /> */}
      <BgImg src={venueBg} alt="" $animate={animIn} />
      <BgOverlay />
      {/* <TopFade /> */}

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
                <GradSpan g={GRADIENT.amberPink}>{t.h2.line2Grad}</GradSpan>
              </>
            }
            desc={t.desc}
            center
          />

          {/* info 박스 */}
          <InfoBox $animIn={animIn}>
            {Object.entries(t.info).map(([key, item], i, arr) => {
              const Icon = INFO_ICONS[key]
              return (
                <Fragment key={item.label}>
                  <InfoItem>
                    <InfoHead>
                      <Icon size={24} color={T.amber} />
                      <InfoLabel>{item.label}</InfoLabel>
                    </InfoHead>
                    <InfoValue>{isMini ? (item.mini ?? item.value) : item.value}</InfoValue>
                  </InfoItem>
                  {i < arr.length - 1 && <InfoDivider />}
                </Fragment>
              )
            })}
          </InfoBox>

          {/* 오시는 길 */}
          <AccessWrap $animIn={animIn}>
            <AccessHead>
              <AccessTitle>{t.access.title}</AccessTitle>
              <AccessLine />
            </AccessHead>
            <AccessList>
              {t.access.items.map((item, i, arr) => {
                const Icon = ACCESS_ICONS[item.icon]
                return (
                  <Fragment key={item.label}>
                    <AccessItem>
                      <Icon size={32} color={T.amber} />
                      <AccessTxt>
                        <AccessMain data-access-main>{item.label}</AccessMain>
                        <AccessSub>{item.sub}</AccessSub>
                      </AccessTxt>
                    </AccessItem>
                    {i < arr.length - 1 && <AccessDivider />}
                  </Fragment>
                )
              })}
            </AccessList>
          </AccessWrap>
        </ContentRight>
      </ContentArea>
    </VenueShell>
  )
}

// ── 섹션 셸 (FullSection 확장) ─────────────────────────
const VenueShell = styled(FullSection)`
  ${sectionAccent(T.amber)}
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

// ── 추가 배경 레이어 ──────────────────────────────────
// const BgFallback = styled.div`
//   position: absolute;
//   inset: 0;
//   z-index: 0;
//   pointer-events: none;
//   background:
//     radial-gradient(ellipse 60% 50% at 30% 40%, #1a1228 0%, transparent 60%),
//     radial-gradient(ellipse 50% 40% at 70% 70%, #2a1a0a 0%, transparent 55%),
//     linear-gradient(180deg, #0a0815 0%, ${T.bgBase} 100%);
// `

const BgImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  pointer-events: none;
  ${({ $animate }) =>
    $animate
      ? `animation: bgIn 1.4s cubic-bezier(.22,.68,0,1.1) both;`
      : `opacity: 0; transform: scale(1.08);`}
`

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

// const TopFade = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 80px;
//   z-index: 3;
//   pointer-events: none;
//   background: linear-gradient(180deg, ${alpha(T.bgBase, 0.85)} 0%, ${alpha(T.bgBase, 0)} 100%);
// `
// const BgOverlay = styled.div`
//   position: absolute;
//   inset: 0;
//   pointer-events: none;
//   z-index: 2;
//   opacity: 0.6;
//   background: radial-gradient(
//     172.8% 86.4% at 65% 55%,
//     rgba(32, 14, 0, 1) 0%,
//     rgba(16, 8, 0, 1) 45%,
//     ${T.bgBase} 100%
//   );
// `

// ── 콘텐츠 영역 래퍼 ─────────────────────────────────
const ContentArea = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: relative;
  z-index: 10;
  min-height: 0;

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: 1fr;
  }
`

// ── 오른쪽 콘텐츠 컨테이너 ────────────────────────────
const ContentRight = styled.div`
  grid-column: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 ${T.pagePad};

  @media (max-width: ${T.bp.mobile}) {
    grid-column: 1;
    padding-top: ${T.spacing[32]};
    padding-bottom: ${T.spacing[48]};
  }

  @media (max-width: ${T.bp.mini}) {
    padding-top: ${T.spacing[20]};
    padding-bottom: ${T.spacing[32]};
  }
`

// ── info 박스 ──────────────────────────────────────────
const InfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${CONTENT_W};
  padding: ${T.spacing[24]} ${T.spacing[20]};
  border: 1px solid ${alpha(T.amber, 0.2)};
  border-radius: ${T.radius.sm};
  background: ${alpha(T.bgDark, 0.4)};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  ${({ $animIn }) => revealUp($animIn, 0.45)}

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[8]} ${T.spacing[4]};
  }
`

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[16]};
  flex: 1;
  padding: ${T.spacing[4]};
  border-radius: ${T.radius.md};
  @media (max-width: ${T.bp.tablet}) {
    /* padding: ${T.spacing[8]}; */
    gap: ${T.spacing[8]};
  }
`

const InfoHead = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[12]};

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
  }
`

const InfoLabel = styled.span`
  font-size: ${T.fontSize.sm};
  color: ${T.amber};

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`

const InfoValue = styled.div`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${alpha(T.main, 0.72)};
  white-space: nowrap;

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xs};
  }
`

const DividerBase = styled.span`
  display: block;
  width: 1px;
  flex-shrink: 0;
  align-self: center;
`

const InfoDivider = styled(DividerBase)`
  height: 90px;
  background: ${alpha(T.amber, 0.1)};

  @media (max-width: ${T.bp.mini}) {
    height: 80px;
    /* display: none; */
  }
`

// ── 오시는 길 ─────────────────────────────────────────
const AccessWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  gap: ${T.spacing[24]};
  width: 100%;
  max-width: ${CONTENT_W};
  padding-top: ${T.spacing[48]};
  padding-bottom: ${T.spacing[32]};
  ${({ $animIn }) => revealUp($animIn, 0.6)}

  /* @media (max-width: ${T.bp.tablet}) {
    align-items: center;
  } */

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
  display: flex;
  align-items: center;
  gap: ${T.spacing[12]};
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

const AccessLine = styled.span`
  display: block;
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    ${alpha(T.amber, 0.4)} 0%,
    ${alpha(T.amber, 0.21)} 50%,
    transparent 100%
  );
`

const AccessList = styled.div`
  display: flex;
  /* align-items: center; */
  gap: ${T.spacing[8]};
  width: 100%;

  @media (max-width: ${T.bp.mini}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${T.spacing[16]};
  }
`

const AccessItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  flex: 1;
  /* min-width: 0; */
  /* cursor: default; */

  svg {
    opacity: 0.9;
    flex-shrink: 0;
    transition:
      opacity ${T.transition.mid},
      transform ${T.transition.mid};
  }

  &:hover svg {
    opacity: 1;
    transform: translateY(-2px);
  }

  &:hover [data-access-main] {
    color: ${T.amber};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[24]};
    padding: 0 ${T.spacing[8]};
  }
`

const AccessTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[4]};
  /* min-width: 0; */
`

const AccessMain = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 500;
  /* line-height: 1.7; */
  color: ${alpha(T.main, 0.72)};
  transition: color ${T.transition.mid};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

const AccessSub = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  /* line-height: 1.7; */
  color: ${alpha(T.main, 0.4)};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

const AccessDivider = styled(DividerBase)`
  height: 52px;
  background: ${alpha(T.amber, 0.2)};

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`
