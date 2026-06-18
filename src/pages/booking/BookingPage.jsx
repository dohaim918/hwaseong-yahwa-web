// 예약 5단계 위저드 셸: 상태는 여기서 보유하고 step은 표현에 집중한다.

import { useReducer, useMemo, useEffect, useCallback } from "react"
import { useOutletContext, useSearchParams } from "react-router-dom"
import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import { flexCol } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { getBookingTotals, getReservationData } from "@/data/nightData"
import { useMvpModal } from "@/components/ui/MvpModal"
import { BookingFooterBar, BookingHeader, StepIndicator } from "./BookingBars"
import {
  BOOKING_STEP_COUNT,
  bookingReducer,
  canProceedStep,
  getBookingFooterInfo,
  getInitialNightId,
  getSelectableMaxStep,
  getValidOpenStep,
  loadBookingState,
  normalizePayer,
  saveBookingState,
  validateCheckout,
} from "./bookingFlow"
import Step1Program from "./steps/Step1Program"
import Step2DateTime from "./steps/Step2DateTime"
import Step3Tickets from "./steps/Step3Tickets"
import Step4Payment from "./steps/Step4Payment"
import Step5Complete from "./steps/Step5Complete"

const t = UI_TEXT.booking

export default function BookingPage() {
  const { setAccent } = useOutletContext()
  const [searchParams] = useSearchParams()
  const mvpModal = useMvpModal()

  // ── 진행 중 예약 복원(sessionStorage) / 없으면 URL ?night= 로 진입
  const [state, dispatch] = useReducer(
    bookingReducer,
    getInitialNightId(searchParams.get("night")),
    loadBookingState
  )
  const { step, nightId, date, time, tickets, payment, agree, payer, ticketNo, furthestStep } =
    state

  // ── 상태 변경 시 sessionStorage 동기화 (새로고침 복원)
  useEffect(() => saveBookingState(state), [state])

  const reservation = useMemo(() => (nightId ? getReservationData(nightId) : null), [nightId])
  const totals = useMemo(() => getBookingTotals(tickets), [tickets])
  const checkoutValidation = useMemo(() => validateCheckout(payer, agree), [payer, agree])
  const accent = reservation?.color ?? T.pink
  const validOpenStep = useMemo(
    () => getValidOpenStep({ nightId, date, time, partyCount: totals.partyCount, ticketNo }),
    [nightId, date, time, totals.partyCount, ticketNo]
  )

  // ── accent → NavBar(숨김)·CustomCursor 전역 동기화
  useEffect(() => setAccent(accent), [accent, setAccent])

  // ── 입력 변경 시 발급된 티켓번호 무효화 (step5 재진입 시 재발급)
  const inputHandlers = useMemo(() => {
    const setField = (field) => (value) => dispatch({ type: "SET_FIELD", field, value })
    return {
      date: setField("date"),
      time: setField("time"),
      tickets: setField("tickets"),
      payer: setField("payer"),
      payment: setField("payment"),
      agree: setField("agree"),
    }
  }, [])

  // ── 야 변경 시 날짜·시간 초기화 (운영 요일이 달라지므로)
  const handleSelectNight = useCallback((id) => dispatch({ type: "SELECT_NIGHT", id }), [])

  // ── 단계별 다음 진행 가능 여부
  const canProceed = useMemo(
    () =>
      canProceedStep({
        step,
        nightId,
        date,
        time,
        partyCount: totals.partyCount,
        payment,
        checkoutValid: checkoutValidation.isValid,
      }),
    [step, nightId, date, time, totals.partyCount, checkoutValidation.isValid, payment]
  )

  const selectableMaxStep = useMemo(
    () => getSelectableMaxStep({ step, canProceed, validOpenStep, furthestStep }),
    [step, canProceed, validOpenStep, furthestStep]
  )

  const goNext = useCallback(() => {
    if (!canProceed) return
    if (step === 4) {
      dispatch({
        type: "SET_FIELD",
        field: "payer",
        value: (current) => ({ ...current, ...normalizePayer(current) }),
      })
    }
    dispatch({ type: "GO_NEXT" })
  }, [canProceed, step])

  const goPrev = useCallback(() => dispatch({ type: "GO_PREV" }), [])
  const goStep = useCallback(
    (nextStep) => dispatch({ type: "GO_STEP", step: nextStep, maxStep: selectableMaxStep }),
    [selectableMaxStep]
  )

  // ── 푸터 좌측 정보 (단계별)
  const footerInfo = useMemo(
    () => getBookingFooterInfo({ step, nightId, date, time, totals }),
    [step, nightId, date, time, totals]
  )

  return (
    <Shell aria-label="예약">
      <BookingHeader accent={accent} />
      <StepIndicator current={step} maxStep={selectableMaxStep} accent={accent} onSelect={goStep} />

      <Body>
        <BodyInner key={step}>
          {step === 1 && (
            <Step1Program nightId={nightId} accent={accent} onSelect={handleSelectNight} />
          )}
          {step === 2 && (
            <Step2DateTime
              reservation={reservation}
              date={date}
              time={time}
              accent={accent}
              onDate={inputHandlers.date}
              onTime={inputHandlers.time}
            />
          )}
          {step === 3 && (
            <Step3Tickets
              reservation={reservation}
              tickets={tickets}
              accent={accent}
              onTickets={inputHandlers.tickets}
              totals={totals}
              onGroupInquiry={() => mvpModal.open(accent)}
            />
          )}
          {step === 4 && (
            <Step4Payment
              reservation={reservation}
              payer={payer}
              accent={accent}
              onPayer={inputHandlers.payer}
              payment={payment}
              onPayment={inputHandlers.payment}
              agree={agree}
              onAgree={inputHandlers.agree}
              totals={totals}
              errors={checkoutValidation.errors}
              onAgreeView={() => mvpModal.open(accent)}
            />
          )}
          {step === 5 && (
            <Step5Complete
              reservation={reservation}
              time={time}
              totals={totals}
              payment={payment}
              accent={accent}
              ticketNo={ticketNo}
            />
          )}
        </BodyInner>
      </Body>

      {step < BOOKING_STEP_COUNT && (
        <BookingFooterBar
          info={footerInfo}
          showPrev={step > 1}
          accent={accent}
          onPrev={goPrev}
          onNext={goNext}
          nextLabel={step === 4 ? t.payBtn : t.nextBtn}
          canNext={canProceed}
        />
      )}
    </Shell>
  )
}

// ── 풀섹션 셸 — 100dvh, scroll-snap 한 장 / 내부는 헤더·바디·푸터 세로 스택
const Shell = styled.section`
  position: relative;
  height: 100dvh;
  min-height: 600px;
  scroll-snap-align: start;
  flex-shrink: 0;
  ${flexCol()}
  background: ${T.bgBase};
  overflow: clip;
`

// ── 바디 — 남은 세로 공간 전부 차지하고 내부 스크롤
const Body = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  ${flexCol()}
`

// ── 단계 콘텐츠 래퍼 — 예약 폭 중앙 정렬 / step 전환 fade
const BodyInner = styled.div`
  width: 100%;
  max-width: ${T.rsvMaxW};
  margin: 0 auto;
  flex: 1;
  ${flexCol()}
  justify-content: center;
  padding-inline: ${T.panelPad};
  padding-block: clamp(${T.spacing[16]}, 3vh, ${T.spacing[32]});
  animation: tabIn 0.45s cubic-bezier(0.22, 0.68, 0, 1.1) both;

  @media (max-width: ${T.bp.mobile}) {
    padding-inline: ${T.pagePad};
  }
`
