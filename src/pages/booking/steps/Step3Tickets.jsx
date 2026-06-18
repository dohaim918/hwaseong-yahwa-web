import { useCallback } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { flexCol, flexRow, focusRing, hoverLastIconX } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { ArrowRightIcon, MinusIcon, PlusIcon, TicketIcon } from "@/components/ui/icons"
import StepHeading from "../StepHeading"
import SummaryPanel from "../SummaryPanel"
import { BookingCallout, BookingPanel, BookingSplit, BookingStack } from "../BookingPanel"

const t = UI_TEXT.booking

export default function Step3Tickets({
  reservation,
  tickets,
  accent,
  onTickets,
  totals,
  onGroupInquiry,
}) {
  const incDisabled = totals.partyCount >= reservation.maxParty

  const bump = useCallback(
    (type, delta) =>
      onTickets((prev) => ({ ...prev, [type]: Math.max(0, (prev[type] ?? 0) + delta) })),
    [onTickets]
  )

  return (
    <>
      <StepHeading stepNo={3} title={t.step3.title} desc={t.step3.desc} accent={accent} />
      <BookingSplit>
        <BookingStack>
          <BookingPanel gap={0} padding={`0 clamp(${T.spacing[20]}, 2vw, ${T.spacing[24]})`}>
            {totals.lines.map((line) => (
              <TicketStepper
                key={line.type}
                line={line}
                count={tickets[line.type] ?? 0}
                accent={accent}
                onInc={() => bump(line.type, 1)}
                onDec={() => bump(line.type, -1)}
                incDisabled={incDisabled}
              />
            ))}
          </BookingPanel>

          <GroupInquiryCallout
            as="button"
            type="button"
            onClick={onGroupInquiry}
            accent={accent}
          >
            <TicketIcon size={18} color={accent} />
            <GroupInquiryText>{t.groupDiscount}</GroupInquiryText>
            <ArrowRightIcon size={16} />
          </GroupInquiryCallout>
        </BookingStack>

        <SummaryPanel reservation={reservation} totals={totals} accent={accent} />
      </BookingSplit>
    </>
  )
}

function TicketStepper({ line, count, accent, onInc, onDec, incDisabled }) {
  const free = line.price === 0
  const priceText = free ? line.unit : `${line.price.toLocaleString("ko-KR")}${line.unit}`

  return (
    <TicketRow>
      <TicketInfo>
        <Type $free={free}>{line.type}</Type>
        <Price>{priceText}</Price>
      </TicketInfo>

      <Stepper>
        <StepBtn
          type="button"
          onClick={onDec}
          disabled={count === 0}
          aria-label={`${line.type} 감소`}
          $accent={accent}
        >
          <MinusIcon size={15} />
        </StepBtn>
        <Count>{count}</Count>
        <StepBtn
          type="button"
          onClick={onInc}
          disabled={incDisabled}
          aria-label={`${line.type} 증가`}
          $accent={accent}
        >
          <PlusIcon size={15} />
        </StepBtn>
      </Stepper>
    </TicketRow>
  )
}

const TicketRow = styled.div`
  ${flexRow()}
  justify-content: space-between;
  gap: ${T.spacing[16]};
  padding: ${T.spacing[16]} 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid ${alpha(T.white, 0.06)};
  }
`

const TicketInfo = styled.div`
  ${flexCol(T.spacing[4])}
  min-width: 0;
`

const Type = styled.span`
  font-size: ${T.fontSize.mdFluid};
  font-weight: 700;
  color: ${({ $free }) => ($free ? T.sub : T.main)};
`

const Price = styled.span`
  font-size: ${T.fontSize.smFluid};
  color: ${T.sub};
`

const Stepper = styled.div`
  ${flexRow(T.spacing[8])}
  flex-shrink: 0;
`

const StepBtn = styled.button`
  ${flexRow()}
  justify-content: center;
  width: ${T.spacing[32]};
  height: ${T.spacing[32]};
  border-radius: ${T.radius.full};
  border: 1px solid ${alpha(T.white, 0.15)};
  color: ${T.main};
  transition:
    color ${T.transition.fast},
    border-color ${T.transition.fast},
    background ${T.transition.fast};

  &:hover:not(:disabled) {
    color: ${({ $accent }) => $accent};
    border-color: ${({ $accent }) => alpha($accent, 0.6)};
    background: ${({ $accent }) => alpha($accent, 0.1)};
  }

  &:disabled {
    color: ${T.muted};
    border-color: ${alpha(T.white, 0.08)};
    cursor: default;
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.full)}
`

const Count = styled.span`
  min-width: ${T.spacing[24]};
  text-align: center;
  font-size: ${T.fontSize.mdFluid};
  font-weight: 700;
  color: ${T.main};
  font-variant-numeric: tabular-nums;
`

const GroupInquiryCallout = styled(BookingCallout)`
  ${hoverLastIconX()}
`

const GroupInquiryText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
