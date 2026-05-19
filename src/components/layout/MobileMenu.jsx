import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { NAV_ITEMS } from "@/constants/nav"
import { CloseIcon, ArrowRightIcon } from "@/components/ui/icons"
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
            <CloseIcon size={28} />
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
                <Divider />
                <span>{item.label}</span>
              </Item>
            ))}
          </NavList>

          <BottomArea>
            <BookBtn accent={accent} onClick={onClose}>
              예약하기
              <ArrowRightIcon size={14} />
            </BookBtn>
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
  background:
    /* 우하단 메인 핑크 */
    radial-gradient(
      ellipse 80% 40% at 50% 102%,
      ${alpha(T.pink, 0.08)} 0%,
      ${alpha(T.pinkDim, 0.04)} 48%,
      transparent 82%
    ),
    /* 우중단 바이올렛 보조 */
    radial-gradient(ellipse 36% 30% at 98% 60%, ${alpha(T.violet, 0.06)} 0%, transparent 85%),
    /* 좌상단 핑크 */
    radial-gradient(ellipse 32% 26% at 4% 4%, ${alpha(T.pink, 0.09)} 0%, transparent 60%),
    /* 중앙 베이스 바이올렛 분위기 */
    radial-gradient(ellipse 55% 45% at 46% 44%, ${alpha(T.violet, 0.04)} 0%, transparent 70%),
    /* 기본 배경 */ ${alpha(T.bgBase, 0.97)};
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
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
  padding: ${T.navHeight} ${T.rsvPad} ${T.spacing[48]} clamp(${T.spacing[32]}, 8vw, 68px);
  position: relative;
  overflow-y: auto;

  @media (max-width: ${T.bp.mini}) {
    padding-left: ${T.spacing[32]};
  }
`

const CloseBtn = styled.button`
  position: fixed;
  top: 0;
  right: ${T.pagePad};
  height: ${T.navHeight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${alpha(T.sub, 0.52)};
  transition: color ${T.transition.fast};

  &:hover {
    color: ${T.main};
  }
`

/* 메뉴 뒤쪽 은은한 aura */
const Glow = styled.div`
  position: absolute;
  top: 26%;
  left: -50px;
  width: 340px;
  height: 300px;
  border-radius: ${T.radius.full};
  background: ${({ $accent }) =>
    `radial-gradient(ellipse, ${alpha($accent, 0.055)} 0%, transparent 65%)`};
  pointer-events: none;
`

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[36]};
`

const Item = styled(Link)`
  display: grid;
  grid-template-columns: ${T.spacing[42]} 1px auto;
  column-gap: ${T.spacing[20]};
  align-items: center;
  font-size: clamp(32px, 5.2vw, 52px);
  font-family: ${T.fontSerif};
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.5px;
  color: ${({ $active, $accent }) => ($active ? $accent : T.sub)};
  text-shadow: ${({ $active, $accent }) => ($active ? `0 0 20px ${alpha($accent, 0.28)}` : "none")};
  opacity: 0;
  animation: fadeUp ${T.transition.slow} forwards;
  animation-delay: ${({ $i }) => `${0.05 + $i * 0.07}s`};
  transition:
    color ${T.transition.fast},
    text-shadow ${T.transition.fast};

  &:hover {
    color: ${({ $accent }) => $accent};
    text-shadow: ${({ $accent }) => `0 0 20px ${alpha($accent, 0.28)}`};
  }
`

const Num = styled.span`
  font-size: ${T.fontSize.xs};
  font-family: ${T.fontMono};
  color: ${alpha(T.sub, 0.52)};
  letter-spacing: 0.08em;
  text-align: right;
`

const Divider = styled.span`
  display: block;
  width: 2px;
  height: 26px;
  opacity: 0.3;
  background: ${alpha(T.violet, 0.35)};
  justify-self: center;
`

const BottomArea = styled.div`
  margin-top: ${T.spacing[48]};
  padding-left: ${T.spacing[20]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  opacity: 0;
  animation: fadeUp ${T.transition.slow} forwards;
  animation-delay: ${0.05 + NAV_ITEMS.length * 0.07}s;
`

const BookBtn = styled(Button)`
  gap: ${T.spacing[8]};
  width: 192px;
  height: 52px;
  font-size: ${T.fontSize.xs};
  letter-spacing: 1.5px;
  color: ${T.main};
  box-shadow: 0 0 24px ${({ accent }) => alpha(accent, 0.3)};

  &:hover:not(:disabled) {
    box-shadow: 0 0 36px ${({ accent }) => alpha(accent, 0.55)};
  }

  @media (max-width: ${T.bp.mobile}) {
    width: 176px;
    height: 48px;
  }
`
