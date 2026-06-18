// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  props:
//    variant  — 'gradient' | 'outline'  (기본: gradient)
//    size     — 'sm' | 'md' | 'lg'      (기본: md)
//    accent   — night 색 (T.pink/amber/emerald/violet) — gradient 는 buttonGrad(accent) 로 파생 (기본: T.pink)
//    gradient — 풀 그라디언트 문자열 직접 지정 (예외 디자인용 탈출구)
//    bordered — gradient 버튼에 테두리 추가
//    iconMotion — 'right' | 'left'  (기본: right)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, buttonGrad, outlineFill } from "@/styles/theme"
import { focusRing, hoverLastIconX } from "@/styles/mixins"
export default function Button({
  as,
  variant = "gradient",
  size = "md",
  accent = T.pink,
  gradient,
  bordered,
  iconMotion = "right",
  type = "button",
  onClick,
  disabled = false,
  children,
  ...props
}) {
  const disabledLinkProps = as && disabled ? { "aria-disabled": true, tabIndex: -1 } : {}
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault()
      e.stopPropagation()
      return
    }
    onClick?.(e)
  }

  return (
    <StyledBtn
      as={as}
      $variant={variant}
      $size={size}
      $accent={accent}
      $gradient={gradient}
      $bordered={bordered}
      $iconMotion={iconMotion}
      type={as ? undefined : type}
      onClick={handleClick}
      disabled={as ? undefined : disabled}
      {...props}
      {...disabledLinkProps}
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

// $ transient prop 차단(as={Link} 로 Link 렌더 시 $variant 등의 DOM 누수 방지)
// ⚠️ as 는 반드시 제외(forward 금지). as 를 forward 하면 emotion 엘리먼트 교체가 깨져
//    <a> 대신 <button as="[object Object]"> 로 렌더 → to 가 href 가 안 돼 라우팅 먹통.
const StyledBtn = styled("button", {
  shouldForwardProp: (prop) => !String(prop).startsWith("$") && prop !== "as",
})`
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

  ${({ $iconMotion }) => hoverLastIconX($iconMotion)}

  height: ${({ $size }) => SIZE[$size].height};
  padding: ${({ $size }) => SIZE[$size].padding};
  font-size: ${({ $size }) => SIZE[$size].fontSize};
  border-radius: ${({ $size }) => SIZE[$size].radius};
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
    background: ${outlineFill($accent, 0.1, 0.05)};
    border: 1.5px solid ${$accent};
    box-shadow: ${SIZE[$size].shadow($accent)};

    &:hover:not(:disabled) {
      background: ${outlineFill($accent)};
      box-shadow: ${SIZE[$size].shadowHover($accent)};
    }
    &:active:not(:disabled) {
      background: ${outlineFill($accent, 0.2, 0.1)};
      transform: scale(0.96);
    }
  `}

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.4;
    pointer-events: none;
  }

  ${({ $accent, $size }) => focusRing(alpha($accent, 0.7), SIZE[$size].radius)}

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
