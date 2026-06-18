// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NightIndexRail  —  배너 좌측 세로 인덱스 레일
//  ────────────────────────────────────────────────────────────
//  01 시작 / 02 확장 / 03 흐름 / 04 달빛 세로 나열.
//  · 좌측 세로 라인(white 8%) + 현재 야 구간만 accent 세그먼트
//  · 활성: 숫자 serif 28px accent / 라벨 16px accent
//  · 비활성: 숫자 serif 22px white27% / 라벨 14px white27%
//
//  props:
//    nights / currentId / onSelect / accent
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, pad2, accentLine } from "@/styles/theme"
import { focusRing, serif, flexCol, flexRow } from "@/styles/mixins"
export default function NightIndexRail({ nights, currentId, onSelect, accent }) {
  const total = nights.length

  return (
    <Rail role="group" aria-label="야 선택">
      <Track aria-hidden="true">
        <ActiveSeg
          $accent={accent}
          style={{
            top: `${((currentId - 1) * 100) / total}%`,
            height: `${100 / total}%`,
          }}
        />
      </Track>

      <Labels>
        {nights.map((n) => {
          const isActive = n.id === currentId
          return (
            <RailItem
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              $active={isActive}
              $accent={accent}
              aria-pressed={isActive}
              aria-label={`${n.num}야 ${n.navLabel}`}
            >
              <RailNum $active={isActive} $accent={accent}>
                {pad2(n.id)}
              </RailNum>
              <RailLabel $active={isActive} $accent={accent}>
                {n.navLabel}
              </RailLabel>
            </RailItem>
          )
        })}
      </Labels>
    </Rail>
  )
}

// ─────────────────────────────────────────────────────────────

const Rail = styled.div`
  position: relative;
  ${flexRow(T.spacing[24], "stretch")}
  flex-shrink: 0;

  /* 모바일에선 레일 숨김 — 탭바·카운터로 전환 가능하므로 중복 제거 */
  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

// ── 세로 라인 트랙 (faint 베이스) + 활성 글로우 세그먼트 ──
const Track = styled.div`
  position: relative;
  width: 2px;
  flex-shrink: 0;
  background: linear-gradient(180deg, ${alpha(T.white, 0.1)}, ${alpha(T.white, 0.04)});
`

// 활성 구간: 양끝 페이드 + 강한 로즈 블룸 글로우 + 중앙 강조 마커
const ActiveSeg = styled.span`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  border-radius: 2px;
  background: ${({ $accent }) => accentLine($accent, { peak: 1, deg: 180 })};

  transition: top ${T.transition.spring};

  /* 중앙 강조 마커 */
  &::after {
    content: "";
    position: absolute;

    top: 50%;
    left: -1px;
    width: ${T.spacing[4]};
    height: ${T.spacing[48]};
    border-radius: ${T.radius.lg};
    transform: translateY(-50%);
    background: ${({ $accent }) => $accent};
    box-shadow:
      0 0 12px ${({ $accent }) => $accent},
      0 0 24px 2px ${({ $accent }) => alpha($accent, 0.7)};
  }
`

const Labels = styled.div`
  ${flexCol()}
`

const RailItem = styled.button`
  ${flexCol(T.spacing[6])}
  align-items: center;
  justify-content: center;
  height: clamp(108px, 13.4vh, 145px);
  width: 34px;
  text-align: center;
  opacity: ${({ $active }) => ($active ? 1 : 0.85)};
  transition: transform ${T.transition.fast};

  &:hover {
    transform: translateX(2px);
  }

  &:hover span {
    color: ${({ $active, $accent }) => ($active ? $accent : alpha(T.white, 0.6))};
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7))}
`

const RailNum = styled.span`
  ${serif(700)}
  line-height: 1;
  font-size: ${({ $active }) => ($active ? "28px" : "22px")};
  letter-spacing: ${({ $active }) => ($active ? "1.12px" : "0.88px")};
  color: ${({ $active, $accent }) => ($active ? $accent : alpha(T.white, 0.27))};
  transition:
    color ${T.transition.fast},
    font-size ${T.transition.fast};
`

const RailLabel = styled.span`
  line-height: 1;
  font-size: ${({ $active }) => ($active ? "16px" : "14px")};
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  color: ${({ $active, $accent }) => ($active ? $accent : alpha(T.white, 0.27))};
  transition: color ${T.transition.fast};
`
