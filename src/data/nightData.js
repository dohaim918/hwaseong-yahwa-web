// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  nightData-v5.js  —  programs 단일 소스 구조
//
//  변경 사항 (v4 → v5):
//    route.waypoints + flowOfNight.timeline + modal.programs
//    + experience.cards  →  programs[] 하나로 통합
//
//  각 섹션은 programs[]에서 computed:
//    modal.programs    → programs.filter(p => p.featured)
//    timeline          → programs.map({ time, name, place })
//    route waypoints   → programs 전체 (route 필드 사용)
//    experience.cards  → programs.filter(p => p.cardTitle)
//
//  헬퍼 함수로 변환:
//    getModalPrograms(id)
//    getTimelineItems(id)
//    getWaypoints(id)
//    getExperienceCards(id)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { T, NIGHT_STYLE } from "../styles/theme"

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

export const NIGHTS = [
  // ══════════════════════════════════════════════════
  //  1야  ·  핑크  ·  ROYAL ROUTE
  // ══════════════════════════════════════════════════
  {
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
      subtitle: "시작의 빛",
      description: "전통의 첫 불빛이 켜지며\n화성야화의 밤이 시작됩니다.",
      tags: ["전통문화", "개막공연", "야간체험"],
      counterNum: "01",
      counterQuote: { accent: "첫 불빛", rest: "이 성벽 위에 깨어난다" },
      footerText: "네 개의 밤이 모여 하나의 이야기가 완성 됩니다.",
    },

    modal: {
      badgeLabel: "1야",
      subTheme: "역사를 깨우다",
      mainTitle: "성벽에 불을 켜다",
      desc: "축제의 중심 무대.\n빛과 음악으로 축제의\n시작을 알립니다.",
      schedule: "매주 목요일",
      location: "화성행궁 일대",
      category: "축제의 중심",
      tip: "개막 퍼레이드는 화성행궁 광장에서 시작됩니다.",
      closeLabel: "닫기",
      bookingLabel: "예약하기",
      // programs → getModalPrograms(1) 사용
    },

    // ────────────────────────────────────────────
    //  programs[]  ← 단일 소스
    //
    //  필드 설명:
    //    featured   → modal에 표시 (상위 3개)
    //    cardTitle  → experience 카드에 표시 (있는 것만)
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
        // experience 카드
        category: "개막 & 점등식",
        cardTitle: "첫 점등 순간",
        cardDesc: "화성야화의 시작을 알리는 성대한 의식. 불꽃·색채가 어우러진 화려한 개막식.",
        // route 상세
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
        cardDesc: "화성야화의 밤을 수놓는 국악과 전통무용 공연 관람.",
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
        cardDesc: "전문 해설사와 함께 걷는 화성의 역사 이야기.",
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
        cardDesc: "빛을 활용한 미디어아트 이벤트쇼. 몰입감 넘치는 IT예술쇼.",
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
      tag: "NIGHT 01 · ROYAL ROUTE",
      title: "1야 추천 관람 동선",
      duration: "약 2시간 30분",
      totalPoints: 5,
      guideText: "시간의 흐름을 따라 이어지는 주요 지점과 이동 경로를 한눈에 확인해보세요.",
      pinHint: "핀을 선택하면 상세 정보를 확인할 수 있어요",
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
      facilities: ["안내소", "화장실", "의료", "주차장"],
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
  },

  // ══════════════════════════════════════════════════
  //  2야  ·  앰버  ·  NIGHT JOURNEY
  // ══════════════════════════════════════════════════
  {
    id: 2,
    color: T.amber,
    colorDim: T.amberDim,
    colorDark: T.amberDark,
    style: NIGHT_STYLE[2],
    nightCode: "NIGHT 02",
    nightName: "NIGHT 02",
    routeCode: "NIGHT JOURNEY",
    num: "2",
    navLabel: "확장",

    card: {
      subtitle: "확장의 빛",
      keyword: "축제 · 화려함 · 확장",
      hoverDesc: "강렬한 빛과 에너지가 퍼지며\n도시 전체가 축제로 물듭니다.",
      hoverCta: "두 번째 밤으로",
    },

    banner: {
      subtitle: "확장의 빛",
      description: "강렬한 빛과 에너지가 퍼지며\n도시 전체가 축제로 물듭니다.",
      tags: ["미디어쇼", "퍼포먼스", "불꽃연출"],
      counterNum: "02",
      counterQuote: { prefix: "잠든 역사가 ", accent: "불꽃처럼", rest: " 피어난다" },
      footerText: "네 개의 밤이 모여 하나의 이야기가 완성 됩니다.",
    },

    modal: {
      badgeLabel: "2야",
      subTheme: "빛이 도시를 삼키다",
      mainTitle: "야간 성곽, 빛으로 물들다",
      desc: "강렬한 빛의 에너지가\n성 밖으로 번지며\n도시 전체가 하나가 됩니다.",
      schedule: "매주 금요일",
      location: "화성 성곽 일원",
      category: "야간 여정",
      tip: "해설사와 함께하는 성곽 탐방은 출발 10분 전 창룡문 앞 집결입니다.",
      closeLabel: "닫기",
      bookingLabel: "예약하기",
    },

    programs: [
      {
        step: "01",
        time: "19:00",
        name: "야간 여정의 시작",
        place: "창룡문",
        featured: true,
        category: "야간 성곽 탐방",
        cardTitle: "빛의 성벽길",
        cardDesc:
          "전문 해설사와 함께 야간에만 개방되는 성벽길을 걸으며 화성 축성의 비밀을 듣습니다.",
        address: "수원특례시 팔달구 창룡대로 21",
        walk: "출발 장소",
        stay: "약 10분",
        desc: "동쪽 성문에서 시작되는 야간 여정. 어둠 속 빛의 문을 지나 화성의 밤 속으로.",
        highlights: ["야간 성문 개방", "조명 아치 포토존", "해설사 출발 브리핑"],
        tip: "창룡문 안쪽 아치에서 보는 야경이 이색적인 프레임 샷을 만들어줍니다.",
        mapXY: { x: 848, y: 360 },
      },
      {
        step: "02",
        time: "19:20",
        name: "성곽 탐방",
        place: "성벽길 일대",
        featured: true,
        category: "미디어아트 & 공연",
        cardTitle: "화성행궁의 밤",
        cardDesc:
          "정조의 꿈이 깃든 궁궐에서 미디어아트와 전통 공연이 어우러지는 야간 경관을 감상합니다.",
        address: "화성 동측 성벽 일대",
        walk: "도보 약 10분 (약 620m)",
        stay: "약 30분",
        desc: "역사의 숨결을 따라 걷는 야간 성곽 탐방. 전문 해설사와 함께 화성 축성의 비밀을 듣습니다.",
        highlights: ["전문 문화해설사 동반", "야간 성벽 특별 개방", "축성 비밀 해설 투어"],
        tip: "해설사가 들려주는 정조대왕의 화성 축성 이야기를 놓치지 마세요.",
        mapXY: { x: 638, y: 232 },
      },
      {
        step: "03",
        time: "20:10",
        name: "미디어아트 & 전통 공연",
        place: "화성행궁",
        featured: true,
        category: "달빛 산책",
        cardTitle: "방화수류정 야경",
        cardDesc: "연못에 비치는 조명이 환상적인 분위기를 연출하는 방화수류정 야간 개방 특별 관람.",
        address: "수원특례시 팔달구 정조로 825",
        walk: "도보 약 12분 (약 780m)",
        stay: "약 40분",
        desc: "정조의 꿈이 깃든 궁궐의 밤. 미디어아트와 전통 공연이 어우러진 야간 경관을 감상합니다.",
        highlights: ["미디어아트 프로젝션 맵핑", "전통 공연 (국악·무용)", "야간 궁궐 내부 관람"],
        tip: "정전 앞 마당에서 상영되는 미디어아트는 야간 개방 시간 중 매 시 정각 시작됩니다.",
        mapXY: { x: 278, y: 402 },
      },
      {
        step: "04",
        time: "20:50",
        name: "달빛 속 휴식",
        place: "방화수류정",
        featured: false,
        category: "빛의 마무리",
        cardTitle: "용연의 빛",
        cardDesc: "잔잔한 물결 위로 반짝이는 빛의 향연. 화성야화 2야의 감동적인 마무리.",
        address: "수원특례시 장안구 연무로 8번길 2",
        walk: "도보 약 8분 (약 500m)",
        stay: "약 25분",
        desc: "달빛 속 휴식과 함께하는 아름다운 풍경. 연못에 비치는 조명이 환상적인 분위기를 연출합니다.",
        highlights: ["방화수류정 내부 야간 개방", "용연 수면 조명 감상", "달빛 산책 포토존"],
        tip: "방화수류정 내부는 야간에만 개방됩니다. 내부에서 바라보는 용연 야경이 일품입니다.",
        mapXY: { x: 802, y: 262 },
      },
      {
        step: "05",
        time: "21:20",
        name: "빛의 마무리",
        place: "용연 & 정원",
        featured: false,
        address: "수원특례시 장안구 연무로 8번길",
        walk: "마무리 장소",
        stay: "자유 관람",
        desc: "잔잔한 물결 위로 반짝이는 빛의 향연. 화성야화 2야의 감동적인 마무리 장소입니다.",
        highlights: [
          "수면 위 조명 연출",
          "정원 카페 운영 (21:00까지)",
          "2야 여정 마무리 기념 스탬프",
        ],
        tip: "용연 정원 카페에서 야경을 감상하며 여정을 마무리하세요.",
        mapXY: { x: 762, y: 308 },
      },
    ],

    route: {
      tag: "NIGHT 02 · NIGHT JOURNEY",
      title: "2야 야간 여정 코스",
      duration: "약 2시간 15분",
      totalPoints: 5,
      guideText: "시간의 흐름을 따라 이어지는 주요 지점과 이동 경로를 한눈에 확인해보세요.",
      pinHint: "핀을 선택하면 상세 정보를 확인할 수 있어요",
      path: [
        [848, 360],
        [770, 336],
        [638, 232],
        [490, 292],
        [278, 402],
        [442, 408],
        [618, 312],
        [802, 262],
        [762, 308],
      ],
      buildingDesc: {
        장안문: "화성 북문. 보물 제402호.",
        창룡문: "화성 동문.",
        화서문: "화성 서문.",
        팔달문: "화성 남문. 보물 제402호.",
        화성행궁: "조선 정조의 효심이 깃든 문화의 중심.",
        서장대: "화성장대. 군사 지휘소.",
        연무대: "동장대.",
        방화수류정: "용연 연못가의 아름다운 누각.",
      },
      facilities: ["안내소", "화장실", "의료", "주차장"],
    },

    flowOfNight: {
      h2: "확장의 빛을 따라 걷는 여정",
      featuredStep: "03",
      stats: {
        totalTime: "약 2시간 15분",
        walkDist: "약 2.1km",
        viewerAge: "전 연령",
        difficulty: "보통",
        difficultyLevel: 3,
      },
    },

    reservation: {
      cardTitle: "여정의 흐름",
      scheduleLabel: "매주 금요일",
      dayOfWeek: "금요일",
      startTime: "19:00",
      calendarNote: "매주 금요일만 예약 가능합니다",
      tags: ["성곽 투어", "불꽃 퍼포먼스", "DJ 라이브"],
      emoji: "🔥",
      timeSlots: [
        { time: "19:00", label: "저녁 입장", status: "available" },
        { time: "19:30", label: "저녁 입장", status: "available" },
        { time: "20:00", label: "저녁 입장", status: "closing" },
        { time: "20:30", label: "저녁 입장", status: "sold_out" },
      ],
      notices: ["입장 마감은 21:00입니다."],
    },

    finalInvitation: {
      schedule: "매주 금요일",
      hours: "19:00 – 22:30",
      location: "화성 성곽 일원",
      priceFrom: "성인 20,000원~",
    },
  },

  // ══════════════════════════════════════════════════
  //  3야  ·  에메랄드  ·  MEDIA ART ROUTE
  // ══════════════════════════════════════════════════
  {
    id: 3,
    color: T.emerald,
    colorDim: T.emeraldDim,
    colorDark: T.emeraldDark,
    style: NIGHT_STYLE[3],
    nightCode: "NIGHT 03",
    nightName: "NIGHT 03",
    routeCode: "MEDIA ART ROUTE",
    num: "3",
    navLabel: "흐름",

    card: {
      subtitle: "흐름의 빛",
      keyword: "여유 · 힐링 · 연결",
      hoverDesc: "빛과 소리, 공간의 파동이 만나\n새로운 감각을 흔들어 깨웁니다.",
      hoverCta: "세 번째 밤으로",
    },

    banner: {
      subtitle: "흐름의 빛",
      description: "빛과 소리, 공간의 파동이 만나\n새로운 감각을 흔들어 깨웁니다.",
      tags: ["미디어아트", "사운드아트", "야간투어"],
      counterNum: "03",
      counterQuote: { prefix: "", accent: "", rest: "소리와 물결이 밤을 물들인다" },
      footerText: "네 개의 밤이 모여 하나의 이야기가 완성 됩니다.",
    },

    modal: {
      badgeLabel: "3야",
      subTheme: "감각이 흐르다",
      mainTitle: "빛과 소리의 물결",
      desc: "공간과 감각의 경계가\n허물어지는 순간,\n새로운 예술이 흐릅니다.",
      schedule: "매주 토요일",
      location: "화성 미디어아트센터 · 성곽 일원",
      category: "감각 예술",
      tip: "공연 시작 10분 전 입장해야 최적의 자리를 확보할 수 있어요.",
      closeLabel: "닫기",
      bookingLabel: "예약하기",
    },

    programs: [
      {
        step: "01",
        time: "18:30",
        name: "사운드 아트 퍼포먼스",
        place: "미디어아트센터",
        featured: true,
        category: "사운드 아트",
        cardTitle: "소리의 공간",
        cardDesc: "전통 악기와 전자음악이 융합된 360° 몰입형 사운드 아트 퍼포먼스.",
        address: "수원특례시 장안구 장안로 458",
        walk: "집결 장소",
        stay: "약 30분",
        desc: "소리와 빛이 하나로 융합되는 몰입형 아트 퍼포먼스. 전통 악기와 전자음악이 융합된 입체적인 사운드.",
        highlights: [
          "입체 사운드 아트 퍼포먼스",
          "전통 악기 × 전자음악 융합",
          "360° 몰입형 미디어 체험",
        ],
        tip: "공연 시작 10분 전 입장해야 최적의 자리를 확보할 수 있어요.",
        mapXY: { x: 210, y: 294 },
      },
      {
        step: "02",
        time: "19:00",
        name: "미디어아트 전시 관람",
        place: "전시관 일대",
        featured: true,
        category: "미디어 전시",
        cardTitle: "디지털 화성",
        cardDesc: "화성의 역사를 디지털 기술로 재현한 미디어아트 전시. AR 체험 포함.",
        address: "화성 전시관 일대",
        walk: "도보 약 5분 (약 320m)",
        stay: "약 40분",
        desc: "디지털 기술로 재현하는 화성의 역사와 미래. 선택한 코스에 따라 다른 관람 동선이 제공됩니다.",
        highlights: ["화성 역사 디지털 아카이브", "AR 체험 부스", "코스별 맞춤 체험 프로그램"],
        tip: "자신의 코스 티켓에 맞는 전시관 동선을 확인하고 이동하세요.",
        mapXY: { x: 356, y: 350 },
      },
      {
        step: "03",
        time: "20:30",
        name: "야간 성곽 탐방",
        place: "성곽 투어 코스",
        featured: true,
        category: "야간 성곽 투어",
        cardTitle: "성벽의 비밀",
        cardDesc: "전문 문화해설사와 함께하는 야간 성곽 특별 투어. 그룹별 20명 한정 운영.",
        address: "화성 성벽 투어 코스",
        walk: "도보 약 15분 (약 950m)",
        stay: "약 45분",
        desc: "전문 문화해설사와 함께하는 야간 성곽 투어. 그룹별 20명 한정 운영.",
        highlights: [
          "문화해설사 전담 동행",
          "야간 특별 개방 구간 탐방",
          "성벽 위 야경 감상 포인트",
        ],
        tip: "그룹당 20명 한정 운영이니 사전 접수를 완료하고 이동하세요.",
        mapXY: { x: 638, y: 232 },
      },
      {
        step: "04",
        time: "21:30",
        name: "감성 콘서트",
        place: "화성행궁",
        featured: false,
        category: "감성 콘서트",
        cardTitle: "음악의 밤",
        cardDesc: "화성행궁 야외 무대의 국악·클래식 크로스오버 공연. 야외 좌석제 운영.",
        address: "수원특례시 팔달구 정조로 825",
        walk: "도보 약 10분 (약 620m)",
        stay: "약 40분",
        desc: "화성행궁 야외 무대의 감성 콘서트. 화성의 밤과 어우러지는 감동적인 음악 공연.",
        highlights: ["국악·클래식 크로스오버 앙상블", "전석 좌석제 운영", "화성 야경 배경 무대"],
        tip: "야외 공연이므로 기온이 낮을 수 있습니다. 겉옷을 준비하세요.",
        mapXY: { x: 278, y: 402 },
      },
      {
        step: "05",
        time: "22:00",
        name: "수면 미디어쇼",
        place: "용연",
        featured: false,
        address: "수원특례시 장안구 연무로 8번길",
        walk: "도보 약 5분 (약 330m)",
        stay: "약 25분",
        desc: "용연 연못 위에 펼쳐지는 수면 미디어아트. 3야의 모든 감동이 하나로 모이는 대미.",
        highlights: [
          "수면 미디어아트 피날레 쇼",
          "레이저·워터 연출 결합",
          "3야 특별 엔딩 세레머니",
        ],
        tip: "용연 동쪽 관람 데크가 정면 시야 확보에 유리합니다.",
        mapXY: { x: 762, y: 308 },
      },
    ],

    route: {
      tag: "NIGHT 03 · MEDIA ART ROUTE",
      title: "3야 미디어아트 코스",
      duration: "약 3시간 20분",
      totalPoints: 5,
      guideText: "시간의 흐름을 따라 이어지는 주요 지점과 이동 경로를 한눈에 확인해보세요.",
      pinHint: "핀을 선택하면 상세 정보를 확인할 수 있어요",
      path: [
        [210, 294],
        [282, 322],
        [356, 350],
        [508, 340],
        [638, 232],
        [508, 350],
        [356, 414],
        [278, 402],
        [530, 402],
        [762, 308],
      ],
      buildingDesc: {
        장안문: "화성 북문.",
        창룡문: "화성 동문.",
        화서문: "화성 서문.",
        팔달문: "화성 남문.",
        화성행궁: "조선 정조의 효심이 깃든 문화의 중심.",
        서장대: "화성장대. 군사 지휘소.",
        연무대: "동장대.",
        방화수류정: "용연 연못가의 아름다운 누각.",
      },
      facilities: ["안내소", "화장실", "의료", "주차장"],
    },

    flowOfNight: {
      h2: "흐름의 빛을 따라 걷는 여정",
      featuredStep: "01",
      stats: {
        totalTime: "약 3시간 20분",
        walkDist: "약 3.2km",
        viewerAge: "전 연령",
        difficulty: "보통",
        difficultyLevel: 3,
      },
    },

    reservation: {
      cardTitle: "올림의 빛",
      scheduleLabel: "매주 토요일",
      dayOfWeek: "토요일",
      startTime: "18:30",
      calendarNote: "매주 토요일만 예약 가능합니다",
      tags: ["미디어아트", "코스 선택", "감성콘서트"],
      emoji: "🌊",
      timeSlots: [
        { time: "18:30", label: "저녁 입장", status: "available" },
        { time: "19:30", label: "저녁 입장", status: "available" },
        { time: "20:00", label: "저녁 입장", status: "closing" },
        { time: "20:30", label: "저녁 입장", status: "sold_out" },
      ],
      notices: ["입장 마감은 21:00입니다."],
    },

    finalInvitation: {
      schedule: "매주 토요일",
      hours: "18:30 – 22:30",
      location: "화성 미디어아트센터 · 성곽 일원",
      priceFrom: "성인 20,000원~",
    },
  },

  // ══════════════════════════════════════════════════
  //  4야  ·  바이올렛  ·  MOONLIT WALK
  // ══════════════════════════════════════════════════
  {
    id: 4,
    color: T.violet,
    colorDim: T.violetDim,
    colorDark: T.violetDark,
    style: NIGHT_STYLE[4],
    nightCode: "NIGHT 04",
    nightName: "NIGHT 04",
    routeCode: "MOONLIT WALK",
    num: "4",
    navLabel: "달빛",

    card: {
      subtitle: "달빛의 여운",
      keyword: "감동 · 여운 · 기억",
      hoverDesc: "모든 순간이 지나간 자리 위로\n깊고 잔잔한 빛이 머뭅니다.",
      hoverCta: "네 번째 밤으로",
    },

    banner: {
      subtitle: "달빛의 여운",
      description: "모든 순간이 지나간 자리 위로\n깊고 잔잔한 빛이 머뭅니다.",
      tags: ["피날레", "야경감상", "달빛산책"],
      counterNum: "04",
      counterQuote: { prefix: "모든 빛은 달빛 아래", accent: "", rest: " 머문다" },
      footerText: "네 개의 밤이 모여 하나의 이야기가 완성 됩니다.",
    },

    modal: {
      badgeLabel: "4야",
      subTheme: "여운이 머물다",
      mainTitle: "달빛 아래 머무는 밤",
      desc: "모든 빛이 사그라든 후\n달빛만이 고요히 남아\n기억이 되어 머뭅니다.",
      schedule: "매주 일요일",
      location: "화성행궁 · 달빛 산책로",
      category: "피날레",
      tip: "소등식 직전 광장 중앙에 모이면 하나씩 꺼지는 불빛의 감동을 온전히 느낄 수 있습니다.",
      closeLabel: "닫기",
      bookingLabel: "예약하기",
    },

    programs: [
      {
        step: "01",
        time: "18:30",
        name: "달빛 산책 출발",
        place: "화성행궁 광장",
        featured: true,
        category: "달빛 산책",
        cardTitle: "성곽의 달빛",
        cardDesc: "달빛 아래 소그룹 문화해설사와 함께하는 야간 성곽 산책. 10인 한정 운영.",
        address: "수원특례시 팔달구 정조로 825",
        walk: "집결 장소",
        stay: "약 15분",
        desc: "달빛 아래 성곽을 거니는 소그룹 야간 산책의 시작. 문화해설사와 함께 화성의 밤 속으로.",
        highlights: [
          "소그룹 전담 문화해설사",
          "야간 산책 코스 오리엔테이션",
          "달빛 산책 기념 키트 증정",
        ],
        tip: "소그룹 10인 한정이므로 코스 집결 시간 5분 전 광장 안내 데스크에서 확인하세요.",
        mapXY: { x: 278, y: 402 },
      },
      {
        step: "02",
        time: "19:00",
        name: "달빛 야경 감상",
        place: "방화수류정",
        featured: true,
        category: "클래식 & 국악",
        cardTitle: "별빛 아래 음악",
        cardDesc: "서양 클래식과 한국 국악이 한 무대에서 만나는 크로스오버 앙상블. 전석 좌석제.",
        address: "수원특례시 장안구 연무로 8번길 2",
        walk: "도보 약 18분 (약 1.1km)",
        stay: "약 30분",
        desc: "달빛 속 방화수류정 경유. 용연 연못에 비친 달빛과 성벽 조명이 어우러지는 환상적인 경관.",
        highlights: [
          "방화수류정 달빛 야경 감상",
          "용연 수면 달빛 포토존",
          "해설사와 함께하는 역사 이야기",
        ],
        tip: "용연 북쪽 언덕에서 방화수류정과 달빛 반영을 함께 담으면 최고의 달빛 야경이 됩니다.",
        mapXY: { x: 802, y: 262 },
      },
      {
        step: "03",
        time: "19:30",
        name: "클래식 & 국악 앙상블",
        place: "화성행궁 야외 무대",
        featured: true,
        category: "루프탑 시네마",
        cardTitle: "별빛 영화관",
        cardDesc: "화성의 야경을 파노라마 배경으로 즐기는 야외 특별 상영회. 담요 무료 대여.",
        address: "화성행궁 야외 공연장",
        walk: "도보 약 15분 (약 950m)",
        stay: "약 50분",
        desc: "서양 클래식과 한국 국악이 한 무대에서 만나는 크로스오버 앙상블.",
        highlights: ["클래식 × 국악 크로스오버 앙상블", "전석 좌석제 운영", "화성 야경 배경 무대"],
        tip: "전석 좌석제이므로 공연 시작 15분 전까지 착석해주세요.",
        mapXY: { x: 310, y: 448 },
      },
      {
        step: "04",
        time: "20:30",
        name: "루프탑 시네마",
        place: "화성행궁 루프탑",
        featured: false,
        category: "소등식 세레머니",
        cardTitle: "빛의 마무리",
        cardDesc: "모든 불빛이 하나씩 꺼져가는 감동적인 엔딩 세레머니. 4일간의 화성야화 피날레.",
        address: "화성행궁 루프탑",
        walk: "도보 약 3분 (약 180m)",
        stay: "약 60분",
        desc: "별빛이 쏟아지는 야외에서 감상하는 특별 상영회. 화성의 야경을 파노라마 배경으로 즐기는 경험.",
        highlights: [
          "야외 루프탑 영화 상영",
          "화성 야경 파노라마 배경",
          "담요 무료 대여·핫초코 판매",
        ],
        tip: "담요 무료 대여 가능합니다. 상영 영화는 화성야화 기간 전용 편성으로 운영됩니다.",
        mapXY: { x: 245, y: 346 },
      },
      {
        step: "05",
        time: "22:00",
        name: "소등식 & 엔딩 세레머니",
        place: "화성행궁 광장",
        featured: false,
        address: "화성행궁 광장",
        walk: "마무리 장소",
        stay: "약 20분",
        desc: "하나씩 꺼져가는 불빛 속 화성야화의 마지막. 모든 참가자가 함께하는 감동적인 소등식.",
        highlights: [
          "전체 참가자 소등식 참여",
          "4일간 화성야화 마무리 세레머니",
          "기념 포토 & 스탬프 투어 완료",
        ],
        tip: "소등식 직전 광장 중앙에 모이면 하나씩 꺼지는 불빛의 감동을 온전히 느낄 수 있습니다.",
        mapXY: { x: 278, y: 402 },
      },
    ],

    route: {
      tag: "NIGHT 04 · MOONLIT WALK",
      title: "4야 달빛 산책 코스",
      duration: "약 3시간 30분",
      totalPoints: 5,
      guideText: "시간의 흐름을 따라 이어지는 주요 지점과 이동 경로를 한눈에 확인해보세요.",
      pinHint: "핀을 선택하면 상세 정보를 확인할 수 있어요",
      path: [
        [278, 402],
        [558, 362],
        [802, 262],
        [574, 340],
        [310, 448],
        [245, 346],
        [278, 402],
      ],
      buildingDesc: {
        장안문: "화성 북문.",
        창룡문: "화성 동문.",
        화서문: "화성 서문.",
        팔달문: "화성 남문.",
        화성행궁: "조선 정조의 효심이 깃든 문화의 중심.",
        서장대: "화성장대.",
        연무대: "동장대.",
        방화수류정: "용연 연못가의 아름다운 누각.",
      },
      facilities: ["안내소", "화장실", "의료", "주차장"],
    },

    flowOfNight: {
      h2: "달빛의 여운을 따라 걷는 여정",
      featuredStep: "03",
      stats: {
        totalTime: "약 3시간 30분",
        walkDist: "약 2.5km",
        viewerAge: "전 연령",
        difficulty: "쉬움",
        difficultyLevel: 2,
      },
    },

    reservation: {
      cardTitle: "고요의 빛",
      scheduleLabel: "매주 일요일",
      dayOfWeek: "일요일",
      startTime: "18:30",
      calendarNote: "매주 일요일만 예약 가능합니다",
      tags: ["달빛 산책", "클래식 공연", "엔딩 세레머니"],
      emoji: "🌙",
      timeSlots: [
        { time: "18:30", label: "저녁 입장", status: "available" },
        { time: "19:30", label: "저녁 입장", status: "available" },
        { time: "20:00", label: "저녁 입장", status: "closing" },
        { time: "20:30", label: "저녁 입장", status: "sold_out" },
      ],
      notices: ["입장 마감은 21:00입니다."],
    },

    finalInvitation: {
      schedule: "매주 일요일",
      hours: "18:30 – 22:30",
      location: "화성행궁 · 달빛 산책로",
      priceFrom: "성인 20,000원~",
    },
  },
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  기본 헬퍼
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const getNight = (id) => NIGHTS.find((n) => n.id === id)
export const getNightByIndex = (index) => NIGHTS[index]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  섹션별 computed 헬퍼  (programs[] → 각 섹션 형태로 변환)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/** modal 프로그램 3개 (featured: true) */
export const getModalPrograms = (id) =>
  getNight(id)
    ?.programs.filter((p) => p.featured)
    .map(({ name, place, time }) => ({ name, place, time })) ?? []

