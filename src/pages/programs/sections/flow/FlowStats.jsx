// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FlowStats — 하단 통계 바 + 관람 동선 버튼 (Figma 463:3862)
//  ────────────────────────────────────────────────
//  스탯 4개(소요시간·도보거리·연령·난이도) + 난이도 게이지 + 동선 버튼
//  props: stats / labels / icons / accent / animIn / routeLabel / onRoute
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, revealUp, gradientBorder, vDivider, serif } from "@/styles/theme"
import Button from "@/components/ui/Button"
import { ArrowRightIcon } from "@/components/ui/icons"

const GAUGE_TOTAL = 5

export default function FlowStats({
  stats,
  labels,
  icons,
  accent,
  animIn,
  routeLabel,
  onRoute,
}) {
  const cells = [
    { key: "totalTime", icon: icons.time, label: labels.totalTime, value: stats.totalTime },
    { key: "walkDist", icon: icons.walk, label: labels.walkDist, value: stats.walkDist },
    { key: "viewerAge", icon: icons.age, label: labels.viewerAge, value: stats.viewerAge },
    {
      key: "difficulty",
      icon: icons.difficulty,
      label: labels.difficulty,
      value: stats.difficulty,
    },
  ]

  return (
    <Bar $accent={accent} $animIn={animIn}>
      <StatsGroup>
        {cells.map(({ key, icon, label, value }) => (
          <Stat key={key} $accent={accent}>
            <IconBox $src={icon} aria-hidden="true" />
            <Meta>
              <Label $accent={accent}>{label}</Label>
              <ValRow>
                <Value>{value}</Value>
                {key === "difficulty" && (
                  <Gauge aria-hidden="true">
                    {Array.from({ length: GAUGE_TOTAL }, (_, d) => (
                      <GaugeDot key={d} $on={d < stats.difficultyLevel} $accent={accent} />
                    ))}
                  </Gauge>
                )}
              </ValRow>
            </Meta>
          </Stat>
        ))}
      </StatsGroup>

      <RouteBtn accent={accent} size="lg" onClick={onRoute}>
        {routeLabel}
        <ArrowRightIcon size={16} />
      </RouteBtn>
    </Bar>
  )
}

// ─────────────────────────────────────────────────────────────

// 테두리 그라디언트 (Figma 539:21791 스트로크: -85° / rose58 1·0.4·0.6·0.85)
const barBorderGrad = (c) =>
  `linear-gradient(175deg, ${c} 0%, ${alpha(c, 0.4)} 40%, ${alpha(c, 0.6)} 75%, ${alpha(c, 0.85)} 100%)`

const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  column-gap: clamp(${T.spacing[32]}, 4vw, 80px);
  row-gap: ${T.spacing[24]};
  width: 100%;
  flex-shrink: 0;
  padding: clamp(${T.spacing[20]}, 2.4vh, ${T.spacing[36]}) clamp(${T.spacing[24]}, 3vw, 60px);
  border-radius: ${T.radius.xl};
  background: ${alpha(T.bgBase, 0.55)};
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
  grid-template-columns: repeat(4, max-content);
  align-items: center;
  flex: 1 1 680px;
  gap: clamp(${T.spacing[16]}, 2vw, ${T.spacing[42]});

  @media (max-width: ${T.bp.desktop}) {
    flex-basis: 100%;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]} ${T.spacing[12]};
  }
`

const Stat = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: clamp(${T.spacing[12]}, 1.4vw, ${T.spacing[24]});
  ${({ $accent }) => vDivider($accent, { height: "100%", opacity: 0.2 })}

  &:not(:last-of-type) {
    padding-right: clamp(${T.spacing[16]}, 2vw, ${T.spacing[42]});
  }

  @media (max-width: ${T.bp.mobile}) {
    &:nth-of-type(2n) {
      padding-right: 0;
    }

    &:nth-of-type(2n)::after {
      display: none;
    }
  }

  @media (max-width: ${T.bp.mini}) {
    padding-right: ${T.spacing[12]};
  }
`

// 아이콘 — 정사각, 옆 텍스트 높이 스케일에 맞춰 따라감 (flex aspect-ratio 0폭 버그 회피 위해 폭 기준)
const IconBox = styled.div`
  flex-shrink: 0;
  width: clamp(40px, 4.8vw, 58px);
  aspect-ratio: 1 / 1;
  background: ${({ $src }) => `url(${$src}) center / contain no-repeat`};

  @media (max-width: ${T.bp.mini}) {
    width: 32px;
  }
`

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[8]};
`

const Label = styled.span`
  font-size: clamp(${T.fontSize.xs}, calc(0.4vw + 11px), ${T.fontSize.sm});
  color: ${({ $accent }) => alpha($accent, 0.68)};
  white-space: nowrap;

  /* 미니: 라벨 숨김 — 아이콘 + Value 만 (풀섹션 100dvh 수납) */
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const ValRow = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(${T.spacing[8]}, 1.2vw, ${T.spacing[24]});
`

const Value = styled.span`
  ${serif(700)}
  font-size: clamp(${T.fontSize.xs}, calc(0.75vw + 8px), 24px);
  line-height: 1;
  color: ${T.main};
  white-space: nowrap;
`

const Gauge = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(${T.spacing[6]}, 0.7vw, ${T.spacing[12]});

  /* 미니: 라벨 숨김과 동일하게 난이도 게이지도 숨김 */
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
