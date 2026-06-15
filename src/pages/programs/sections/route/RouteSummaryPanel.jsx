// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteSummaryPanel — 동선 모달 좌측 "동선 요약" 패널
//  ────────────────────────────────────────────────
//  헤더(동선 요약 · 총 N개 포인트) + 5포인트 리스트(dot·이름·시간) +
//  푸터(예상 소요 시간 · 동선 경로 범례)
//  activeStep 포인트만 accent 강조. compact=true 면 선택 후 얇은 세로 레일로 전환
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, flexCol, flexRow, accentLine, serif, focusRing } from "@/styles/theme"

export default function RouteSummaryPanel({
  waypoints,
  sidebar,
  pointsUnit,
  duration,
  accent,
  activeStep,
  onSelect,
  compact = false, // true: 패널 오픈 후 얇은 레일(번호+라벨 세로) / false: 박스 요약
}) {
  return (
    <Panel $compact={compact}>
      {!compact && (
        <Head>
          <Title>{sidebar.title}</Title>
          <Sub>
            총 {waypoints.length}
            {pointsUnit}
          </Sub>
        </Head>
      )}

      <Body $compact={compact}>
        {waypoints.map((w) => {
          const active = w.step === activeStep
          return (
            <Item
              key={w.step}
              type="button"
              $active={active}
              $accent={accent}
              $compact={compact}
              onClick={() => onSelect?.(w.step)}
            >
              <Dot $active={active} $accent={accent}>
                {w.step}
              </Dot>
              <Info $compact={compact}>
                <Name $compact={compact}>{w.label}</Name>
                {!compact && <Time>{w.time}</Time>}
              </Info>
            </Item>
          )
        })}
      </Body>

      {!compact && (
        <Foot>
          <Dur>
            <DurLabel>{sidebar.durationLabel}</DurLabel>
            <DurVal>{duration}</DurVal>
          </Dur>
          <Legend>
            <LegLine $accent={accent} aria-hidden="true" />
            <LegText>{sidebar.routeLineLabel}</LegText>
          </Legend>
        </Foot>
      )}
    </Panel>
  )
}

// ─────────────────────────────────────────────────────────────

const Panel = styled.div`
  ${flexCol()}
  overflow: hidden;
  ${({ $compact }) =>
    $compact
      ? `width: auto;`
      : `width: 196px;
         border: 1px solid ${alpha(T.white, 0.09)};
         border-radius: ${T.radius.lg};
         background: ${T.bgDark};`}
`

const Head = styled.div`
  ${flexCol(T.spacing[4])}
  padding: ${T.spacing[12]} ${T.spacing[16]};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};
`

const Title = styled.span`
  font-size: ${T.fontSize.xxs};
  font-weight: 700;
  letter-spacing: 2.5px;
  color: ${T.sub};
`

const Sub = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${T.muted};
`

const Body = styled.div`
  ${({ $compact }) => flexCol($compact ? T.spacing[20] : T.spacing[4])}
  padding: ${({ $compact }) => ($compact ? "0" : T.spacing[12])};
`

const Item = styled.button`
  position: relative;
  ${({ $compact }) => ($compact ? flexCol(T.spacing[4]) : flexRow(T.spacing[12]))}
  ${({ $compact }) => ($compact ? "align-items: center;" : "width: 100%; text-align: left;")}
  padding: ${({ $compact }) => ($compact ? "0" : `${T.spacing[6]} ${T.spacing[8]}`)};
  border: 0;
  border-radius: ${T.radius.xs};
  background: ${({ $active, $compact }) =>
    !$compact && $active ? alpha(T.white, 0.07) : "transparent"};
  cursor: pointer;
  transition: background ${T.transition.fast};

  &:hover {
    ${({ $compact }) => (!$compact ? `background: ${alpha(T.white, 0.05)};` : "")}
  }

  /* 레일(compact): 번호 동그라미 사이 세로 연결선 — 마지막 항목 제외 */
  ${({ $compact }) =>
    $compact
      ? `&:not(:last-of-type)::after {
           content: "";
           position: absolute;
           left: 50%;
           bottom: -14px;
           width: 1px;
           height: 12px;
           background: ${alpha(T.white, 0.18)};
           transform: translateX(-50%);
         }`
      : ""}
  ${({ $accent }) => focusRing($accent, T.radius.xs)}
`

const Dot = styled.span`
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  line-height: 1;
  border-radius: ${T.radius.full};
  font-size: ${T.fontSize.xxs};
  font-weight: 700;
  ${({ $active, $accent }) =>
    $active
      ? `
    background: ${alpha($accent, 0.2)};
    border: 1px solid ${$accent};
    color: ${$accent};
  `
      : `
    background: ${alpha(T.white, 0.05)};
    border: 1px solid ${alpha(T.white, 0.15)};
    color: ${alpha(T.white, 0.35)};
  `}
`

const Info = styled.div`
  ${flexCol(T.spacing[4])}
  ${({ $compact }) => ($compact ? "align-items: center;" : "")}
`

const Name = styled.span`
  font-size: ${({ $compact }) => ($compact ? T.fontSize.xxs : T.fontSize.xs)};
  font-weight: 700;
  color: ${({ $compact }) => ($compact ? T.sub : T.main)};
  white-space: nowrap;
`

const Time = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${T.sub};
`

const Foot = styled.div`
  ${flexCol(T.spacing[12])}
  padding: ${T.spacing[16]};
  border-top: 1px solid ${alpha(T.white, 0.06)};
`

const Dur = styled.div`
  ${flexCol(T.spacing[4])}
`

const DurLabel = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${T.sub};
`

const DurVal = styled.strong`
  ${serif(700)}
  font-size: ${T.fontSize.sm};
  color: ${T.main};
`

const Legend = styled.div`
  ${flexRow(T.spacing[8])}
`

const LegLine = styled.span`
  width: 18px;
  height: 2px;
  border-radius: ${T.radius.full};
  background: ${({ $accent }) => accentLine($accent, { peak: 1, edge: 0.2 })};
`

const LegText = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${T.sub};
`
