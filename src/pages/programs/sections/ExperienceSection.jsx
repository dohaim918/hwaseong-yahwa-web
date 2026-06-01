// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ExperienceSection  —  프로그레스 페이지 경험 섹션
//  풀스크린(100dvh) · scroll-snap-align: start
//  night prop → 야별 카드 4장 렌더링
//  이미지: 카드 높이에 맞춰 자연스럽게 잘림 · 하단 콘텐츠 패널 겹침
//  모바일: 카드 높이 확보를 위해 구분선·설명은 함께 숨김
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { ColumnSection } from "@/components/layout/FullSection"
import { T, alpha, revealUp, focusRing, glass, glow } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { getExperienceCards } from "@/data/nightData"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import { useMvpModal } from "@/components/ui/MvpModal"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import SectionHeader from "@/components/ui/SectionHeader"
import { EdgeFade, Shimmer } from "@/components/ui/Deco"
import { ChevronIcon } from "@/components/ui/icons"

const t = UI_TEXT.experience
const TOP_FADE_SIZE = `clamp(${T.secPadBottom}, 12vh, calc(${T.secPadBottom} + ${T.spacing[48]} + ${T.spacing[12]}))`
const SECTION_Y_PAD = `clamp(${T.spacing[24]}, 4vh, ${T.spacing[48]})`
const CARD_CONTENT_OVERLAP = `clamp(calc(${T.spacing[48]} * -1), -2.8vw, calc(${T.spacing[24]} * -1))`

// ── 카드 ─────────────────────────────────────────────
function ExpCard({ card, nightStyle, animIn, delay }) {
  const { color, shimmer: shimmerBg } = nightStyle

  return (
    <CardOuter $animIn={animIn} $delay={delay}>
      <CardInner $color={color}>
        {/* 이미지 영역 — 남은 높이를 채우고 비율을 유지한 채 자연스럽게 잘림 */}
        <CardImgArea>
          {card.image ? (
            <CardImg src={card.image} alt="" loading="lazy" />
          ) : (
            <CardImgFallback $color={color} />
          )}
          {/* 이미지 하단 페이드 — 글자 영역으로 자연스럽게 전환 */}
          <CardImgFade />
        </CardImgArea>

        {/* 이미지 하단 위로 겹쳐지는 콘텐츠 패널 */}
        <CardContent>
          <Shimmer $top $full $z={4} $blend="plus-lighter" $bg={shimmerBg} aria-hidden="true" />
          <CardMeta>
            <CardCat $color={color}>{card.category}</CardCat>
            <CardTitle>{card.title}</CardTitle>
          </CardMeta>
          <CardDivider $bg={shimmerBg} aria-hidden="true" />
          <CardDesc>{card.desc}</CardDesc>
        </CardContent>

        {/* ── 카드 하단 glow shimmer ── */}
        <Shimmer
          $z={6}
          $blur={false}
          $blend="plus-lighter"
          $glow={alpha(color, 0.55)}
          $bg={shimmerBg}
          aria-hidden="true"
        />
      </CardInner>
    </CardOuter>
  )
}

// ── 섹션 ─────────────────────────────────────────────
export default function ExperienceSection({ night }) {
  const mvpModal = useMvpModal()
  // ProgramsPage가 setAccent 처리 → color:null 로 중복 방지 / animIn만 사용
  const { ref: secRef, animIn } = useSectionAccent(null, { color: null })
  const color = night.color
  const cards = getExperienceCards(night.id)
  const bg = PROGRAM_ASSETS.experienceBgs[night.id]

  return (
    <ExpSection ref={secRef} accent={color}>
      <AnimatedBgImage
        src={bg}
        opacity={0.85}
        mobileOpacity={0.7}
        blendMode="difference"
        animate={animIn}
      />

      {/* 장식 레이어 */}
      <EdgeFade side="top" size={TOP_FADE_SIZE} opacity={0.95} z={2} />
      <GlowTop $color={color} aria-hidden="true" />
      <GlowBottom $color={color} aria-hidden="true" />

      <Inner>
        {/* 헤더 */}
        <HeaderArea>
          <SectionHeader
            label={t.sectionLabel}
            labelAccent={color}
            title={t.h2}
            titleGradient={night.style.whiteTextGrad}
            desc={t.desc}
            descColor={alpha(T.main, 0.5)}
            center
            animIn={animIn}
            animDelay={0.1}
            pb="0"
          />
          <AllBtnRow $animIn={animIn}>
            <AllBtn type="button" $color={color} onClick={() => mvpModal.open(color)}>
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
      </Inner>
    </ExpSection>
  )
}

