import sparkle from "@/assets/images/programs/Sparkle.webp"
import cardBg1 from "@/assets/images/programs/1-card-bg-img.webp"
import cardSymbol1 from "@/assets/images/programs/1-card-symbol.webp"
import cardBg2 from "@/assets/images/programs/2-card-bg-img.webp"
import cardSymbol2 from "@/assets/images/programs/2-card-symbol.webp"
import cardBg3 from "@/assets/images/programs/3-card-bg-img.webp"
import cardSymbol3 from "@/assets/images/programs/3-card-symbol.webp"
import cardBg4 from "@/assets/images/programs/4-card-bg-img.webp"
import cardSymbol4 from "@/assets/images/programs/4-card-symbol.webp"

// ── 프로그레스 배너 전용 배경 (심볼·궤도 합본) ──
import bannerBg1 from "@/assets/images/programs/banner/1-banner-bg.webp"
import bannerBg2 from "@/assets/images/programs/banner/2-banner-bg.webp"
import bannerBg3 from "@/assets/images/programs/banner/3-banner-bg.webp"
import bannerBg4 from "@/assets/images/programs/banner/4-banner-bg.webp"

// ── 프로그레스 EXPERIENCE 섹션 전용 배경 ────────
import expBg1 from "@/assets/images/programs/experience/bg/01-bg.webp"
import expBg2 from "@/assets/images/programs/experience/bg/02-bg.webp"
import expBg3 from "@/assets/images/programs/experience/bg/03-bg.webp"
import expBg4 from "@/assets/images/programs/experience/bg/04-bg.webp"

// ── 프로그레스 EXPERIENCE 카드 이미지 ────────
import exp0101 from "@/assets/images/programs/experience/01-01.webp"
import exp0102 from "@/assets/images/programs/experience/01-02.webp"
import exp0103 from "@/assets/images/programs/experience/01-03.webp"
import exp0104 from "@/assets/images/programs/experience/01-04.webp"
import exp0201 from "@/assets/images/programs/experience/02-01.webp"
import exp0202 from "@/assets/images/programs/experience/02-02.webp"
import exp0203 from "@/assets/images/programs/experience/02-03.webp"
import exp0204 from "@/assets/images/programs/experience/02-04.webp"
import exp0301 from "@/assets/images/programs/experience/03-01.webp"
import exp0302 from "@/assets/images/programs/experience/03-02.webp"
import exp0303 from "@/assets/images/programs/experience/03-03.webp"
import exp0304 from "@/assets/images/programs/experience/03-04.webp"
import exp0401 from "@/assets/images/programs/experience/04-01.webp"
import exp0402 from "@/assets/images/programs/experience/04-02.webp"
import exp0403 from "@/assets/images/programs/experience/04-03.webp"
import exp0404 from "@/assets/images/programs/experience/04-04.webp"

export const PROGRAM_ASSETS = {
  // 메인 ProgSection에서 사용되는 이미지
  sparkle,
  cards: {
    1: { bg: cardBg1, sym: cardSymbol1 },
    2: { bg: cardBg2, sym: cardSymbol2 },
    3: { bg: cardBg3, sym: cardSymbol3 },
    4: { bg: cardBg4, sym: cardSymbol4 },
  },
  // 야 id(1~4) → 배너 배경
  banners: {
    1: bannerBg1,
    2: bannerBg2,
    3: bannerBg3,
    4: bannerBg4,
  },
  // 야 id(1~4) → EXPERIENCE 섹션 배경
  experienceBgs: {
    1: expBg1,
    2: expBg2,
    3: expBg3,
    4: expBg4,
  },
  // 야 id(1~4) → EXPERIENCE 카드 순서
  experience: {
    1: [exp0101, exp0102, exp0103, exp0104],
    2: [exp0201, exp0202, exp0203, exp0204],
    3: [exp0301, exp0302, exp0303, exp0304],
    4: [exp0401, exp0402, exp0403, exp0404],
  },
}
