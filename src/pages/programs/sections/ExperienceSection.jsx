// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ExperienceSection  —  프로그레스 페이지 경험 섹션
//  풀스크린(100dvh) · scroll-snap-align: start
//  night prop → 야별 카드 4장 렌더링
//  이미지: 카드 높이에 맞춰 자연스럽게 잘림 · 하단 콘텐츠 패널 겹침
//  모바일: 카드 높이 확보를 위해 구분선·설명은 함께 숨김
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, revealUp, focusRing, glass, serif } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { getExperienceCards } from "@/data/nightData"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { useMvpModal } from "@/components/ui/MvpModal"
import SectionHeader from "@/components/ui/SectionHeader"
import { ShimmerPair } from "@/components/ui/Deco"
import { ChevronIcon } from "@/components/ui/icons"
import ProgSectionFrame from "@/pages/programs/ProgSectionFrame"

const t = UI_TEXT.experience
const TOP_FADE_SIZE = `clamp(${T.secPadBottom}, 12vh, calc(${T.secPadBottom} + ${T.spacing[48]} + ${T.spacing[12]}))`
const CARD_CONTENT_OVERLAP = `clamp(calc(${T.spacing[48]} * -1), -2.8vw, calc(${T.spacing[24]} * -1))`

// ── 카드 ─────────────────────────────────────────────
function ExpCard({ card, nightStyle, animIn, delay }) {
  const { color, shadow, shimmer: shimmerBg } = nightStyle

  return (
    <CardOuter $animIn={animIn} $delay={delay}>
      <CardInner $accent={color} $hoverShadow={shadow.hover}>
        {/* 이미지 영역 — 남은 높이를 채우고 비율을 유지한 채 자연스럽게 잘림 */}
        <CardImgArea>
          {card.image ? (
            <CardImg src={card.image} alt="" loading="lazy" />
          ) : (
            <CardImgFallback $accent={color} />
          )}
          {/* 이미지 하단 페이드 — 글자 영역으로 자연스럽게 전환 */}
          <CardImgFade />
        </CardImgArea>

        {/* 이미지 하단 위로 겹쳐지는 콘텐츠 패널 */}
        <CardContent data-card-content>
          {/* 위·아래 동일한 또렷한 full 선 · 하단만 glow 헤일로 */}
          <ShimmerPair
            data-card-shimmer
            aria-hidden="true"
            $full
            $blur={false}
            $blend="plus-lighter"
            $bg={shimmerBg}
            bottomProps={{ $glow: alpha(color, 0.55) }}
          />
          <CardMeta>
            <CardCat $accent={color}>{card.category}</CardCat>
            <CardTitle>{card.title}</CardTitle>
          </CardMeta>
          <CardDivider $bg={shimmerBg} aria-hidden="true" />
          <CardDesc>{card.desc}</CardDesc>
        </CardContent>
      </CardInner>
    </CardOuter>
  )
}

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
              <ExpCard
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[12]};
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

// ── 카드 외부 래퍼 (reveal 애니메이션) ────────
const CardOuter = styled.article`
  ${({ $animIn, $delay }) => revealUp($animIn, $delay)}
  filter: drop-shadow(0 0 12px ${T.bgDark});
  display: flex;
  flex-direction: column;
  min-height: 0;
`

// ── 카드 내부 (overflow:hidden + flex 세로) ──
const CardInner = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${T.radius.card};
  background: ${T.bgBase};
  border: 1px solid ${({ $accent }) => $accent};
  transition:
    transform ${T.transition.mid},
    border-color ${T.transition.mid},
    box-shadow ${T.transition.mid};

  [data-card-shimmer] {
    opacity: 0.82;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-${T.spacing[8]});
      border-color: ${({ $accent }) => alpha($accent, 0.9)};
      box-shadow: ${({ $hoverShadow }) => $hoverShadow};
    }

    &:hover img {
      transform: scale(1.06);
      filter: brightness(1.12) saturate(1.1);
    }

    &:hover [data-card-content] {
      box-shadow:
        inset 0 1px 0 ${({ $accent }) => alpha($accent, 0.16)},
        inset 0 0 32px ${({ $accent }) => alpha($accent, 0.08)};
    }

    &:hover [data-card-shimmer] {
      opacity: 1;
    }
  }
`

// ── 이미지 영역 (남은 높이를 채우고 하단 패널과 겹침) ──
const CardImgArea = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`

const CardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
  user-select: none;
  transition:
    transform ${T.transition.slow},
    filter ${T.transition.slow};
`

/* 이미지 없을 때 fallback 그라디언트 */
const CardImgFallback = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    ${({ $accent }) => alpha($accent, 0.12)} 0%,
    ${alpha(T.bgCard, 0.9)} 100%
  );
`

/* 이미지 하단 → 콘텐츠 배경으로 자연 전환 */
const CardImgFade = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  height: 55%;
  background: linear-gradient(to bottom, transparent 0%, ${T.bgBase} 100%);
  pointer-events: none;
`

// 이미지↔콘텐츠 경계 + 카드 하단 shimmer 는 공용 <ShimmerPair>(Deco) 사용

// ── 콘텐츠 영역 ──────────────────────────────
const CardContent = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 5;
  margin-top: ${CARD_CONTENT_OVERLAP};
  ${glass("8px")}
  background: linear-gradient(to bottom, ${alpha(T.bgBase, 0.5)} 0%, ${T.bgBase} 70%);
  padding: clamp(${T.spacing[16]}, 1.67vw, ${T.spacing[32]});
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    padding: clamp(${T.spacing[12]}, 2.5vw, ${T.spacing[16]})
      clamp(${T.spacing[8]}, 2vw, ${T.spacing[16]});
  }
`

// ── 카드 메타 (카테고리 + 제목) ──────────────
const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(${T.spacing[4]}, 0.78vw, ${T.spacing[6]});
  text-align: center;
`

const CardCat = styled.span`
  font-size: clamp(${T.fontSize.xxs}, 0.83vw, ${T.fontSize.sm});
  letter-spacing: clamp(0.5px, 0.1vw, 1px);
  line-height: 1.36;
  color: ${({ $accent }) => $accent};
`

const CardTitle = styled.h3`
  ${serif()}
  font-size: clamp(${T.fontSize.sm}, calc(0.5208vw + 14px), 24px);
  letter-spacing: -1.5px;
  text-align: center;
  color: ${T.main};
  line-height: 1.44;
  text-shadow: 0 0 6px ${alpha(T.bgBase, 0.8)};
`

// ── 구분선 ────────────────────────────────────
const CardDivider = styled.div`
  width: clamp(96px, 7.15vw, 137px);
  height: 1px;
  border-radius: 1px;
  background: ${({ $bg }) => $bg};
  opacity: 0.65;
  margin-block: ${T.spacing[20]};

  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

// ── 설명 ──────────────────────────────────────
const CardDesc = styled.p`
  font-size: clamp(${T.fontSize.xs}, 0.94vw, ${T.fontSize.md});
  line-height: 1.5;
  color: ${alpha(T.main, 0.6)};
  text-align: center;
  letter-spacing: -1.5px;
  white-space: pre-line;

  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`
