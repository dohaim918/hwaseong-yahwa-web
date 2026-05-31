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

export const PROGRAM_ASSETS = {
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
}
