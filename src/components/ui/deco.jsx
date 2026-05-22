/* eslint-disable react-refresh/only-export-components */
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  재사용 장식 컴포넌트 모음
//
//  GradLine  — 그라디언트 페이드 가로선
//    $color     색상값 (필수)
//    $dir       'left' | 'right'  — left: 왼쪽 투명→색, right: 색→오른쪽 투명
//    $width     너비 문자열 (생략 시 flex:1 — 부모 너비에 맞게 늘어남)
//    $hideMini  true — mini 브레이크포인트에서 숨김
//
//  AccentLabelRow — 텍스트 양옆에 GradLine을 붙이는 라벨 행
//
//  Shimmer   — 카드·패널 상하단 shimmer 라인
//    $bg        background 그라디언트 문자열 (필수)
//    $top       true — 상단 / 생략 — 하단
//    $active    false — 숨김 / 생략 시 항상 표시
//
//  Ring      — 원형 테두리 (active 상태 표시용)
//    $color     테두리 색상 기준값 (필수)
//    $active    표시 여부 (필수)
//    $outer     true — 큰 링 / 생략 — 작은 링
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"

export const GradLine = styled.div`
  height: 1px;
  flex-shrink: 0;
  ${({ $width }) => ($width ? `width: ${$width};` : `flex: 1;`)}
  background: ${({ $color, $dir }) =>
    $dir === "left"
      ? `linear-gradient(90deg, transparent, ${$color})`
      : `linear-gradient(90deg, ${$color}, transparent)`};

  @media (max-width: ${T.bp.mini}) {
    ${({ $hideMini }) => $hideMini && `display: none;`}
  }
`

export function AccentLabelRow({
  children,
  color,
  lineWidth = "28px",
  gap = T.spacing[12],
  hideMini = false,
  ...props
}) {
  return (
    <LabelRow $gap={gap} {...props}>
      <GradLine $color={color} $dir="left" $width={lineWidth} $hideMini={hideMini} />
      {children}
      <GradLine $color={color} $dir="right" $width={lineWidth} $hideMini={hideMini} />
    </LabelRow>
  )
}

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ $gap }) => $gap};
  width: 100%;
`

export const Shimmer = styled.div`
  position: absolute;
  left: 12%;
  right: 12%;
  height: 2px;
  border-radius: 2px;
  filter: blur(0.75px);
  pointer-events: none;
  z-index: 11;
  transition: opacity ${T.transition.mid};
  opacity: ${({ $active }) => ($active === false ? 0 : 1)};
  background: ${({ $bg }) => $bg};
  ${({ $top }) => ($top ? "top: 0;" : "bottom: 0;")}
`

export const Ring = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  pointer-events: none;
  z-index: 2;
  transition:
    opacity ${T.transition.mid},
    width ${T.transition.mid},
    height ${T.transition.mid},
    top ${T.transition.mid},
    left ${T.transition.mid};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  border-color: ${({ $color, $outer }) => alpha($color, $outer ? 0.28 : 0.2)};

  ${({ $outer }) =>
    $outer
      ? `width: clamp(152px, calc(10.75vw + 100px), 238px);
         height: clamp(152px, calc(10.75vw + 100px), 238px);
         top: calc(50% - clamp(76px, calc(5.375vw + 50px), 119px));
         left: calc(50% - clamp(76px, calc(5.375vw + 50px), 119px));`
      : `width: clamp(126px, calc(9.25vw + 82px), 200px);
         height: clamp(126px, calc(9.25vw + 82px), 200px);
         top: calc(50% - clamp(63px, calc(4.625vw + 41px), 100px));
         left: calc(50% - clamp(63px, calc(4.625vw + 41px), 100px));`}

  @media (max-width: ${T.bp.mini}) {
    opacity: ${({ $active }) => ($active ? 0.6 : 0)};
  }
`
