// RouteMap — 지도 배경·경로·핀·시설 범례 + 모바일 pan/zoom
// 지도 요소는 1091×700 좌표계를 % 로 환산해 배치한다.

import { useLayoutEffect, useRef } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { T, alpha, glass, flexRow, focusRing } from "@/styles/theme"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { SparkleIcon } from "@/components/ui/icons"
import { UI_TEXT } from "@/data/uiText"
import {
  MAP_W,
  MAP_H,
  mapX,
  mapY,
  M_MAP_H,
  M_MAP_BOTTOM,
  M_ZOOM,
  M_FOCUS_Y_OFFSET,
  shiftX,
} from "./routeLayout"
import RouteFacilities from "./RouteFacilities"
import routeSvg1 from "@/assets/images/programs/route/route-1.svg?raw"
import routeSvg2 from "@/assets/images/programs/route/route-2.svg?raw"
import routeSvg3 from "@/assets/images/programs/route/route-3.svg?raw"
import routeSvg4 from "@/assets/images/programs/route/route-4.svg?raw"

const rm = UI_TEXT.routeModal

// 야별 경로 SVG.
const ROUTE_SVGS = { 1: routeSvg1, 2: routeSvg2, 3: routeSvg3, 4: routeSvg4 }

export default function RouteMap({
  night,
  waypoints,
  activeStep,
  onSelectStep,
  panelOpen,
  open,
  isMobileOrTablet,
  stageRef,
  sheetRef,
}) {
  const accent = night.color
  const mapSrc = PROGRAM_ASSETS.routeMaps[night.id]
  const flowDeco = PROGRAM_ASSETS.flowDecos[night.id]
  const routeOverlay = ROUTE_SVGS[night.id] || null
  const activeWaypoint = waypoints.find((w) => w.step === activeStep)

  // 모바일 줌 — 실제 MapFrame 기준으로 선택 핀을 시트 위 가시영역에 맞춘다.
  const mapCameraRef = useRef(null)
  const didInitRef = useRef(false)

  useLayoutEffect(() => {
    if (!open) {
      didInitRef.current = false
      return
    }
    const camera = mapCameraRef.current
    if (!camera) return
    // 데스크탑: 줌 해제
    if (!isMobileOrTablet) {
      camera.style.transition = ""
      camera.style.transform = ""
      camera.style.transformOrigin = ""
      return
    }
    const stage = stageRef.current
    if (!stage) return

    const apply = () => {
      const sw = stage.clientWidth
      const sh = stage.clientHeight
      if (!sw || !sh) return
      const frame = camera.parentElement
      const stageRect = stage.getBoundingClientRect()
      const frameRect = frame?.getBoundingClientRect()
      const mh = frameRect?.height || sh * M_MAP_H // MapFrame height (84%)
      const mw = frameRect?.width || mh * (MAP_W / MAP_H) // aspect 로 width 산출
      const frameX = frameRect ? frameRect.left - stageRect.left : (sw - mw) / 2
      const my = frameRect ? frameRect.top - stageRect.top : sh * (1 - M_MAP_BOTTOM - M_MAP_H) // MapFrame top
      camera.style.transformOrigin = "0 0"
      if (!activeWaypoint?.mapXY) {
        // 선택 해제 시 CSS 중앙 정렬로 복귀하고 이전 pan 값을 비운다.
        camera.style.transform = ""
        return
      }
      const hs = sheetRef.current?.offsetHeight ?? 0
      const S = M_ZOOM
      const px = (activeWaypoint.mapXY.x / MAP_W) * mw // left:0 기준 핀 X
      const py = (activeWaypoint.mapXY.y / MAP_H) * mh // 지도 내부 기준 핀 Y
      let tx = sw / 2 - frameX - px * S // 핀 → 가로 중앙(MapFrame 중앙 오프셋 보정)
      let ty = (sh - hs) / 2 + M_FOCUS_Y_OFFSET - my - py * S // 핀 → 가시영역 세로 중앙보다 살짝 아래
      // X축만 clamp: 세로는 위쪽 핀(예: 04) 정렬을 위해 제한하지 않는다.
      tx = Math.min(-frameX, Math.max(sw - frameX - mw * S, tx))
      camera.style.transform = `translate(${tx}px, ${ty}px) scale(${S})`
    }

    if (!didInitRef.current) {
      // 최초 1회만 transition 없이 즉시(마운트 슬라이드 방지), 이후엔 CSS transition 으로 보간
      didInitRef.current = true
      camera.style.transition = "none"
      apply()
      void camera.offsetWidth
      camera.style.transition = ""
    } else {
      apply()
    }

    // 리사이즈(회전·창 조절) 시 재적용
    const ro = new ResizeObserver(apply)
    ro.observe(stage)
    return () => ro.disconnect()
  }, [activeWaypoint, isMobileOrTablet, open, sheetRef, stageRef])

  return (
    // 지도(핀 외 영역) 클릭 → 패널 닫고 오픈 전으로
    <MapFrame
      $shifted={!isMobileOrTablet && panelOpen}
      $focused={!!activeWaypoint?.mapXY}
      onClick={() => panelOpen && onSelectStep(null)}
    >
      <MapCamera ref={mapCameraRef}>
        <MapBg src={mapSrc} alt="" aria-hidden="true" />
        {flowDeco && <MapFlower src={flowDeco} alt="" aria-hidden="true" />}

        {/* 경로 SVG 오버레이 */}
        {routeOverlay && (
          <RouteOverlay aria-hidden="true" dangerouslySetInnerHTML={{ __html: routeOverlay }} />
        )}

        {/* 번호 핀 */}
        {waypoints.map((w) =>
          w.mapXY ? (
            <RoutePin
              key={w.step}
              w={w}
              active={w.step === activeStep}
              accent={accent}
              dim={night.colorDim}
              dark={night.colorDark}
              onClick={(e) => {
                e.stopPropagation()
                onSelectStep(w.step)
              }}
            />
          ) : null
        )}

        {/* 우하단 시설 범례 */}
        <FacilitiesSlot $shifted={panelOpen}>
          <RouteFacilities legend={rm.legend} accent={accent} />
        </FacilitiesSlot>

        {/* 하단 핀 힌트 */}
        {!panelOpen && (
          <Hint>
            <SparkleIcon size={13} color={accent} />
            {rm.pinHint}
          </Hint>
        )}
      </MapCamera>
    </MapFrame>
  )
}

