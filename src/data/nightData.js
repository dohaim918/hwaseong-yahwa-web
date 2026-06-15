// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  nightData.js  —  4 야 단일 진입점
//  ────────────────────────────────────────────────────────────
//  야별 데이터는 ./nights/01.js ~ 04.js 에 분리되어 있다.
//  여기서는 통합 NIGHTS 배열 + 섹션별 헬퍼만 제공한다.
//
//  각 야 객체의 programs[] 는 다음 섹션들의 단일 소스:
//    modal.programs    → programs.filter(p => p.featured)
//    flowOfNight       → programs.map({ time, name, place })
//    route waypoints   → programs 전체 (route 필드 사용)
//    experience.cards  → programs.filter(p => p.cardTitle)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import NIGHT_01 from "@/data/nights/01"
import NIGHT_02 from "@/data/nights/02"
import NIGHT_03 from "@/data/nights/03"
import NIGHT_04 from "@/data/nights/04"
import { PROGRAM_ASSETS } from "@/data/programAssets"

export { BOOKING_COMMON } from "@/data/nights/common"
import { BOOKING_COMMON } from "@/data/nights/common"

export const NIGHTS = [NIGHT_01, NIGHT_02, NIGHT_03, NIGHT_04]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  기본 헬퍼
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getNight = (id) => NIGHTS.find((n) => n.id === id)
export const getNightByIndex = (index) => NIGHTS[index]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  섹션별 computed 헬퍼  (programs[] → 각 섹션 형태로 변환)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** modal 프로그램 3개 (featured: true) */
export const getModalPrograms = (id) =>
  getNight(id)
    ?.programs.filter((p) => p.featured)
    .map(({ name, place, time }) => ({ name, place, time })) ?? []

/** flowOfNight 타임라인 행 (전체) — step/time/title/desc/place */
export const getTimelineItems = (id) =>
  getNight(id)?.programs.map(({ step, time, name, place, flowDesc }) => ({
    step,
    time,
    title: name,
    desc: flowDesc ?? null,
    place,
  })) ?? []

// "19:00" + "약 20분" → "19:00 ~ 19:20" (stay 의 분을 time 에 더해 종료 시각 산출)
const addStay = (time, stay) => {
  const min = Number(String(stay).match(/(\d+)\s*분/)?.[1])
  if (!min) return time
  const t = Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + min
  const pad = (n) => String(n).padStart(2, "0")
  return `${time} ~ ${pad(Math.floor(t / 60) % 24)}:${pad(t % 60)}`
}

// walk("도보 약 N분 (약 Nm)") → 본문 / 거리 괄호 분리
//   walkMain "도보 약 N분" · walkDist "(약 Nm)" — 미니에서 거리만 숨기기 위함
//   괄호 없는 값("출발 지점" 등)은 walkMain=원본, walkDist=null
const splitWalk = (walk = "") => {
  const i = walk.indexOf("(")
  if (i === -1) return { walkMain: walk, walkDist: null }
  return { walkMain: walk.slice(0, i).trim(), walkDist: walk.slice(i) }
}

/** route 웨이포인트 (전체 필드) */
export const getWaypoints = (id) =>
  getNight(id)?.programs.map((p) => ({
    step: p.step,
    time: p.time,
    timeRange: addStay(p.time, p.stay), // 패널 정보 "시간" 행
    label: p.place,
    program: p.name,
    address: p.address,
    walk: p.walk, // 패널 정보 "이동" 행 (통짜)
    ...splitWalk(p.walk), // walkMain / walkDist (거리 괄호 분리)
    stay: p.stay,
    rec: p.rec, // 패널 정보 "추천" 행
    desc: p.desc,
    highlights: p.highlights,
    tip: p.tip,
    mapXY: p.mapXY,
  })) ?? []

/** experience 카드 (cardTitle 있는 것) */
export const getExperienceCards = (id) =>
  getNight(id)
    ?.programs.filter((p) => p.cardTitle)
    .map(({ category, cardTitle, cardDesc }, index) => ({
      category,
      title: cardTitle,
      desc: cardDesc,
      image: PROGRAM_ASSETS.experience[id]?.[index] ?? null,
    })) ?? []

/** flowOfNight 패널 — 특정 step 의 핵심 포인트 데이터 (행 클릭 시 갱신용) */
export const getFlowPoint = (id, step) => {
  const n = getNight(id)
  if (!n) return null
  const idx = n.programs.findIndex((p) => p.step === step)
  const p = n.programs[idx]
  if (!p) return null
  return {
    step: p.step,
    title: p.cardTitle ?? p.name,
    desc: p.desc,
    tip: p.tip,
    tipTag: p.tipTag ?? null,
    image: PROGRAM_ASSETS.flowFeatured[id]?.[p.step] ?? null,
  }
}

/** flowOfNight 기본 핵심 포인트 (featuredStep 진입점) */
export const getFeaturedPoint = (id) => {
  const n = getNight(id)
  if (!n) return null
  return getFlowPoint(id, n.flowOfNight.featuredStep)
}

/** 카드 섹션용 — colorDark 포함 */
export const getCardData = () =>
  NIGHTS.map(({ id, nightCode, num, color, colorDark, style, card }) => ({
    id,
    nightCode,
    num,
    color,
    colorDark,
    style,
    ...card,
  }))

/** 배너 페이지용 */
export const getBannerData = () =>
  NIGHTS.map(({ id, nightCode, nightName, num, navLabel, color, style, banner }) => ({
    id,
    nightCode,
    nightName,
    num,
    navLabel,
    color,
    style,
    ...banner,
  }))

/** 예약 Step01 카드 목록 */
export const getReservationCards = () =>
  NIGHTS.map(({ id, num, color, style, reservation }) => ({
    id,
    num,
    color,
    style,
    ...reservation,
  }))

/** 예약 상세 (id 기준, BOOKING_COMMON 포함) */
export const getReservationData = (id) => {
  const n = getNight(id)
  if (!n) return null
  // ⚠️ reservation 의 키와 BOOKING_COMMON 의 키가 충돌할 경우
  //    BOOKING_COMMON 이 우선됨 (의도: 공통 값 보장)
  return {
    id: n.id,
    nightCode: n.nightCode,
    color: n.color,
    style: n.style,
    cardSubtitle: n.card.subtitle,
    ...n.reservation,
    ...BOOKING_COMMON,
  }
}
