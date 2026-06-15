// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteModal — 동선(관람 동선) 모달 셸
//  ────────────────────────────────────────────────
//  ModalFrame fullscreen 재활용. night.color → accent 자동.
//  지도 무대(RouteMap) + 좌측 동선 요약 + 우측/하단 상세 패널 + 상단 안내.
//  지도·핀·줌은 RouteMap, 좌표 상수·헬퍼는 routeLayout 으로 분리.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useId, useMemo, useRef, useState } from "react"
import styled from "@emotion/styled"
import { T, pad2, flexCol, flexRow, textGrad, serif, alpha } from "@/styles/theme"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { MapPinIcon, ClockIcon } from "@/components/ui/icons"
import { UI_TEXT } from "@/data/uiText"
import { getWaypoints } from "@/data/nightData"
import { useResponsive } from "@/hooks/useResponsive"
import { MAX_W, MAX_H, shiftX, slotV } from "./routeLayout"
import { OutlinePill } from "@/components/ui/Deco"
import ModalFrame from "@/components/ui/ModalFrame"
import RouteMap from "./RouteMap"
import RouteSummaryPanel from "./RouteSummaryPanel"
import RouteDetailPanel from "./RouteDetailPanel"

const rm = UI_TEXT.routeModal

export default function RouteModal({ night, open, onClose }) {
  const titleId = useId()
  const { isMobileOrTablet } = useResponsive()
  const [routeStep, setRouteStep] = useState({ active: null, last: null })

  const accent = night.color
  const { route } = night
  const waypoints = useMemo(() => getWaypoints(night.id), [night.id])
  const tag = `${pad2(night.num)} · ${night.routeCode}`
  const activeStep = routeStep.active

  // 핀/좌측 선택 시 상세 패널 오픈 (선택 전 = 오픈 전 안내 상태)
  const activeIdx = waypoints.findIndex((w) => w.step === activeStep)
  const activeWp = waypoints[activeIdx] ?? null
  const panelOpen = Boolean(activeWp)
  const activeImg = panelOpen ? (PROGRAM_ASSETS.experience[night.id]?.[activeIdx] ?? null) : null
  const sheetStep = activeStep || routeStep.last
  const sheetIdx = waypoints.findIndex((w) => w.step === sheetStep)
  const sheetWp = waypoints[sheetIdx] ?? null
  const selectStep = (step) => setRouteStep((prev) => ({ active: step, last: step || prev.last }))

  const go = (dir) => {
    const next = (activeIdx + dir + waypoints.length) % waypoints.length
    selectStep(waypoints[next].step)
  }

  const closeModal = () => {
    setRouteStep({ active: null, last: null })
    onClose?.()
  }

  // 줌 계산(RouteMap)이 Stage 크기·시트 높이를 읽으므로 두 ref 는 셸에서 만들어 전달
  const stageRef = useRef(null)
  const sheetRef = useRef(null)

  return (
    <ModalFrame
      open={open}
      onClose={closeModal}
      accent={accent}
      fullscreen
      maxWidth={MAX_W}
      maxHeight={MAX_H}
      labelledBy={titleId}
    >
      <Stage ref={stageRef}>
        {/* 지도 무대 — 배경·경로·핀·시설·힌트 + 모바일 줌 */}
        <RouteMap
          night={night}
          waypoints={waypoints}
          activeStep={activeStep}
          onSelectStep={selectStep}
          panelOpen={panelOpen}
          open={open}
          isMobileOrTablet={isMobileOrTablet}
          stageRef={stageRef}
          sheetRef={sheetRef}
        />

        {/* 좌측 동선 요약 패널 — 모달 좌측 코너 기준 (데스크탑) */}
        {!isMobileOrTablet && (
          <SummarySlot $shifted={panelOpen}>
            <RouteSummaryPanel
              waypoints={waypoints}
              sidebar={rm.sidebar}
              pointsUnit={rm.pointsUnit}
              duration={route.duration}
              accent={accent}
              activeStep={activeStep}
              onSelect={selectStep}
              compact={panelOpen}
            />
          </SummarySlot>
        )}

        {/* 우측 상세 패널 — 선택 포인트 정보 + prev/next (데스크탑) */}
        {!isMobileOrTablet && activeWp && (
          <DetailSlot>
            <RouteDetailPanel
              waypoint={activeWp}
              index={activeIdx}
              total={waypoints.length}
              accent={accent}
              image={activeImg}
              panel={rm.panel}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
            />
          </DetailSlot>
        )}

        {/* 모바일/태블릿 바텀시트 — 항상 마운트, $open 으로 slideUp/Down (내용은 직전 유지) */}
        {isMobileOrTablet && sheetWp && (
          <SheetSlot ref={sheetRef} $open={panelOpen}>
            <RouteDetailPanel
              sheet
              waypoint={sheetWp}
              index={sheetIdx}
              total={waypoints.length}
              accent={accent}
              panel={rm.panel}
              onPrev={() => go(-1)}
              onNext={() => go(1)}
              onClose={() => selectStep(null)}
            />
          </SheetSlot>
        )}

        {/* 상단 안내 (지도 위 헤더 공간) — 지도와 함께 좌측 이동 */}
        <TopGuide $shifted={!isMobileOrTablet && panelOpen}>
          <Tag $sm $accent={accent}>
            {tag}
          </Tag>
          <GuideRest $panelOpen={panelOpen}>
            <BigTitle id={titleId} $accent={accent}>
              {route.title}
            </BigTitle>
            <GuideDesc>{rm.guideText}</GuideDesc>
            <Meta>
              <span>
                <MapPinIcon size={13} color={accent} />
                {waypoints.length}
                {rm.pointsUnit}
              </span>
              <span>
                <ClockIcon size={13} color={accent} />
                {route.duration}
              </span>
            </Meta>
          </GuideRest>
        </TopGuide>
      </Stage>
    </ModalFrame>
  )
}

