// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteFacilities — 동선 모달 우하단 시설 범례
//  ────────────────────────────────────────────────
//  안내소 · 화장실 · 의료 · 주차장 4행 (아이콘 + 라벨)
//  라벨은 UI_TEXT.routeModal.legend 에서 주입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, glass, flexCol, flexRow } from "@/styles/theme"
import { InfoIcon, RestroomIcon, MedicalIcon, ParkingIcon } from "@/components/ui/icons"

// accent: true → 야별 강조색 (의료 · 주차장) / 나머지(안내소 · 화장실)는 dim
// iconProps → 안내소(InfoIcon)는 viewBox 16 기반이라 원 테두리가 두껍게 보여 strokeWidth 보정
const FACILITIES = [
  { key: "info", Icon: InfoIcon, iconProps: { strokeWidth: 1 } },
  { key: "restroom", Icon: RestroomIcon },
  { key: "medical", Icon: MedicalIcon, accent: true },
  { key: "parking", Icon: ParkingIcon, accent: true },
]

export default function RouteFacilities({ legend, accent }) {
  return (
    <Card>
      {FACILITIES.map(({ key, Icon, accent: active, iconProps }) => (
        <Row key={key}>
          <IconWrap $active={active} $accent={accent}>
            <Icon size={18} {...iconProps} />
          </IconWrap>
          <Label>{legend[key]}</Label>
        </Row>
      ))}
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────

const Card = styled.div`
  ${flexCol(T.spacing[8])}
  padding: ${T.spacing[12]};
  border: 1px solid ${alpha(T.white, 0.08)};
  border-radius: ${T.radius.xs};
  background: ${alpha(T.bgBase, 0.55)};
  ${glass("8px")}
`

const Row = styled.div`
  ${flexRow(T.spacing[8])}
`

const IconWrap = styled.span`
  display: inline-grid;
  place-items: center;
  color: ${({ $active, $accent }) => ($active ? $accent : alpha(T.white, 0.37))};
`

const Label = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${alpha(T.white, 0.37)};
`
