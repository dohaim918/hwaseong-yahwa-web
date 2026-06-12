// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteModal — 동선(관람 동선) 모달 (Figma 518:4680 / 518:4894)
//  ────────────────────────────────────────────────
//  ModalFrame fullscreen 재활용. night.color → accent 자동.
//  [1차 = 핀 선택 전] 지도 배경(MapFrame) + 좌측 동선 요약 +
//                     상단 안내 + 시설 범례 + 꽃 워터마크 + 핀 힌트
//  지도 위 정합 요소(꽃·시설·힌트·2차 핀)는 MapFrame 안에 피그마 % 좌표로 배치
//  → 지도 이미지(1091×700) 기준 좌표계. 지도 크기가 바뀌어도 정합 유지
//  [2차 예정] 지도 핀(mapXY) · 경로선 SVG(route.path) · 핀 클릭 → 우측 상세 패널
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useId } from "react"
import styled from "@emotion/styled"
import { T, alpha, pad2, glass, flexCol, flexRow, textGrad, accentFill } from "@/styles/theme"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { UI_TEXT } from "@/data/uiText"
import { getWaypoints } from "@/data/nightData"
import { useResponsive } from "@/hooks/useResponsive"
import ModalFrame from "@/components/ui/ModalFrame"
import RouteSummaryPanel from "./RouteSummaryPanel"
import RouteFacilities from "./RouteFacilities"

const rm = UI_TEXT.routeModal

// 콘텐츠 최대 크기 (ModalFrame maxWidth/maxHeight → 큰 화면에서 가로·세로 대칭 카드)
// 높이 960 = 지도(폭1280→821px) + 상단 헤더 공간(~140px)
const MAX_W = 1280
const MAX_H = 960

// ── 지도 이미지 좌표계 (Figma Rectangle 41 = 1091×700) ──
// 지도 위 요소(꽃·시설·힌트·핀)는 이 좌표를 % 로 환산해 MapFrame 안에 배치
const MAP_W = 1091
const MAP_H = 700
const mapX = (x) => `${(x / MAP_W) * 100}%`
const mapY = (y) => `${(y / MAP_H) * 100}%`

