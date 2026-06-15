// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ExperienceCard — Experience 섹션 카드 한 장
//  이미지 영역(flex 1) + 하단 콘텐츠 패널(상단 음수 margin으로 겹침).
//  hover: 카드 부상 · 이미지 스케일 · 콘텐츠 inset shadow · shimmer 강조.
//  props: card / nightStyle / animIn / delay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, revealUp, glass, serif, flexCol } from "@/styles/theme"
import { ShimmerPair } from "@/components/ui/Deco"

// 이미지↔콘텐츠 음수 margin (큰 화면일수록 더 겹침)
const CONTENT_OVERLAP = `clamp(calc(${T.spacing[48]} * -1), -2.8vw, calc(${T.spacing[24]} * -1))`

export default function ExperienceCard({ card, nightStyle, animIn, delay }) {
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

// ── 카드 외부 래퍼 (reveal 애니메이션) ────────
const CardOuter = styled.article`
  ${({ $animIn, $delay }) => revealUp($animIn, $delay)}
  filter: drop-shadow(0 0 12px ${T.bgDark});
  ${flexCol()}
  min-height: 0;
`

// ── 카드 내부 (overflow:hidden + flex 세로) ──
const CardInner = styled.div`
  position: relative;
  flex: 1;
  ${flexCol()}
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

// 이미지 없을 때 fallback 그라디언트
const CardImgFallback = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    165deg,
    ${({ $accent }) => alpha($accent, 0.12)} 0%,
    ${alpha(T.bgCard, 0.9)} 100%
  );
`

// 이미지 하단 → 콘텐츠 배경으로 자연 전환
const CardImgFade = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  height: 55%;
  background: linear-gradient(to bottom, transparent 0%, ${T.bgBase} 100%);
  pointer-events: none;
`

// ── 콘텐츠 영역 ──────────────────────────────
const CardContent = styled.div`
  flex-shrink: 0;
  position: relative;
  z-index: 5;
  margin-top: ${CONTENT_OVERLAP};
  ${glass("8px")}
  background: linear-gradient(to bottom, ${alpha(T.bgBase, 0.5)} 0%, ${T.bgBase} 70%);
  padding: clamp(${T.spacing[16]}, 1.67vw, ${T.spacing[32]});
  ${flexCol()}
  align-items: center;
  transition: box-shadow ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    padding: clamp(${T.spacing[12]}, 2.5vw, ${T.spacing[16]})
      clamp(${T.spacing[8]}, 2vw, ${T.spacing[16]});
  }
`

// ── 카드 메타 (카테고리 + 제목) ──────────────
const CardMeta = styled.div`
  ${flexCol(`clamp(${T.spacing[4]}, 0.78vw, ${T.spacing[6]})`)}
  align-items: center;
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
