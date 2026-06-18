import { useMemo, useState } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { flexCol, flexRow, focusRing, selectableSurface } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { formatBookingSchedule } from "@/data/nightData"
import { ChevronIcon } from "@/components/ui/icons"
import StepHeading from "../StepHeading"
import {
  BookingCallout,
  BookingNote,
  BookingPanel,
  BookingPanelTitle,
  BookingSplit,
  BookingStack,
} from "../BookingPanel"

const t = UI_TEXT.booking
const WEEKDAY_INDEX = {
  일요일: 0,
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
  토요일: 6,
}
const STATUS_COLOR = { available: T.emerald, closing: T.amber, sold_out: T.muted }

const buildMonthCells = (year, month) => {
  const startPad = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  return [...Array(startPad).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
}

const isSameDay = (a, b) =>
  !!a && !!b && a.year === b.year && a.month === b.month && a.day === b.day

export default function Step2DateTime({ reservation, date, time, accent, onDate, onTime }) {
  const schedule = formatBookingSchedule(date, time, t.calendar.entryLabel)

  return (
    <>
      <StepHeading stepNo={2} title={t.step2.title} desc={t.step2.desc} accent={accent} />
      <BookingSplit cols="minmax(0, 1fr) minmax(0, 1fr)">
        <BookingCalendar reservation={reservation} date={date} accent={accent} onDate={onDate} />

        <BookingStack $gap={T.spacing[20]}>
          <TimeSlots slots={reservation.timeSlots} time={time} accent={accent} onTime={onTime} />

          <BookingCallout accent={accent} active={!!schedule} stack>
            <SelLabel>{t.calendar.selectedLabel}</SelLabel>
            <SelValue $on={!!schedule}>{schedule || "-"}</SelValue>
          </BookingCallout>
        </BookingStack>
      </BookingSplit>
    </>
  )
}

function BookingCalendar({ reservation, date, accent, onDate }) {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() })

  const targetDow = WEEKDAY_INDEX[reservation.dayOfWeek]
  const cells = useMemo(() => buildMonthCells(view.year, view.month), [view.year, view.month])
  const viewKey = `${view.year}-${view.month}`
  const atMinMonth = view.year === today.getFullYear() && view.month === today.getMonth()

  const move = (delta) => {
    if (delta < 0 && atMinMonth) return
    setView(({ year, month }) => {
      const nextMonth = month + delta
      return { year: year + Math.floor(nextMonth / 12), month: ((nextMonth % 12) + 12) % 12 }
    })
  }

  return (
    <BookingPanel gap={T.spacing[16]} padding={`clamp(${T.spacing[16]}, 1.6vw, ${T.spacing[24]})`}>
      <CalendarHead>
        <NavBtn
          type="button"
          onClick={() => move(-1)}
          disabled={atMinMonth}
          aria-label={t.calendar.prevAria}
          $accent={accent}
        >
          <ChevronIcon size={18} dir="left" />
        </NavBtn>
        <Month aria-live="polite">
          {view.year}년 {view.month + 1}월
        </Month>
        <NavBtn
          type="button"
          onClick={() => move(1)}
          aria-label={t.calendar.nextAria}
          $accent={accent}
        >
          <ChevronIcon size={18} dir="right" />
        </NavBtn>
      </CalendarHead>

      <Weekdays>
        {t.calendar.weekdays.map((weekday, index) => (
          <Weekday key={weekday} $accent={accent} $on={index === targetDow} role="columnheader">
            {weekday}
          </Weekday>
        ))}
      </Weekdays>

      <CalendarGrid aria-label={`${view.year}년 ${view.month + 1}월 예약 가능 날짜`}>
        {cells.map((day, index) => {
          if (day === null) return <div key={`${viewKey}-empty-${index}`} />
          const cellDate = new Date(view.year, view.month, day)
          const selectable = cellDate.getDay() === targetDow && cellDate >= today
          const current = { year: view.year, month: view.month, day }
          const selected = isSameDay(date, current)
          const dayLabel = `${view.year}년 ${view.month + 1}월 ${day}일 ${
            t.calendar.weekdays[cellDate.getDay()]
          }요일`
          return (
            <DayBtn
              key={`${viewKey}-${day}`}
              type="button"
              disabled={!selectable}
              $selectable={selectable}
              $selected={selected}
              $accent={accent}
              onClick={() => selectable && onDate(current)}
              aria-pressed={selected}
              aria-label={`${dayLabel} ${selected ? "선택됨" : selectable ? "선택 가능" : "선택 불가"}`}
            >
              {day}
            </DayBtn>
          )
        })}
      </CalendarGrid>

      <BookingNote>* {reservation.calendarNote}</BookingNote>
    </BookingPanel>
  )
}