export default function RouteModal({ night, open, onClose }) {
  const titleId = useId()
  const { isMobileOrTablet } = useResponsive()

  const accent = night.color
  const { route } = night
  const waypoints = getWaypoints(night.id)
  const mapSrc = PROGRAM_ASSETS.routeMaps[night.id]
  const flowDeco = PROGRAM_ASSETS.flowDecos[night.id]
  const tag = `${pad2(night.num)} · ${night.routeCode}`

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      accent={accent}
      fullscreen
      maxWidth={MAX_W}
      maxHeight={MAX_H}
      labelledBy={titleId}
    >
      <Stage>
        {/* 지도 + 지도 위 UI (이미지 기준 좌표 → 항상 지도와 정합) */}
        <MapFrame>
          <MapBg src={mapSrc} alt="" aria-hidden="true" />
          {flowDeco && <MapFlower src={flowDeco} alt="" aria-hidden="true" />}

          {/* 우하단 시설 범례 — 지도에 붙은 요소(지도 기준 좌표)라 반응형에서도 유지 */}
          <FacilitiesSlot>
            <RouteFacilities legend={rm.legend} />
          </FacilitiesSlot>

          {/* 하단 핀 힌트 칩 */}
          <Hint>
            <span aria-hidden="true">💡</span>
            {rm.pinHint}
          </Hint>
        </MapFrame>

        {/* 좌측 동선 요약 패널 — 모달 좌측 코너 기준 (지도가 넘쳐도 안 잘림) */}
        {!isMobileOrTablet && (
          <SummarySlot>
            <RouteSummaryPanel
              waypoints={waypoints}
              sidebar={rm.sidebar}
              duration={route.duration}
              accent={accent}
            />
          </SummarySlot>
        )}

        {/* 상단 안내 (지도 위 헤더 공간, Frame 중앙 상단) */}
        <TopGuide>
          <Tag $accent={accent}>{tag}</Tag>
          <BigTitle id={titleId} $accent={accent}>
            {route.title}
          </BigTitle>
          <GuideDesc>{rm.guideText}</GuideDesc>
          <Meta>
            <span>
              <span aria-hidden="true">🗺</span> 총 <strong>{route.totalPoints}</strong> 개 포인트
            </span>
            <span>
              <span aria-hidden="true">⏱</span> <strong>{route.duration}</strong>
            </span>
          </Meta>
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
`

// 지도 종횡비(1091/700) 박스 — 높이 기준 + 아래정렬 (피그마: 지도가 프레임 하단).
// 높이만 모달의 86%로 제한하고, 너비는 aspect-ratio 가 결정 → 가로가 좁아지면 패널과 다소 겹침(허용).
// 꽃·시설·힌트·핀은 이 박스 기준 % 라 지도와 함께 움직여 정합 유지.
const MapFrame = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 86%;
  aspect-ratio: ${MAP_W} / ${MAP_H};
`

const MapBg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
`

// 지도 우하단 화성 심볼(벚꽃) 워터마크 — FlowSection flowDecos SVG 재사용
// (지도 배경 export 시 별도 레이어라 빠짐 → 여기서 오버레이)
// Figma Group22: x757 y220, 480×480 (지도 1091×700 기준)
const MapFlower = styled.img`
  position: absolute;
  left: ${mapX(757)};
  top: ${mapY(220)};
  width: ${mapX(480)};
  aspect-ratio: 1 / 1;
  object-fit: contain;
  opacity: 0.16;
  user-select: none;
  pointer-events: none;
`

// 우하단 시설 범례 — Figma Frame10: x711 y481 (지도 1091×700 기준)
const FacilitiesSlot = styled.div`
  position: absolute;
  left: ${mapX(711)};
  top: ${mapY(481)};
  z-index: 2;
`

// 하단 핀 힌트 칩 — Figma f-hint: 중앙 하단 y634 (지도 기준)
const Hint = styled.div`
  position: absolute;
  left: 50%;
  top: ${mapY(634)};
  transform: translateX(-50%);
  z-index: 2;
  ${flexRow(T.spacing[8])}
  padding: ${T.spacing[8]} ${T.spacing[20]};
  border: 1px solid ${alpha(T.white, 0.1)};
  border-radius: ${T.radius.pill};
  background: ${alpha(T.bgDark, 0.88)};
  ${glass("10px")}
  font-size: 12px;
  color: ${T.sub};
  white-space: nowrap;
`

// ── 공통 태그 칩
const Tag = styled.span`
  align-self: center;
  padding: ${T.spacing[4]} ${T.spacing[12]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.38)};
  border-radius: ${T.radius.pill};
  background: ${({ $accent }) => accentFill($accent)};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  color: ${({ $accent }) => $accent};
`

// ── 상단 안내 (태그 + 타이틀 + 설명 + 메타)
const TopGuide = styled.div`
  position: absolute;
  left: 50%;
  top: clamp(${T.spacing[20]}, 4vh, ${T.spacing[48]});
  transform: translateX(-50%);
  z-index: 3;
  ${flexCol(T.spacing[12])}
  align-items: center;
  text-align: center;
  max-width: min(460px, 84vw);
`

const BigTitle = styled.h3`
  font-family: ${T.fontSerif};
  font-size: clamp(26px, 3.4vw, 36px);
  font-weight: 700;
  letter-spacing: 0.8px;
  ${({ $accent }) => textGrad(T.main, $accent)}
`

const GuideDesc = styled.p`
  font-size: clamp(13px, 1vw, 14px);
  line-height: 1.7;
  color: ${T.sub};
  white-space: pre-line;
`

const Meta = styled.div`
  ${flexRow(T.spacing[16])}
  margin-top: ${T.spacing[4]};
  font-size: 12px;
  color: ${T.sub};

  strong {
    font-weight: 700;
    color: ${T.main};
  }
`

// 동선 요약 패널 — 가로는 모달 좌측 코너(지도가 넘쳐도 안 잘림), 세로는 지도 중앙 정렬.
// 지도(MapFrame)가 bottom:0 + height:86% → 세로 중앙 = 모달 기준 57%(14% 상단 + 43% 절반).
// (시설·핀은 지도 기준 유지)
const SummarySlot = styled.div`
  position: absolute;
  left: clamp(${T.spacing[16]}, 2.5vw, ${T.spacing[36]});
  top: 57%;
  transform: translateY(-50%);
  z-index: 3;
`
