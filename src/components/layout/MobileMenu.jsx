import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { NAV_ITEMS } from "@/constants/nav"
import { CloseIcon } from "@/components/ui/icons"
import Button from "@/components/ui/Button"

export default function MobileMenu({ isOpen, onClose, accent = T.pink }) {
  const { pathname } = useLocation()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  // 메뉴 열리면 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const isActive = (to) => pathname === (to.split("#")[0] || "/")

  return (
    <Overlay $isOpen={isOpen} onClick={onClose}>
      {isOpen && (
        <Inner onClick={(e) => e.stopPropagation()}>
          <CloseBtn onClick={onClose} aria-label="닫기">
            <CloseIcon size={20} />
          </CloseBtn>
          <Glow $accent={accent} />

          <NavList>
            {NAV_ITEMS.map((item, i) => (
              <Item
                key={item.label}
                to={item.to}
                $accent={accent}
                $active={isActive(item.to)}
                $i={i}
                onClick={onClose}
              >
                <Num>{String(i + 1).padStart(2, "0")}</Num>
                {item.label}
              </Item>
            ))}
          </NavList>

          <BottomArea>
            <Button accent={accent} size="lg" onClick={onClose}>
              예약하기
            </Button>
          </BottomArea>
        </Inner>
      )}
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: ${alpha(T.bgBase, 0.97)};
  backdrop-filter: blur(24px);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition:
    opacity ${T.transition.fast},
    visibility ${T.transition.fast};
`

const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${T.navHeight} ${T.rsvPad} ${T.spacing[48]};
  position: relative;
  overflow-y: auto;
`

const CloseBtn = styled.button`
  position: fixed;
  top: 0;
  right: ${T.pagePad};
  height: ${T.navHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${T.sub};
  transition: color ${T.transition.fast};

  &:hover {
    color: ${T.main};
  }
`

// 배경 액센트 글로우
const Glow = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 280px;
  border-radius: ${T.radius.full};
  background: ${({ $accent }) =>
    `radial-gradient(ellipse, ${alpha($accent, 0.1)} 0%, transparent 70%)`};
  pointer-events: none;
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[4]};
`

const Item = styled(Link)`
  display: flex;
  align-items: baseline;
  gap: ${T.spacing[16]};
  font-size: clamp(32px, 10vw, 52px);
  font-family: ${T.fontSerif};
  font-weight: 700;
  color: ${({ $active, $accent }) => ($active ? $accent : T.main)};
  letter-spacing: -0.5px;
  opacity: 0;
  animation: fadeUp ${T.transition.slow} forwards;
  animation-delay: ${({ $i }) => `${0.05 + $i * 0.07}s`};
  transition: color ${T.transition.fast};

  &:hover {
    color: ${({ $accent }) => $accent};
  }
`

const Num = styled.span`
  font-size: ${T.fontSize.xs};
  font-family: ${T.fontMono};
  color: ${T.muted};
  letter-spacing: 1px;
  flex-shrink: 0;
  margin-bottom: ${T.spacing[4]};
`

const BottomArea = styled.div`
  margin-top: ${T.spacing[48]};
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[20]};
  opacity: 0;
  animation: fadeUp ${T.transition.slow} forwards;
  animation-delay: ${0.05 + NAV_ITEMS.length * 0.07}s;
`
