import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, accentFill, accentLine } from "@/styles/theme"
import { flexCol, flexRow, focusRing, glass, hoverLastIconX } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import BrandLogo from "@/components/ui/BrandLogo"
import Button from "@/components/ui/Button"
import { SrOnly } from "@/components/ui/Deco"
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, ChevronIcon } from "@/components/ui/icons"
import { useMediaQuery } from "@/hooks/useResponsive"

const t = UI_TEXT.booking
const STEPS = t.steps

// 헤더·푸터 공통 바 — 보더는 갖지 않는다(진행바 IndicatorWrap 이 위아래 보더 담당)
const chromeBar = `
  flex-shrink: 0;
  height: ${T.navHeight};
  padding: 0 ${T.pagePad};
  ${flexRow()}
  justify-content: space-between;
  background: ${alpha(T.bgBase, 0.96)};
  ${glass("18px")}
  z-index: 20;

  @media (max-width: ${T.bp.mini}) {
    height: ${T.navHeightMini};
  }
`

export function BookingHeader({ accent = T.pink }) {
  return (
    <HeaderBar>
      <Home to="/" aria-label={t.header.homeAria}>
        <BrandLogo />
      </Home>

      <BackBtn to={t.header.backTo} $accent={accent}>
        <span>{t.header.backLabel}</span>
        <ChevronIcon size={15} dir="right" />
      </BackBtn>
    </HeaderBar>
  )
}

const HeaderBar = styled.header`
  ${chromeBar}
`

const Home = styled(Link)`
  display: inline-flex;
  align-items: center;
  transition: opacity ${T.transition.fast};
`

const BackBtn = styled(Link, {
  shouldForwardProp: (prop) => !String(prop).startsWith("$"),
})`
  ${flexRow(T.spacing[6])}
  padding: ${T.spacing[8]} ${T.spacing[12]} ${T.spacing[8]} ${T.spacing[16]};
  border: 1px solid ${alpha(T.white, 0.12)};
  border-radius: ${T.radius.pill};
  background: ${alpha(T.white, 0.04)};
  color: ${T.sub};
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
  transition:
    color ${T.transition.fast},
    border-color ${T.transition.fast},
    background ${T.transition.fast};

  &:hover {
    color: ${({ $accent }) => $accent};
    border-color: ${({ $accent }) => alpha($accent, 0.5)};
    background: ${({ $accent }) => accentFill($accent)};
  }

  ${hoverLastIconX()}
  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.pill)}
`

export function StepIndicator({ current, maxStep = current, accent = T.pink, onSelect }) {
  const isMini = useMediaQuery(`(max-width: ${T.bp.mini})`)
  return (
    <>
      <SrOnly aria-live="polite">
        {`전체 ${STEPS.length}단계 중 ${current}단계, ${STEPS[current - 1]}`}
      </SrOnly>
      <IndicatorWrap>
        {isMini && (
          <CurrentStep $accent={accent}>
            <span className="num">{current}</span>
            <span className="total"> / {STEPS.length}</span>
            <span className="name">{STEPS[current - 1]}</span>
          </CurrentStep>
        )}
        <Rail>
          {STEPS.map((label, idx) => {
            const stepNo = idx + 1
            const status = idx < current - 1 ? "done" : idx === current - 1 ? "current" : "upcoming"
            const isLast = idx === STEPS.length - 1
            const showCheck = status === "done" || isLast
            const selectable =
              stepNo <= maxStep && stepNo !== current && typeof onSelect === "function"
            const lineState =
              idx < current - 1
                ? "done"
                : idx === current - 1
                  ? "current"
                  : idx < maxStep
                    ? "available"
                    : "idle"
            return (
              <Step key={label}>
                {idx > 0 && <Line $state={lineState} $accent={accent} />}
                <Item
                  type="button"
                  disabled={!selectable}
                  $clickable={selectable}
                  $accent={accent}
                  aria-current={stepNo === current ? "step" : undefined}
                  aria-label={`${label} 단계${selectable ? "로 이동" : ""}`}
                  onClick={() => selectable && onSelect(stepNo)}
                >
                  <Dot $status={status} $accent={accent}>
                    {showCheck ? <CheckIcon size={15} /> : idx + 1}
                  </Dot>
                  <Label $status={status} $accent={accent}>
                    {label}
                  </Label>
                </Item>
              </Step>
            )
          })}
        </Rail>
      </IndicatorWrap>
    </>
  )
}

const IndicatorWrap = styled.div`
  flex-shrink: 0;
  width: 100%;
  padding: clamp(${T.spacing[16]}, 2.4vh, ${T.spacing[32]}) ${T.pagePad};
  background: ${alpha(T.bgBase, 0.98)};
  border-top: 1px solid ${alpha(T.white, 0.06)};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};
`

// 모바일(≤mini)에서 원형 라벨이 숨겨지므로 현재 단계명을 한 줄로 노출 (mini 일 때만 렌더)
const CurrentStep = styled.p`
  margin-bottom: ${T.spacing[12]};
  text-align: center;
  font-size: ${T.fontSize.xs};
  font-weight: 700;

  .num {
    color: ${({ $accent }) => $accent};
  }

  .total {
    color: ${T.muted};
  }

  .name {
    margin-left: ${T.spacing[8]};
    color: ${T.sub};
    font-weight: 500;
    letter-spacing: 0.6px;
  }
`

