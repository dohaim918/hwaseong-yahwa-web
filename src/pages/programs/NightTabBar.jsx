// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NightTabBar  —  4야 전환 탭바 (fixed, 언더라인 +28px)
//  ────────────────────────────────────────────────────────────
//  props:
//    nights     — NIGHTS 배열 (id / num / navLabel / color)
//    currentId  — 현재 활성 야 (1~4)
//    onSelect   — (id) => void
//    visible    — false면 위로 숨김 (배너에서 숨김 / 이후 섹션에서 노출)
//
//  특징:
//    · NavBar(z=100) 바로 아래에 fixed overlay (z=99)
//    · 활성 탭 언더라인은 텍스트 폭 + 양옆 28px (mobile 16px)
//    · accent 색은 nights[i].color 기준 (NIGHT_STYLE과 동일)
//    · visible=false 시 pointer-events·키보드 포커스 차단 + aria-hidden
//
//  ※ Main은 좌우 padding이 없어 섹션/탭바는 자연 풀너비.
//     (예전 margin-inline 음수 트릭 제거됨 — CLAUDE.md 참고)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, focusRing, glass, accentLine } from "@/styles/theme"

export default function NightTabBar({ nights, currentId, onSelect, visible }) {
  return (
    <TabBar $visible={visible} aria-label="야 선택" aria-hidden={!visible}>
      <TabInner>
        {nights.map((n) => {
          const isActive = n.id === currentId
          return (
            <TabBtn
              key={n.id}
              type="button"
              onClick={() => onSelect(n.id)}
              $active={isActive}
              $accent={n.color}
              aria-pressed={isActive}
              aria-label={`${n.num}야 ${n.navLabel}`}
              tabIndex={visible ? 0 : -1}
            >
              {n.num}야<TabSuffix $active={isActive}> · {n.navLabel}</TabSuffix>
              {isActive && <ActiveLine $accent={n.color} aria-hidden="true" />}
            </TabBtn>
          )
        })}
      </TabInner>
    </TabBar>
  )
}

// ─────────────────────────────────────────────────────────────

const TabBar = styled.nav`
  position: fixed;
  top: ${T.navHeight};
  left: 0;
  right: 0;
  z-index: 99;
  height: ${T.tabNavHeight};

  background: ${alpha(T.bgBase, 0.55)};
  ${glass(T.spacing[20])}
  border-top: 1px solid ${alpha(T.white, 0.06)};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};

  display: flex;
  align-items: center;
  justify-content: center;

  /* 가시성 토글 — 위로 슬라이드 + 페이드 */
  transform: ${({ $visible }) => ($visible ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  will-change: transform, opacity;
  transition:
    transform ${T.transition.spring},
    opacity ${T.transition.fast},
    top ${T.transition.mid},
    height ${T.transition.mid};

  @media (max-width: ${T.bp.mini}) {
    top: ${T.navHeightMini};
    height: ${T.tabNavHeightMini};
  }
`

const TabInner = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: ${T.spacing[48]};
  transition: gap ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[32]};
  }
`

const TabBtn = styled.button`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: ${T.fontSize.sm};
  font-weight: ${({ $active }) => ($active ? 700 : 400)};
  color: ${({ $active, $accent }) => ($active ? $accent : T.sub)};
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: color ${T.transition.fast};

  &:hover {
    color: ${({ $active, $accent }) => ($active ? $accent : alpha(T.main, 0.8))};
    font-weight: ${({ $active }) => ($active ? "700" : "500")};
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7))}

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
    letter-spacing: 0.3px;
  }
`

// 접미사(· 라벨) — mini 에서는 활성 탭만 표시, 나머지는 "N야"만 남김
const TabSuffix = styled.span`
  white-space: pre;

  @media (max-width: ${T.bp.mini}) {
    display: ${({ $active }) => ($active ? "inline" : "none")};
  }
`

const ActiveLine = styled.span`
  position: absolute;
  bottom: 0;
  left: -${T.spacing[24]};
  right: -${T.spacing[24]};
  height: 1px;
  background: ${({ $accent }) => accentLine($accent, { peak: 1, edge: 0.1 })};
  pointer-events: none;
  transition:
    left ${T.transition.mid},
    right ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    left: -${T.spacing[16]};
    right: -${T.spacing[16]};
  }
`
