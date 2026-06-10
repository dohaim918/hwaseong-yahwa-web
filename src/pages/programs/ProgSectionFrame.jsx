// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ProgSectionFrame — 프로그램 상세 섹션 공통 프레임
//  ────────────────────────────────────────────────
//  ColumnSection + 배경 + 상단 페이드/글로우 + 내부 레이아웃 + SectionHeader 묶음.
//  Experience · Flow 처럼 같은 섹션 껍데기를 쓰는 곳에서 사용한다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { ColumnSection } from "@/components/layout/FullSection"
import AnimatedBgImage from "@/components/ui/AnimatedBgImage"
import { EdgeFade, SectionGlow } from "@/components/ui/Deco"
import SectionHeader from "@/components/ui/SectionHeader"
import { useSectionAccent } from "@/hooks/useSectionAccent"
import { T } from "@/styles/theme"

export default function ProgSectionFrame({
  night,
  bg,
  bgKey,
  bgOpacity = 1,
  mobileBgOpacity,
  bgBlendMode,
  topFade,
  glows = [],
  layoutGap,
  header,
  children,
}) {
  const accent = night.color
  // ProgramsPage가 setAccent 처리 → color:null 로 중복 방지 / animIn만 사용
  const { ref: secRef, animIn } = useSectionAccent(null, { color: null })
  const renderProps = { accent, animIn }

  return (
    <ColumnSection ref={secRef} accent={accent}>
      {bg && (
        <AnimatedBgImage
          key={bgKey}
          src={bg}
          opacity={bgOpacity}
          mobileOpacity={mobileBgOpacity}
          blendMode={bgBlendMode}
          animate={animIn}
        />
      )}

      {topFade && <EdgeFade side="top" {...topFade} />}

      {glows.map((glow, i) => (
        <SectionGlow key={glow.key ?? i} color={accent} {...glow} />
      ))}

      <Inner $gap={layoutGap ?? T.spacing[24]}>
        {header && (
          <SectionHeader
            labelAccent={accent}
            titleGradient={night.style.whiteTextGrad}
            animIn={animIn}
            pb="0"
            {...header}
          />
        )}
        {typeof children === "function" ? children(renderProps) : children}
      </Inner>
    </ColumnSection>
  )
}

// 고정 NavBar + NightTabBar 높이는 margin-top으로 빼고,
// 실제 콘텐츠 여백은 padding으로 관리한다.
const Inner = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap};
  margin-top: calc(${T.navHeight} + ${T.tabNavHeight});
  padding: ${T.progSecPadY} ${T.pagePad};

  @media (max-width: ${T.bp.tablet}) {
    padding-block: ${T.progSecPadYCompact};
  }

  @media (max-width: ${T.bp.mini}) {
    margin-top: calc(${T.navHeightMini} + ${T.tabNavHeightMini});
  }
`