// 번호 핀 — 중심이 mapXY 지점, active 는 펄스 링.
function RoutePin({ w, active, accent, dim, dark, onClick }) {
  return (
    <Pin
      type="button"
      $active={active}
      $accent={accent}
      $dim={dim}
      $dark={dark}
      style={{ left: mapX(w.mapXY.x), top: mapY(w.mapXY.y) }}
      onClick={onClick}
      aria-label={`${w.step} · ${w.label}`}
      aria-current={active ? "true" : undefined}
    >
      {active && <PinRing $accent={accent} aria-hidden="true" />}
      {w.step}
    </Pin>
  )
}

// active 핀 펄스 링.
const ringPulse = keyframes`
  0%   { transform: translate(-50%, -50%) scale(0.7); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(2.25); opacity: 0; }
`

const Pin = styled.button`
  position: absolute;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: ${T.radius.full};
  cursor: pointer;
  font-size: ${T.fontSize.xxs};
  line-height: 1;
  transform: translate(-50%, -50%) scale(${({ $active }) => ($active ? 1.2 : 1)});
  z-index: ${({ $active }) => ($active ? 6 : 5)};
  ${glass("6px")}
  transition:
    transform ${T.transition.spring},
    box-shadow ${T.transition.mid},
    background ${T.transition.fast};
  ${({ $active, $accent, $dim, $dark }) =>
    $active
      ? `
    background: ${alpha($dim, 0.5)};
    border: 1.5px solid ${$accent};
    color: ${T.white};
    font-weight: 800;
    box-shadow:
      0 0 8px ${$accent},
      0 0 18px ${alpha($accent, 0.8)},
      inset 0 0 8px ${alpha($accent, 0.55)},
      0 4px 12px ${alpha($dark, 0.5)};
  `
      : `
    background: ${alpha(T.bgDark, 0.6)};
    border: 1px solid ${alpha($accent, 0.8)};
    color: ${$accent};
    font-weight: 700;
    box-shadow:
      0 0 8px ${alpha($accent, 0.3)},
      0 2px 6px ${alpha($dark, 0.5)};
  `}

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translate(-50%, -50%) scale(${({ $active }) => ($active ? 1.2 : 1.12)});
      ${({ $active, $accent, $dim }) =>
        !$active &&
        `background: ${alpha($dim, 0.5)}; border-color: ${$accent}; color: ${alpha(T.white, 0.95)};
         box-shadow: 0 0 8px ${alpha($accent, 0.6)}, inset 0 0 6px ${alpha($accent, 0.35)};`}
    }
  }

  ${({ $accent }) => focusRing($accent, T.radius.full)}
`

