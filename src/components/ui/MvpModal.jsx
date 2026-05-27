import { useRef } from "react"
import { createPortal } from "react-dom"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { Shimmer } from "@/components/ui/deco"
import { CloseIcon, FlowerIcon } from "@/components/ui/icons"
import { useFocusTrap } from "@/hooks/useFocusTrap"

export default function MvpModal({
  open,
  onClose,
  title = "준비 중인 기능입니다",
  desc = "더 나은 경험을 위해 준비 중입니다.",
  label = "COMING SOON",
  accent = T.pink,
}) {
  const closeRef = useRef(null)
  useFocusTrap(open, { onClose, focusRef: closeRef, trapTab: true })

  if (!open) return null

  return createPortal(
    <Overlay role="presentation" onMouseDown={onClose}>
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby="mvp-modal-title"
        aria-describedby="mvp-modal-desc"
        $accent={accent}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Shimmer
          $top
          $bg={`linear-gradient(90deg, transparent 0%, ${accent} 30%, ${T.white} 50%, ${accent} 70%, transparent 100%)`}
        />
        <CloseBtn ref={closeRef} type="button" aria-label="닫기" onClick={onClose}>
          <CloseIcon size={18} />
        </CloseBtn>

        <Mark $accent={accent}>
          <FlowerIcon size={28} color={accent} />
        </Mark>
        <Label $accent={accent}>{label}</Label>
        <Title id="mvp-modal-title">{title}</Title>
        <Desc id="mvp-modal-desc">{desc}</Desc>
      </Panel>
    </Overlay>,
    document.body
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
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
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
    /* background: ${alpha(T.white, 0.08)}; */
  }

  &:focus-visible {
    outline: 1px solid currentColor;
    outline-offset: 3px;
  }
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
