import { useState } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { FlowerIcon } from "@/components/ui/icons"
import MvpModal from "@/components/ui/MvpModal"

// ─────────────────────────────────────────────
//  SectionBar
//  사용처:
//    VenueSection   → label="VENUE"   sub="화성에서 만나요"  link="관람 안내 보기 →"
//    GallerySection → label="GALLERY" sub="지난 밤의 기억들" link="전체 갤러리 →"
//
//  사용 예시:
//    <SectionBar
//      label={UI_TEXT.venue.sectionLabel}
//      sub={UI_TEXT.venue.sectionSub}
//      link={UI_TEXT.venue.guideLink}
//      color={T.amber}
//      visible={animIn}
//      onLinkClick={() => {}}
//    />
// ─────────────────────────────────────────────
export default function SectionBar({
  label,
  sub,
  link,
  color = T.main,
  visible = true,
  onLinkClick,
  modalTitle,
  modalDesc,
}) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
      return
    }
    setModalOpen(true)
  }

  return (
    <>
      <Bar $color={color} $visible={visible}>
        <Left>
          <FlowerIcon color={color} style={{ flexShrink: 0, overflow: "visible" }} />
          <Label $color={color}>{label}</Label>
          {sub && <Sub>{sub}</Sub>}
        </Left>

        {link && (
          <LinkButton type="button" $color={color} aria-haspopup="dialog" onClick={handleLinkClick}>
            <span>{link}</span>
            <Arrow $color={color}>→</Arrow>
          </LinkButton>
        )}
      </Bar>

      <MvpModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        accent={color}
        title={modalTitle}
        desc={modalDesc}
      />
    </>
  )
}

const Bar = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin: ${T.navHeight} ${T.pagePad} 0;
  padding: ${T.spacing[12]};
  border-top: 1px solid ${({ $color }) => alpha($color, 0.27)};
  border-bottom: 1px solid ${alpha(T.white, 0.05)};
  ${({ $visible }) =>
    $visible
      ? `animation: fadeUp 0.5s ease 0.05s both;`
      : `opacity: 0; transform: translateY(26px);`}

  @media (max-width: ${T.bp.mini}) {
    margin-top: ${T.navHeightMini};
    padding: ${T.spacing[8]};
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};
  min-width: 0;

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
  }
`

const Label = styled.span`
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  letter-spacing: 5px;
  color: ${({ $color }) => $color};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 3px;
  }
`

const Sub = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${T.spacing[8]};
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
  white-space: nowrap;

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
  }

  &::before {
    content: "";
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: ${T.muted};
    margin-right: 2px;
    flex-shrink: 0;
  }

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const Arrow = styled.span`
  color: ${({ $color }) => $color};
  display: inline-block;
  transition: transform ${T.transition.fast};
`

const LinkButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};
  font-size: ${T.fontSize.xs};
  cursor: pointer;
  color: ${T.sub};
  white-space: nowrap;
  transition: color ${T.transition.fast};

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    gap: ${T.spacing[6]};
  }

  &:hover {
    color: ${T.white};
  }

  &:hover span:last-child {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 1px solid ${({ $color }) => $color};
    outline-offset: ${T.spacing[4]};
  }
`
