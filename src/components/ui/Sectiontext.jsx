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
import { T } from "@/styles/theme"
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
  ...props
}) {
  const hasTitle = title || gradTitle
  const labelColor = labelAccent ?? T.sub

  return (
    <Wrap $center={center} {...props}>
      {label && (
        <LabelRow>
          <Line $color={labelColor} $dir="left" />
          <LabelText $color={labelColor}>{label}</LabelText>
          <Line $color={labelColor} $dir="right" />
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
  gap: ${T.spacing[16]};
  align-items: ${({ $center }) => ($center ? "center" : "flex-start")};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};
`

const Line = styled.div`
  width: 32px;
  height: 1px;
  flex-shrink: 0;
  background: ${({ $color, $dir }) =>
    $dir === "left"
      ? `linear-gradient(90deg, transparent, ${$color})`
      : `linear-gradient(90deg, ${$color}, transparent)`};
`

const LabelText = styled.span`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.xs};
  font-weight: 700;
  letter-spacing: 4px;
  white-space: nowrap;
  color: ${({ $color }) => $color};
`

const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.xxl};
  font-weight: 700;
  line-height: 1.65;
  letter-spacing: -0.5px;
  color: ${T.main};

  ${({ $gradient }) => $gradient}

  @media (max-width: ${T.bp.mobile}) {
    letter-spacing: -0.3px;
  }
`

const Desc = styled.p`
  font-family: ${T.fontSans};
  font-size: ${T.fontSize.sm};
  line-height: 2;
  color: ${({ $color }) => $color || T.sub};
  white-space: pre-line;

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
  }
`
