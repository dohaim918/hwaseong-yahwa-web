import styled from "@emotion/styled"
import { T, alpha, accentLine } from "@/styles/theme"
import { focusRing, flexCol, flexRow } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import {
  FacebookIcon,
  YoutubeIcon,
  InstagramIcon,
  KakaoIcon,
  ChevronIcon,
} from "@/components/ui/icons"
import { useMvpModal } from "@/components/ui/MvpModal"
import { useResponsive } from "@/hooks/useResponsive"
import BrandLogo from "@/components/ui/BrandLogo"

const tf = UI_TEXT.footer

const SNS_ICON_MAP = {
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  kakao: KakaoIcon,
}

export default function Footer({ accent = T.violet }) {
  const { isMini, isSmall } = useResponsive()
  const mvpModal = useMvpModal()
  const openPending = (label) => {
    mvpModal.open({
      accent: T.violet,
      title: tf.pending.title,
      desc: `${label} ${tf.pending.descSuffix}`,
      label: tf.pending.label,
    })
  }

  return (
    <FooterEl $accent={accent}>
      <FooterMain>
        <FooterGrid>
          {/* ── col1: 브랜드 + 주소 + SNS ── */}
          <BrandCol>
            <BrandLeft>
              <LogoRow>
                <BrandLogo alt={tf.brand} />
              </LogoRow>
              <Addr>
                {tf.address}
                <br />
                T. {tf.tel}&nbsp;&nbsp;|&nbsp;&nbsp;F. {tf.fax}
              </Addr>
            </BrandLeft>

            <SnsRow>
              {tf.social.map(({ id, label }) => {
                const Icon = SNS_ICON_MAP[id]
                if (!Icon) return null
                return (
                  <SnsBtn
                    key={id}
                    type="button"
                    aria-label={label}
                    aria-haspopup="dialog"
                    onClick={() => openPending(label)}
                  >
                    <Icon color="currentColor" />
                  </SnsBtn>
                )
              })}
            </SnsRow>
          </BrandCol>

          {/* ── col2~4: 링크 컬럼 ── */}
          {Object.entries(tf.columns).map(([heading, links]) => (
            <FCol key={heading} open={isMini ? undefined : true}>
              <FColHead tabIndex={isMini ? undefined : -1}>
                {heading}
                {isMini && <ChevronIcon className="foldIcon" size={16} aria-hidden="true" />}
              </FColHead>
              <FLinks>
                {links.map((link) => {
                  // 비활성 (href 없거나 disabled) → 비클릭 span
                  if (!link.href || link.disabled) {
                    return (
                      <FLink key={link.label} as="span" $disabled aria-disabled="true">
                        {link.label}
                      </FLink>
                    )
                  }
                  return (
                    <FLink
                      key={link.label}
                      as="a"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                      {link.external && <Ext aria-hidden="true">↗</Ext>}
                    </FLink>
                  )
                })}
              </FLinks>
            </FCol>
          ))}
        </FooterGrid>
      </FooterMain>

      {/* ── 카피라이트 바 ── */}
      <CopyBar>
        <CopyText>{isSmall ? tf.copyrightMini : tf.copyright}</CopyText>
        <CopyLegal>
          {tf.legal.map((item) => (
            <CopyBtn
              key={item}
              type="button"
              aria-haspopup="dialog"
              onClick={() => openPending(item)}
            >
              {item}
            </CopyBtn>
          ))}
        </CopyLegal>
      </CopyBar>
    </FooterEl>
  )
}

const FooterEl = styled.footer`
  position: relative;
  z-index: 5;
  flex-shrink: 0;
  background:
    linear-gradient(180deg, ${alpha(T.muted, 0.15)} 0%, ${alpha(T.bgBase, 0.15)} 100%), ${T.bgBase};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ $accent }) => accentLine($accent)};
  }
`

const FooterMain = styled.div`
  /* 위아래 대칭 패딩 (좌우는 pagePad) */
  padding: clamp(${T.spacing[24]}, 3.4vw, 44px) ${T.pagePad};

  @media (max-width: ${T.bp.mini}) {
    padding-block: ${T.spacing[20]};
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) repeat(3, minmax(0, 1fr));
  gap: ${T.spacing[32]};

  @media (max-width: ${T.bp.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${T.spacing[24]};
  }

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[20]};
  }

  @media (max-width: ${T.bp.mini}) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`

// ─────────────────────────────────────────────────────
//  col1 — 브랜드
// ─────────────────────────────────────────────────────

const BrandCol = styled.div`
  ${flexCol(T.spacing[16])}

  /* tablet: 로고·주소(좌) / SNS(우) 가로 배치 */
  @media (max-width: ${T.bp.tablet}) {
    grid-column: 1 / -1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${T.spacing[24]};
  }

  /* mobile: 중앙 정렬 세로 배치 */
  @media (max-width: ${T.bp.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${T.spacing[16]};
    padding-bottom: ${T.spacing[12]};
  }
`

