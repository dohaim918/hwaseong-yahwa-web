import styled from "@emotion/styled"
import { T } from "@/styles/theme"

// 풀스크린 배경 섹션 셸 — bgSrc/bgOpacity로 배경 이미지 제어
// 사용: <FullSection bgSrc={img} bgOpacity={0.8}>{children}</FullSection>
export default function FullSection({ children, bgSrc, bgOpacity = 0.8 }) {
  return (
    <Section>
      {/* <BgGrad /> */}
      {bgSrc && <BgImage src={bgSrc} alt="" $opacity={bgOpacity} />}
      <BottomFade />
      {children}
    </Section>
  )
}

const Section = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  overflow: clip;
  display: flex;
  align-items: center;
  justify-content: center;
  scroll-snap-align: start;
  flex-shrink: 0;
  margin-top: calc(-1 * ${T.navHeight});

  @media (max-width: ${T.bp.mini}) {
    margin-top: calc(-1 * ${T.navHeightMini});
  }
  margin-left: calc(-1 * ${T.pagePad});
  margin-right: calc(-1 * ${T.pagePad});

  @media (max-width: ${T.bp.mobile}) {
    height: 100dvh;
    min-height: 600px;
  }
`

const BgImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ $opacity }) => $opacity};
  pointer-events: none;
`

// 배경 이미지 대신 그라디언트만 쓸 때 복구 후보
// const BgGrad = styled.div`
//   position: absolute;
//   inset: 0;
//   background:
//     radial-gradient(ellipse 80% 60% at 50% 30%, #1a0828 0%, transparent 70%),
//     radial-gradient(ellipse 40% 40% at 20% 80%, ${alpha(T.pinkDim, 0.2)} 0%, transparent 60%),
//     radial-gradient(ellipse 30% 30% at 80% 70%, ${alpha(T.amberDim, 0.13)} 0%, transparent 50%),
//     ${T.bgBase};
// `

const BottomFade = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to top, ${T.bgBase}, transparent);
  pointer-events: none;
  z-index: 2;
`
