// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RouteDetailPanel — 동선 모달 우측 상세 패널
//  ────────────────────────────────────────────────
//  핀/좌측 항목 선택 시 표시. 헤더(카운터·프로그램·주소) +
//  사진 + PROGRAM·설명 + 정보(시간/이동/추천) + 하단 prev/next 네비
//  데이터: getWaypoints(timeRange·walk·rec·program·address·desc) / 텍스트: rm.panel
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, pad2, alpha, accentFill, shimmerLine } from "@/styles/theme"
import { flexCol, flexRow, glass, serif, focusRing } from "@/styles/mixins"
import { ClockIcon, MapPinIcon, TicketStarIcon, ChevronIcon } from "@/components/ui/icons"
import { Shimmer, OutlinePill } from "@/components/ui/Deco"

// 정보 행 — 라벨 키(rm.panel.infoLabels) · 아이콘 · waypoint 값 필드
// 세 아이콘 모두 viewBox 여백 비율이 비슷해 16px 통일
const INFO_ROWS = [
  { key: "time", Icon: ClockIcon, field: "timeRange" },
  { key: "walk", Icon: MapPinIcon, field: "walk" },
  { key: "recommend", Icon: TicketStarIcon, field: "rec" },
]

export default function RouteDetailPanel({
  waypoint,
  index,
  total,
  accent,
  image,
  panel,
  onPrev,
  onNext,
  sheet = false, // true: 모바일 바텀시트 모드 (width 100%·상단 라운드·그랩 핸들)
  onClose,
}) {
  return (
    <Panel $accent={accent} $sheet={sheet}>
      {sheet && (
        // 시트: Shimmer 를 패널 최상단(핸들 위)에 둠 → 라운드 상단 라인 자연스럽게
        <>
          <Shimmer
            $top
            $full
            $bg={shimmerLine(accent)}
            $glow={alpha(accent, 0.45)}
            aria-hidden="true"
          />
          <SheetHandle type="button" onClick={onClose} aria-label="닫기" />
        </>
      )}
      <Hero>
        {!sheet && (
          <Shimmer
            $top
            $full
            $bg={shimmerLine(accent)}
            $glow={alpha(accent, 0.45)}
            aria-hidden="true"
          />
        )}
        <Top>
          <Counter>
            <Cur $accent={accent}>{waypoint.step}</Cur>
            <Total>/ {pad2(total)}</Total>
          </Counter>
          <OutlinePill $sm $accent={accent}>
            {panel.allPointsLabel}
          </OutlinePill>
        </Top>
        <Num>
          {waypoint.step} · {waypoint.label}
        </Num>
        <Addr>
          <MapPinIcon size={13} color={accent} />
          {waypoint.address}
        </Addr>
      </Hero>

      <Body>
        {/* 시트(모바일)는 사진만 제외, 나머지는 데스크탑과 동일 스타일 + 40vh 스크롤 */}
        {!sheet && image && <Photo src={image} alt="" aria-hidden="true" />}

        <Program>
          <ProgLabel $accent={accent}>{panel.programLabel}</ProgLabel>
          <ProgName>{waypoint.program}</ProgName>
        </Program>

        <Desc>{waypoint.desc}</Desc>

        <Info>
          {INFO_ROWS.map(({ key, Icon, field }) => {
            // walk 행은 거리 괄호(walkDist)를 분리해 미니에서 거리만 숨김 (분리는 getWaypoints 책임)
            const value = waypoint[field] ?? ""
            const hasDist = field === "walk" && waypoint.walkDist
            return (
              <InfoRow key={key}>
                <RowHead>
                  <IconBox>
                    <Icon size={16} color={accent} />
                  </IconBox>
                  <RowLabel>{panel.infoLabels[key]}</RowLabel>
                </RowHead>
                <RowDivider aria-hidden="true" />
                <RowVal>
                  {hasDist ? (
                    <>
                      {waypoint.walkMain}
                      <Dist> {waypoint.walkDist}</Dist>
                    </>
                  ) : (
                    value
                  )}
                </RowVal>
              </InfoRow>
            )
          })}
        </Info>
      </Body>

      <Nav $sheet={sheet}>
        <NavBtn $accent={accent} onClick={onPrev} aria-label="이전 포인트">
          <ChevronIcon dir="left" size={18} />
        </NavBtn>
        <Dots>
          {Array.from({ length: total }, (_, i) => (
            <Dot key={i} $active={i === index} $accent={accent} aria-hidden="true" />
          ))}
        </Dots>
        <NavBtn $accent={accent} onClick={onNext} aria-label="다음 포인트">
          <ChevronIcon dir="right" size={18} />
        </NavBtn>
      </Nav>
    </Panel>
  )
}

// ─────────────────────────────────────────────────────────────

const Panel = styled.div`
  ${flexCol()}
  width: ${({ $sheet }) => ($sheet ? "100%" : "340px")};
  ${({ $sheet }) => $sheet && "max-width: 480px;"}
  max-height: ${({ $sheet }) => ($sheet ? "55vh" : "78vh")};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.2)};
  border-radius: ${({ $sheet }) => ($sheet ? `${T.radius.xl} ${T.radius.xl} 0 0` : T.radius.xl)};
  background: ${alpha(T.bgCard, 0.92)};
  ${glass("16px")}
  box-shadow: 0 12px 40px ${alpha(T.bgBase, 0.55)};
  overflow: hidden;
`

