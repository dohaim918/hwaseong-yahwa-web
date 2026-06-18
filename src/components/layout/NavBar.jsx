// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    accent   — 현재 섹션 accent 색상 (기본값: T.pink)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { T, alpha, accentLine } from "@/styles/theme"
import { glass, flexCol, flexRow } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import MobileMenu from "@/components/layout/MobileMenu"
import Button from "@/components/ui/Button"
import { useMvpModal } from "@/components/ui/MvpModal"
import BrandLogo from "@/components/ui/BrandLogo"

export default function NavBar({ accent = T.pink }) {
  const [isOpen, setIsOpen] = useState(false)
  const mvpModal = useMvpModal()
  const openMvpModal = () => mvpModal.open(accent)
  const isCtaLink = UI_TEXT.nav.ctaType === "link"

  return (
    <>
      <Nav>
        <Logo to="/" aria-label="화성야화 메인으로 이동">
          <BrandLogo />
        </Logo>

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

          <Hamburger
            type="button"
            $open={isOpen}
            onClick={() => setIsOpen((p) => !p)}
            aria-label="메뉴"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
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
  ${flexRow()}
  justify-content: space-between;
  background: ${alpha(T.bgBase, 0.45)};
  ${glass("18px")}
`

const Logo = styled(Link)`
  display: inline-flex;
  align-items: center;
  transition: opacity ${T.transition.fast};

  &:hover {
    opacity: 0.82;
  }
`

const Right = styled.div`
  ${flexRow()}
`

const NavLinks = styled.div`
  ${flexRow(T.spacing[32])}
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
      background: ${({ $accent }) => accentLine($accent, { peak: 1, edge: 0.1 })};
    }
  }
`

const NavAction = styled.button`
  ${navTextStyle}

  &:focus-visible {
    color: ${({ $accent }) => $accent};
    outline: none;

    &::after {
      background: ${({ $accent }) => accentLine($accent, { peak: 1, edge: 0.1 })};
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
  ${flexCol()}
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
