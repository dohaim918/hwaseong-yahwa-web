import styled from "@emotion/styled"
import {
  T,
  alpha,
  revealUp,
  gradientBorder,
  vDivider,
  serif,
  glass,
  flexCol,
  flexRow,
} from "@/styles/theme"
import Button from "@/components/ui/Button"
import { ArrowRightIcon } from "@/components/ui/icons"

const GAUGE_TOTAL = 5

export default function ProgramStatsBar({
  className,
  items,
  accent,
  animIn,
  variant = "flow",
  actionLabel,
  onAction,
}) {
  const hasAction = Boolean(actionLabel)

  return (
    <Bar className={className} $accent={accent} $animIn={animIn} $variant={variant}>
      <StatsGroup $count={items.length} $hasAction={hasAction} $variant={variant}>
        {items.map(({ key, icon, label, value, gaugeValue, gaugeTotal = GAUGE_TOTAL }, i) => (
          <Stat key={key} $accent={accent} $divider={i < items.length - 1} $variant={variant}>
            <IconBox $src={icon} $accent={accent} $variant={variant} aria-hidden="true" />
            <Meta>
              <Label $accent={accent} $variant={variant}>
                {label}
              </Label>
              <ValRow>
                <Value $variant={variant}>{value}</Value>
                {gaugeValue != null && (
                  <Gauge aria-hidden="true">
                    {Array.from({ length: gaugeTotal }, (_, d) => (
                      <GaugeDot key={d} $on={d < gaugeValue} $accent={accent} />
                    ))}
                  </Gauge>
                )}
              </ValRow>
            </Meta>
          </Stat>
        ))}
      </StatsGroup>

      {hasAction && (
        <RouteBtn accent={accent} size="lg" onClick={onAction}>
          {actionLabel}
          <ArrowRightIcon size={16} />
        </RouteBtn>
      )}
    </Bar>
  )
}

const barBorderGrad = (c) =>
  `linear-gradient(175deg, ${c} 0%, ${alpha(c, 0.4)} 40%, ${alpha(c, 0.6)} 75%, ${alpha(c, 0.85)} 100%)`

const BAR_STYLE = {
  flow: {
    pad: `clamp(${T.spacing[20]}, 2.4vh, ${T.spacing[36]}) clamp(${T.spacing[24]}, 3vw, 60px)`,
    columnGap: `clamp(${T.spacing[32]}, 4vw, 80px)`,
    rowGap: T.spacing[24],
    statGap: `clamp(${T.spacing[12]}, 1.4vw, ${T.spacing[24]})`,
    statPadRight: `clamp(${T.spacing[16]}, 2vw, ${T.spacing[42]})`,
  },
  final: {
    pad: `clamp(${T.spacing[16]}, 2.2vh, ${T.spacing[24]}) clamp(${T.spacing[16]}, 2.2vw, ${T.spacing[32]})`,
    columnGap: `clamp(${T.spacing[16]}, 2.4vw, ${T.spacing[32]})`,
    rowGap: T.spacing[16],
    statGap: `clamp(${T.spacing[8]}, 1vw, ${T.spacing[16]})`,
    statPadRight: `clamp(${T.spacing[12]}, 1.5vw, ${T.spacing[24]})`,
  },
}

const barStyle = (variant) => BAR_STYLE[variant] ?? BAR_STYLE.flow

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  column-gap: ${({ $variant }) => barStyle($variant).columnGap};
  row-gap: ${({ $variant }) => barStyle($variant).rowGap};
  width: ${({ $variant }) => ($variant === "final" ? "max-content" : "100%")};
  flex-shrink: 0;
  padding: ${({ $variant }) => barStyle($variant).pad};
  border-radius: ${T.radius.xl};
  background: ${alpha(T.bgBase, 0.55)};
  ${glass("8px")}
  ${({ $accent }) => gradientBorder(barBorderGrad($accent))}
  ${({ $animIn }) => revealUp($animIn, 0.55)}

  @media (max-width: ${T.bp.mini}) {
    row-gap: ${T.spacing[16]};
    column-gap: ${T.spacing[16]};
    padding: ${T.spacing[16]} ${T.spacing[20]};
  }
