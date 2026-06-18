// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  StepHeading — 각 단계 상단 헤더 (STEP NN · 제목 · 설명)
//  좌측 정렬 · 라벨 accent. (SectionHeader 와 달리 양옆 라인 없음)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, pad2 } from "@/styles/theme"
import { serif, flexCol } from "@/styles/mixins"
export default function StepHeading({ stepNo, title, desc, accent = T.pink }) {
  return (
    <Wrap>
      <Eyebrow $accent={accent}>STEP {pad2(stepNo)}</Eyebrow>
      <Title>{title}</Title>
      {desc && <Desc>{desc}</Desc>}
    </Wrap>
  )
}

const Wrap = styled.div`
  ${flexCol(T.spacing[8])}
  align-items: flex-start;
  padding-bottom: clamp(${T.spacing[24]}, 3.4vh, ${T.spacing[36]});
`

const Eyebrow = styled.span`
  font-size: ${T.fontSize.smFluid};
  font-weight: 700;
  letter-spacing: 0;
  color: ${({ $accent }) => $accent};
`

const Title = styled.h2`
  ${serif(900)}
  font-size: ${T.fontSize.xl};
  letter-spacing: 0;
  line-height: 1.25;
  color: ${T.main};
`

const Desc = styled.p`
  font-size: ${T.fontSize.smFluid};
  line-height: 1.5;
  color: ${T.sub};
  white-space: pre-line;
`
