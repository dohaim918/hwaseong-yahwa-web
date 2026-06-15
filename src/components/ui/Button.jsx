// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    variant  — 'gradient' | 'outline'  (기본: gradient)
//    size     — 'sm' | 'md' | 'lg'      (기본: md)
//    accent   — night 색 (T.pink/amber/emerald/violet) — gradient 는 buttonGrad(accent) 로 파생 (기본: T.pink)
//    gradient — 풀 그라디언트 문자열 직접 지정 (예외 디자인용 탈출구)
//    bordered — gradient 버튼에 테두리 추가
//    radius   — border-radius 오버라이드 (기본: T.radius.pill)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, focusRing, buttonGrad } from "@/styles/theme"

export default function Button({
  as,
  variant = "gradient",
  size = "md",
  accent = T.pink,
  gradient,
  bordered,
  radius,
  type = "button",
  onClick,
  disabled = false,
  children,
  ...props
}) {
  return (
    <StyledBtn
      as={as}
      $variant={variant}
      $size={size}
      $accent={accent}
      $gradient={gradient}
      $bordered={bordered}
      $radius={radius}
      type={as ? undefined : type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledBtn>
  )
}

const SIZE = {
  sm: {
    height: "36px",
    padding: `0 ${T.spacing[20]}`,
    fontSize: T.fontSize.xs,
    radius: T.radius.pill,
    letterSpacing: "1px",
    shadow: (c) => `0 0 16px ${alpha(c, 0.27)}`,
    shadowHover: (c) => `0 0 18px ${alpha(c, 0.55)}`,
    mobile: { height: "32px", padding: `0 ${T.spacing[16]}` },
    mini: { height: "32px", padding: `0 ${T.spacing[12]}`, fontSize: T.fontSize.xxs },
  },
  md: {
    height: "42px",
    padding: `0 ${T.spacing[24]}`,
    fontSize: T.fontSize.sm,
    radius: T.radius.pill,
    letterSpacing: "0.5px",
    shadow: (c) => `0 0 20px ${alpha(c, 0.3)}`,
    shadowHover: (c) => `0 0 22px ${alpha(c, 0.55)}`,
    mobile: { height: "38px", padding: `0 ${T.spacing[20]}`, fontSize: T.fontSize.xs },
    mini: { height: "34px", padding: `0 ${T.spacing[16]}`, fontSize: T.fontSize.xxs },
  },
  lg: {
    height: "46px",
    padding: `0 ${T.spacing[36]}`,
    fontSize: T.fontSize.xs,
    radius: T.radius.pill,
    letterSpacing: "1.5px",
    shadow: (c) => `0 0 24px ${alpha(c, 0.35)}`,
    shadowHover: (c) => `0 0 28px ${alpha(c, 0.55)}`,
    mobile: { height: "42px", padding: `0 ${T.spacing[24]}` },
    mini: { height: "36px", padding: `0 ${T.spacing[20]}`, fontSize: T.fontSize.xxs },
  },
}

const r = (size, bp, key) => SIZE[size][bp]?.[key] ?? SIZE[size][key]

// $ prefix transient prop 은 emotion(styled DOM 태그)이 자동으로 DOM 전달에서 제외
const StyledBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${T.spacing[6]};
  white-space: nowrap;
  font-weight: 700;
  border: none;
  outline: none;
  /* fast: filter/opacity/transform · mid: box-shadow/사이즈군 · slow: background */
  transition:
    filter ${T.transition.fast},
    opacity ${T.transition.fast},
    transform ${T.transition.fast},
    box-shadow ${T.transition.mid},
    border-radius ${T.transition.mid},
    height ${T.transition.mid},
    padding ${T.transition.mid},
    font-size ${T.transition.mid},
    background ${T.transition.slow};

  svg {
    display: block;
    width: 1em;
    height: 1em;
    flex-shrink: 0;
  }

  height: ${({ $size }) => SIZE[$size].height};
  padding: ${({ $size }) => SIZE[$size].padding};
  font-size: ${({ $size }) => SIZE[$size].fontSize};
  border-radius: ${({ $radius, $size }) => $radius ?? SIZE[$size].radius};
  letter-spacing: ${({ $size }) => SIZE[$size].letterSpacing};

  /* ── gradient ── */
  ${({ $variant, $accent, $size, $gradient, $bordered }) =>
    $variant === "gradient" &&
    `
    color: ${T.white};
    filter: brightness(1);
    background: ${$gradient ?? buttonGrad($accent)};
    box-shadow: ${SIZE[$size].shadow($accent)};
    ${$bordered ? `border: 1.5px solid ${alpha($accent, 0.4)};` : ""}

    &:hover:not(:disabled) {
      filter: brightness(1.15);
      box-shadow: ${SIZE[$size].shadowHover($accent)};
    }
    &:active:not(:disabled) {
      filter: brightness(0.95);
      transform: scale(0.96);
    }
  `}

  /* ── outline ── */
  ${({ $variant, $accent, $size }) =>
    $variant === "outline" &&
    `
    color: ${$accent};
    background:
      linear-gradient(135deg, ${alpha($accent, 0.1)}, ${alpha($accent, 0.05)}),
      ${alpha(T.bgDark, 0.8)};
    border: 1.5px solid ${$accent};
    box-shadow: ${SIZE[$size].shadow($accent)};

    &:hover:not(:disabled) {
      background:
        linear-gradient(135deg, ${alpha($accent, 0.25)}, ${alpha($accent, 0.15)}),
        ${alpha(T.bgDark, 0.8)};
      box-shadow: ${SIZE[$size].shadowHover($accent)};
    }
    &:active:not(:disabled) {
      background:
        linear-gradient(135deg, ${alpha($accent, 0.2)}, ${alpha($accent, 0.1)}),
        ${alpha(T.bgDark, 0.8)};
      transform: scale(0.96);
    }
  `}

  &:disabled {
    opacity: 0.4;
  }

  ${({ $accent, $radius, $size }) => focusRing(alpha($accent, 0.7), $radius ?? SIZE[$size].radius)}

  @media (max-width: ${T.bp.mobile}) {
    height: ${({ $size }) => r($size, "mobile", "height")};
    padding: ${({ $size }) => r($size, "mobile", "padding")};
    font-size: ${({ $size }) => r($size, "mobile", "fontSize")};
  }

  @media (max-width: ${T.bp.mini}) {
    height: ${({ $size }) => r($size, "mini", "height")};
    padding: ${({ $size }) => r($size, "mini", "padding")};
    font-size: ${({ $size }) => r($size, "mini", "fontSize")};
  }
`
