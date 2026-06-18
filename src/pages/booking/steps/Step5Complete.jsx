import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { flexCol, flexRow, serif } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { formatWon, getPartySummary } from "@/data/nightData"
import { FlowerIcon } from "@/components/ui/icons"
import Button from "@/components/ui/Button"
import { TotalLine } from "../SummaryPanel"

const t = UI_TEXT.booking.complete

export default function Step5Complete({ reservation, time, totals, payment, accent, ticketNo }) {
  const paymentLabel = UI_TEXT.booking.paymentMethods.find((m) => m.id === payment)?.label ?? payment

  return (
    <Wrap>
      <Badge $accent={accent}>
        <FlowerIcon size={40} color={accent} />
      </Badge>

      <Title>
        {t.title.plain}
        <Accent $accent={accent}>{t.title.accent}</Accent>
        {t.title.rest}
      </Title>
      <Desc>{t.desc}</Desc>

      <TicketCard
        reservation={reservation}
        time={time}
        totals={totals}
        accent={accent}
        paymentLabel={paymentLabel}
        ticketNo={ticketNo}
      />

      <Actions>
        <Button as={Link} to="/" accent={accent} size="md">
          {t.confirmBtn}
        </Button>
        <Button variant="outline" accent={accent} size="md" onClick={() => window.print()}>
          {t.saveBtn}
        </Button>
      </Actions>
    </Wrap>
  )
}

function TicketCard({ reservation, time, totals, accent, paymentLabel, ticketNo }) {
  const rows = [
    { label: t.fields.day, value: reservation.scheduleLabel },
    { label: t.fields.time, value: `${time} ${UI_TEXT.booking.calendar.entryLabel}` },
    { label: t.fields.party, value: getPartySummary(totals.lines, UI_TEXT.booking.partyUnit) },
    { label: t.fields.payment, value: paymentLabel },
  ]

  return (
    <Card $accent={accent}>
      <TicketHead $accent={accent}>
        <Brand>{t.ticketBrand}</Brand>
        <TicketNo>
          {t.ticketNoPrefix}
          {ticketNo}
        </TicketNo>
      </TicketHead>

      <TicketTitle>
        <NightLabel $accent={accent}>{reservation.id}야</NightLabel>
        <NightTitle>{reservation.cardTitle}</NightTitle>
      </TicketTitle>

      <TicketGrid>
        {rows.map((row) => (
          <Cell key={row.label}>
            <CellLabel>{row.label}</CellLabel>
            <CellValue>{row.value}</CellValue>
          </Cell>
        ))}
      </TicketGrid>

      <TotalLine label={t.finalTotalLabel} value={formatWon(totals.total)} accent={accent} boxed />
    </Card>
  )
}

const Wrap = styled.div`
  flex: 1;
  ${flexCol(T.spacing[16])}
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-block: ${T.spacing[24]};
`

const Badge = styled.div`
  position: relative;
  isolation: isolate;
  width: calc(${T.spacing[42]} * 2);
  height: calc(${T.spacing[42]} * 2);
  border-radius: ${T.radius.full};
  ${flexRow()}
  justify-content: center;
  background: ${({ $accent }) => accentFill($accent)};
  border: 1.5px solid ${({ $accent }) => alpha($accent, 0.4)};
  margin-bottom: ${T.spacing[8]};

  &::before {
    content: "";
    position: absolute;
    inset: -30%;
    z-index: -1;
    border-radius: inherit;
    background: ${({ $accent }) => `radial-gradient(circle, ${alpha($accent, 0.35)} 0%, transparent 70%)`};
    filter: blur(${T.spacing[8]});
  }
`

const Title = styled.h2`
  ${serif(900)}
  font-size: ${T.fontSize.xl};
  letter-spacing: 0;
  color: ${T.main};
`

const Accent = styled.span`
  color: ${({ $accent }) => $accent};
`

const Desc = styled.p`
  font-size: ${T.fontSize.smFluid};
  line-height: 1.6;
  color: ${T.sub};
  white-space: pre-line;
  margin-bottom: ${T.spacing[8]};
`

const Card = styled.div`
  width: 100%;
  max-width: 420px; /* 모바일 티켓 고정 폭 */
  ${flexCol()}
  background: ${T.bgCard};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.3)};
  border-radius: ${T.radius.xl};
  overflow: clip;
  box-shadow: 0 ${T.spacing[12]} 40px ${alpha(T.bgBase, 0.6)};
`

const TicketHead = styled.div`
  ${flexRow()}
  justify-content: space-between;
  gap: ${T.spacing[12]};
  padding: ${T.spacing[16]} ${T.spacing[20]};
  background: ${({ $accent }) => accentFill($accent)};
  border-bottom: 1px solid ${({ $accent }) => alpha($accent, 0.2)};
`

const Brand = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 700;
  color: ${T.main};
`

const TicketNo = styled.span`
  font-family: ${T.fontMono};
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const TicketTitle = styled.div`
  ${flexCol(T.spacing[4])}
  align-items: center;
  text-align: center;
  padding: clamp(${T.spacing[20]}, 3vw, ${T.spacing[32]}) ${T.spacing[20]};
`

const NightLabel = styled.span`
  ${serif(900)}
  font-size: ${T.fontSize.xl};
  line-height: 1;
  color: ${({ $accent }) => $accent};
`

const NightTitle = styled.span`
  ${serif(600)}
  font-size: ${T.fontSize.md};
  color: ${T.main};
`

const TicketGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${T.spacing[20]} ${T.spacing[16]};
  margin: 0 ${T.spacing[20]};
  padding: ${T.spacing[24]} ${T.spacing[4]} ${T.spacing[20]};
  border-top: 1.5px dashed ${alpha(T.white, 0.15)};
`

const Cell = styled.div`
  ${flexCol(T.spacing[6])}
  align-items: center;
  text-align: center;
`

const CellLabel = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const CellValue = styled.span`
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${T.main};
`

const Actions = styled.div`
  ${flexRow(T.spacing[12])}
  margin-top: ${T.spacing[20]};

  @media (max-width: ${T.bp.mini}) {
    flex-direction: column;
    width: 100%;
    max-width: 280px;

    & > * {
      width: 100%;
    }
  }
`
