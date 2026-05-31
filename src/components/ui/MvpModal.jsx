import { createContext, useCallback, useContext, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { T, alpha, shimmerLine, focusRing, glass } from "@/styles/theme"
import { Shimmer } from "@/components/ui/Deco"
import { CloseIcon, FlowerIcon } from "@/components/ui/icons"
import { useFocusLock } from "@/hooks/useFocusLock"

// ── Layout 에서 Provider 를 한 번만 마운트하고,
//    하위 컴포넌트는 이 훅으로 준비 중 모달을 열고 닫는다.
const MvpModalContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components
export function useMvpModal() {
  const context = useContext(MvpModalContext)
  if (!context) throw new Error("useMvpModal must be used inside <MvpModalProvider>")
  return context
}

export default function MvpModal({
  open,
  onClose,
  title = "준비 중인 기능입니다",
  desc = "더 나은 경험을 위해 준비 중입니다.",
  label = "COMING SOON",
  accent = T.pink,
}) {
  // ── 매 인스턴스마다 고유 id (모달 여러 개 동시 마운트 시 aria 충돌 방지)
  const uid = useId()
  const titleId = `mvp-title-${uid}`
  const descId = `mvp-desc-${uid}`

  const panelRef = useRef(null)
  const closeRef = useRef(null)
  // ── pointerdown 이 오버레이에서 시작되었는지 추적
  //    (오버레이 → 패널 안 드래그 후 pointerup 케이스에서 잘못 닫히는 것 방지)
  const downOnOverlay = useRef(false)

  useFocusLock(open, {
    containerRef: panelRef,
    focusRef: closeRef,
    onClose,
  })

  if (!open) return null

  // 패널 바깥(오버레이)에서 시작 → 같은 곳에서 끝났을 때만 close
  const onOverlayPointerDown = (e) => {
    downOnOverlay.current = e.target === e.currentTarget
  }
  const onOverlayPointerUp = (e) => {
    if (downOnOverlay.current && e.target === e.currentTarget) onClose?.()
    downOnOverlay.current = false
  }

  return createPortal(
    <Overlay
      role="presentation"
      onPointerDown={onOverlayPointerDown}
      onPointerUp={onOverlayPointerUp}
    >
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        $accent={accent}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <Shimmer $top $bg={shimmerLine(accent)} />
        <CloseBtn ref={closeRef} type="button" aria-label="닫기" onClick={onClose}>
          <CloseIcon size={18} />
        </CloseBtn>

        <Mark $accent={accent}>
          <FlowerIcon size={28} color={accent} />
        </Mark>
        <Label $accent={accent}>{label}</Label>
        <Title id={titleId}>{title}</Title>
        <Desc id={descId}>{desc}</Desc>
      </Panel>
    </Overlay>,
    document.body
  )
}

// ── 전역 MVP 모달 상태와 단일 모달 인스턴스를 관리
//    open(T.pink) 또는 open({ accent, title, desc }) 형태로 호출 가능
export function MvpModalProvider({ children }) {
  const [state, setState] = useState({ open: false })

  const open = useCallback((arg) => {
    const next = typeof arg === "string" ? { accent: arg } : (arg ?? {})
    setState({ open: true, ...next })
  }, [])

  const close = useCallback(() => {
    setState((s) => ({ ...s, open: false }))
  }, [])

  const api = useMemo(() => ({ open, close, isOpen: state.open }), [open, close, state.open])

  return (
    <MvpModalContext.Provider value={api}>
      {children}
      <MvpModal
        open={state.open}
        onClose={close}
        title={state.title}
        desc={state.desc}
        label={state.label}
        accent={state.accent}
      />
    </MvpModalContext.Provider>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: ${T.spacing[24]};
  background: ${alpha(T.bgBase, 0.72)};
  ${glass("10px")}
`

const Panel = styled.div`
  position: relative;
  width: min(360px, 100%);
  padding: ${T.spacing[42]} ${T.spacing[32]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.38)};
  border-radius: ${T.radius.lg};
  overflow: hidden;
  background:
    radial-gradient(circle at 50% 0%, ${({ $accent }) => alpha($accent, 0.16)} 0%, transparent 56%),
    linear-gradient(180deg, ${alpha(T.bgCard, 0.96)}, ${alpha(T.bgBase, 0.98)});
  box-shadow:
    0 0 40px ${({ $accent }) => alpha($accent, 0.22)},
    0 24px 80px ${alpha("#000000", 0.45)};
  text-align: center;
  animation: modalIn ${T.transition.spring} both;
  transition:
    padding ${T.transition.mid},
    width ${T.transition.mid};
  @media (max-width: ${T.bp.mobile}) {
    width: min(340px, 100%);
  }
  @media (max-width: ${T.bp.mini}) {
    width: min(320px, 100%);
    padding: ${T.spacing[36]} ${T.spacing[24]};
  }
`

const CloseBtn = styled.button`
  position: absolute;
  top: ${T.spacing[16]};
  right: ${T.spacing[16]};
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

const Mark = styled.div`
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: ${T.spacing[12]};
  border-radius: ${T.radius.full};
  background: ${({ $accent }) => alpha($accent, 0.1)};
  box-shadow: 0 0 24px ${({ $accent }) => alpha($accent, 0.24)};
`

const Label = styled.p`
  margin: 0 0 ${T.spacing[8]};
  font-size: ${T.fontSize.xxs};
  font-weight: 700;
  letter-spacing: 4px;
  color: ${({ $accent }) => $accent};
`

const Title = styled.h2`
  margin: 0;
  font-family: ${T.fontSerif};
  font-size: clamp(20px, calc(1vw + 16px), 28px);
  color: ${T.main};
`

const Desc = styled.p`
  margin: ${T.spacing[12]} auto 0;
  max-width: 270px;
  font-size: ${T.fontSize.sm};
  line-height: 1.8;
  color: ${T.sub};
  word-break: keep-all;
  transition: font-size ${T.transition.mid};
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`
