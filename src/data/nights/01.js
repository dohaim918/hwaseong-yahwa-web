import { T, NIGHT_STYLE } from "@/styles/theme"
import { BANNER_COMMON, MODAL_COMMON, ROUTE_COMMON } from "@/data/nights/common"

// ══════════════════════════════════════════════════
//  1야  ·  핑크  ·  ROYAL ROUTE
// ══════════════════════════════════════════════════
const NIGHT_01 = {
  id: 1,
  color: T.pink,
  colorDim: T.pinkDim,
  colorDark: T.pinkDark,
  style: NIGHT_STYLE[1],
  nightCode: "NIGHT 01",
  nightName: "FIRST NIGHT",
  routeCode: "ROYAL ROUTE",
  num: "1",
  navLabel: "시작",

  card: {
    subtitle: "시작의 빛",
    keyword: "전통 · 설렘 · 시작",
    hoverDesc: "전통의 첫 불빛이 켜지며\n화성야화의 밤이 시작됩니다.",
    hoverCta: "첫 번째 밤으로",
  },

  banner: {
    ...BANNER_COMMON,
    subtitle: "시작의 빛",
    description: "전통의 첫 불빛이 켜지며\n화성야화의 밤이 시작됩니다.",
    tags: ["전통문화", "개막공연", "야간체험"],
    counterNum: "01",
    counterQuote: { prefix: "", accent: "첫 불빛", rest: "이 성벽 위에 깨어난다" },
  },

  modal: {
    ...MODAL_COMMON,
    badgeLabel: "1야",
    subTheme: "역사를 깨우다",
    mainTitle: "성벽에 불을 켜다",
    desc: "축제의 중심 무대.\n빛과 음악으로 축제의\n시작을 알립니다.",
    schedule: "매주 목요일",
    location: "화성행궁 일대",
    category: "축제의 중심",
    tip: "개막 퍼레이드는 화성행궁 광장에서 시작됩니다.",
  },

  // ────────────────────────────────────────────
  //  programs[]  ← 단일 소스
  //    featured   → modal에 표시
  //    cardTitle  → experience 카드에 표시
  //    step/time/name/place → timeline + route 공통
  //    address~mapXY        → route(지도모달) 전용
  // ────────────────────────────────────────────
  programs: [
    {
      step: "01",
      time: "19:00",
      name: "개막식 & 점등식",
      place: "화성행궁 광장",
      featured: true,
      category: "개막 & 점등식",
      cardTitle: "첫 점등 순간",
      cardDesc: "화성야화의 시작을 알리는 의식.\n불꽃·색채가 어우러진 개막식.",
      address: "수원특례시 팔달구 정조로 825",
      walk: "집결 장소",
      stay: "약 20분",
      desc: "화성야화의 시작을 알리는 성대한 개막식. 화성행궁 광장 전체에 불이 켜지는 순간 특별한 밤이 시작됩니다.",
      highlights: ["정조대왕 퍼포머 퍼레이드", "화성 성벽 일제 점등", "전통 악단 개막 연주"],
      tip: "개막 5분 전 광장 중앙에 위치하면 점등 연출을 정면으로 감상할 수 있어요.",
      mapXY: { x: 278, y: 402 },
    },
    {
      step: "02",
      time: "20:15",
      name: "능행차 퍼레이드",
      place: "장안문 일원",
      featured: true,
      category: "공연 & 퍼포먼스",
      cardTitle: "전통의 재해석",
      cardDesc: "화성야화의 밤을 수놓는 국악과\n전통무용 공연 관람.",
      address: "수원특례시 장안구 장안로 199",
      walk: "도보 약 12분 (약 800m)",
      stay: "약 15분",
      desc: "조선시대 화성의 북쪽 정문. 능행차 행렬이 통과하며 전통 군례를 시연합니다.",
      highlights: ["능행차 행렬 시연", "전통 군례 퍼포먼스", "횃불 행진 관람"],
      tip: "장안문 통과 직전 문루 상단에서 쏘는 조명 연출이 압권입니다.",
      mapXY: { x: 527, y: 108 },
    },
    {
      step: "03",
      time: "20:28",
      name: "화포 시연",
      place: "연무대 (동장대)",
      featured: true,
      category: "이야기 탐방",
      cardTitle: "성곽의 이야기",
      cardDesc: "전문 해설사와 함께 걷는\n화성의 역사 이야기.",
      address: "수원특례시 장안구 조원로 21",
      walk: "도보 약 8분 (약 520m)",
      stay: "약 20분",
      desc: "정조대왕 시대 군사 훈련 장소. 화포 시연과 함께 조선 군사 문화를 체험합니다.",
      highlights: ["화포(홍이포) 발사 시연", "조선 군사 문화 해설", "성벽 야경 포토존"],
      tip: "화포 시연은 소리가 크니 놀라지 마세요.",
      mapXY: { x: 740, y: 172 },
    },
    {
      step: "04",
      time: "20:42",
      name: "연못가 야경 감상",
      place: "방화수류정",
      featured: false,
      category: "미디어아트",
      cardTitle: "빛의 성벽",
      cardDesc: "빛과 음악이 어우러진\n몰입형 미디어아트 쇼.",
      address: "수원특례시 장안구 연무로 8번길 2",
      walk: "도보 약 7분 (약 450m)",
      stay: "약 25분",
      desc: "연못가에 자리한 아름다운 누각. 용연 수면에 비치는 불빛이 환상적인 분위기를 연출합니다.",
      highlights: ["용연 수면 조명 연출", "방화수류정 야간 개방", "포토존 운영"],
      tip: "용연 반대편 언덕에서 방화수류정과 수면 반영을 함께 담으면 최고의 사진이 됩니다.",
      mapXY: { x: 802, y: 262 },
    },
    {
      step: "05",
      time: "20:50",
      name: "능행차 피날레",
      place: "창룡문",
      featured: false,
      address: "수원특례시 팔달구 창룡대로 21",
      walk: "도착 장소",
      stay: "약 20분",
      desc: "화성의 동쪽 성문. 능행차의 마지막 종착점. 피날레 공연과 함께 1야의 여정이 마무리됩니다.",
      highlights: ["능행차 피날레 공연", "불꽃 연출 & 소등 세레머니", "기념 포토존 운영"],
      tip: "피날레 공연 전 창룡문 앞 광장에서 기념 포토존을 운영합니다.",
      mapXY: { x: 848, y: 360 },
    },
  ],

  route: {
    ...ROUTE_COMMON,
    tag: "NIGHT 01 · ROYAL ROUTE",
    title: "1야 추천 관람 동선",
    duration: "약 2시간 30분",
    totalPoints: 5,
    path: [
      [278, 402],
      [350, 288],
      [527, 108],
      [630, 140],
      [740, 172],
      [773, 218],
      [802, 262],
      [826, 312],
      [848, 360],
    ],
    buildingDesc: {
      장안문: "화성 북문. 보물 제402호.",
      창룡문: "화성 동문. 성벽을 따라 이어지는 야간 산책의 핵심 랜드마크.",
      화서문: "화성 서문.",
      팔달문: "화성 남문. 보물 제402호.",
      화성행궁: "조선 정조의 효심이 깃든 문화의 중심.",
      서장대: "화성장대. 군사 지휘소.",
      연무대: "동장대. 화포 시연의 무대.",
      방화수류정: "용연 연못가의 아름다운 누각.",
    },
  },

  flowOfNight: {
    h2: "시작의 빛을 따라 걷는 여정",
    featuredStep: "01",
    stats: {
      totalTime: "약 3시간",
      walkDist: "약 2.8km",
      viewerAge: "전 연령",
      difficulty: "보통",
      difficultyLevel: 3,
    },
  },

  reservation: {
    cardTitle: "달빛이 시작되는 성곽",
    scheduleLabel: "매주 목요일",
    dayOfWeek: "목요일",
    startTime: "19:00",
    calendarNote: "매주 목요일만 예약 가능합니다",
    tags: ["야경감상", "능행차 재현", "전통공연"],
    emoji: "🌕",
    timeSlots: [
      { time: "19:00", label: "저녁 입장", status: "available" },
      { time: "19:30", label: "저녁 입장", status: "available" },
      { time: "20:00", label: "저녁 입장", status: "closing" },
      { time: "20:30", label: "저녁 입장", status: "sold_out" },
    ],
    notices: ["입장 마감은 21:00입니다.", "개막일 당일 예약은 현장 접수만 가능합니다."],
  },

  finalInvitation: {
    schedule: "매주 목요일",
    hours: "18:00 – 22:30",
    location: "화성행궁 일대",
    priceFrom: "성인 20,000원~",
  },
}

export default NIGHT_01
