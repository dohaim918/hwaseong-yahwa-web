// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  BannerSection  —  프로그레스 페이지 배너 (Figma 463:4185)
//  ────────────────────────────────────────────────────────────
//  레이아웃 (1920 기준 / pagePad = 160px):
//    [좌]   NightIndexRail (01시작~04달빛)   — 고정, active 구간만 이동
//    [중앙좌] 텍스트 (FIRST NIGHT / 1야 / 시작의 빛 / desc / tags) — 전환
//    [우하단] NightCounter                    — 고정, 내용/색만 갱신
//    [좌하단] 꽃 + footerText                  — 고정, 꽃 색만 트랜지션
//
//  ※ 야 전환 시 컴포넌트는 remount 되지 않는다(부모가 key를 주지 않음).
//     배경(BgReveal)과 중앙 텍스트(TextAnim)만 key={id}로 다시 재생되고,
//     레일·카운터·푸터는 마운트 유지 → 위치 고정 + accent 색 CSS 트랜지션.
//
//  props: night / nights / onSelect
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { forwardRef } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import FullSection from "@/components/layout/FullSection"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { EdgeFade } from "@/components/ui/Deco"
import { FlowerIcon, StarIcon } from "@/components/ui/icons"
import NightIndexRail from "@/pages/programs/sections/banner/NightIndexRail"
import NightCounter from "@/pages/programs/sections/banner/NightCounter"

const BannerSection = forwardRef(function BannerSection({ night, nights, onSelect }, ref) {
  const { id, color, style, nightName, num, banner } = night
  // 배너 전용 배경 (programAssets.banners 로 통합 — bannerAssets.js 폐기)
  const bg = PROGRAM_ASSETS.banners[id]

  return (
    <FullSection ref={ref}>
      {bg && (
        <BgReveal key={id}>
          <AnimatedBgImage src={bg} opacity={0.55} mobileOpacity={0.2} animate />
        </BgReveal>
      )}
      <EdgeFade side="top" size={T.navHeightMini} opacity={0.9} z={2} />

      {/* ── 좌측 텍스트 가독성용 딤 (EdgeFade 재사용 · 모바일 이하 숨김) ── */}
      <LeftDim side="left" color={T.bgBase} opacity={0.85} size="40%" z={2} />

      <Content>
        {/* ── 좌측 인덱스 레일 (고정) ── */}
        <NightIndexRail nights={nights} currentId={id} onSelect={onSelect} accent={color} />

        {/* ── 중앙: 텍스트 (야 전환 시 재생) ── */}
        <Stage>
          <TextAnim key={id}>
            <TextBlock>
              <VisualGroup>
                <NightCode $accent={color}>{nightName}</NightCode>
                <BigTitle>
                  <BigNum $grad={style.heroGrad}>{num}</BigNum>
                  <BigYa $grad={style.heroGrad}>야</BigYa>
                  <NightStar>
                    <StarIcon size={20} color={color} />
                  </NightStar>
                </BigTitle>
                <Subtitle $accent={color}>{banner.subtitle}</Subtitle>
              </VisualGroup>
              <Desc>{banner.description}</Desc>
              <Tags>
                {banner.tags.map((tag) => (
                  <Tag key={tag} $accent={color}>
                    {tag}
                  </Tag>
                ))}
              </Tags>
            </TextBlock>
          </TextAnim>
        </Stage>
      </Content>

      {/* ── 좌하단: 꽃 + footerText (고정 · 꽃 색만 트랜지션) ── */}
      <FooterMark $accent={color}>
        <FlowerIcon size={56} color="currentColor" />
        <FooterText>{banner.footerText ?? UI_TEXT.progressBanner.footerText}</FooterText>
      </FooterMark>

      {/* ── 우하단: 카운터 (고정) ── */}
      <CounterSlot>
        <NightCounter
          currentId={id}
          total={nights.length}
          counterNum={banner.counterNum}
          quote={banner.counterQuote}
          accent={color}
          onPrev={() => onSelect(id - 1)}
          onNext={() => onSelect(id + 1)}
        />
      </CounterSlot>
    </FullSection>
  )
})

export default BannerSection

// ─────────────────────────────────────────────────────────────
//  레이아웃
// ─────────────────────────────────────────────────────────────

// ── 좌측 텍스트 가독성용 딤 (EdgeFade 재사용 · 배경 위·콘텐츠 아래) ──
//    데스크탑 40% / 그 이하 55% 폭, 모바일 이하 숨김
const LeftDim = styled(EdgeFade)`
  transition: width ${T.transition.mid};

  @media (max-width: ${T.bp.desktop}) {
    width: 55%;
  }
  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

// ── 야 전환 배경 reveal (key={id}로 매 전환 재생) ──
const BgReveal = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  animation: imgScale ${T.transition.bgReveal} both;
`