// ═══════════════════════════════════════════
//  Styled Components
// ═══════════════════════════════════════════

// ── 섹션 셸: ColumnSection 확장 ─────────────
//    ColumnSection의 풀스크린·scroll-snap·accent 라인 구조를 그대로 사용.
const ExpSection = styled(ColumnSection)`
  background: ${T.bgDark};
`

// ── 상단 radial glow ───────────────────────
const GlowTop = styled.div`
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: min(900px, 72vw);
  height: 400px;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 1;
  background: ${({ $color }) => glow($color, { opacity: 0.12 })};
`

// ── 하단 radial glow ──────────────────────
const GlowBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 300px;
  pointer-events: none;
  z-index: 1;
  background: ${({ $color }) =>
    glow($color, { opacity: 0.06, shape: "ellipse 90% 60% at 50% 100%", stop: 100 })};
`

// ── 내부 컨테이너 ─────────────────────────
//    고정 NavBar + NightTabBar를 피한 뒤, 콘텐츠 위아래 여백은 동일하게 유지.
const Inner = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  min-height: 0;
  padding: calc(${T.navHeight} + ${T.tabNavHeight} + ${SECTION_Y_PAD}) ${T.pagePad} ${SECTION_Y_PAD};
  display: flex;
  flex-direction: column;
  gap: clamp(${T.spacing[12]}, 1.8vh, ${T.spacing[24]});

  @media (max-width: ${T.bp.mini}) {
    padding-top: calc(${T.navHeightMini} + ${T.tabNavHeightMini} + ${SECTION_Y_PAD});
  }
`

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
  font-size: ${T.fontSize.sm};
  line-height: 1.5;
  color: ${({ $color }) => alpha($color, 0.38)};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color ${T.transition.fast};

  &:hover {
    color: ${({ $color }) => $color};
  }

  ${({ $color }) => focusRing(alpha($color, 0.7))}

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
  border-radius: ${T.radius.lg};
  background: ${T.bgBase};
  border: 1px solid ${({ $color }) => $color};
`

// ── 이미지 영역 (남은 높이를 채우고 하단 패널과 겹침) ──
const CardImgArea = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
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
`

/* 이미지 없을 때 fallback 그라디언트 */
const CardImgFallback = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    ${({ $color }) => alpha($color, 0.12)} 0%,
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

// 이미지↔콘텐츠 경계 / 카드 하단 shimmer 는 공용 <Shimmer>(Deco) 사용

// ── 콘텐츠 영역 ──────────────────────────────
const CardContent = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 5;
  margin-top: ${CARD_CONTENT_OVERLAP};
  ${glass("8px")}
  box-sizing: border-box;
  min-height: clamp(148px, 11.25vw, 216px);
  background: linear-gradient(to bottom, ${alpha(T.bgBase, 0.5)} 0%, ${T.bgBase} 70%);
  padding: clamp(${T.spacing[16]}, 1.67vw, ${T.spacing[32]});
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: ${T.bp.mobile}) {
    min-height: auto;
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
  font-family: ${T.fontSans};
  font-size: clamp(${T.fontSize.xxs}, 0.83vw, ${T.fontSize.sm});
  letter-spacing: clamp(0.5px, 0.1vw, 1px);
  line-height: 1.36;
  color: ${({ $color }) => $color};
`

const CardTitle = styled.h3`
  font-family: ${T.fontSerif};
  font-size: clamp(${T.fontSize.sm}, calc(0.5208vw + 14px), 24px);
  font-weight: 600;
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
  font-family: ${T.fontSans};
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
