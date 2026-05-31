import { forwardRef } from "react"
import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import { EdgeFade } from "@/components/ui/Deco"

// ── 풀스크린 배경 섹션 셸
const FullSection = forwardRef(function FullSection({ children, className, ...props }, ref) {
  return (
    <Section ref={ref} className={className} {...props}>
      <EdgeFade side="bottom" opacity={1} />
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

  @media (max-width: ${T.bp.mobile}) {
    height: 100dvh;
    min-height: 600px;
  }
`
