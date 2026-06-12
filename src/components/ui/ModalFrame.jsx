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
//    maxHeight → fullscreen 일 때 높이 상한(px). 미지정 시 화면 높이까지
//    fullscreen → 화면 여백(가장자리 24·모바일 12) 둔 대형 카드. padding 0 (내부가 자체 레이아웃),
//                 테두리·radius·그림자 유지. children(예: RouteModal)이 Stage 를 100% 채움
//    ariaLabel | labelledBy / describedBy
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useRef } from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { T, alpha, shimmerLine, focusRing, glass, flexCol } from "@/styles/theme"
import { Shimmer } from "@/components/ui/Deco"
import { CloseIcon } from "@/components/ui/icons"
import { useFocusLock } from "@/hooks/useFocusLock"

export default function ModalFrame({
  open,
  onClose,
  accent = T.pink,
  maxWidth = 360,
  maxHeight,
  fullscreen = false,
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
    <Overlay role="presentation" $fullscreen={fullscreen} onPointerDown={onDown} onPointerUp={onUp}>
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        $accent={accent}
        $maxWidth={maxWidth}
        $maxHeight={maxHeight}
        $fullscreen={fullscreen}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {!fullscreen && <Shimmer $top $bg={shimmerLine(accent)} />}
        <CloseBtn ref={closeRef} type="button" aria-label="닫기" onClick={onClose}>
          <CloseIcon size={18} />
        </CloseBtn>
        <Scroll $fullscreen={fullscreen}>{children}</Scroll>
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

  @media (max-width: ${T.bp.mobile}) {
    padding: ${({ $fullscreen }) => ($fullscreen ? T.spacing[12] : T.spacing[24])};
  }
`

const Panel = styled.div`
  position: relative;
  ${flexCol()}
  /* 스크롤은 내부 Scroll 이 담당 → Shimmer·닫기버튼(absolute)은 항상 고정 */
  overflow: hidden;

  ${({ $fullscreen, $accent, $maxWidth, $maxHeight }) =>
    $fullscreen
      ? `
    width: min(calc(100dvw - ${T.spacing[48]}), ${$maxWidth}px);
    height: calc(100dvh - ${T.spacing[48]});
    ${$maxHeight ? `max-height: ${$maxHeight}px;` : ""}
    background: ${T.bgBase};
    border: 1px solid ${alpha(T.white, 0.14)};
    border-radius: ${T.radius.md};
    box-shadow: 0 ${T.spacing[24]} ${T.secPadBottom} ${alpha(T.bgDark, 0.72)};
    animation: fadeIn ${T.transition.fast} both;

    @media (max-width: ${T.bp.mobile}) {
      width: calc(100dvw - ${T.spacing[24]});
      height: calc(100dvh - ${T.spacing[24]});
    }
  `
      : `
    width: min(${$maxWidth}px, 100%);
    max-height: 88dvh;
    padding: ${T.spacing[42]} ${T.spacing[32]};
    border: 1px solid ${alpha($accent, 0.38)};
    border-radius: ${T.radius.lg};
    background:
      radial-gradient(circle at 50% 0%, ${alpha($accent, 0.16)} 0%, transparent 56%),
      linear-gradient(180deg, ${alpha(T.bgCard, 0.96)}, ${alpha(T.bgBase, 0.98)});
    box-shadow:
      0 0 40px ${alpha($accent, 0.22)},
      0 24px 80px ${alpha(T.bgDark, 0.45)};
    text-align: center;
    animation: modalIn ${T.transition.spring} both;
    transition:
      padding ${T.transition.mid},
      width ${T.transition.mid};

    @media (max-width: ${T.bp.mini}) {
      padding: ${T.spacing[36]} ${T.spacing[24]};
    }
  `}
`

// 내용 래퍼 — 내용이 88dvh 를 넘을 때만 여기서 스크롤(짧으면 내용 높이만큼).
// block 유지 → Panel 의 text-align:center 상속(MvpModal 중앙정렬 보존).
const Scroll = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  /* 풀스크린(가로형)은 내부가 100% 높이를 채우고 자체 레이아웃 → 넘침 숨김 */
  ${({ $fullscreen }) => $fullscreen && "height: 100%; overflow: hidden;"}
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
