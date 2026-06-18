// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  FlowTimeline — 세로 레일 + 5개 시간 행
//  ────────────────────────────────────────────────
//  구조: [레일 컬럼(독립)] · [행 컬럼]
//    행 = [시간 + 내용]  ↔  [장소 pill]  (justify-between)
//  · 레일: 연속 세로 라인 + 행별 링 점(활성 시 glow halo)
//  · 활성 행: 핑크 가로 그라디언트 밴드 + 위아래 라인 강조 / 비활성: opacity 40%
//  · 전부 flex + 상대값(clamp) — 고정 grid 컬럼 없이 반응형
//  props: items / selectedStep / onSelect / accent / titleGrad / animIn
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, accentLine } from "@/styles/theme"
import { revealUp, focusRing, serif, flexCol, flexRow, glass } from "@/styles/mixins"
import { MapPinIcon } from "@/components/ui/icons"
import { OutlinePill } from "@/components/ui/Deco"

export default function FlowTimeline({ items, selectedStep, onSelect, accent, titleGrad, animIn }) {
  return (
    <Timeline $animIn={animIn}>
      {/* ── 좌측 레일 (독립 컬럼) ── */}
      <Rail $accent={accent} aria-hidden="true">
        {items.map((row) => (
          <RailCell key={row.step}>
            <Dot $active={row.step === selectedStep} $accent={accent} />
          </RailCell>
        ))}
      </Rail>

      {/* ── 행 컬럼 ── */}
      <Rows>
        {items.map((row) => {
          const active = row.step === selectedStep
          return (
            <Row
              key={row.step}
              type="button"
              $active={active}
              $accent={accent}
              aria-pressed={active}
              aria-label={`${row.time} ${row.title}`}
              onClick={() => onSelect(row.step)}
            >
              <RowMain>
                <Time $accent={accent}>{row.time}</Time>
                <Body>
                  <Title $active={active} $accent={accent} $grad={titleGrad}>
                    {row.title}
                  </Title>
                  {row.desc && <Desc>{row.desc}</Desc>}
                </Body>
              </RowMain>

              {/* 핀은 중립(회색 테두리·글자) + 아이콘만 accent — $accent 넘기지 않음 */}
              <Pill>
                <MapPinIcon size={16} color={accent} />
                <span>{row.place}</span>
              </Pill>
            </Row>
          )
        })}
      </Rows>
    </Timeline>
  )
}

// ─────────────────────────────────────────────────────────────

const Timeline = styled.div`
  display: flex;
  align-items: stretch;
  gap: clamp(${T.spacing[12]}, 1.6vw, ${T.spacing[24]});
  width: 100%;
  flex: 1;
  min-height: 0;
  ${({ $animIn }) => revealUp($animIn, 0.35)}
`

// ── 레일: 세로 라인 + 균등 점 셀 ──
const Rail = styled.div`
  position: relative;
  ${flexCol()}
  flex-shrink: 0;
  width: clamp(20px, 1.6vw, 24px);

  /* 연속 세로 라인 */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: ${({ $accent }) => accentLine($accent, { deg: 180, peak: 0.3, edge: 0.08 })};
  }

  @media (max-width: ${T.bp.mini}) {
    width: 18px;
  }
`

const RailCell = styled.div`
  flex: 1;
  ${flexRow()}
  justify-content: center;
`

// 활성: 큰 밝은 원 + 넓은 글로우 / 비활성: 작은 dim 원 (크기 명확히 구분)
const Dot = styled.span`
  position: relative;
  z-index: 1;
  /* 활성: 18px / 비활성: 10px — 크기 차이 뚜렷하게 */
  width: ${({ $active }) => ($active ? "clamp(14px, 1.2vw, 18px)" : "clamp(7px, 0.65vw, 10px)")};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: ${({ $active }) => alpha(T.main, $active ? 0.95 : 0.5)};
  border: 2px solid ${({ $active, $accent }) => ($active ? $accent : alpha($accent, 0.5))};
  transition:
    width ${T.transition.mid},
    background ${T.transition.mid},
    border-color ${T.transition.mid},
    box-shadow ${T.transition.mid};
  /* 활성 글로우 halo — 18px → ±15px */
  box-shadow: ${({ $active, $accent }) =>
    $active
      ? `0 0 20px 4px ${alpha($accent, 0.9)}, 0 0 48px 12px ${alpha($accent, 0.45)}`
      : "none"};

  /* 은은한 배경 디스크 */
  &::before {
    content: "";
    position: absolute;
    inset: ${({ $active }) => ($active ? "-10px" : "-5px")};
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ $active, $accent }) => alpha($accent, $active ? 0.22 : 0.08)} 0%,
      transparent 70%
    );
    z-index: -1;
  }
`

