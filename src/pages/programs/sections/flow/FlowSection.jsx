// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FlowSection — FLOW OF NIGHT (1야 기준)
//  ────────────────────────────────────────────────
//  ProgSectionFrame. night prop → 야별 데이터·accent.
//  좌: 헤더 + 타임라인 / 우: 핵심 포인트 패널 / 하단: 스탯바
//  행 클릭 → selectedStep 갱신 → 패널/활성행 동시 반영
//  모바일: 패널은 행 탭 시 오버레이 툴팁으로 표시
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react"
import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import { flexCol, flexRow } from "@/styles/mixins"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { UI_TEXT } from "@/data/uiText"
import { getTimelineItems, getFlowPoint } from "@/data/nightData"
import { useResponsive } from "@/hooks/useResponsive"
import ProgSectionFrame from "@/pages/programs/ProgSectionFrame"
import ProgramStatsBar from "@/pages/programs/ProgramStatsBar"
import RouteModal from "@/pages/programs/sections/route/RouteModal"
import FlowTimeline from "./FlowTimeline"
import FeaturedPanel from "./FeaturedPanel"

const t = UI_TEXT.flowOfNight

// 우측 패널 폭 — Main 그리드·FlowerDeco 위치가 공유 (드리프트 방지)
const PANEL_W = "clamp(330px, calc(25vw + 40px), 600px)"

const getStatsItems = (stats, labels, icons) => [
  { key: "totalTime", icon: icons.time, label: labels.totalTime, value: stats.totalTime },
  { key: "walkDist", icon: icons.walk, label: labels.walkDist, value: stats.walkDist },
  { key: "viewerAge", icon: icons.age, label: labels.viewerAge, value: stats.viewerAge },
  {
    key: "difficulty",
    icon: icons.difficulty,
    label: labels.difficulty,
    value: stats.difficulty,
    gaugeValue: stats.difficultyLevel,
  },
]

export default function FlowSection({ night }) {
  const { isMobileOrTablet } = useResponsive()
  const [routeOpen, setRouteOpen] = useState(false)

  const [selectedStep, setSelectedStep] = useState(night.flowOfNight.featuredStep)
  const [tipOpen, setTipOpen] = useState(false)

  const items = getTimelineItems(night.id)
  const point = getFlowPoint(night.id, selectedStep)
  const flowIcons = PROGRAM_ASSETS.flowIcons[night.id]
  const flowBg = PROGRAM_ASSETS.flowBgs[night.id]
  const flowDeco = PROGRAM_ASSETS.flowDecos[night.id]
  const statsItems = getStatsItems(night.flowOfNight.stats, t.statsLabels, flowIcons)

  const handleSelect = (step) => {
    setSelectedStep(step)
    if (isMobileOrTablet) setTipOpen(true)
  }

  return (
    <>
      <ProgSectionFrame
        night={night}
        bg={flowBg}
        bgKey={night.id}
        bgOpacity={0.6}
        mobileBgOpacity={0.8}
        bgBlendMode="lighten"
        topFade={{ size: "clamp(120px, 16vh, 220px)", opacity: 0.9, z: 2 }}
        glows={[
          {
            side: "top",
            width: "min(900px, 80vw)",
            height: "360px",
            opacity: 0.1,
            shape: "ellipse 60% 100% at 50% 0%",
            stop: 70,
          },
        ]}
        layoutGap={`clamp(${T.spacing[16]}, 2.2vh, ${T.spacing[32]})`}
        header={{
          label: t.sectionLabel,
          title: night.flowOfNight.h2,
          desc: t.desc,
          animDelay: 0.3,
        }}
      >
        {({ accent, animIn }) => (
          <>
            <Main>
              <Left>
                {flowDeco && (
                  <FlowerDeco src={flowDeco} alt="" aria-hidden="true" $animIn={animIn} />
                )}
                <FlowTimeline
                  items={items}
                  selectedStep={selectedStep}
                  onSelect={handleSelect}
                  accent={accent}
                  titleGrad={night.style.flowTitleGrad}
                  animIn={animIn}
                />
              </Left>

              <PanelCol>
                <FeaturedPanel
                  point={point}
                  accent={accent}
                  tipIcon={flowIcons.tip}
                  animIn={animIn}
                />
              </PanelCol>
            </Main>

            <ProgramStatsBar
              items={statsItems}
              accent={accent}
              animIn={animIn}
              actionLabel={t.routeBtn}
              onAction={() => setRouteOpen(true)}
            />

            {isMobileOrTablet && tipOpen && (
              <FeaturedPanel
                point={point}
                accent={accent}
                tipIcon={flowIcons.tip}
                asOverlay
                onClose={() => setTipOpen(false)}
              />
            )}
          </>
        )}
      </ProgSectionFrame>

      <RouteModal night={night} open={routeOpen} onClose={() => setRouteOpen(false)} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────

// 연꽃 데코 — Left 컬럼 오른쪽 끝 중앙 고정
// Left 기준 position:absolute → height:100% 로 타임라인 높이 그대로 추적
const FlowerDeco = styled.img`
  position: absolute;
  top: 50%;
  right: calc(clamp(${T.spacing[32]}, 4vw, 80px) * -1);
  transform: translateY(-50%) translateX(50%)
    ${({ $animIn }) => ($animIn ? "scale(1)" : "scale(1.08)")};
  height: 100%;
  max-height: 520px;
  min-height: 280px;
  width: auto;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  pointer-events: none;
  opacity: ${({ $animIn }) => ($animIn ? 0.1 : 0)};
  filter: blur(0.5px);
  transition:
    opacity ${T.transition.bgReveal},
    transform ${T.transition.bgReveal};

  @media (max-width: ${T.bp.tablet}) {
    display: none;
  }
`

const Main = styled.div`
  flex: 1;
  min-height: 0;
  display: grid;
  /* 패널 폭: 1920px→520px 앵커, 완만한 기울기(calc) / 하한 330·상한 600 (PANEL_W 공유) */
  grid-template-columns: minmax(0, 1fr) ${PANEL_W};
  gap: clamp(${T.spacing[32]}, 4vw, 80px);
  align-items: stretch;

  @media (max-width: ${T.bp.tablet}) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Left = styled.div`
  position: relative;
  ${flexCol(`clamp(${T.spacing[16]}, 2.4vh, ${T.spacing[32]})`)}
  min-height: 0;
`

const PanelCol = styled.div`
  ${flexRow(0, "flex-end")}
  min-height: 0;

  @media (max-width: ${T.bp.tablet}) {
    display: none;
  }
`
