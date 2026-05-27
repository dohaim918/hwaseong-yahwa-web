// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    label / labelAccent / title / titleGradient
//    gradTitle / desc / descColor / center
//
//  A  <SectionHeader title={<>밤을 <GradSpan g={...}>걷고 싶나요</GradSpan></>} />
//  B  <SectionHeader label="..." title="..." titleGradient={...} center />
//  C  <SectionHeader label="..." title="..." gradTitle="..." titleGradient={...} center />
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, revealUp } from "@/styles/theme"
import { GradLine } from "@/components/ui/deco"
export { GradSpan } from "@/components/ui/GradSpan"

export default function SectionHeader({
  label,
  labelAccent,
  title,
  titleGradient,
  gradTitle,
  desc,
  descColor,
  center = false,
  hideLabelMini = false,
  gap,
  pb,
  animIn,
  animDelay = 0,
  ...props
}) {
  const hasTitle = title || gradTitle
  const labelColor = labelAccent ?? T.sub

  return (
    <Wrap $center={center} $gap={gap} $pb={pb} $animIn={animIn} $animDelay={animDelay} {...props}>
      {label && (
        <LabelRow $hideMini={hideLabelMini}>
          <GradLine $color={labelColor} $dir="left" $width="32px" />
          <LabelText $color={labelColor}>{label}</LabelText>
          <GradLine $color={labelColor} $dir="right" $width="32px" />
        </LabelRow>
      )}

      {/* 제목 — title, gradTitle 중 하나라도 있을 때만 */}
      {hasTitle && (
        <TitleWrap>
          {title && <Title $gradient={titleGradient}>{title}</Title>}
          {gradTitle && <Title $gradient={titleGradient}>{gradTitle}</Title>}
        </TitleWrap>
      )}

      {/* 설명 */}
      {desc && <Desc $color={descColor}>{desc}</Desc>}
    </Wrap>
  )
}

// center: align-items(자식 정렬) + text-align(텍스트 정렬) 동시 처리
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap ?? T.spacing[24]};
  align-items: ${({ $center }) => ($center ? "center" : "flex-start")};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  padding-bottom: ${({ $pb }) => $pb ?? T.spacing[42]};
  transition: gap ${T.transition.mid};
  ${({ $animIn, $animDelay }) => ($animIn !== undefined ? revealUp($animIn, $animDelay) : "")}

  @media (max-width: ${T.bp.tablet}) {
    gap: ${T.spacing[12]};
    padding-bottom: ${({ $pb }) => $pb ?? T.spacing[36]};
  }
  @media (max-width: ${T.bp.mobile}) {
    padding-bottom: ${({ $pb }) => $pb ?? T.spacing[32]};
  }
  @media (max-width: ${T.bp.mini}) {
    padding-bottom: ${({ $pb }) => $pb ?? T.spacing[24]};
  }
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};

  @media (max-width: ${T.bp.mini}) {
    display: ${({ $hideMini }) => ($hideMini ? "none" : "flex")};
  }
`

const LabelText = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 700;
  letter-spacing: 4px;
  white-space: nowrap;
  line-height: 1;
  color: ${({ $color }) => $color};
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 3px;
  }
  @media (max-width: ${T.bp.mobile}) {
    letter-spacing: 2px;
  }
`

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.xxl};
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.5px;
  color: ${T.main};

  ${({ $gradient }) => $gradient}

  @media (max-width: ${T.bp.mobile}) {
    font-size: clamp(20px, 4.5vw, 24px);
  }
`

const Desc = styled.p`
  font-size: ${T.fontSize.sm};
  line-height: clamp(20px, 2.8vw, 28px);
  color: ${({ $color }) => $color || T.sub};
  white-space: pre-line;
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xs};
  }
  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xxs};
  }
`
