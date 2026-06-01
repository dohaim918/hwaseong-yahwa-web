import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, GRADIENT, revealUp, glass, glow } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import SectionHeader from "@/components/ui/SectionHeader"
import FullSection from "@/components/layout/FullSection"
import Button from "@/components/ui/Button"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { EdgeFade, GradSpan } from "@/components/ui/Deco"
import { useCounter } from "@/hooks/useCounter"
import { useMvpModal } from "@/components/ui/MvpModal"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import aboutBg from "@/assets/images/about/about-bg.webp"

const t = UI_TEXT.about

function AboutStatCard({ stat, active }) {
  // colorKey 가 theme 토큰에 없으면 emerald 로 fallback
  const color = T[stat.colorKey] ?? T.emerald
  const count = useCounter(stat.value, stat.lockDelay ?? 1800, active)

  return (
    <StatCell $color={color}>
      <StatLabel>{stat.label}</StatLabel>
      <StatNum>
        <NumVal $color={color}>{count}</NumVal>
        <NumUnit $color={color}>{stat.unit}</NumUnit>
      </StatNum>
    </StatCell>
  )
}

export default function AboutSection() {
  const mvpModal = useMvpModal()
  const { ref: secRef, animIn } = useSectionAccent(3)

  return (
    <AbShell ref={secRef} accent={T.emerald}>
      <AnimatedBgImage src={aboutBg} opacity={0.5} animate={animIn} />
      <EdgeFade side="top" size="clamp(200px, 40vh, 372px)" opacity={1} z={3} />

      <ContentArea>
        <SectionHeader
          animIn={animIn}
          animDelay={0.3}
          label={t.sectionLabel}
          labelAccent={T.emerald}
          title={
            <>
              {t.h2.line1}
              <br />
              <GradSpan $g={GRADIENT.emeraldAmber}>{t.h2.line2Grad}</GradSpan>
            </>
          }
          desc={t.desc}
          center
        />

        <StatsBox $animIn={animIn}>
          {t.stats.map((s) => (
            <AboutStatCard key={s.label} stat={s} active={animIn} />
          ))}
        </StatsBox>

        <BtnsRow $animIn={animIn}>
          <Button as={Link} to="/programs" variant="gradient" accent={T.emerald}>
            {t.ctaPrimary}
          </Button>
          <Button variant="outline" accent={T.emerald} onClick={() => mvpModal.open(T.emerald)}>
            {t.ctaSecondary}
          </Button>
        </BtnsRow>
      </ContentArea>
    </AbShell>
  )
}

// ── 섹션 셸 ───────────────────────────────────────────
const AbShell = styled(FullSection)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

// ── 콘텐츠 영역 ───────────────────────────────────────
const ContentArea = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 960px;
  padding: 0 ${T.pagePad};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[8]};

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[4]};
  }
`

// ── stats 그리드 ──────────────────────────────────────
const StatsBox = styled.dl`
  width: 100%;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border: 1px solid ${alpha(T.muted, 0.2)};
  border-radius: ${T.radius.card};
  overflow: hidden;
  background: ${alpha(T.muted, 0.1)};
  ${glass("6px")}
  ${({ $animIn }) => revealUp($animIn, 0.45)}

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const StatCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[8]};
  padding: ${T.spacing[36]} ${T.spacing[24]};
  overflow: hidden;
  background-color: ${alpha(T.white, 0.02)};
  background-image: ${({ $color }) => glow($color, { opacity: 0.05, shape: "ellipse at 50% 100%" })};

  &:nth-of-type(even) {
    background-color: ${alpha(T.white, 0.01)};
  }
  &:not(:last-of-type) {
    border-right: 1px solid ${alpha(T.muted, 0.2)};
  }

  @media (max-width: ${T.bp.mobile}) {
    padding: ${T.spacing[24]} ${T.spacing[12]};

    &:nth-of-type(2) {
      border-right: none;
    }
    &:nth-of-type(1),
    &:nth-of-type(2) {
      border-bottom: 1px solid ${alpha(T.muted, 0.2)};
    }
  }

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[20]} ${T.spacing[8]};
    gap: ${T.spacing[6]};
  }
`

const StatNum = styled.dd`
  order: 1;
  margin: 0;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
`

const NumVal = styled.span`
  font-family: ${T.fontSerif};
  font-variant-numeric: tabular-nums;
  font-size: clamp(28px, calc(2vw + 16px), 44px);
  font-weight: 900;
  line-height: 1;
  color: ${({ $color }) => $color};
`

const NumUnit = styled.span`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.md};
  font-weight: 500;
  line-height: 1;
  color: ${({ $color }) => $color};

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.sm};
  }
`

const StatLabel = styled.dt`
  order: 2;
  font-size: ${T.fontSize.xxs};
  font-weight: 400;
  letter-spacing: 1px;
  text-align: center;
  color: ${alpha(T.sub, 0.6)};
`

// ── 버튼 행 ───────────────────────────────────────────
const BtnsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[24]};
  padding-top: ${T.spacing[32]};
  ${({ $animIn }) => revealUp($animIn, 0.6)}

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
    padding-top: ${T.spacing[20]};
  }
`
