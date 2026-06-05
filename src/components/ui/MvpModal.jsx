import { createContext, useCallback, useContext, useId, useMemo, useState } from "react"
import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { FlowerIcon } from "@/components/ui/icons"
import ModalFrame from "@/components/ui/ModalFrame"

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
  // ── 매 인스턴스마다 고유 id (aria 충돌 방지)
  const uid = useId()
  const titleId = `mvp-title-${uid}`
  const descId = `mvp-desc-${uid}`

  return (
    <ModalFrame
      open={open}
      onClose={onClose}
      accent={accent}
      maxWidth={360}
      labelledBy={titleId}
      describedBy={descId}
    >
      <Mark $accent={accent}>
        <FlowerIcon size={28} color={accent} />
      </Mark>
      <Label $accent={accent}>{label}</Label>
      <Title id={titleId}>{title}</Title>
      <Desc id={descId}>{desc}</Desc>
    </ModalFrame>
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

// ─────────────────────────────────────────────────────────────
//  내용 (겉틀·포털·닫기·포커스락·상단 Shimmer 는 ModalFrame 이 담당)

const Mark = styled.div`
  display: inline-grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: ${T.spacing[12]};
  border-radius: ${T.radius.full};
  background: ${({ $accent }) => accentFill($accent)};
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