// ─────────────────────────────────────────────────────────────

const Stage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: ${T.bgDark};
  container-type: inline-size;
`

// ── 공통 태그 칩 — OutlinePill $sm 기반 (중앙 정렬 + 넓은 자간만 추가)
const Tag = styled(OutlinePill)`
  align-self: center;
  letter-spacing: 3px;
  background: ${({ $accent }) =>
    `linear-gradient(135deg, ${alpha($accent, 0.25)}, ${alpha($accent, 0.15)}), ${alpha(T.bgDark, 0.8)}`};
`

// ── 상단 안내 (태그 + 타이틀 + 설명 + 메타)
const TopGuide = styled.div`
  position: absolute;
  ${({ $shifted }) => shiftX($shifted)}
  top: clamp(${T.spacing[20]}, 4vh, ${T.spacing[48]});
  z-index: 3;
  ${flexCol(T.spacing[12])}
  align-items: center;
  text-align: center;
  max-width: min(460px, 84vw);

  /* 모바일·태블릿: 좌측 이동 무효 (지도와 함께 중앙 고정) */
  @media (max-width: ${T.bp.tablet}) {
    transform: translateX(-50%);
  }
`

// 태그 아래 묶음(타이틀·설명·메타) — 모바일·태블릿 핀 선택 후 fade out (태그는 유지, 공간 양보)
const GuideRest = styled.div`
  ${flexCol(T.spacing[12])}
  align-items: center;
  transition:
    transform ${T.transition.spring},
    opacity ${T.transition.fast};

  @media (max-width: ${T.bp.tablet}) {
    ${({ $panelOpen }) =>
      $panelOpen &&
      `
        opacity: 0;
        pointer-events: none;
        transform: translateY(-${T.spacing[12]});
      `}
  }
`

const BigTitle = styled.h3`
  ${serif(700)}
  font-size: clamp(20px, 5vw, 36px);
  letter-spacing: 0.8px;
  ${({ $accent }) => textGrad(T.main, $accent)}
`

const GuideDesc = styled.p`
  font-size: clamp(13px, 1vw, 14px);
  line-height: 1.7;
  color: ${T.sub};
  white-space: pre-line;

  /* 모바일: 세로 공간 확보 위해 설명 숨김 (태그·타이틀·메타는 유지) */
  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

const Meta = styled.div`
  ${flexRow(T.spacing[16])}
  margin-top: ${T.spacing[4]};
  font-size: ${T.fontSize.xxs};

  color: ${T.sub};

  span {
    ${flexRow(T.spacing[4])}
    font-weight: 700;
  }
`

// 동선 요약 패널 — 가로는 모달 좌측 코너(지도가 넘쳐도 안 잘림), 세로는 지도 중앙 정렬.
// 지도(MapFrame)가 bottom:0 + height:86% → 세로 중앙 = 모달 기준 57%(14% 상단 + 43% 절반).
const SummarySlot = styled.div`
  ${slotV}
  left: ${({ $shifted }) =>
    $shifted
      ? `clamp(${T.spacing[32]}, 4vw, ${T.spacing[48]})`
      : `clamp(${T.spacing[16]}, 2.5vw, ${T.spacing[36]})`};
  transition: left ${T.transition.spring};
`

// 우측 상세 패널 슬롯 — SummarySlot 대칭 (우측 코너 기준, 세로 중앙)
const DetailSlot = styled.div`
  ${slotV}
  right: clamp(${T.spacing[16]}, 2.5vw, ${T.spacing[36]});
`

// 모바일·태블릿 바텀시트 슬롯 — 하단 고정, $open 으로 slideUp/Down (닫혀도 마운트 유지)
const SheetSlot = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  padding-inline: ${T.spacing[12]};
  transform: translateY(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform ${T.transition.spring};
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
`
