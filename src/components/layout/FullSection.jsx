import { forwardRef } from "react"
import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import { T } from "@/styles/theme"

// ── 풀스크린 배경 섹션 셸
//
//  props:
//    bgSrc        배경 이미지 src — 있으면 bgIn 애니메이션 자동 적용
//    bgOpacity    배경 이미지 투명도 (기본: 0.8)
//    ref          forwardRef — Section DOM 노드로 전달
//
//  사용 예:
//    <FullSection bgSrc={img} bgOpacity={0.8}>
const makeBgIn = (opacity) => keyframes`
  from { opacity: 0; transform: scale(1.08); }
  to   { opacity: ${opacity}; transform: scale(1); }
`

const FullSection = forwardRef(function FullSection(
  {
    children,
    className,
    bgSrc,
    bgOpacity = 1,
  },
  ref
) {
  return (
    <Section ref={ref} className={className}>
      {/* <BgGrad /> */}
      {bgSrc && <BgImage src={bgSrc} alt="" $opacity={bgOpacity} />}
      <BottomFade />
      {children}
    </Section>
  )
})

export default FullSection

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
  margin-inline: calc(-1 * ${T.pagePad});

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
  pointer-events: none;
  animation: ${({ $opacity }) => makeBgIn($opacity)} 1.4s cubic-bezier(.22,.68,0,1.1) both;
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
  z-index: 4;
`