const BrandLeft = styled.div`
  ${flexCol(T.spacing[12])}

  @media (max-width: ${T.bp.mobile}) {
    align-items: center;
    gap: ${T.spacing[8]};
  }
`

const LogoRow = styled.div`
  ${flexRow(T.spacing[12])}
`

const Addr = styled.address`
  font-style: normal;
  font-size: ${T.fontSize.xs};
  line-height: 1.7;
  color: ${alpha(T.sub, 0.7)};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xxs};
  }

  @media (max-width: ${T.bp.mobile}) {
    display: none;
  }
`

const SnsRow = styled.div`
  display: flex;
  gap: ${T.spacing[8]};

  @media (max-width: ${T.bp.tablet}) {
    align-self: center;
    flex-shrink: 0;
  }

  @media (max-width: ${T.bp.mobile}) {
    align-self: auto;
    justify-content: center;
  }
`

const SnsBtn = styled.button`
  --sns-size: clamp(28px, 5vw, ${T.spacing[32]});
  --sns-icon: clamp(13px, 2.4vw, 15px);

  width: var(--sns-size);
  height: var(--sns-size);
  border-radius: ${T.radius.sm};
  ${flexRow()}
  justify-content: center;
  color: ${T.sub};
  background: ${alpha(T.white, 0.05)};
  border: 1px solid ${alpha(T.white, 0.1)};
  cursor: pointer;
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast},
    color ${T.transition.fast};

  &:hover {
    background: ${alpha(T.pink, 0.12)};
    border-color: ${alpha(T.pink, 0.5)};
    color: ${T.pink};
  }

  ${focusRing(alpha(T.pink, 0.7), T.radius.sm)}

  svg {
    width: var(--sns-icon);
    height: var(--sns-icon);
  }
`

const FCol = styled.details`
  ${flexCol(T.spacing[16])}

  @media (max-width: ${T.bp.mini}) {
    gap: 0;
    border-bottom: 1px solid ${alpha(T.white, 0.06)};
  }
`

const FColHead = styled.summary`
  list-style: none;
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${alpha(T.main, 0.6)};
  padding-bottom: ${T.spacing[16]};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};
  pointer-events: none;

  &::-webkit-details-marker {
    display: none;
  }

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xs};
    padding-bottom: ${T.spacing[12]};
  }

  @media (max-width: ${T.bp.mini}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${T.spacing[12]} 0;
    border-bottom: 0;
    font-size: ${T.fontSize.xxs};
    letter-spacing: 0.5px;
    pointer-events: auto;
    cursor: pointer;

    .foldIcon {
      color: ${alpha(T.sub, 0.8)};
      transition: transform ${T.transition.fast};
    }

    details[open] & .foldIcon {
      transform: rotate(90deg);
    }
  }
`

const FLinks = styled.div`
  ${flexCol(T.spacing[8])}

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
    padding: 0 0 ${T.spacing[16]};
  }
`

const FLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${T.spacing[4]};
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  text-decoration: none;
  transition: color ${T.transition.fast};

  &:hover {
    color: ${({ $disabled }) => ($disabled ? T.sub : T.main)};
  }

  ${focusRing(alpha(T.pink, 0.7))}

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xxs};
  }
`

const Ext = styled.span`
  font-size: 10px;
  opacity: 0.5;
  flex-shrink: 0;

  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

// ─────────────────────────────────────────────────────
//  카피라이트 바
// ─────────────────────────────────────────────────────

const CopyBar = styled.div`
  ${flexRow(T.spacing[12])}
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${T.spacing[16]} ${T.pagePad} ${T.spacing[28]};
  border-top: 1px solid ${alpha(T.white, 0.04)};

  /* 미니: 위 패딩·구분선 제거(아코디언 선과 중복 방지) + 2줄 세로 스택(중앙정렬) */
  @media (max-width: ${T.bp.mini}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${T.spacing[6]};
    padding-block: 0 ${T.spacing[20]};
    border-top: 0;
  }
`

const CopyText = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${alpha(T.sub, 0.7)};

  @media (max-width: ${T.bp.mobile}) {
    word-break: keep-all;
  }
`

const CopyLegal = styled.div`
  display: flex;
  gap: ${T.spacing[16]};
  flex-shrink: 0;

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const CopyBtn = styled.button`
  font-size: ${T.fontSize.xxs};
  color: ${alpha(T.sub, 0.7)};
  cursor: pointer;
  white-space: nowrap;
  transition: color ${T.transition.fast};

  &:hover {
    color: ${T.main};
  }

  ${focusRing(alpha(T.pink, 0.7))}
`
