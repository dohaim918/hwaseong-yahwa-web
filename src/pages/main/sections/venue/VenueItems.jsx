import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[16]};
  flex: 1;
  padding: ${T.spacing[4]};
  border-radius: ${T.radius.md};

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 0;
    width: 1px;
    height: 90px;
    background: ${alpha(T.amber, 0.1)};
    transform: translateY(-50%);
  }

  @media (max-width: ${T.bp.tablet}) {
    /* padding: ${T.spacing[8]}; */
    gap: ${T.spacing[8]};
  }

  @media (max-width: ${T.bp.mini}) {
    &:not(:last-of-type)::after {
      height: 80px;
    }
  }
`

const InfoHead = styled.dt`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[12]};

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
  }
`

const InfoLabel = styled.span`
  font-size: ${T.fontSize.sm};
  color: ${T.amber};

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`

const InfoValue = styled.dd`
  margin: 0;
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${alpha(T.main, 0.72)};
  white-space: nowrap;

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xs};
  }
`

const AccessItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[12]};
  flex: 1;
  /* min-width: 0; */
  /* cursor: default; */

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: calc(-1 * ${T.spacing[4]});
    width: 1px;
    height: 52px;
    background: ${alpha(T.amber, 0.2)};
    transform: translateY(-50%);
  }

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
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[4]};
  /* min-width: 0; */
`

const AccessMain = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 500;
  /* line-height: 1.7; */
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
  /* line-height: 1.7; */
  color: ${alpha(T.main, 0.4)};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }
`