// ── 메인 콘텐츠 (레일 + 스테이지) — 최초 1회만 fade ──
const Content = styled.div`
  position: relative;
  z-index: 5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: clamp(${T.spacing[48]}, 7vw, 100px);
  padding: 0 ${T.pagePad};
  animation: fadeIn ${T.transition.slow} both;

  @media (max-width: ${T.bp.mobile}) {
    justify-content: center;
    text-align: center;
  }
`

const Stage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: ${T.bp.mobile}) {
    justify-content: center;
  }
`

// ── 중앙 텍스트 묶음 (key={id}로 매 전환 tabIn 재생) ──
const TextAnim = styled.div`
  animation: tabIn ${T.transition.slow} both;
`

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[32]};
  z-index: 1;
  transition: gap ${T.transition.slow};

  @media (max-width: ${T.bp.mobile}) {
    align-items: center;
    gap: ${T.spacing[24]};
  }
`

const NightCode = styled.span`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.md};
  font-weight: 700;
  letter-spacing: 4px;
  color: ${({ $accent }) => $accent};
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.sm};
  }
`

// ── 1야 + 시작의 빛 묶음 ──
const VisualGroup = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${T.bp.mobile}) {
    align-items: center;
  }
`

const BigTitle = styled.h2`
  position: relative;
  display: flex;
  width: max-content;
  align-items: baseline;
  line-height: 1.2;
  padding-bottom: ${T.spacing[8]};
`

const BigNum = styled.span`
  font-family: ${T.fontSerif};
  font-size: clamp(96px, 13vw, 180px);
  font-weight: 700;
  line-height: 1.2;
  ${({ $grad }) => $grad}
`

const BigYa = styled.span`
  font-family: ${T.fontSerif};
  font-size: clamp(60px, 8vw, 110px);
  font-weight: 500;
  line-height: 1.2;
  ${({ $grad }) => $grad}
`

const NightStar = styled.span`
  position: absolute;
  top: 40%;
  right: -${T.spacing[16]};
  line-height: 0;
  transition: top ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    top: 30%;
  }
`

const Subtitle = styled.p`
  font-family: ${T.fontSerif};
  font-size: clamp(32px, 3.4vw, 44px);
  font-weight: 700;
  color: ${({ $accent }) => $accent};
  line-height: 1.2;
`

const Desc = styled.p`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.md};
  line-height: ${T.spacing[32]};
  letter-spacing: 0.3px;
  color: ${alpha(T.white, 0.62)};
  white-space: pre-line;
  transition:
    font-size ${T.transition.mid},
    line-height ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.sm};
    line-height: 1.7;
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${T.spacing[16]};
  transition: gap ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    justify-content: center;
    gap: ${T.spacing[12]};
  }
`

const Tag = styled.span`
  padding: ${T.spacing[6]} ${T.spacing[16]};
  border-radius: ${T.radius.pill};
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.md};
  letter-spacing: 0.3px;
  color: ${({ $accent }) => $accent};
  background: ${({ $accent }) => alpha($accent, 0.1)};
  border: 1px solid ${({ $accent }) => $accent};
  white-space: nowrap;
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

// ── 좌하단 꽃 + footerText (꽃 색만 accent 트랜지션) ──
const FooterMark = styled.div`
  position: absolute;
  left: ${T.pagePad};
  bottom: clamp(${T.spacing[48]}, 8vh, 96px);
  display: flex;
  align-items: center;
  gap: ${T.spacing[16]};
  z-index: 6;
  color: ${({ $accent }) => $accent};
  transition: color ${T.transition.slow};
  animation: fadeIn ${T.transition.slow} both;

  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

const FooterText = styled.p`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.sm};
  line-height: ${T.spacing[24]};
  letter-spacing: 0.3px;
  color: ${alpha(T.white, 0.44)};
  white-space: pre-line;
  word-break: keep-all;
`

// ── 우하단 카운터 슬롯 ──
const CounterSlot = styled.div`
  position: absolute;
  right: ${T.pagePad};
  bottom: clamp(${T.spacing[48]}, 8vh, 96px);
  z-index: 6;
  animation: fadeIn ${T.transition.slow} both;
  transition: bottom ${T.transition.slow};

  @media (max-width: ${T.bp.mobile}) {
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    bottom: ${T.spacing[32]};
  }
`
