// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteFacilities — 동선 모달 우하단 시설 범례 (Figma 518:4864)
//  ────────────────────────────────────────────────
//  안내소 · 화장실 · 의료 · 주차장 4행 (아이콘 + 라벨)
//  라벨은 UI_TEXT.routeModal.legend 에서 주입
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, glass, flexCol, flexRow } from "@/styles/theme"
import { InfoIcon, RestroomIcon, MedicalIcon, ParkingIcon } from "@/components/ui/icons"

const FACILITIES = [
  { key: "info", Icon: InfoIcon },
  { key: "restroom", Icon: RestroomIcon },
  { key: "medical", Icon: MedicalIcon },
  { key: "parking", Icon: ParkingIcon },
]

export default function RouteFacilities({ legend }) {
  return (
    <Card>
      {FACILITIES.map(({ key, Icon }) => (
        <Row key={key}>
          <IconWrap>
            <Icon size={18} />
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
  color: ${alpha(T.white, 0.37)};
`

const Label = styled.span`
  font-size: 13px;
  color: ${alpha(T.white, 0.37)};
`
