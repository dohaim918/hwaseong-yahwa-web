// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  uiText.js  —  페이지·섹션 단위 UI 문자열
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { BANNER_COMMON, BOOKING_COMMON, MODAL_COMMON } from "@/data/nights/common"

export const UI_TEXT = {
  // ─────────────────────────────────────
  //  공통 네비게이션
  // ─────────────────────────────────────
  nav: {
    brand: "화성야화",
    brandEn: "HWASEONG NIGHT",
    items: [
      { label: "행사소개", to: "/about", type: "mvp" },
      { label: "프로그램", to: "/programs", type: "link" },
      { label: "관람안내", to: "/venue", type: "mvp" },
      { label: "갤러리", to: "/gallery", type: "mvp" },
    ],
    ctaLabel: "예약하기",
    ctaTo: "/booking",
    ctaType: "link",
    allPrograms: "전체 프로그램 보기",
  },

  // ─────────────────────────────────────
  //  메인 Hero 섹션
  // ─────────────────────────────────────
  hero: {
    hanjaLabel: "華城夜火",
    festivalLabel: "2026 MEDIA ART FESTIVAL",
    h2: {
      plain: "화성야화",
    },
    sub: "유네스코 세계유산이 미디어아트를 만나다",
    date: "09.20 — 09.29",
    location: "UNESCO HWASEONG",
    ctaPrimary: "프로그램 보기",
    ctaSecondary: "예약하기 →",
  },

  // ─────────────────────────────────────
  //  메인 ProgSection (프로그레스 페이지와 공유)
  // ─────────────────────────────────────
  progSection: {
    sectionLabel: "LIGHTS OF THE NIGHT",
    h2: {
      gradStart: "당신은 어떤 밤을 ",
      gradEnd: "걷고 싶나요",
    },
    desc: "네 개의 빛, 하나의 여정.\n네 가지 밤이 서로 다른 빛으로 펼쳐집니다.",
    bottomHint: "원하는 프로그램을 선택해보세요.",
  },

  // ─────────────────────────────────────
  //  메인 VENUE 섹션
  // ─────────────────────────────────────
  venue: {
    sectionLabel: "VENUE",
    sectionSub: "화성에서 만나요",
    guideLink: "관람 안내 보기",
    subLabel: "THE NIGHT PATH",
    h2: {
      line1: "천 년의 시간,",
      line2Grad: "빛으로 깨어난 성곽의 밤", // amber gradient
    },
    desc: "조선 정조 시대의 성벽이 빛과 예술로 깨어나는 밤.\n그 길을 따라 빛과 소리, 이야기가 흐르는 밤이 펼쳐집니다.",
    // 행사 정보 박스
    info: {
      location: { label: "장소", value: "수원화성 일원", mini: "수원화성" },
      hours: { label: "시간", value: "18:00 ~ 22:30", mini: "18 ~ 22시" },
      price: { label: "티켓", value: "성인 2만원~", mini: "2만원~" },
    },
    // 오시는 길
    access: {
      title: "오시는 길",
      items: [
        { icon: "subway", label: "화서역 2번 출구", sub: "도보 10분" },
        { icon: "bus", label: "정류장 하차 후", sub: "도보 3분" },
        { icon: "car", label: "화성행궁 주차장", sub: "(주말 조기 만차)" },
      ],
    },
  },

  // ─────────────────────────────────────
  //  메인 ABOUT 섹션
  // ─────────────────────────────────────
  about: {
    sectionLabel: "ABOUT THE FESTIVAL",
    h2: {
      line1: "조선의 성벽 위로",
      line2Grad: "빛의 예술이 흐른다", // emerald gradient
    },
    desc: "유네스코 세계유산 화성에서 펼쳐지는 4야간의 여정,\n성벽과 빛이 하나가 되는 미디어아트 축제",
    // 통계 카드 4개 — 색·잠금 딜레이는 데이터 안에서 직접 지정
    //   colorKey: theme.T 의 키 (pink/emerald/amber/violet)
    //   lockDelay: ms — useCounter 가 스크램블 종료 후 target 으로 잠그는 시각
    stats: [
      { value: 4, unit: "일", label: "행사 기간", colorKey: "pink", lockDelay: 1400 },
      { value: 4, unit: "야", label: "프로그램 구분", colorKey: "emerald", lockDelay: 1600 },
      { value: 23, unit: "팀", label: "참여 아티스트", colorKey: "amber", lockDelay: 1900 },
      { value: 12, unit: "만+", label: "누적 관람 인원", colorKey: "violet", lockDelay: 2200 },
    ],
    ctaPrimary: "프로그램 보기",
    ctaSecondary: "영상으로 보기",
  },

  // ─────────────────────────────────────
  //  메인 GALLERY 섹션

  // ─────────────────────────────────────
  gallery: {
    sectionLabel: "GALLERY",
    sectionSub: "지난 밤의 기억들",
    allLink: "전체 갤러리",
    subLabel: "MEMORIES OF THE NIGHT", // 화성야화 갤러리 브랜드 레이블 (고정)
    h2: {
      gradStart: "화성야화가 남긴 ",
      gradEnd: "빛의 흔적", // purple gradient
    },
    desc: "스쳐간 불빛과 사람들의 온기,\n그날의 장면들이 다시 천천히 펼쳐집니다.",
    viewScene: "View Scene",
    // 하단 티커 텍스트
    ticker: "2026 화성야화에서, 잊지 못할 당신만의 밤을 만들어보세요.",
    tickerMobile: "당신만의 밤을 만들어보세요.",
  },

  // ─────────────────────────────────────
  //  메인 CTA 섹션 (RESERVATION OPEN)
  //  finalInvitation과 다름 — 메인 전용
  // ─────────────────────────────────────
  mainCta: {
    sectionLabel: "RESERVATION OPEN",
    h2: {
      gradStart: "2026 화성야화, ",
      gradEnd: "지금 예약하세요", // pink gradient
    },
    h2Mini: {
      gradStart: "화성야화, ",
      gradEnd: "지금 예약하세요",
    },
    desc: "인기 프로그램은 조기 마감됩니다 · 4야간 · 수원화성 일원",
    ctaPrimary: "프로그램 보기",
    ctaSecondary: "예약하기 →",
  },

  // ─────────────────────────────────────
  //  프로그레스 배너 공통
  //  sectionLabel / navSubtitle / allProgramsLink 제거 (미사용)
  // ─────────────────────────────────────
  progressBanner: {
    detailBtn: "자세히 보기 →",
    footerText: BANNER_COMMON.footerText,
  },

  // ─────────────────────────────────────
  //  EXPERIENCE 섹션
  // ─────────────────────────────────────
  experience: {
    sectionLabel: "EXPERIENCE",
    h2: "이 밤에서 만나는 특별한 경험",
    // Image 1 정확한 텍스트
    desc: "성곽에 펼쳐진 공연과 빛, 전통 문화를 만나보세요.\n화성의 밤은 순간마다 새로운 이야기로 이어집니다.",
    allBtn: "전체 보기",
  },

  // ─────────────────────────────────────
  //  FLOW OF NIGHT 섹션
  // ─────────────────────────────────────
  flowOfNight: {
    sectionLabel: "FLOW OF NIGHT",
    // Image 1 정확한 텍스트
    desc: "화성의 밤을 따라, 잔잔히 걸어보세요.\n시간과 공간이 맞닿는 화성야화의 장면이 펼쳐집니다.",
    panelLabel: "핵심 포인트", // ★ 핵심 포인트 ★
    panelTipLabel: "관람 팁", // 팁 박스 제목
    // 하단 통계 바 레이블 (Image 1 정확한 텍스트)
    // nightData-v5.js flowOfNight.stats 키와 1:1 매핑
    statsLabels: {
      totalTime: "총 소요 시간", // stats.totalTime
      walkDist: "총 도보 거리", // stats.walkDist
      viewerAge: "관람 연령", // stats.viewerAge
      difficulty: "난이도", // stats.difficulty
    },
    routeBtn: "관람 동선 보기",
  },

  // ─────────────────────────────────────
  //  FINAL INVITATION
  // ─────────────────────────────────────
  finalInvitation: {
    sectionLabel: "FINAL INVITATION",
    h2: "화성의 밤, 지금 만나보세요",
    // Image 2 정확한 텍스트
    desc: "빛과 역사, 공연과 야경이 어우러진 특별한 밤.\n화성야화의 여정을 지금 예약하고 직접 경험해보세요.",
    ctaPrimary: "예약하기 →",
    ctaSecondary: "프로그램 보기",
    // Image 2 메타 바 — 레이블 + 고정값 (전 야 공통)
    meta: {
      period: { label: "행사 기간", value: "매주 목 ~ 일" },
      hours: { label: "운영 시간", value: "18:00 ~ 22:30" },
      location: { label: "장소", value: "화성행궁 일대" },
      price: { label: "입장권", value: "성인 20,000원~" },
    },
  },

  // ─────────────────────────────────────
  //  예약 플로우
  // ─────────────────────────────────────
  booking: {
    steps: BOOKING_COMMON.steps,
    step1: {
      title: "어떤 밤을 경험하시겠어요?",
      desc: "화성야화 4개의 밤 중 원하는 야를 선택하세요. 각 야마다 다른 특별한 경험이 기다립니다.",
    },
    step2: {
      title: "날짜와 시간을 선택해주세요",
      desc: "선택하신 야의 운영일이 캘린더에 표시됩니다.",
    },
    step3: {
      title: "인원과 티켓을 선택해주세요",
      desc: `최대 ${BOOKING_COMMON.maxParty}명까지 예매하실 수 있습니다.`,
    },
    step4: { title: "결제 정보를 입력해주세요" },
    step5: {
      title: "예약이 완료되었습니다",
      ticketNote: BOOKING_COMMON.ticketIssueNote,
    },
    groupDiscount: `${BOOKING_COMMON.groupDiscount.label} · 단체예약 문의 →`,
    slotStatus: { available: "여유 있음", closing: "마감 임박", sold_out: "매진" },
    closingNotice: `입장 마감은 ${BOOKING_COMMON.closingTime}입니다.`,
    summaryLabel: "예약 요약",
    totalPriceLabel: "총 결제 금액",
    prevBtn: "← 이전",
    nextBtn: "다음 →",
    payBtn: "결제 완료 →",
  },

  // ─────────────────────────────────────
  //  동선 모달
  // ─────────────────────────────────────
  routeModal: {
    // ── 메인 헤더 (지도 위)
    guideText: "시간의 흐름을 따라 이어지는 주요 지점과\n이동 경로를 한눈에 확인해보세요.",
    pinHint: "📍 핀을 선택하면 상세 정보를 확인할 수 있어요",

    // ── 왼쪽 사이드바 (동선 요약)
    sidebar: {
      title: "동선 요약",
      durationLabel: "예상 소요 시간",
      routeLineLabel: "동선 경로",
    },

    // ── 범례 (지도 하단 우측)
    legend: {
      info: "안내소",
      restroom: "화장실",
      medical: "의료",
      parking: "주차장",
    },

    // ── 오른쪽 포인트 패널 (패널 오픈 후)
    panel: {
      counterFormat: "/ 05", // "01 / 05"
      allPointsLabel: "전체 포인트", // 우상단 배지
      programLabel: "PROGRAM", // 프로그램 섹션 레이블
      infoLabels: {
        time: "시간", // 시간: 19:00 ~ 19:20
        walk: "이동", // 이동: 집결 장소
        recommend: "추천", // 추천: 포토존, 공연 관람
      },
    },

    // ── 하단 내비게이션
    nav: { prev: "<", next: ">" },
  },

  // ─────────────────────────────────────
  //  프로그레스 모달
  // ─────────────────────────────────────
  progModal: {
    programsLabel: "주요 프로그램",
    tipLabel: "TIP",
    metaIcons: {
      schedule: "별", // ✦ 아이콘
      location: "핀", // 📍 아이콘
      category: "태그", // 🏷 아이콘
    },
    closeLabel: MODAL_COMMON.closeLabel,
    bookingLabel: MODAL_COMMON.bookingLabel,
  },

  // ─────────────────────────────────────
  //  푸터
  // ─────────────────────────────────────
  footer: {
    brand: "화성야화",
    brandEn: "HWASEONG NIGHT",
    address: "(16261) 경기도 수원시 팔달구 행궁로 11",
    tel: "031-5191-3647, 3068, 3920",
    fax: "031-369-2126",
    social: [
      { id: "facebook", label: "Facebook" },
      { id: "youtube", label: "YouTube" },
      { id: "instagram", label: "Instagram" },
      { id: "kakao", label: "Kakao" },
    ],
    pending: {
      title: "준비 중인 기능입니다",
      descSuffix: "기능은 준비 중입니다.",
      label: "COMING SOON",
    },

    // ── 링크 스키마
    //    { label, href?, external?, disabled? }
    //    href 없거나 disabled:true → 비활성 (커서·hover 없음, 클릭 무동작)
    //    external:true → 새 탭 + rel=noopener
    columns: {
      행사안내: [
        { label: "행사소개", disabled: true },
        { label: "프로그램 일정", disabled: true },
        { label: "참여 아티스트", disabled: true },
        { label: "미디어자료", disabled: true },
      ],
      "예약·문의": [
        { label: "온라인 예약", disabled: true },
        { label: "단체 예약", disabled: true },
        { label: "자주 묻는 질문", disabled: true },
        { label: "문의하기", disabled: true },
      ],
      "관련 사이트": [
        { label: "수원시 문화재단", href: "https://www.swcf.or.kr/", external: true },
        { label: "수원화성 공식", href: "https://www.swcf.or.kr/hwaseong", external: true },
        { label: "문화재청", href: "https://www.cha.go.kr/", external: true },
        { label: "수원시청", href: "https://www.suwon.go.kr/", external: true },
      ],
    },

    copyright: "© 2026 수원시 문화재단 HWASEONG NIGHT FIRE. All rights reserved.",
    copyrightMini: "© 2026 수원시 문화재단 HWASEONG NIGHT FIRE.",
    legal: ["이용약관", "개인정보처리방침", "사업자정보"],
  },
}