const PinRing = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  border-radius: ${T.radius.full};
  border: 2px solid ${({ $accent }) => $accent};
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ${ringPulse} 1.8s ease-out infinite;
`

// 경로 점선 흐름 애니메이션.
const dashFlow = keyframes`
  to { stroke-dashoffset: -26; }
`

// 경로 SVG 오버레이 — 지도와 동일한 viewBox, dasharray 경로만 흐름 처리.
const RouteOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  user-select: none;

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  svg path {
    animation: ${dashFlow} 2.5s linear infinite;
  }
`

// 지도 기준 박스 — 핀·시설·힌트는 이 박스 기준 % 좌표로 정렬.
const MapFrame = styled.div`
  position: absolute;
  bottom: 0;
  ${({ $shifted }) => shiftX($shifted)}
  height: 86%;
  aspect-ratio: ${MAP_W} / ${MAP_H};

  /* 모바일: MapFrame 은 기본 위치만 보정, 선택 후 이동은 MapCamera pan/zoom 이 담당. */
  @media (max-width: ${T.bp.tablet}) {
    bottom: ${M_MAP_BOTTOM * 100}%;
    height: ${M_MAP_H * 100}%;
    transform: translateX(${({ $focused }) => ($focused ? "-50%" : "calc(-50% - 10px)")});
  }
`

// 지도 내부 카메라 — 모바일·태블릿에서 pan/zoom transform 적용.
const MapCamera = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;

  @media (max-width: ${T.bp.tablet}) {
    transition: transform ${T.transition.spring};
  }
`

const MapBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
`

// 화성 심볼 워터마크 — 지도 좌표 x757 y220, 480×480.
const MapFlower = styled.img`
  position: absolute;
  left: ${mapX(757)};
  top: ${mapY(220)};
  width: ${mapX(480)};
  aspect-ratio: 1 / 1;
  object-fit: contain;
  opacity: 0.09;
  user-select: none;
  pointer-events: none;
`

// 우하단 시설 범례 — 지도 좌표 x711 y481.
const FacilitiesSlot = styled.div`
  position: absolute;
  left: ${mapX(711)};
  top: ${mapY(481)};
  z-index: 2;

  /* 패널 오픈 + 1080px 이하에서 범례를 선형 보정.
     1080px 에서 0 → 최대 mapX(31)까지만 왼쪽 이동. */
  @container (max-width: 1080px) {
    left: ${({ $shifted }) =>
      $shifted
        ? `calc(${mapX(711)} - clamp(0px, calc(405px - 37.5cqw), ${mapX(31)}))`
        : `${mapX(711)}`};
  }

  @media (max-width: ${T.bp.tablet}) {
    left: ${mapX(711)};
  }

  /* 모바일: 가독성과 시트 충돌 때문에 숨김. */
  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

// 하단 핀 힌트 칩 — 지도 좌표 y634.
const Hint = styled.div`
  position: absolute;
  left: 50%;
  top: ${mapY(634)};
  transform: translateX(-50%);
  z-index: 2;
  line-height: 1.4;
  ${flexRow(T.spacing[8])}
  padding: ${T.spacing[8]} ${T.spacing[20]};
  border: 1px solid ${alpha(T.white, 0.1)};
  border-radius: ${T.radius.pill};
  background: ${alpha(T.bgDark, 0.88)};
  ${glass("10px")}
  font-size: ${T.fontSize.xxs};
  color: ${T.sub};
  white-space: nowrap;
`