// 모바일 시트 상단 그랩 핸들 — 탭 시 닫기 (지도 클릭 닫기와 병행)
const SheetHandle = styled.button`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  padding-top: ${T.spacing[16]};
  cursor: pointer;

  &::before {
    content: "";
    width: 40px;
    height: 4px;
    border-radius: ${T.radius.pill};
    background: ${alpha(T.white, 0.25)};
    transition: background ${T.transition.fast};
  }
  &:hover::before {
    background: ${alpha(T.white, 0.4)};
  }
  ${focusRing("currentColor", T.radius.pill)}
`

// ── 헤더 (카운터 + 배지 / 프로그램명 / 주소)
const Hero = styled.div`
  ${flexCol(T.spacing[12])}
  position: relative;
  padding: ${T.spacing[16]} ${T.spacing[20]};
  border-bottom: 1px solid ${alpha(T.white, 0.07)};
  line-height: 1.2;
`

const Top = styled.div`
  ${flexRow()}
  justify-content: space-between;
`

const Counter = styled.div`
  ${flexRow(T.spacing[4], "baseline")}
`

const Cur = styled.span`
  ${serif(700)}
  font-size: ${T.fontSize.xl};
  color: ${({ $accent }) => $accent};
`

const Total = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const Num = styled.h3`
  ${serif(700)}
  font-size: ${T.fontSize.lg};
  color: ${T.main};
`

const Addr = styled.p`
  ${flexRow(T.spacing[4])}
  font-size: ${T.fontSize.xxs};
  color: ${T.sub};
`

// ── 바디 (사진 / PROGRAM / 설명 / 정보)
const Body = styled.div`
  ${flexCol(T.spacing[16])}
  padding: ${T.spacing[16]} ${T.spacing[20]};
  overflow-y: auto;
`

const Photo = styled.img`
  width: 100%;
  height: 132px;
  object-fit: cover;
  border-radius: ${T.radius.md};
  border: 1px solid ${alpha(T.white, 0.08)};
`

const Program = styled.div`
  ${flexCol(T.spacing[4])}
`

const ProgLabel = styled.span`
  font-size: ${T.fontSize.xxs};
  font-weight: 700;
  letter-spacing: 2px;
  color: ${({ $accent }) => $accent};
`

const ProgName = styled.strong`
  ${serif(700)}
  font-size: ${T.fontSize.md};
  color: ${T.main};
`

const Desc = styled.p`
  font-size: ${T.fontSize.xs};
  line-height: 1.65;
  color: ${T.sub};
  white-space: pre-line;
  word-break: keep-all; /* 줄바꿈 시 어절(단어) 단위로만 끊기게 */
`

const Info = styled.div`
  ${flexCol(T.spacing[12])}
  padding: ${T.spacing[16]};
  border: 1px solid ${alpha(T.white, 0.07)};
  border-radius: ${T.radius.md};
  background: ${alpha(T.bgDark, 0.4)};
`

const InfoRow = styled.div`
  ${flexRow(T.spacing[12])}
`

const RowHead = styled.span`
  ${flexRow(T.spacing[6])}
  flex: 0 0 auto;
  width: 52px;
`

// 아이콘 고정 박스 — viewBox 제각각인 아이콘을 동일 16px 박스에 중앙 배치
const IconBox = styled.span`
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
`

const RowLabel = styled.span`
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
`

const RowDivider = styled.span`
  width: 1px;
  height: 14px;
  background: ${alpha(T.white, 0.14)};
`

const RowVal = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 500;
  letter-spacing: 0.5px;
  color: ${alpha(T.main, 0.8)};
  word-break: keep-all;
`

// 거리 괄호("(약 Nm)") — 미니에서 숨김 (좁은 폭 공간 절약)
const Dist = styled.span`
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

// ── 하단 네비게이션 (이전 / 도트 / 다음)
const Nav = styled.div`
  ${flexRow()}
  justify-content: space-between;
  padding: ${T.spacing[16]} ${T.spacing[24]};
  padding-bottom: ${({ $sheet }) =>
    $sheet ? `calc(${T.spacing[16]} + env(safe-area-inset-bottom, 0px))` : T.spacing[16]};
  border-top: 1px solid ${alpha(T.white, 0.07)};
`

// 화살표 버튼 — accent 톤 (패널 전체 accent 통일)
const NavBtn = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: ${T.radius.full};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.4)};
  background: ${({ $accent }) => accentFill($accent)};
  color: ${({ $accent }) => $accent};
  cursor: pointer;
  transition: background ${T.transition.fast};

  &:hover {
    background: ${({ $accent }) => alpha($accent, 0.22)};
  }
  ${({ $accent }) => focusRing($accent, T.radius.full)}
`

const Dots = styled.div`
  ${flexRow(T.spacing[12])}
`

// 도트 8px — active 는 accent 점 + 외곽 글로우 링(동심원)
const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: ${T.radius.full};
  transition:
    box-shadow ${T.transition.fast},
    background ${T.transition.fast};
  ${({ $active, $accent }) =>
    $active
      ? `background: ${$accent};
         box-shadow: 0 0 0 3px ${alpha($accent, 0.25)}, 0 0 7px ${alpha($accent, 0.8)};`
      : `background: ${alpha(T.white, 0.2)};`}
`
