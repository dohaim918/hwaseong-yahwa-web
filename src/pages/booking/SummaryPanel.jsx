// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SummaryPanel — 예약 요약 (Step3 · Step4 공용)
//  야 카드 + 티켓 내역(수량>0) + 총 결제 금액
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { flexCol, flexRow, serif } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { formatWon } from "@/data/nightData"
import { BookingPanel } from "./BookingPanel"

const t = UI_TEXT.booking

export default function SummaryPanel({ reservation, totals, accent = T.pink, className }) {
  const { lines, total } = totals

  return (
    <BookingPanel title={t.summaryLabel} gap={T.spacing[20]} className={className}>
      <NightCard $accent={accent}>
        <Emoji $accent={accent} aria-hidden="true">
          {reservation.emoji}
        </Emoji>
        <NightMeta>
          <NightLabel $accent={accent}>{reservation.id}야</NightLabel>
          <NightTitle>{reservation.cardTitle}</NightTitle>
          <NightSub>{reservation.scheduleLabel}</NightSub>
        </NightMeta>
      </NightCard>

      <Lines>
        {lines
          .filter((l) => l.count > 0)
          .map((l) => (
            <Row key={l.type}>
              <RowName>
                {l.type} <Times>×</Times> {l.count}
              </RowName>
              <RowVal>{l.price === 0 ? l.unit : formatWon(l.subtotal)}</RowVal>
            </Row>
          ))}
      </Lines>

      <TotalLine label={t.totalPriceLabel} value={formatWon(total)} accent={accent} />
    </BookingPanel>
  )
}

// ── 총액 행 (요약=평면 / 티켓=박스 $boxed) — Step5 TicketCard 와 공용
export function TotalLine({ label, value, accent, boxed }) {
  return (
    <TotalRow $boxed={boxed} $accent={accent}>
      <TotalLabel>{label}</TotalLabel>
      <TotalVal $accent={accent}>{value}</TotalVal>
    </TotalRow>
  )
}

// ── 야 미니 카드
const NightCard = styled.div`
  ${flexRow(T.spacing[12])}
  padding: ${T.spacing[16]};
  border-radius: ${T.radius.lg};
  background: ${({ $accent }) => accentFill($accent)};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.22)};
`

const Emoji = styled.div`
  flex-shrink: 0;
  width: ${T.spacing[42]};
  height: ${T.spacing[42]};
  border-radius: 50%;
  ${flexRow()}
  justify-content: center;
  font-size: ${T.fontSize.xl};
  line-height: 1;
  background: ${({ $accent }) => alpha($accent, 0.16)};
`

const NightMeta = styled.div`
  ${flexCol(T.spacing[4])}
  min-width: 0;
`

const NightLabel = styled.span`
  ${serif(700)}
  font-size: ${T.fontSize.md};
  color: ${({ $accent }) => $accent};
  line-height: 1;
`

const NightTitle = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 600;
  color: ${T.main};
`

const NightSub = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const Lines = styled.div`
  ${flexCol(T.spacing[12])}
`

const Row = styled.div`
  ${flexRow()}
  justify-content: space-between;
  gap: ${T.spacing[12]};
`

const RowName = styled.span`
  font-size: ${T.fontSize.smFluid};
  color: ${({ $accent }) => $accent ?? T.sub};
`

const Times = styled.span`
  color: ${T.muted};
`

const RowVal = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 600;
  color: ${({ $accent }) => $accent ?? T.main};
  white-space: nowrap;
`

const TotalRow = styled.div`
  ${flexRow(T.spacing[12], "baseline")}
  justify-content: space-between;
  ${({ $boxed, $accent }) =>
    $boxed
      ? `
        margin: 0 ${T.spacing[20]} ${T.spacing[20]};
        padding: ${T.spacing[16]} ${T.spacing[20]};
        border-radius: ${T.radius.md};
        background: ${alpha($accent, 0.1)};
      `
      : `
        padding-top: ${T.spacing[20]};
        border-top: 1px solid ${alpha(T.white, 0.08)};
      `}
`

const TotalLabel = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${T.main};
`

const TotalVal = styled.strong`
  ${serif(900)}
  font-size: ${T.fontSize.xl};
  color: ${({ $accent }) => $accent};
  white-space: nowrap;
`
