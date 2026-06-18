import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { focusRing } from "@/styles/mixins"
export default function ProgTabs({ cards, activeIdx, onChange }) {
  return (
    <TabRow>
      {cards.map((card, i) => (
        <TabBtn
          key={card.id}
          type="button"
          $active={activeIdx === i}
          $color={card.color}
          onClick={() => onChange(i)}
          aria-pressed={activeIdx === i}
        >
          {card.num}야
        </TabBtn>
      ))}
    </TabRow>
  )
}

const TabRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${T.spacing[8]};
  padding: 0 ${T.spacing[16]} ${T.spacing[24]};
`

const TabBtn = styled.button`
  font-size: ${T.fontSize.sm};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  letter-spacing: 2px;
  padding: ${T.spacing[8]} ${T.spacing[20]};
  border-radius: ${T.radius.pill};
  border: 1px solid;
  cursor: pointer;
  transition:
    background ${T.transition.mid},
    color ${T.transition.mid},
    border-color ${T.transition.mid};
  background: ${({ $active, $color }) => ($active ? alpha($color, 0.15) : "transparent")};
  color: ${({ $active, $color }) => ($active ? $color : T.sub)};
  border-color: ${({ $active, $color }) => ($active ? alpha($color, 0.5) : alpha(T.sub, 0.3))};

  ${({ $color }) => focusRing(alpha($color, 0.7))}

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 1px;
    padding: ${T.spacing[6]} ${T.spacing[16]};
  }
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    padding: ${T.spacing[6]} ${T.spacing[12]};
  }
`