const Rail = styled.div`
  max-width: ${T.rsvMaxW};
  margin: 0 auto;
  ${flexRow(0, "flex-start")}
`

const Step = styled.div`
  ${flexRow(0, "flex-start")}

  &:not(:first-of-type) {
    flex: 1;

    min-width: 0;
  }
`

const LINE = {
  done: () => `
    background: ${accentLine(T.emerald, { peak: 0.8, edge: 0.4 })};
    box-shadow: 0 0 4px ${alpha(T.emerald, 0.4)};
  `,
  current: (accent) => `
    background: linear-gradient(90deg, ${alpha(T.emerald, 0.72)}, ${alpha(accent, 0.92)});
    box-shadow: 0 0 4px ${alpha(accent, 0.4)};
  `,
  available: (accent) => `
    background: linear-gradient(90deg, ${alpha(accent, 0.8)}, ${alpha(accent, 0.2)});
  `,
  idle: () => `
    background: ${T.muted};
  `,
}

const Line = styled.div`
  flex: 1;
  min-width: ${T.spacing[16]};
  height: calc(${T.spacing[4]} / 2);
  margin: calc((${T.spacing[24]} + ${T.spacing[4]}) / 2) ${T.spacing[12]} 0;
  border-radius: ${T.radius.pill};
  transition:
    background ${T.transition.mid},
    box-shadow ${T.transition.mid};
  ${({ $state, $accent }) => LINE[$state]($accent)}

  @media (max-width: ${T.bp.mini}) {
    margin-top: ${T.spacing[12]};
  }
`

const Item = styled.button`
  ${flexCol(T.spacing[8])}
  align-items: center;
  flex-shrink: 0;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:disabled {
    pointer-events: none;
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.sm)}
`

const DOT = {
  done: () => `
    background: ${T.emerald};
    border-color: ${T.emerald};
    color: ${T.bgBase};
  `,
  current: (accent) => `
    background: ${accent};
    border-color: ${accent};
    color: ${T.bgBase};
    box-shadow: 0 0 0 ${T.spacing[4]} ${alpha(accent, 0.14)}, 0 0 ${T.spacing[8]} ${alpha(accent, 0.5)};
  `,
  upcoming: () => `
    background: ${T.bgBase};
    border-color: ${T.muted};
    color: ${T.muted};
  `,
}

const Dot = styled.div`
  width: calc(${T.spacing[24]} + ${T.spacing[4]});
  height: calc(${T.spacing[24]} + ${T.spacing[4]});
  border-radius: ${T.radius.full};
  border: 1px solid;
  ${flexRow()}
  justify-content: center;
  font-size: ${T.fontSize.smFluid};
  font-weight: 700;
  line-height: 1;
  transition:
    background ${T.transition.mid},
    border-color ${T.transition.mid},
    color ${T.transition.mid},
    box-shadow ${T.transition.mid};
  ${({ $status, $accent }) => DOT[$status]($accent)}

  @media (max-width: ${T.bp.mini}) {
    width: ${T.spacing[24]};
    height: ${T.spacing[24]};
  }
`

const Label = styled.span`
  font-size: ${T.fontSize.smFluid};
  font-weight: ${({ $status }) => ($status === "upcoming" ? 400 : 700)};
  letter-spacing: 0;
  white-space: nowrap;
  width: 68px;
  text-align: center;
  color: ${({ $status, $accent }) =>
    $status === "current" ? $accent : $status === "done" ? T.sub : T.muted};
  transition: color ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    width: 60px;
  }

  @media (max-width: ${T.bp.mobile}) {
    width: 52px;
    font-size: ${T.fontSize.xxs};
  }
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

export function BookingFooterBar({
  info = {},
  showPrev,
  accent = T.pink,
  onPrev,
  onNext,
  nextLabel,
  canNext,
}) {
  return (
    <FooterBar>
      <Info>
        {info.value ? (
          <>
            <InfoLabel>{info.label}</InfoLabel>
            <InfoValue $accent={accent}>{info.value}</InfoValue>
          </>
        ) : (
          <InfoText>{info.text}</InfoText>
        )}
      </Info>

      <Actions>
        {showPrev && (
          <Button variant="outline" accent={accent} size="md" iconMotion="left" onClick={onPrev}>
            <ArrowLeftIcon size={16} />
            {t.prevBtn}
          </Button>
        )}
        <Button accent={accent} size="md" onClick={onNext} disabled={!canNext}>
          {nextLabel}
          <ArrowRightIcon size={16} />
        </Button>
      </Actions>
    </FooterBar>
  )
}

const FooterBar = styled.footer`
  ${chromeBar}
  gap: ${T.spacing[16]};
`

const Info = styled.div`
  ${flexCol(T.spacing[4])}
  min-width: 0;
`

const InfoText = styled.span`
  font-size: ${T.fontSize.smFluid};
  color: ${T.sub};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InfoLabel = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const InfoValue = styled.span`
  font-size: ${T.fontSize.lg};
  font-weight: 800;
  line-height: 1.1;
  color: ${({ $accent }) => $accent};
  white-space: nowrap;
`

const Actions = styled.div`
  ${flexRow(T.spacing[12])}
  flex-shrink: 0;

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[8]};
  }
`
