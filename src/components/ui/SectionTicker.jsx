import styled from "@emotion/styled"
import { T, alpha, revealUp } from "@/styles/theme"
import { StarIcon } from "@/components/ui/icons"
import { GradLine } from "@/components/ui/Deco"

export default function SectionTicker({ text, color = T.violet, animIn }) {
  return (
    <Row $animIn={animIn}>
      <GradLine $color={alpha(color, 0.5)} $dir="left" $width={T.spacing[42]} $hideMini />
      <StarIcon size={14} color={alpha(color, 0.6)} />
      <Text $color={color}>{text}</Text>
      <StarIcon size={14} color={alpha(color, 0.6)} />
      <GradLine $color={alpha(color, 0.5)} $dir="right" $width={T.spacing[42]} $hideMini />
    </Row>
  )
}

const Row = styled.div`
  position: relative;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  padding-block: ${T.spacing[24]} clamp(40px, 7.4vh, 160px);
  ${({ $animIn }) => revealUp($animIn, 0.55)}
`

const Text = styled.span`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.md};
  font-weight: 700;
  color: ${({ $color }) => alpha($color, 0.6)};
  letter-spacing: 4px;
  white-space: nowrap;
  line-height: 1;
  transform: translateY(1px);
  transition:
    font-size ${T.transition.mid},
    letter-spacing ${T.transition.mid};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.sm};
    letter-spacing: 3px;
  }
  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 2px;
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 1.5px;
  }
`