// ── 행 컬럼 ──
const Rows = styled.div`
  ${flexCol()}
  flex: 1;
  min-width: 0;
`

// 활성/비활성 행 상태 스타일을 한 곳에서 분기
//   활성: blur20 + 핑크 가로 밴드 + 직각 + 밝은 위아래 라인
//   비활성: opacity 40% + 둥근 모서리 + 흐린 라인  (blur는 활성만 — FlowerDeco SVG가 blur에 잡혀 아티팩트 방지)
const rowState = ($active, $accent) =>
  $active
    ? `
      opacity: 1;
      ${glass("20px")}
      border-radius: 0;
      background: linear-gradient(90deg, ${alpha($accent, 0)} 0%, ${alpha($accent, 0.08)} 50%, ${alpha($accent, 0.06)} 90%, ${alpha($accent, 0)} 100%);
      border-image: ${accentLine($accent, { peak: 0.4 })} 1;
      &:hover { opacity: 1; }
    `
    : `
      opacity: 0.4;
      border-radius: ${T.radius.lg};
      background: transparent;
      border-image: ${accentLine(T.main, { peak: 0.1 })} 1;
      &:hover { opacity: 0.72; }
    `

const Row = styled.button`
  position: relative;
  ${flexRow(`clamp(${T.spacing[12]}, 2vw, ${T.spacing[24]})`)}
  justify-content: space-between;
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: clamp(${T.spacing[8]}, 1.2vh, ${T.spacing[16]})
    clamp(${T.spacing[8]}, 1.6vw, ${T.spacing[36]});
  text-align: left;
  cursor: pointer;
  border-width: 1px 0;
  border-style: solid;
  border-color: transparent;
  transition:
    opacity ${T.transition.mid},
    background ${T.transition.mid};

  ${({ $active, $accent }) => rowState($active, $accent)}
  ${({ $accent }) => focusRing(alpha($accent, 0.7))}

  /* 미니: 단행 컴팩트 (시간·제목 한 줄), 풀섹션 유지 위해 압축 */
  @media (max-width: ${T.bp.mini}) {
    flex-wrap: nowrap;
    align-items: center;
    gap: ${T.spacing[12]};
    padding: ${T.spacing[8]};
  }
`

// 시간 + 내용 묶음 (한 영역)
const RowMain = styled.div`
  ${flexRow(`clamp(${T.spacing[16]}, 3vw, 60px)`)}
  flex: 1;
  min-width: 0;

  @media (max-width: ${T.bp.mobile}) {
    gap: clamp(${T.spacing[12]}, 4vw, ${T.spacing[24]});
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const Time = styled.span`
  flex-shrink: 0;
  ${serif()}
  font-size: clamp(20px, 2.1vw, 32px);
  line-height: 1;
  color: ${({ $accent }) => $accent};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.sm};
  }
`

const Body = styled.div`
  flex: 1;
  ${flexCol(T.spacing[4])}
  min-width: 0;
`

// 활성: 24px + gradient / 비활성: 22px + flat accent
const Title = styled.span`
  display: block;
  ${serif()}
  font-size: ${({ $active }) =>
    $active ? "clamp(18px, 1.2vw, 24px)" : "clamp(16px, 1.1vw, 22px)"};
  line-height: 1.2;
  color: ${({ $accent }) => $accent};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ $active, $grad }) => ($active ? $grad : "")}

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.sm};
  }
`

const Desc = styled.span`
  font-size: clamp(12px, 1vw, 18px);
  line-height: 1.4;
  color: ${T.sub};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  /* 미니: 행 한 줄 설명 숨김 — 상세는 행 탭 시 패널 오버레이로 (풀섹션 100dvh 수납) */
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

// 장소 pill (별도 영역) — 공용 OutlinePill 사용
const Pill = styled(OutlinePill)`
  @media (max-width: ${T.bp.mobile}) {
    padding-block: clamp(6px, 1vh, 10px);
  }

  /* 미니: 시간 + 제목만 남겨 행 폭 확보 */
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`
