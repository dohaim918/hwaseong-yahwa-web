import styled from "@emotion/styled"
import { T, alpha, accentLine } from "@/styles/theme"
import { UI_TEXT } from "@/data/uiText"
import { FacebookIcon, YoutubeIcon, InstagramIcon, KakaoIcon } from "@/components/ui/icons"
import { useResponsive } from "@/hooks/useResponsive"
import logoImg from "@/assets/images/logo/hwaseong-yahwa-logo.png"

const tf = UI_TEXT.footer

const SNS_ICON_MAP = {
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  google: InstagramIcon,
  kakao: KakaoIcon,
}

export default function Footer() {
  const { isMini } = useResponsive()

  return (
    <FooterEl>
      <FooterMain>
        <FooterGrid>
          {/* ── col1: 브랜드 + 주소 + SNS ── */}
          <BrandCol>
            <BrandLeft>
              <LogoRow>
                <LogoImg src={logoImg} alt={tf.brand} />
                <LogoTxt>
                  <LogoKr>{tf.brand}</LogoKr>
                  <LogoEn>{tf.brandEn}</LogoEn>
                </LogoTxt>
              </LogoRow>
              <Addr>
                {tf.address}
                <br />
                T. {tf.tel}&nbsp;&nbsp;|&nbsp;&nbsp;F. {tf.fax}
              </Addr>
            </BrandLeft>

            <SnsRow>
              {tf.social.map((name) => {
                const Icon = SNS_ICON_MAP[name]
                return (
                  <SnsBtn key={name} type="button" aria-label={name}>
                    {Icon && <Icon size={15} color="currentColor" />}
                  </SnsBtn>
                )
              })}
            </SnsRow>
          </BrandCol>

          {/* ── col2~4: 링크 컬럼 ── */}
          {Object.entries(tf.columns).map(([heading, links]) => (
            <FCol key={heading}>
              <FColHead>{heading}</FColHead>
              <FLinks>
                {links.map((link) =>
                  typeof link === "string" ? (
                    <FLink key={link} as="button" type="button">{link}</FLink>
                  ) : (
                    <FLink
                      key={link.label}
                      as="a"
                      href={link.href ?? "#"}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                      {link.external && <Ext aria-hidden="true">↗</Ext>}
                    </FLink>
                  )
                )}
              </FLinks>
            </FCol>
          ))}
        </FooterGrid>
      </FooterMain>

      {/* ── 카피라이트 바 ── */}
      <CopyBar>
        <CopyText>{isMini ? tf.copyrightMini : tf.copyright}</CopyText>
        <CopyLegal>
          {tf.legal.map((item) => (
            <CopyBtn key={item} type="button">{item}</CopyBtn>
          ))}
        </CopyLegal>
      </CopyBar>
    </FooterEl>
  )
}

// ─────────────────────────────────────────────────────
//  레이아웃
// ─────────────────────────────────────────────────────

const FooterEl = styled.footer`
  position: relative;
  z-index: 5;
  flex-shrink: 0;
  background:
    linear-gradient(180deg, ${alpha(T.muted, 0.15)} 0%, ${alpha(T.bgBase, 0.15)} 100%),
    ${T.bgBase};

  &::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${accentLine(T.violet)};
  }
`

const FooterMain = styled.div`
  padding: clamp(${T.spacing[32]}, 4.5vw, 60px) ${T.pagePad} ${T.spacing[32]};

  @media (max-width: ${T.bp.mini}) {
    padding-block: ${T.spacing[24]} ${T.spacing[20]};
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) repeat(3, minmax(0, 1fr));
  gap: ${T.spacing[42]};

  @media (max-width: ${T.bp.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${T.spacing[32]};
  }

  @media (max-width: ${T.bp.mobile}) {
    gap: ${T.spacing[24]};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[16]};
  }
`

// ─────────────────────────────────────────────────────
//  col1 — 브랜드
// ─────────────────────────────────────────────────────

const BrandCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[16]};

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
    gap: ${T.spacing[12]};
    padding-bottom: ${T.spacing[12]};
    border-bottom: 1px solid ${alpha(T.white, 0.06)};
  }

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[8]};
    padding-bottom: ${T.spacing[8]};
  }
`

const BrandLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[12]};

  @media (max-width: ${T.bp.mobile}) {
    align-items: center;
    gap: ${T.spacing[8]};
  }
`

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[12]};
`

const LogoImg = styled.img`
  width: 46px;
  height: 46px;
  object-fit: contain;
  flex-shrink: 0;

  @media (max-width: ${T.bp.mini}) {
    width: 38px;
    height: 38px;
  }
`

const LogoTxt = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[4]};
`

const LogoKr = styled.span`
  font-family: ${T.fontSerif};
  font-size: 19px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: ${T.bgGold};
  line-height: 1;
`

const LogoEn = styled.span`
  font-size: ${T.fontSize.xxs};
  font-weight: 400;
  letter-spacing: 0.5px;
  color: ${alpha(T.bgGold, 0.6)};
  line-height: 1;
`

const Addr = styled.address`
  font-style: normal;
  font-size: ${T.fontSize.xs};
  line-height: 1.7;
  color: ${T.muted};

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
  width: ${T.spacing[32]};
  height: ${T.spacing[32]};
  border-radius: ${T.radius.sm};
  display: flex;
  align-items: center;
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

  &:focus-visible {
    outline: 1px solid ${alpha(T.pink, 0.7)};
    outline-offset: 2px;
  }
`

// ─────────────────────────────────────────────────────
//  col2~4 — 링크 컬럼
// ─────────────────────────────────────────────────────

const FCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[16]};

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[12]};
  }
`

const FColHead = styled.h3`
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${T.main};
  padding-bottom: ${T.spacing[16]};
  border-bottom: 1px solid ${alpha(T.white, 0.06)};

  @media (max-width: ${T.bp.tablet}) {
    font-size: ${T.fontSize.xs};
    padding-bottom: ${T.spacing[12]};
  }

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xxs};
    letter-spacing: 0.5px;
    padding-bottom: ${T.spacing[8]};
  }
`

const FLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${T.spacing[8]};

  @media (max-width: ${T.bp.mini}) {
    gap: ${T.spacing[6]};
  }
`

const FLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${T.spacing[4]};
  font-size: ${T.fontSize.xs};
  color: ${T.sub};
  cursor: pointer;
  text-decoration: none;
  transition: color ${T.transition.fast};

  &:hover { color: ${T.main}; }

  &:focus-visible {
    outline: 1px solid ${alpha(T.pink, 0.7)};
    outline-offset: 2px;
    border-radius: 2px;
  }

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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${T.spacing[12]};
  padding: ${T.spacing[20]} ${T.pagePad} ${T.spacing[42]};
  border-top: 1px solid ${alpha(T.white, 0.04)};

  @media (max-width: ${T.bp.mobile}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: ${T.spacing[8]};
    padding-bottom: ${T.spacing[32]};
  }

  @media (max-width: ${T.bp.mini}) {
    padding-bottom: ${T.spacing[24]};
  }
`

const CopyText = styled.span`
  font-size: ${T.fontSize.xxs};
  color: ${T.muted};

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
  color: ${T.muted};
  cursor: pointer;
  white-space: nowrap;
  transition: color ${T.transition.fast};

  &:hover { color: ${T.sub}; }
`
