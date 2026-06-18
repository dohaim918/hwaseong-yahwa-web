import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { vDivider, serif, flexCol, flexRow } from "@/styles/mixins"
import {
  BusIcon,
  CarIcon,
  ClockIcon,
  MapPinIcon,
  SubwayIcon,
  TicketIcon,
} from "@/components/ui/icons"

const INFO_ICONS = { location: MapPinIcon, hours: ClockIcon, price: TicketIcon }
const ACCESS_ICONS = { subway: SubwayIcon, bus: BusIcon, car: CarIcon }

export function VenueInfoItem({ item, iconKey, compact }) {
  const Icon = INFO_ICONS[iconKey] ?? MapPinIcon

  return (
    <InfoItem>
      <InfoHead>
        <Icon size={24} color={T.amber} />
        <InfoLabel>{item.label}</InfoLabel>
      </InfoHead>
      <InfoValue>{compact ? (item.mini ?? item.value) : item.value}</InfoValue>
    </InfoItem>
  )
}

export function VenueAccessItem({ item }) {
  const Icon = ACCESS_ICONS[item.icon] ?? MapPinIcon

  return (
    <AccessItem>
      <Icon size={32} color={T.amber} />
      <AccessTxt>
        <AccessMain data-access-main>{item.label}</AccessMain>
        <AccessSub>{item.sub}</AccessSub>
      </AccessTxt>
    </AccessItem>
  )
}

const InfoItem = styled.div`
  position: relative;
  ${flexCol(T.spacing[16])}
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: ${T.spacing[4]};
  border-radius: ${T.radius.md};

  ${vDivider(T.amber)}

  @media (max-width: ${T.bp.tablet}) {
    gap: ${T.spacing[8]};
  }

  @media (max-width: ${T.bp.mini}) {
    &:not(:last-of-type)::after {
      height: 80px;
    }
  }
`

const InfoHead = styled.dt`
  ${flexCol(T.spacing[12])}
  align-items: center;

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
  }
`

const InfoLabel = styled.span`
  font-size: ${T.fontSize.smFluid};
  color: ${T.amber};
`

const InfoValue = styled.dd`
  margin: 0;
  ${serif(700)}
  font-size: ${T.fontSize.smFluid};
  color: ${alpha(T.main, 0.72)};
  white-space: nowrap;
`

const AccessItem = styled.li`
  position: relative;
  ${flexRow(T.spacing[12])}
  justify-content: center;
  flex: 1;

  ${vDivider(T.amber, { height: "48px", opacity: 0.2, right: `-${T.spacing[6]}` })}

  svg {
    opacity: 0.9;
    flex-shrink: 0;
    transition:
      opacity ${T.transition.mid},
      transform ${T.transition.mid};
  }

  &:hover svg {
    opacity: 1;
    transform: translateY(-2px);
  }

  &:hover [data-access-main] {
    color: ${T.amber};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[24]};
    padding: 0 ${T.spacing[8]};

    &:not(:last-of-type)::after {
      display: none;
    }
  }
`

const AccessTxt = styled.div`
  ${flexCol(T.spacing[4])}
`

const AccessMain = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 500;
  color: ${alpha(T.main, 0.72)};
  transition: color ${T.transition.mid};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`

const AccessSub = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  color: ${alpha(T.main, 0.4)};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`
