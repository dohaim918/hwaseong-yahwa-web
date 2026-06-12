// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteSummaryPanel — 동선 모달 좌측 "동선 요약" 패널 (Figma 518:4794)
//  ────────────────────────────────────────────────
//  헤더(동선 요약 · 총 N개 포인트) + 5포인트 리스트(dot·이름·시간) +
//  푸터(예상 소요 시간 · 동선 경로 범례)
//  activeStep 포인트만 accent 강조 (1차는 첫 포인트 고정, 2차에서 선택 연동)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { Fragment } from "react"
import styled from "@emotion/styled"
import { T, alpha, flexCol, flexRow, accentLine } from "@/styles/theme"

export default function RouteSummaryPanel({
  waypoints,
  sidebar,
  duration,
  accent,
  activeStep = "01",
}) {
  return (
    <Panel>
      <Head>
        <Title>{sidebar.title}</Title>
        <Sub>총 {waypoints.length}개 포인트</Sub>
      </Head>

      <Body>
        {waypoints.map((w, i) => {
          const active = w.step === activeStep
          return (
            <Fragment key={w.step}>
              {i > 0 && <Connector aria-hidden="true" />}
              <Item $active={active}>
                <Dot $active={active} $accent={accent}>
                  {w.step}
                </Dot>
                <Info>
                  <Name>{w.label}</Name>
                  <Time>{w.time}</Time>
                </Info>
              </Item>
            </Fragment>
          )
        })}
      </Body>

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
    </Panel>
  )
}

// ─────────────────────────────────────────────────────────────

const Panel = styled.div`
  ${flexCol()}
  width: 196px;
  border: 1px solid ${alpha(T.white, 0.09)};
  border-radius: ${T.radius.lg};
  background: ${T.bgDark};
  overflow: hidden;
`

const Head = styled.div`
  ${flexCol(T.spacing[4])}
  padding: ${T.spacing[12]} ${T.spacing[16]};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};
`

const Title = styled.span`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  color: ${T.sub};
`

const Sub = styled.span`
  font-size: 11px;
  color: ${T.muted};
`

const Body = styled.div`
  ${flexCol()}
  padding: ${T.spacing[12]};
`

const Item = styled.div`
  ${flexRow(T.spacing[12])}
  padding: ${T.spacing[6]} ${T.spacing[8]};
  border-radius: ${T.radius.xs};
  background: ${({ $active }) => ($active ? alpha(T.white, 0.07) : "transparent")};
`

const Dot = styled.span`
  flex: 0 0 auto;
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: ${T.radius.full};
  font-size: 10px;
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
  ${flexCol("2px")}
  min-width: 0;
`

const Name = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${T.main};
`

const Time = styled.span`
  font-size: 11px;
  color: ${T.sub};
`

// 아이템 사이 세로 커넥터 점
const Connector = styled.span`
  width: 1px;
  height: 7px;
  margin-left: calc(${T.spacing[8]} + 14px);
  background: ${alpha(T.white, 0.1)};
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
  font-size: 11px;
  color: ${T.sub};
`

const DurVal = styled.strong`
  font-family: ${T.fontSerif};
  font-size: 15px;
  font-weight: 700;
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
  font-size: 11px;
  color: ${T.sub};
`
