import { forwardRef } from "react"
import styled from "@emotion/styled"
import { T } from "@/styles/theme"
import { sectionAccent } from "@/styles/mixins"
import { EdgeFade } from "@/components/ui/Deco"

// 두 섹션 셸의 공통 골격 — accent 주면 상단 accent 라인 자동 주입
const sectionBase = ({ $accent }) => `
  position: relative;
  overflow: clip;
  height: 100vh;
  scroll-snap-align: start;
  flex-shrink: 0;
  display: flex;
  ${$accent ? sectionAccent($accent) : ""}
`

// ── 풀스크린 배경 섹션 셸 (중앙정렬) — 하단 EdgeFade 내장
const FullSection = forwardRef(function FullSection({ children, className, accent, ...props }, ref) {
  return (
    <CenterSection ref={ref} className={className} $accent={accent} {...props}>
      <EdgeFade side="bottom" opacity={1} />
      {children}
    </CenterSection>
  )
})

export default FullSection

// ── 세로 스택형 섹션 셸 (FullSection 형제)
//    내부가 세로 스택인 섹션용(헤더+카드 / CTA+footer 등). 중앙정렬·EdgeFade 없음.
export const ColumnSection = forwardRef(function ColumnSection(
  { children, className, accent, ...props },
  ref
) {
  return (
    <StackSection ref={ref} className={className} $accent={accent} {...props}>
      {children}
    </StackSection>
  )
})

// ─────────────────────────────────────────────────────────────

const CenterSection = styled.section`
  ${sectionBase}
  align-items: center;
  justify-content: center;
  min-height: 700px;

  @media (max-width: ${T.bp.mobile}) {
    height: 100dvh;
    min-height: 600px;
  }
`

const StackSection = styled.section`
  ${sectionBase}
  height: 100dvh;
  flex-direction: column;
`
