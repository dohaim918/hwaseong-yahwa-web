// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    accent   — 현재 섹션 accent 색상 (기본값: T.pink)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { T, alpha } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import MobileMenu from "@/components/layout/MobileMenu"
import Button from "@/components/ui/Button"
import { useMvpModal } from "@/components/ui/MvpModal"
import logoImage from "@/assets/images/logo/hwaseong-yahwa-logo.png"

export default function NavBar({ accent = T.pink }) {
  const [isOpen, setIsOpen] = useState(false)
  const mvpModal = useMvpModal()
  const openMvpModal = () => mvpModal.open(accent)
  const isCtaLink = UI_TEXT.nav.ctaType === "link"

  return (
    <>
      <Nav>
        <h1>
          <Logo to="/" aria-label="화성야화 메인으로 이동">
            <LogoImage src={logoImage} alt="화성야화" />
          </Logo>
        </h1>

        <Right>
          <NavLinks>
            {UI_TEXT.nav.items.map((item) =>
              item.type === "link" ? (
                <NavItem key={item.label} to={item.to} $accent={accent}>
                  {item.label}
                </NavItem>
              ) : (
                <NavAction key={item.label} type="button" $accent={accent} onClick={openMvpModal}>
                  {item.label}
                </NavAction>
              )
            )}
          </NavLinks>

          {isCtaLink ? (
            <DesktopBookBtn as={Link} to={UI_TEXT.nav.ctaTo} accent={accent} size="sm">
              {UI_TEXT.nav.ctaLabel}
            </DesktopBookBtn>
          ) : (
            <DesktopBookBtn accent={accent} size="sm" onClick={openMvpModal}>
              {UI_TEXT.nav.ctaLabel}
            </DesktopBookBtn>
          )}

          <Hamburger $open={isOpen} onClick={() => setIsOpen((p) => !p)} aria-label="메뉴">
            <Bar />
            <Bar />
            <Bar />
          </Hamburger>
        </Right>
      </Nav>

      <MobileMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        accent={accent}
        onMvpOpen={openMvpModal}
      />
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

  @media (max-width: ${T.bp.mini}) {
    height: ${T.navHeightMini};
  }
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
  width: 124px;
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
  max-width: 600px;
  overflow: hidden;
  transition:
    max-width ${T.transition.mid},
    opacity ${T.transition.mid},
    transform ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    max-width: 0;
    opacity: 0;
    pointer-events: none;
    transform: translateX(24px);
  }
`

const navTextStyle = css`
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

  &:hover {
    color: ${T.main};
  }
`

const NavItem = styled(NavLink, {
  shouldForwardProp: (prop) => prop !== "$accent",
})`
  ${navTextStyle}

  &.active {
    color: ${({ $accent }) => $accent};

    &::after {
      background: ${({ $accent }) =>
        `linear-gradient(90deg, transparent, ${$accent}, transparent)`};
    }
  }
`

const NavAction = styled.button`
  ${navTextStyle}

  &:focus-visible {
    color: ${({ $accent }) => $accent};
    outline: none;

    &::after {
      background: ${({ $accent }) =>
        `linear-gradient(90deg, transparent, ${$accent}, transparent)`};
    }
  }
`

const DesktopBookBtn = styled(Button)`
  margin-left: ${T.spacing[42]};
  max-width: 200px;
  overflow: hidden;
  transition:
    filter ${T.transition.fast},
    box-shadow ${T.transition.mid},
    max-width ${T.transition.mid},
    opacity ${T.transition.mid},
    transform ${T.transition.fast},
    margin-left ${T.transition.mid},
    height ${T.transition.mid},
    padding ${T.transition.mid},
    font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    max-width: 0;
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
  background: ${T.sub};
  border-radius: 1px;
  transition:
    transform ${T.transition.mid},
    opacity ${T.transition.mid};
  transform-origin: center;
`
