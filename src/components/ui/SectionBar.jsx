import styled from "@emotion/styled"
import { T, alpha, focusRing, revealUp } from "@/styles/theme"
import { ArrowRightIcon, FlowerIcon } from "@/components/ui/icons"
import { useMvpModal } from "@/components/ui/MvpModal"

// ─────────────────────────────────────────────
//  SectionBar
//  사용처:
//    VenueSection   → label="VENUE"   sub="화성에서 만나요"  link="관람 안내 보기"
//    GallerySection → label="GALLERY" sub="지난 밤의 기억들" link="전체 갤러리"
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
        <FlowerIcon color={color} style={{ flexShrink: 0, overflow: "visible" }} />
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
  ${({ $visible }) => revealUp($visible, 0.05)}

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

  svg {
    transition: transform ${T.transition.fast};
  }

  &:hover svg {
    transform: translateX(3px);
  }

  ${({ $color }) => focusRing($color)}
`