/** flowOfNight 타임라인 (전체, 간략 형태) */
export const getTimelineItems = (id) =>
  getNight(id)?.programs.map(({ time, name, place }) => ({ time, program: name, place })) ?? []

/** route 웨이포인트 (전체 필드) */
export const getWaypoints = (id) =>
  getNight(id)?.programs.map((p) => ({
    step: p.step,
    time: p.time,
    label: p.place,
    program: p.name,
    address: p.address,
    walk: p.walk,
    stay: p.stay,
    desc: p.desc,
    highlights: p.highlights,
    tip: p.tip,
    mapXY: p.mapXY,
  })) ?? []

/** experience 카드 (cardTitle 있는 것) */
export const getExperienceCards = (id) =>
  getNight(id)
    ?.programs.filter((p) => p.cardTitle)
    .map(({ category, cardTitle, cardDesc }) => ({
      category,
      title: cardTitle,
      desc: cardDesc,
    })) ?? []

/** flowOfNight 핵심 포인트 패널 데이터 */
export const getFeaturedPoint = (id) => {
  const n = getNight(id)
  if (!n) return null
  const p = n.programs.find((p) => p.step === n.flowOfNight.featuredStep)
  return p ? { title: p.cardTitle ?? p.name, desc: p.desc, tip: p.tip } : null
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
