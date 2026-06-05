// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FeaturedPanel — 핵심 포인트 패널 (Figma 463:3906)
//  ────────────────────────────────────────────────
//  · 데스크탑: 우측 고정 카드 (행 클릭 시 내용 갱신) — 자체 Card 프레임 + 상하 Shimmer
//  · 모바일/태블릿(asOverlay): 공용 ModalFrame 으로 띄움 (포털·겉틀·닫기·포커스락 공용)
//  내용(PanelBody)은 두 모드가 공유.
//  props: point / accent / tipIcon / animIn / asOverlay / onClose
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, accentFill, glass, revealUp, shimmerLine, serif } from "@/styles/theme"
import { ShimmerPair, OutlinePill } from "@/components/ui/Deco"
import { StarIcon } from "@/components/ui/icons"
import ModalFrame from "@/components/ui/ModalFrame"
import { UI_TEXT } from "@/data/uiText"

// 이미지·간격은 뷰포트 높이에 비례(패널이 100dvh 안에 들어가도록 축소).
// calc 앵커: 대략 화면높이 820px → 최소값 / 1080px → 최대값 사이를 선형 보간.
const IMG_SIZE = "clamp(80px, calc(52.49vh - 350px), 280px)" // 819px→80 ~ 1200px→280
const t = UI_TEXT.flowOfNight

// ── 내용부 (인라인 카드 · 오버레이 모달 공유) ──
function PanelBody({ point, accent, tipIcon }) {
  const { title, desc, tip, tipTag, image } = point
  return (
    <>
      <LabelRow>
        <StarIcon size={12} color={accent} />
        <PanelLabel $accent={accent}>{t.panelLabel}</PanelLabel>
        <StarIcon size={12} color={accent} />
      </LabelRow>

      {image && <Img src={image} alt="" />}

      <Body>
        <Texts>
          <Title>{title}</Title>
          <Desc>{desc}</Desc>
        </Texts>

        <TipBox $accent={accent}>
          <TipIcon src={tipIcon} alt="" aria-hidden="true" />
          <TipMain>
            <TipHead>
              <TipLabel $accent={accent}>{t.panelTipLabel}</TipLabel>
              {tipTag && <OutlinePill $tight>{tipTag.replace(/^#\s*/, "# ")}</OutlinePill>}
            </TipHead>
            <TipDesc>{tip}</TipDesc>
          </TipMain>
        </TipBox>
      </Body>
    </>
  )
}

export default function FeaturedPanel({
  point,
  accent,
  tipIcon,
  animIn,
  asOverlay = false,
  onClose,
}) {
  if (!point) return null

  const body = <PanelBody point={point} accent={accent} tipIcon={tipIcon} />

  // 모바일·태블릿: 공용 모달 틀로 (포털 → 스크롤 깜빡임 없음, 아래 라인 없음)
  if (asOverlay) {
    return (
      <ModalFrame open onClose={onClose} accent={accent} maxWidth={420} ariaLabel={t.panelLabel}>
        <Stack>{body}</Stack>
      </ModalFrame>
    )
  }

  // 데스크탑 인라인: 자체 카드 프레임 + 상하 Shimmer
  return (
    <Card $accent={accent} $animIn={animIn}>
      <ShimmerPair $bg={shimmerLine(accent)} $glow={alpha(accent, 0.6)} $blend="plus-lighter" />
      <Stack>{body}</Stack>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────

// 인라인 카드 프레임 (오버레이는 ModalFrame 이 프레임 담당)
const Card = styled.div`
  position: relative;
  width: 100%;
  overflow: clip;
  display: flex;
  flex-direction: column;
  padding: clamp(${T.spacing[24]}, 2.2vw, ${T.spacing[42]});
  border: 1px solid ${({ $accent }) => $accent};
  border-radius: ${T.radius.card};
  background: ${alpha(T.bgBase, 0.55)};
  ${glass("8px")}
  ${({ $animIn }) => revealUp($animIn, 0.45)}
`

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 높이 비례 간격: 화면 ~909px→4 ~ ~1090px→16 (작은 높이에서 더 촘촘) */
  gap: clamp(${T.spacing[4]}, calc(6.6vh - 56px), ${T.spacing[16]});
  width: 100%;
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[16]};
  flex-shrink: 0;
`

const AccentLabel = styled.span`
  ${serif()}
  color: ${({ $accent }) => $accent};
  white-space: nowrap;
`

const PanelLabel = styled(AccentLabel)`
  font-size: clamp(18px, 1.4vw, 24px);
`

// Stack(align-items:center)이 가로 가운데 정렬 → 별도 래퍼 불필요
const Img = styled.img`
  flex-shrink: 0;
  width: ${IMG_SIZE};
  height: ${IMG_SIZE};
  object-fit: contain;
  mix-blend-mode: lighten;
`

// 텍스트 + 팁 박스는 줄지 않고 항상 노출
const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  /* 높이 비례 간격: 화면 ~802px→12 ~ ~1083px→42 */
  gap: clamp(${T.spacing[12]}, calc(10.71vh - 74px), ${T.spacing[42]});
  width: 100%;
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  /* 높이 비례 간격: 화면 ~806px→16 ~ ~1086px→32 */
  gap: clamp(${T.spacing[16]}, calc(5.71vh - 30px), ${T.spacing[32]});
  text-align: center;
  align-items: center;
`

const Title = styled.h3`
  ${serif()}
  font-size: clamp(18px, 2vw, 32px);
  line-height: 1.2;
  color: ${T.white};
`

const Desc = styled.p`
  font-size: clamp(14px, 1vw, 18px);
  line-height: 1.8;
  color: ${T.sub};
  max-width: 440px;
  white-space: pre-line;
  word-break: keep-all;
  @media (max-width: 1920px) {
    line-height: 1.5;
  }
`

const TipBox = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(${T.spacing[16]}, 1.6vw, ${T.spacing[24]});
  width: 100%;
  padding: clamp(${T.spacing[16]}, 1.4vw, ${T.spacing[24]});
  border: 1px solid ${({ $accent }) => alpha($accent, 0.27)};
  border-radius: ${T.radius.sm};
  background: ${({ $accent }) => accentFill($accent)};
  flex-shrink: 0;
  ${glass("4px")}
`

// Figma 533:17251 — tip 아이콘 78px(1920px 기준)~48px, mini 이하 숨김
const TipIcon = styled.img`
  flex-shrink: 0;
  width: clamp(48px, 4vw, 78px);
  height: clamp(48px, 4vw, 78px);
  object-fit: contain;

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const TipMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[12]};
  width: 100%;
`

const TipHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${T.spacing[8]};
`

const TipLabel = styled(AccentLabel)`
  font-size: clamp(16px, 1.2vw, 18px);
`

// Desc 와 동일(line-height·color·keep-all) — 폰트 상한·줄바꿈만 다름
const TipDesc = styled(Desc)`
  font-size: clamp(14px, 1.1vw, 16px);
  white-space: normal;
  max-width: 300px;
  text-align: left;
`