function TimeSlots({ slots, time, accent, onTime }) {
  return (
    <SlotWrap>
      <BookingPanelTitle>{t.slotSectionLabel}</BookingPanelTitle>
      <SlotGrid>
        {slots.map((slot) => {
          const soldOut = slot.status === "sold_out"
          const selected = time === slot.time
          return (
            <Slot
              key={slot.time}
              type="button"
              disabled={soldOut}
              $selected={selected}
              $accent={accent}
              onClick={() => !soldOut && onTime(slot.time)}
              aria-pressed={selected}
            >
              <SlotTime $soldOut={soldOut}>{slot.time}</SlotTime>
              <SlotLabel>{slot.label}</SlotLabel>
              <SlotStatus $color={STATUS_COLOR[slot.status]}>
                {t.slotStatus[slot.status]}
              </SlotStatus>
            </Slot>
          )
        })}
      </SlotGrid>
      <BookingNote>* {t.closingNotice}</BookingNote>
    </SlotWrap>
  )
}

const CalendarHead = styled.div`
  ${flexRow()}
  justify-content: space-between;
`

const Month = styled.span`
  font-size: ${T.fontSize.md};
  font-weight: 700;
  color: ${T.main};
`

const NavBtn = styled.button`
  ${flexRow()}
  justify-content: center;
  width: ${T.spacing[32]};
  height: ${T.spacing[32]};
  border-radius: ${T.radius.sm};
  color: ${T.sub};
  transition:
    color ${T.transition.fast},
    background ${T.transition.fast};

  &:hover:not(:disabled) {
    color: ${({ $accent }) => $accent};
    background: ${alpha(T.white, 0.05)};
  }

  &:disabled {
    color: ${T.muted};
    cursor: default;
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.sm)}
`

const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${T.spacing[8]};
`

// DayBtn 과 동일하게 justify-self:center + 동일 폭으로 통일 → 요일·날짜 열 정렬 일치
const Weekday = styled.span`
  justify-self: center;
  width: clamp(${T.spacing[32]}, 4.4vw, ${T.spacing[42]});
  text-align: center;
  font-size: ${T.fontSize.xs};
  font-weight: ${({ $on }) => ($on ? 700 : 400)};
  color: ${({ $on, $accent }) => ($on ? $accent : T.sub)};
  padding-bottom: ${T.spacing[4]};
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${T.spacing[8]};
`

const DayBtn = styled.button`
  justify-self: center;
  text-align: center;
  width: clamp(${T.spacing[32]}, 4.4vw, ${T.spacing[42]});
  aspect-ratio: 1;
  border: 1.5px solid transparent;
  border-radius: ${T.radius.full};
  font-size: ${T.fontSize.sm};
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  line-height: 1;
  color: ${({ $selectable }) => ($selectable ? T.main : T.muted)};
  cursor: ${({ $selectable }) => ($selectable ? "pointer" : "default")};
  transition:
    background ${T.transition.fast},
    color ${T.transition.fast},
    border-color ${T.transition.fast};

  ${({ $selectable, $selected, $accent }) =>
    $selectable &&
    ($selected
      ? `
        color: ${$accent};
        border-color: ${$accent};
        background: ${alpha($accent, 0.12)};
      `
      : `
        color: ${$accent};
        border-color: transparent;
        &:hover { background: ${alpha($accent, 0.1)}; }
      `)}

  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.full)}

  &:disabled {
    pointer-events: none;
  }
`

const SlotWrap = styled.div`
  ${flexCol(T.spacing[12])}
`

const SlotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${T.spacing[12]};
`

const Slot = styled.button`
  ${flexCol(T.spacing[4])}
  align-items: flex-start;
  padding: ${T.spacing[16]};
  text-align: left;
  cursor: pointer;
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast};
  ${({ $selected, $accent }) => selectableSurface($accent, $selected)}

  &:disabled {
    cursor: default;
    opacity: 0.55;
  }

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[12]};
  }
`

const SlotTime = styled.span`
  font-size: ${T.fontSize.mdFluid};
  font-weight: 700;
  color: ${({ $soldOut }) => ($soldOut ? T.muted : T.main)};
  text-decoration: ${({ $soldOut }) => ($soldOut ? "line-through" : "none")};
`

const SlotLabel = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const SlotStatus = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  color: ${({ $color }) => $color};
`

const SelLabel = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const SelValue = styled.span`
  font-size: ${T.fontSize.md};
  font-weight: 700;
  color: ${({ $on }) => ($on ? T.main : T.muted)};
`
