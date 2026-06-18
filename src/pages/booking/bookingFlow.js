import { UI_TEXT } from "@/data/uiText"
import {
  formatBookingSchedule,
  formatWon,
  getInitialTickets,
  getPartySummary,
  getReservationCards,
} from "@/data/nightData"

const t = UI_TEXT.booking

export const BOOKING_STEP_COUNT = t.steps.length
const BOOKING_VALID_IDS = getReservationCards().map((card) => card.id)

const REQUIRED_AGREEMENTS = t.agreements
  .filter((agreement) => agreement.required)
  .map(({ id }) => id)

const genTicketNo = () => {
  const part = () => String(Math.floor(1000 + Math.random() * 9000))
  return `${part()}-${part()}`
}

const valueOf = (value, current) => (typeof value === "function" ? value(current) : value)
const invalidateTicket = (state, patch) => ({ ...state, ...patch, ticketNo: null })

const normalizeName = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")

const normalizePhoneDigits = (value) =>
  String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 11)

const formatPhoneNumber = (value) => {
  const digits = normalizePhoneDigits(value)
  if (digits.length <= 3) return digits
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
}

const normalizeEmail = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()

// 필드별 정규화기 — blur·제출 시 적용 (입력 중 실시간 포맷은 formatPayerField)
const FIELD_NORMALIZERS = { name: normalizeName, email: normalizeEmail, phone: formatPhoneNumber }

export const normalizePayerField = (id, value) => (FIELD_NORMALIZERS[id] ?? ((v) => v))(value)

export const normalizePayer = (payer) =>
  Object.fromEntries(Object.keys(payer).map((id) => [id, normalizePayerField(id, payer[id])]))

// 입력 중 실시간 포맷 — 전화만(이름·이메일은 입력 그대로 두고 blur 에서 정규화)
export const formatPayerField = (id, value) => (id === "phone" ? formatPhoneNumber(value) : value)

export const getInitialNightId = (value) => {
  const id = parseInt(value, 10)
  return BOOKING_VALID_IDS.includes(id) ? id : null
}

export const createInitialBookingState = (nightId) => ({
  step: 1,
  nightId,
  date: null,
  time: null,
  tickets: getInitialTickets(),
  payment: "card",
  agree: { terms: false, privacy: false, marketing: false },
  payer: { name: "", phone: "", email: "" },
  ticketNo: null,
  furthestStep: 1,
})

// ── 진행 중 예약 영속화 (sessionStorage — 새로고침 복원, 탭 닫으면 소멸)
const BOOKING_STORAGE_KEY = "hwaseong-booking"
const stripPrivateFields = (state) => {
  const safe = { ...state }
  delete safe.payer
  delete safe.agree
  return safe
}

export const loadBookingState = (urlNightId) => {
  try {
    const saved = JSON.parse(sessionStorage.getItem(BOOKING_STORAGE_KEY))
    // ?night= 가 저장값과 다르면 새 진입 → 초기화
    if (saved && (!urlNightId || urlNightId === saved.nightId)) {
      return { ...createInitialBookingState(saved.nightId), ...saved }
    }
  } catch {
    /* 접근 차단·파싱 실패 → 초기 상태로 */
  }
  return createInitialBookingState(urlNightId)
}

export const saveBookingState = (state) => {
  try {
    sessionStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(stripPrivateFields(state)))
  } catch {
    /* 저장 실패 무시 */
  }
}

export function bookingReducer(state, action) {
  switch (action.type) {
    case "SELECT_NIGHT":
      return invalidateTicket(state, { nightId: action.id, date: null, time: null })
    case "SET_FIELD":
      // date·time·payment(값) / tickets·payer·agree(함수형) 모두 valueOf 로 통일
      return invalidateTicket(state, { [action.field]: valueOf(action.value, state[action.field]) })
    case "GO_NEXT": {
      const next = Math.min(state.step + 1, BOOKING_STEP_COUNT)
      return {
        ...state,
        step: next,
        furthestStep: Math.max(state.furthestStep, next),
        ticketNo: next === BOOKING_STEP_COUNT ? (state.ticketNo ?? genTicketNo()) : state.ticketNo,
      }
    }
    case "GO_PREV":
      return { ...state, step: Math.max(state.step - 1, 1) }
    case "GO_STEP":
      if (action.step > action.maxStep) return state
      return {
        ...state,
        step: action.step,
        furthestStep: Math.max(state.furthestStep, action.step),
      }
    default:
      return state
  }
}

const validateName = (value) => {
  if (!value) return t.validation.nameRequired
  const lettersOnly = value.replace(/[\s·.-]/g, "")
  const namePattern = /^[가-힣a-zA-Z]+(?:[\s·.-][가-힣a-zA-Z]+)*$/
  if (lettersOnly.length < 2 || !namePattern.test(value)) return t.validation.nameFormat
  return null
}

const validatePhone = (digits) => {
  if (!digits) return t.validation.phoneRequired
  if (!/^010\d{8}$/.test(digits)) return t.validation.phoneFormat
  return null
}

const validateEmail = (value) => {
  if (!value) return null
  if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return t.validation.emailFormat
  }
  return null
}

const hasRequiredAgreements = (agree) => REQUIRED_AGREEMENTS.every((id) => agree[id])

export const validateCheckout = (payer, agree) => {
  const values = {
    ...normalizePayer(payer),
    phoneDigits: normalizePhoneDigits(payer.phone),
  }
  const errors = Object.fromEntries(
    [
      ["name", validateName(values.name)],
      ["phone", validatePhone(values.phoneDigits)],
      ["email", validateEmail(values.email)],
    ].filter(([, message]) => message)
  )

  return {
    errors,
    values,
    isValid: Object.keys(errors).length === 0 && hasRequiredAgreements(agree),
  }
}

// 단계별 완료 판정 (step 1~4) — canProceedStep·getValidOpenStep 단일 소스
const STEP_DONE = [
  ({ nightId }) => !!nightId,
  ({ date, time }) => !!date && !!time,
  ({ partyCount }) => partyCount >= 1,
  ({ checkoutValid, payment }) => checkoutValid && !!payment,
]

export const canProceedStep = (s) => s.step >= BOOKING_STEP_COUNT || STEP_DONE[s.step - 1](s)

// 데이터상 열람 가능한 최대 step — 1~3 첫 미완료 단계 / 다 됐으면 결제(ticketNo) 유무로 5 또는 4
export const getValidOpenStep = (s) => {
  const firstUndone = STEP_DONE.slice(0, 3).findIndex((done) => !done(s))
  if (firstUndone !== -1) return firstUndone + 1
  return s.ticketNo ? BOOKING_STEP_COUNT : 4
}

export const getSelectableMaxStep = ({ step, canProceed, validOpenStep, furthestStep }) => {
  const nextFromCurrent = Math.min(step + (canProceed ? 1 : 0), BOOKING_STEP_COUNT)
  return Math.min(validOpenStep, Math.max(furthestStep, nextFromCurrent))
}

export const getBookingFooterInfo = ({ step, nightId, date, time, totals }) => {
  if (step === 1) {
    return {
      text: nightId ? `${nightId}야${t.footerSelectedSuffix}` : t.footerEmptyHint,
    }
  }
  if (step === 2) return { text: formatBookingSchedule(date, time, t.calendar.entryLabel) }
  if (step === 3)
    return { label: getPartySummary(totals.lines, t.partyUnit), value: formatWon(totals.total) }
  return { label: t.complete.finalTotalLabel, value: formatWon(totals.total) }
}
