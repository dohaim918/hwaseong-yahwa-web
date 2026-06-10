// 화성야화 브랜드 로고 — NavBar·Footer 공용 (에셋·반응형 크기 단일 소스)
//   기본은 <img>. 링크로 감싸는 건 사용처(NavBar 등)가 담당.
import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import logoImg from "@/assets/images/logo/hwaseong-yahwa-logo.webp"

export default function BrandLogo({ alt = "화성야화", ...props }) {
  return <Img src={logoImg} alt={alt} {...props} />
}

const Img = styled.img`
  width: 124px;
  height: auto;

  @media (max-width: ${T.bp.mobile}) {
    width: 104px;
  }

  @media (max-width: ${T.bp.mini}) {
    width: 88px;
  }
`
