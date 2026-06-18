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
      flowDesc: "광장 전체에 첫 불이 켜지는 개막의 순간",
      tipTag: "#오프닝 추천",
      featured: true,
      category: "개막 & 점등식",
      cardTitle: "첫 점등 순간",
      cardDesc: "화성야화의 시작을 알리는 의식.\n불꽃·색채가 어우러진 개막식.",
      address: "수원특례시 팔달구 정조로 825",
      walk: "출발 지점",
      rec: "점등 포토존, 공연 관람",
      stay: "약 20분",
      desc: "화성야화의 시작을 알리는 성대한 개막식입니다. 광장 전체에 첫 불이 켜지며 특별한 밤이 열립니다.",
      highlights: ["정조대왕 퍼포머 퍼레이드", "화성 성벽 일제 점등", "전통 악단 개막 연주"],
      tip: "개막 5분 전 광장 중앙에서 점등 연출을 정면으로 보세요.",
      mapXY: { x: 482, y: 441 }, // 화성행궁 광장 (SVG 경로 시작)
    },
    {
      step: "02",
      time: "20:15",
      name: "능행차 퍼레이드",
      place: "장안문 일원",
      flowDesc: "능행차 행렬과 전통 군례가 펼쳐지는 장안문",
      tipTag: "#퍼레이드 명당",
      featured: true,
      category: "공연 & 퍼포먼스",
      cardTitle: "전통의 재해석",
      cardDesc: "화성야화의 밤을 수놓는 국악과\n전통무용 공연 관람.",
      address: "수원특례시 장안구 장안로 199",
      walk: "도보 약 12분 (약 800m)",
      rec: "능행차 명당, 문루 조명",
      stay: "약 15분",
      desc: "조선시대 화성 북쪽 정문을 배경으로 능행차가 이어집니다. 행렬과 함께 전통 군례를 감상합니다.",
      highlights: ["능행차 행렬 시연", "전통 군례 퍼포먼스", "횃불 행진 관람"],
      tip: "장안문 문루 위 조명이 켜지는 순간을 놓치지 마세요.",
      mapXY: { x: 525, y: 184 }, // 장안문 (SVG 경로 글로우 끝점)
    },
    {
      step: "03",
      time: "20:28",
      name: "연못가 야경 감상",
      place: "방화수류정",
      flowDesc: "용연 수면 위로 번지는 누각의 불빛",
      tipTag: "#야경 명소",
      featured: true,
      category: "미디어아트",
      cardTitle: "빛의 성벽",
      cardDesc: "빛과 음악이 어우러진\n몰입형 미디어아트 쇼.",
      address: "수원특례시 장안구 연무로 8번길 2",
      walk: "도보 약 7분 (약 450m)",
      rec: "용연 반영 포토존",
      stay: "약 25분",
      desc: "연못가에 자리한 누각이 밤빛을 머금는 공간입니다. 용연 수면에 비친 불빛이 고요한 분위기를 만듭니다.",
      highlights: ["용연 수면 조명 연출", "방화수류정 야간 개방", "포토존 운영"],
      tip: "용연 맞은편에서 누각과 물빛을 한 컷에 담아보세요.",
      mapXY: { x: 630, y: 192 }, // 방화수류정 (용연가 누각) — SVG 끝점
    },
    {
      step: "04",
      time: "20:42",
      name: "화포 시연",
      place: "연무대 (동장대)",
      flowDesc: "화포 소리와 함께 되살아나는 조선의 군사 훈련",
      tipTag: "#소리 주의",
      featured: false,
      category: "이야기 탐방",
      cardTitle: "성곽의 이야기",
      cardDesc: "전문 해설사와 함께 걷는\n화성의 역사 이야기.",
      address: "수원특례시 장안구 조원로 21",
      walk: "도보 약 8분 (약 520m)",
      rec: "화포 시연, 성벽 야경",
      stay: "약 20분",
      desc: "정조대왕 시대 군사 훈련이 이루어지던 공간입니다. 화포 시연과 함께 조선 군사 문화를 체험합니다.",
      highlights: ["화포(홍이포) 발사 시연", "조선 군사 문화 해설", "성벽 야경 포토존"],
      tip: "화포 시연 전 안내 방송을 듣고 위치를 확인해 주세요.",
      mapXY: { x: 719, y: 141 }, // 연무대 (동장대) — SVG 끝점
    },
    {
      step: "05",
      time: "20:50",
      name: "능행차 피날레",
      place: "창룡문",
      flowDesc: "능행차의 마지막 종착점에서 맞는 피날레",
      tipTag: "#피날레",
      featured: false,
      address: "수원특례시 팔달구 창룡대로 21",
      walk: "도착 지점",
      rec: "피날레 공연, 소등 연출",
      stay: "약 20분",
      desc: "동쪽 성문에서 능행차의 마지막 장면이 이어집니다. 피날레 공연과 함께 1야의 여정이 마무리됩니다.",
      highlights: ["능행차 피날레 공연", "불꽃 연출 & 소등 세레머니", "기념 포토존 운영"],
      tip: "피날레 전 창룡문 앞 기념 포토존 위치를 확인해 주세요.",
      mapXY: { x: 747, y: 261 }, // 창룡문 (SVG 경로 끝)
    },
  ],

  route: {
    ...ROUTE_COMMON,
    tag: "NIGHT 01 · ROYAL ROUTE",
    title: "1야 추천 관람 동선",
    duration: "약 2시간 30분",
    totalPoints: 5,
    // route-1.svg 핀 좌표 → webp 정렬 변환(x=0.886s+462.8, y=1.043s+93)
    path: [
      [490, 440],
      [555, 432],
      [601, 241],
      [616, 177],
      [672, 156],
      [700, 125],
      [724, 251],
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
    dayOfWeek: "목요일",
    startTime: "19:00",
    tags: ["야경감상", "능행차 재현", "전통공연"],
    emoji: "🌕",
    extraNotices: ["개막일 당일 예약은 현장 접수만 가능합니다."],
  },

  finalInvitation: {
    schedule: "매주 목요일",
    hours: "18:00 – 22:30",
    location: "화성행궁 일대",
    priceFrom: "성인 20,000원~",
  },
}

export default NIGHT_01