`

const StatsGroup = styled.div`
  display: grid;
  grid-template-columns: ${({ $count, $variant }) =>
    $variant === "final" ? `repeat(${$count}, minmax(0, 1fr))` : `repeat(${$count}, max-content)`};
  align-items: center;
  justify-content: ${({ $hasAction }) => ($hasAction ? "start" : "space-between")};
  flex: ${({ $hasAction }) => ($hasAction ? "1 1 680px" : "1 1 100%")};
  width: ${({ $hasAction }) => ($hasAction ? "auto" : "100%")};
  gap: clamp(${T.spacing[16]}, 2vw, ${T.spacing[42]});

  @media (max-width: ${T.bp.desktop}) {
    flex-basis: 100%;
    grid-template-columns: repeat(${({ $count }) => $count}, minmax(0, 1fr));
  }

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const Stat = styled.div`
  position: relative;
  ${({ $variant }) => flexRow(barStyle($variant).statGap)}
  min-width: 0;

  ${({ $divider, $accent, $variant }) =>
    $divider &&
    `
    padding-right: ${barStyle($variant).statPadRight};
    ${vDivider($accent, { height: "100%", opacity: 0.2 })}
  `}

  @media (max-width: ${T.bp.mobile}) {
    &:nth-of-type(2n) {
      padding-right: 0;
    }

    &:nth-of-type(2n)::after {
      display: none;
    }
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[8]};
    padding-right: ${({ $divider }) => ($divider ? T.spacing[12] : "0")};
  }
`

const IconBox = styled.span`
  flex-shrink: 0;
  width: ${({ $variant }) =>
    $variant === "final"
      ? `clamp(${T.spacing[32]}, 3vw, ${T.spacing[42]})`
      : `clamp(40px, 4.8vw, 58px)`};
  aspect-ratio: 1 / 1;
  background: ${({ $accent }) => $accent};
  -webkit-mask: ${({ $src }) => `url(${$src}) center / contain no-repeat`};
  mask: ${({ $src }) => `url(${$src}) center / contain no-repeat`};

  @media (max-width: ${T.bp.mini}) {
    width: 32px;
  }
`

const Meta = styled.div`
  ${flexCol(T.spacing[8])}
  min-width: 0;
`

const Label = styled.span`
  font-size: ${({ $variant }) =>
    $variant === "final"
      ? `clamp(${T.fontSize.xxs}, calc(0.35vw + 10px), ${T.fontSize.xs})`
      : `clamp(${T.fontSize.xs}, calc(0.4vw + 11px), ${T.fontSize.sm})`};
  color: ${({ $accent }) => alpha($accent, 0.68)};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const ValRow = styled.div`
  ${flexRow(`clamp(${T.spacing[8]}, 1.2vw, ${T.spacing[24]})`)}
  min-width: 0;
`

const Value = styled.span`
  ${serif(700)}
  font-size: ${({ $variant }) =>
    $variant === "final"
      ? `clamp(${T.fontSize.xs}, calc(0.45vw + 10px), ${T.fontSize.md})`
      : `clamp(${T.fontSize.xs}, calc(0.75vw + 8px), 24px)`};
  line-height: 1;
  color: ${T.main};
  white-space: nowrap;
`

const Gauge = styled.div`
  ${flexRow(`clamp(${T.spacing[6]}, 0.7vw, ${T.spacing[12]})`)}

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const GaugeDot = styled.span`
  width: clamp(8px, 0.8vw, 14px);
  height: clamp(8px, 0.8vw, 14px);
  border-radius: 50%;
  flex-shrink: 0;
  background: ${({ $on, $accent }) => ($on ? $accent : alpha(T.sub, 0.3))};
  box-shadow: ${({ $on, $accent }) => ($on ? `0 0 8px ${alpha($accent, 0.6)}` : "none")};
`

const RouteBtn = styled(Button)`
  flex: 1 0 auto;
  max-width: 390px;
  margin-inline: auto;
`
