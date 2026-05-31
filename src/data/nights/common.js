// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  4 야 공통 — 섹션 공통값 + 예약 플로우 상수
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const BANNER_COMMON = {
  footerText: "네 개의 밤이 모여\n하나의 이야기가 완성됩니다.",
}

export const MODAL_COMMON = {
  closeLabel: "닫기",
  bookingLabel: "예약하기",
}

export const ROUTE_COMMON = {
  guideText: "시간의 흐름을 따라 이어지는 주요 지점과 이동 경로를 한눈에 확인해보세요.",
  pinHint: "핀을 선택하면 상세 정보를 확인할 수 있어요",
  facilities: ["안내소", "화장실", "의료", "주차장"],
}

export const BOOKING_COMMON = {
  steps: ["프로그램", "날짜·시간", "인원·티켓", "결제", "예약완료"],
  closingTime: "21:00",
  maxParty: 6,
  groupDiscount: { minPeople: 10, discountRate: 15, label: "단체 10인 이상 시 15% 할인" },
  ticketPrices: [
    { type: "성인", price: 20000, unit: "원 / 인" },
    { type: "청소년", price: 15000, unit: "원 / 인" },
    { type: "어린이", price: 10000, unit: "원 / 인" },
    { type: "영유아", price: 0, unit: "무료", note: "만 7세 이하" },
  ],
  ticketIssueNote: "결제 완료 즉시 모바일 티켓이 발급됩니다",
}
