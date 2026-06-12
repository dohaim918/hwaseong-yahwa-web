// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ExperienceSection  —  프로그레스 페이지 경험 섹션
//  풀스크린(100dvh) · scroll-snap-align: start
//  night prop → 야별 카드 4장 렌더링
//  이미지: 카드 높이에 맞춰 자연스럽게 잘림 · 하단 콘텐츠 패널 겹침
//  모바일: 카드 높이 확보를 위해 구분선·설명은 함께 숨김
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, revealUp, focusRing, flexCol } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { getExperienceCards } from "@/data/nightData"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { useMvpModal } from "@/components/ui/MvpModal"
import SectionHeader from "@/components/ui/SectionHeader"
import { ChevronIcon } from "@/components/ui/icons"
import ProgSectionFrame from "@/pages/programs/ProgSectionFrame"
import ExperienceCard from "@/pages/programs/sections/ExperienceCard"

const t = UI_TEXT.experience
const TOP_FADE_SIZE = `clamp(${T.secPadBottom}, 12vh, calc(${T.secPadBottom} + ${T.spacing[48]} + ${T.spacing[12]}))`

// ── 섹션 ─────────────────────────────────────────────
export default function ExperienceSection({ night }) {
  const mvpModal = useMvpModal()
  const color = night.color
  const cards = getExperienceCards(night.id)
  const bg = PROGRAM_ASSETS.experienceBgs[night.id]

  return (
    <ProgSectionFrame
      night={night}
      bg={bg}
      bgOpacity={0.85}
      mobileBgOpacity={0.7}
      bgBlendMode="difference"
      topFade={{ size: TOP_FADE_SIZE, opacity: 0.95, z: 2 }}
      glows={[
        {
          side: "top",
          width: "min(900px, 72vw)",
          height: "400px",
          opacity: 0.12,
          round: true,
          blur: "60px",
        },
        {
          side: "bottom",
          height: "300px",
          opacity: 0.06,
          shape: "ellipse 90% 60% at 50% 100%",
          stop: 100,
        },
      ]}
      layoutGap={`clamp(${T.spacing[12]}, 1.8vh, ${T.spacing[24]})`}
    >
      {({ animIn }) => (
        <>
          {/* 헤더 */}
          <HeaderArea>
            <SectionHeader
              label={t.sectionLabel}
              labelAccent={color}
              title={t.h2}
              titleGradient={night.style.whiteTextGrad}
              desc={t.desc}
              center
              animIn={animIn}
              animDelay={0.1}
              pb="0"
            />
            <AllBtnRow $animIn={animIn}>
              <AllBtn type="button" $accent={color} onClick={() => mvpModal.open(color)}>
                {t.allBtn}
                <ChevronIcon size={14} strokeWidth={1.5} />
              </AllBtn>
            </AllBtnRow>
          </HeaderArea>

          {/* 카드 그리드 — 남은 세로 공간 전체 채움 */}
          <CardsRow>
            {cards.map((card, i) => (
              <ExperienceCard
                key={card.title}
                card={card}
                nightStyle={night.style}
                animIn={animIn}
                delay={0.25 + i * 0.07}
              />
            ))}
          </CardsRow>
        </>
      )}
    </ProgSectionFrame>
  )
}

// ── 헤더 영역 ─────────────────────────────
const HeaderArea = styled.div`
  ${flexCol(T.spacing[12])}
  align-items: center;
  flex-shrink: 0;
`

const AllBtnRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  ${({ $animIn }) => revealUp($animIn, 0.35)}
`

const AllBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${T.spacing[4]};
  padding: 0;
  font-size: ${T.fontSize.sm};
  line-height: 1.5;
  color: ${({ $accent }) => alpha($accent, 0.38)};
  cursor: pointer;
  transition: color ${T.transition.fast};

  &:hover {
    color: ${({ $accent }) => $accent};
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7))}

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
`

// ── 카드 그리드 (남은 공간 전부 차지) ────────
const CardsRow = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${T.cardGap};
  align-items: stretch;

  @media (max-width: ${T.bp.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(min-content, 1fr));
  }

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${T.spacing[8]};
  }
`

