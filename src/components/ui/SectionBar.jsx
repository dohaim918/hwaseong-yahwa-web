import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { focusRing, hoverLastIconX, revealUp, flexRow } from "@/styles/mixins"
import { ArrowRightIcon, FlowerIcon } from "@/components/ui/icons"
import { useMvpModal } from "@/components/ui/MvpModal"

// ─────────────────────────────────────────────
//  SectionBar — 섹션 상단 바 (★ LABEL · sub / link →)
//  사용처: VenueSection(VENUE) · GallerySection(GALLERY)
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
  const mvpModal = useMvpModal()

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
      return
    }
    mvpModal.open({ accent: color, title: modalTitle, desc: modalDesc })
  }

  return (
    <Bar $color={color} $visible={visible}>
      <Left>
        <FlowerMark color={color} />
        <Label $color={color}>{label}</Label>
        {sub && <Sub>{sub}</Sub>}
      </Left>

      {link && (
        <LinkButton type="button" $color={color} aria-haspopup="dialog" onClick={handleLinkClick}>
          <span>{link}</span>
          <ArrowRightIcon size={14} color={color} strokeWidth={1.5} />
        </LinkButton>
      )}
    </Bar>
  )
}

const FlowerMark = styled(FlowerIcon)`
  flex-shrink: 0;
  overflow: visible;
`

const Bar = styled.div`
  position: relative;
  z-index: 10;
  ${flexRow()}
  justify-content: space-between;
  align-self: stretch;
  margin: ${T.navHeight} ${T.pagePad} 0;
  padding: ${T.spacing[12]};
  border-top: 1px solid ${({ $color }) => alpha($color, 0.27)};
  border-bottom: 1px solid ${alpha(T.white, 0.05)};
  ${({ $visible }) => revealUp($visible, 0.05)}

  @media (max-width: ${T.bp.mini}) {
    margin-top: ${T.navHeightMini};
    padding: ${T.spacing[8]};
  }
`

const Left = styled.div`
  ${flexRow(T.spacing[8])}
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

const LinkButton = styled.button`
  ${flexRow(T.spacing[8])}
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

  ${hoverLastIconX()}

  ${({ $color }) => focusRing($color)}
`
