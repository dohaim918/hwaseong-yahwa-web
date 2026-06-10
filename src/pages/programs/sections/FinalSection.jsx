// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FinalSection — 프로그레스 페이지 마지막 섹션 (Figma 463:3933)
//  ────────────────────────────────────────────────
//  CtaSection 공용 골격 사용 (CTA 영역 flex:1 + Footer 내장, height:100dvh).
//  night prop → accent·버튼 그라디언트만 야별. 메타 값/문구는 전 야 공통 고정.
//  채움(gradient)=프로그램 보기 / 외곽선(outline)=예약하기 →
//  ※ gradient 버튼은 추후 '전체 프로그램 모달'로 교체 예정 — 현재는 준비중(MvpModal) placeholder.
//  탭바(NightTabBar) 노출 상태이므로 CtaSection 에 tabBar 로 상단 패딩 오프셋 반영.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import { T, alpha } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import SectionHeader from "@/components/ui/SectionHeader"
import CtaSection from "@/components/layout/CtaSection"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import { useMvpModal } from "@/components/ui/MvpModal"
import ProgramStatsBar from "@/pages/programs/ProgramStatsBar"

const t = UI_TEXT.finalInvitation

// 메타 4종 — 라벨/값은 t.meta[key] (전 야 공통 고정값)
const META_ITEMS = [
  { key: "period", icon: "period" },
  { key: "hours", icon: "hours" },
  { key: "location", icon: "location" },
  { key: "price", icon: "ticket" },
]

export default function FinalSection({ night }) {
  // accent는 ProgramsPage가 전역 세팅 → color:null 로 중복 방지 / animIn만 사용
  const { ref: secRef, animIn } = useSectionAccent(null, { color: null })
  const accent = night.color
  const mvpModal = useMvpModal()
  const metaItems = META_ITEMS.map(({ key, icon }) => ({
    key,
    icon: PROGRAM_ASSETS.finalIcons[icon],
    label: t.meta[key].label,
    value: t.meta[key].value,
  }))

  return (
    <CtaSection
      secRef={secRef}
      accent={accent}
      animIn={animIn}
      bg={T.bgDark}
      bgImage={
        <FinalBg
          src={PROGRAM_ASSETS.finalBgs[night.id]}
          opacity={0.85}
          mobileOpacity={0.95}
          animate={animIn}
        />
      }
      maxWidth="920px"
      tabBar
      footerAccent={accent}
      overlay={<BgOverlay $accent={accent} />}
      header={
        <SectionHeader
          label={t.sectionLabel}
          labelAccent={accent}
          title={t.h2}
          titleGradient={night.style.whiteTextGrad}
          desc={t.desc}
          center
          animIn={animIn}
          animDelay={0.05}
          pb="0"
        />
      }
      // 채움(gradient) — 추후 전체 프로그램 모달, 현재는 준비중 placeholder
      primaryAction={{ onClick: () => mvpModal.open(accent) }}
      primaryLabel={t.ctaSecondary}
      secondaryAction={{ as: Link, to: "/booking" }}
      secondaryLabel={t.ctaPrimary}
      belowButtons={
        <FinalStatsBar variant="final" items={metaItems} accent={accent} animIn={animIn} />
      }
    />
  )
}

// 모바일: 풀폭 이미지를 하단(4%)에 깔고 위쪽은 어둠으로 페이드 (cover 세로크롭 회피)
//   && 로 specificity 올려 AnimatedBgImage 의 base inset/height 를 확실히 오버라이드
const FinalBg = styled(AnimatedBgImage)`
  @media (max-width: ${T.bp.mobile}) {
    && {
      inset: auto 0 4% 0;
      height: auto;
      -webkit-mask-image: linear-gradient(to top, #000 80%, transparent);
      mask-image: linear-gradient(to top, #000 80%, transparent);
    }
  }
`

// 배경 위 비네팅(가장자리 → bgDark) + 타이틀 뒤 은은한 accent 틴트
const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 80% 60% at 50% 38%,
      transparent 0%,
      ${alpha(T.bgDark, 0.55)} 70%,
      ${alpha(T.bgDark, 0.44)} 100%
    ),
    radial-gradient(
      ellipse 60% 45% at 50% 30%,
      ${({ $accent }) => alpha($accent, 0.12)} 0%,
      transparent 60%
    );
`

const FinalStatsBar = styled(ProgramStatsBar)`
  margin-top: clamp(${T.spacing[24]}, 3.2vh, ${T.spacing[42]});

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`
