// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    accent   — 현재 섹션 accent 색상 (기본값: T.pink)
//    scrolled — 스크롤 여부 (Layout에서 전달)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { NAV_ITEMS } from "@/constants/nav"
import MobileMenu from "@/components/layout/MobileMenu"
import Button from "@/components/ui/Button"
import logoImage from "@/assets/images/logo/hwaseong-yahwa-logo.png"

export default function NavBar({ accent = T.pink, scrolled = false }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Nav>
        <Logo to="/" aria-label="화성야화 메인으로 이동">
          <LogoImage src={logoImage} alt="화성야화" />
        </Logo>

        <Right>
          <NavLinks>
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} to={item.to} $accent={accent}>
                {item.label}
              </NavItem>
            ))}
          </NavLinks>

          <DesktopBookBtn accent={accent} size="sm">
            예약하기
          </DesktopBookBtn>

          <Hamburger $open={isOpen} onClick={() => setIsOpen((p) => !p)} aria-label="메뉴">
            <Bar />
            <Bar />
            <Bar />
          </Hamburger>
        </Right>
      </Nav>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} accent={accent} />
    </>
  )
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: ${T.navHeight};
  padding: 0 ${T.pagePad};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${alpha(T.bgBase, 0.45)};
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  width: 136px;
  transition: opacity ${T.transition.fast};

  &:hover {
    opacity: 0.82;
  }
`

const LogoImage = styled.img`
  width: 100%;
  height: auto;
`

const Right = styled.div`
  display: flex;
  align-items: center;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[32]};
  transition:
    opacity ${T.transition.mid},
    transform ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    opacity: 0;
    pointer-events: none;
    transform: translateX(24px);
  }
`

const NavItem = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "$accent",
})`
  position: relative;
  font-size: ${T.fontSize.sm};
  color: ${T.sub};
  letter-spacing: 0.5px;
  white-space: nowrap;
  padding-bottom: ${T.spacing[6]};
  transition: color ${T.transition.fast};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: transparent;
    transition: background ${T.transition.fast};
  }

  &.active {
    color: ${({ $accent }) => $accent};

    &::after {
      background: ${({ $accent }) =>
        `linear-gradient(90deg, transparent, ${$accent}, transparent)`};
    }
  }

  &:hover {
    color: ${T.main};
  }
`

const DesktopBookBtn = styled(Button)`
  margin-left: ${T.spacing[42]};
  transition:
    opacity ${T.transition.mid},
    transform ${T.transition.fast},
    margin-left ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    opacity: 0;
    pointer-events: none;
    transform: translateX(48px);
    margin-left: 0;
  }
`

const Hamburger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  min-width: 0;
  overflow: hidden;
  max-width: 0;
  opacity: 0;
  pointer-events: none;
  transition:
    max-width ${T.transition.mid},
    opacity ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    max-width: 30px;
    opacity: 1;
    pointer-events: auto;
  }

  span:nth-of-type(1) {
    transform: ${({ $open }) => ($open ? "translateY(8px) rotate(45deg)" : "none")};
  }
  span:nth-of-type(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transform: ${({ $open }) => ($open ? "scaleX(0)" : "none")};
  }
  span:nth-of-type(3) {
    transform: ${({ $open }) => ($open ? "translateY(-8px) rotate(-45deg)" : "none")};
  }
`

const Bar = styled.span`
  display: block;
  width: 100%;
  height: 2px;
  background: ${T.main};
  border-radius: 1px;
  transition: ${T.transition.mid};
  transform-origin: center;
`
