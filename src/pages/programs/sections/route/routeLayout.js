// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  routeLayout — 동선 모달 배치 공유 상수/헬퍼
//  ────────────────────────────────────────────────
//  RouteMap(지도·핀·줌) · RouteModal(셸) 이 함께 import 하는 단일 출처.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { css } from "@emotion/react"
import { T } from "@/styles/theme"

// 모달 콘텐츠 최대 크기 (ModalFrame maxWidth/maxHeight → 큰 화면에서 가로·세로 대칭 카드)
// 높이 960 = 지도(폭1280→821px) + 상단 헤더 공간(~140px)
export const MAX_W = 1280
export const MAX_H = 960

// ── 지도 이미지 좌표계 (1091×700) ──
// 지도 위 요소(꽃·시설·힌트·핀)는 이 좌표를 % 로 환산해 배치 → 지도 크기가 바뀌어도 정합 유지
export const MAP_W = 1091
export const MAP_H = 700
export const mapX = (x) => `${(x / MAP_W) * 100}%`
export const mapY = (y) => `${(y / MAP_H) * 100}%`

// 모바일 지도 배치 비율 — MapFrame @media 와 JS 줌 계산이 공유(동기화)
export const M_MAP_H = 0.84 // height
export const M_MAP_BOTTOM = 0.02 // bottom
export const M_ZOOM = 1.5 // 모바일 핀 선택 시 지도 확대 배율
export const M_FOCUS_Y_OFFSET = 24 // 모바일 핀 선택 시 확대 초점 아래 보정(px)

// $shifted(데스크탑 패널 오픈) 시 좌측 이동 — MapFrame·TopGuide 공통
// 140px = 우측 상세패널(340px)이 열릴 때 지도를 왼쪽으로 밀어 겹침을 줄이는 보정치
export const shiftX = ($shifted) => css`
  left: 50%;
  transform: translateX(${$shifted ? "calc(-50% - 140px)" : "-50%"});
  transition: transform ${T.transition.spring};
`

// 좌/우 슬롯 세로 중앙 정렬 공통 — SummarySlot·DetailSlot
export const slotV = css`
  position: absolute;
  top: 57%;
  transform: translateY(-50%);
  z-index: 3;
`
