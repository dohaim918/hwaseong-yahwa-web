// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ModalFrame — 공용 모달 겉틀
//  ────────────────────────────────────────────────
//  포털(body) + 백드롭(딤·블러·중앙) + 바깥클릭 닫기(드래그 안전) +
//  포커스 트랩·스크롤락·ESC + 겉카드(테두리·radius·bg·shadow·패딩) +
//  상단 Shimmer + modalIn 등장 + max-height 스크롤 + 닫기 버튼 + aria
//
//  내용물만 children 으로 넣으면 됨. (MvpModal · FeaturedPanel 오버레이 등 공용)
//  props:
//    open · onClose · accent · maxWidth(기본 360)
//    ariaLabel | labelledBy / describedBy
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useRef } from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { T, alpha, shimmerLine, focusRing, glass } from "@/styles/theme"
import { Shimmer } from "@/components/ui/Deco"
import { CloseIcon } from "@/components/ui/icons"
import { useFocusLock } from "@/hooks/useFocusLock"

export default function ModalFrame({
  open,
  onClose,
  accent = T.pink,
  maxWidth = 360,
  ariaLabel,
  labelledBy,
  describedBy,
  children,
}) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  // pointerdown 이 백드롭에서 시작 → 같은 곳에서 끝났을 때만 close (드래그 오작동 방지)
  const downOnOverlay = useRef(false)

  useFocusLock(open, { containerRef: panelRef, focusRef: closeRef, onClose })

  if (!open) return null

  const onDown = (e) => {
    downOnOverlay.current = e.target === e.currentTarget
  }
  const onUp = (e) => {
    if (downOnOverlay.current && e.target === e.currentTarget) onClose?.()
    downOnOverlay.current = false
  }

  return createPortal(
    <Overlay role="presentation" onPointerDown={onDown} onPointerUp={onUp}>
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        $accent={accent}
        $maxWidth={maxWidth}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Shimmer $top $bg={shimmerLine(accent)} />
        <CloseBtn ref={closeRef} type="button" aria-label="닫기" onClick={onClose}>
          <CloseIcon size={18} />
        </CloseBtn>
        <Scroll>{children}</Scroll>
      </Panel>
    </Overlay>,
    document.body
  )
}

// ─────────────────────────────────────────────────────────────

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: ${T.spacing[24]};
  background: ${alpha(T.bgBase, 0.72)};
  ${glass("10px")}
  animation: fadeIn ${T.transition.fast} both;
`

const Panel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(${({ $maxWidth }) => `${$maxWidth}px`}, 100%);
  max-height: 88dvh;
  /* 스크롤은 내부 Scroll 이 담당 → Shimmer·닫기버튼(absolute)은 항상 고정 */
  overflow: hidden;
  padding: ${T.spacing[42]} ${T.spacing[32]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.38)};
  border-radius: ${T.radius.lg};
  background:
    radial-gradient(circle at 50% 0%, ${({ $accent }) => alpha($accent, 0.16)} 0%, transparent 56%),
    linear-gradient(180deg, ${alpha(T.bgCard, 0.96)}, ${alpha(T.bgBase, 0.98)});
  box-shadow:
    0 0 40px ${({ $accent }) => alpha($accent, 0.22)},
    0 24px 80px ${alpha(T.bgDark, 0.45)};
  text-align: center;
  animation: modalIn ${T.transition.spring} both;
  transition:
    padding ${T.transition.mid},
    width ${T.transition.mid};

  @media (max-width: ${T.bp.mini}) {
    padding: ${T.spacing[36]} ${T.spacing[24]};
  }
`

// 내용 래퍼 — 내용이 88dvh 를 넘을 때만 여기서 스크롤(짧으면 내용 높이만큼).
// block 유지 → Panel 의 text-align:center 상속(MvpModal 중앙정렬 보존).
const Scroll = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
`

const CloseBtn = styled.button`
  position: absolute;
  top: ${T.spacing[16]};
  right: ${T.spacing[16]};
  z-index: 12;
  display: inline-grid;
  place-items: center;
  width: ${T.spacing[32]};
  height: ${T.spacing[32]};
  color: ${alpha(T.sub, 0.7)};
  border-radius: ${T.radius.full};
  transition:
    color ${T.transition.fast},
    background ${T.transition.fast};

  &:hover {
    color: ${T.main};
  }

  ${focusRing("currentColor", T.radius.full)}
`
