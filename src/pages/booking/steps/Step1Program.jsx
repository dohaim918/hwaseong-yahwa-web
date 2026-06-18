// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Step1Program — 야 선택 (2×2 카드 그리드)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, shimmerLine } from "@/styles/theme"
import { flexCol, flexRow, selectableSurface, serif } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { getReservationCards } from "@/data/nightData"
import { Shimmer, OutlinePill } from "@/components/ui/Deco"
import { CheckIcon } from "@/components/ui/icons"
import StepHeading from "../StepHeading"

const t = UI_TEXT.booking.step1
const CARDS = getReservationCards()

export default function Step1Program({ nightId, accent, onSelect }) {
  return (
    <>
      <StepHeading stepNo={1} title={t.title} desc={t.desc} accent={accent} />
      <Grid>
        {CARDS.map((card) => (
          <NightSelectCard
            key={card.id}
            card={card}
            selected={nightId === card.id}
            onSelect={() => onSelect(card.id)}
          />
        ))}
      </Grid>
    </>
  )
}

function NightSelectCard({ card, selected, onSelect }) {
  const color = card.color
  return (
    <Card
      type="button"
      $color={color}
      $selected={selected}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {selected && (
        <Shimmer $top $bg={shimmerLine(color)} $glow={alpha(color, 0.45)} aria-hidden="true" />
      )}

      <TopRow>
        <OutlinePill $sm $accent={color} $fill={alpha(color, 0.18)}>
          {card.scheduleLabel}
        </OutlinePill>
        <Check $color={color} $selected={selected}>
          {selected && <CheckIcon size={13} color={T.bgBase} />}
        </Check>
      </TopRow>

      <NightNum $color={color}>{card.num}야</NightNum>
      <CardTitle>{card.cardTitle}</CardTitle>
      <Schedule>
        {card.scheduleLabel} · {card.startTime} {UI_TEXT.booking.calendar.entryLabel}
      </Schedule>

      <Tags>
        {card.tags.map((tag) => (
          <OutlinePill key={tag} $sm $accent={color}>
            {tag}
          </OutlinePill>
        ))}
      </Tags>
    </Card>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${T.spacing[20]};

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: 1fr;
    gap: ${T.spacing[12]};
  }
`

const Card = styled.button`
  position: relative;
  width: 100%;
  text-align: left;
  font-family: inherit;
  ${flexCol(T.spacing[4])}
  align-items: flex-start;
  padding: clamp(${T.spacing[20]}, 2vw, ${T.spacing[24]});
  overflow: clip;
  cursor: pointer;
  transition:
    background ${T.transition.mid},
    border-color ${T.transition.mid},
    transform ${T.transition.fast},
    box-shadow ${T.transition.mid};
  ${({ $color, $selected }) => selectableSurface($color, $selected, { radius: T.radius.xl })}

  &:hover {
    box-shadow: 0 0 0 1px ${({ $color }) => alpha($color, 0.15)};
  }

  &:active {
    transform: scale(0.99);
  }
`

const TopRow = styled.div`
  ${flexRow()}
  justify-content: space-between;
  width: 100%;
`

const Check = styled.span`
  flex-shrink: 0;
  width: ${T.spacing[20]};
  height: ${T.spacing[20]};
  border-radius: ${T.radius.full};
  ${flexRow()}
  justify-content: center;
  background: ${({ $color, $selected }) => ($selected ? $color : "transparent")};
  border: 1px solid ${({ $color, $selected }) => ($selected ? $color : alpha(T.white, 0.15))};
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast};
`

const NightNum = styled.span`
  ${serif(900)}
  margin-top: ${T.spacing[8]};
  font-size: ${T.fontSize.xxl};
  line-height: 1;
  color: ${({ $color }) => $color};
`

const CardTitle = styled.span`
  ${serif(700)}
  margin-top: ${T.spacing[4]};
  font-size: ${T.fontSize.md};
  color: ${T.main};
`

const Schedule = styled.span`
  font-size: ${T.fontSize.smFluid};
  color: ${T.sub};
`

const Tags = styled.div`
  ${flexRow(T.spacing[6])}
  flex-wrap: wrap;
  margin-top: ${T.spacing[8]};
`
