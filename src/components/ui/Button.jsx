// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  Button — 공용 버튼 컴포넌트
//
//  props:
//    variant  — 'gradient' | 'outline'  (기본: gradient)
//    size     — 'sm' | 'md' | 'lg'      (기본: md)
//    accent   — 색상값 (기본: T.pink)
//               gradient: NIGHT_STYLE[n].grad 문자열도 가능
//    onClick  — 클릭 핸들러
//    disabled — 비활성
//    children — 버튼 텍스트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"

export default function Button({
  variant = "gradient",
  size = "md",
  accent = T.pink,
  type = "button",
  onClick,
  disabled = false,
  children,
  ...props
}) {
  return (
    <StyledBtn
      $variant={variant}
      $size={size}
      $accent={accent}
      type={type}
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
    padding: `${T.spacing[8]} ${T.spacing[20]}`,
    fontSize: T.fontSize.xs,
    radius: T.radius.xl,
    letterSpacing: "1px",
    shadow: (c) => `0 0 16px ${alpha(c, 0.27)}`,
    shadowHover: (c) => `0 0 28px ${alpha(c, 0.55)}`,
  },
  md: {
    padding: `${T.spacing[12]} ${T.spacing[24]}`,
    fontSize: T.fontSize.sm,
    radius: T.radius.xl,
    letterSpacing: "0.5px",
    shadow: (c) => `0 0 20px ${alpha(c, 0.3)}`,
    shadowHover: (c) => `0 0 32px ${alpha(c, 0.55)}`,
  },
  lg: {
    padding: `14px ${T.spacing[36]}`,
    fontSize: T.fontSize.xs,
    radius: T.radius.xl,
    letterSpacing: "1.5px",
    shadow: (c) => `0 0 24px ${alpha(c, 0.35)}`,
    shadowHover: (c) => `0 0 40px ${alpha(c, 0.55)}`,
  },
}

const StyledBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${T.spacing[6]};
  white-space: nowrap;
  font-family: ${T.fontSans};
  font-weight: 700;
  letter-spacing: 0.5px;
  border: none;
  outline: none;
  transition:
    filter ${T.transition.fast},
    box-shadow ${T.transition.mid},
    background ${T.transition.slow},
    opacity ${T.transition.fast};

  /* ── 사이즈 ── */
  padding: ${({ $size }) => SIZE[$size].padding};
  font-size: ${({ $size }) => SIZE[$size].fontSize};
  border-radius: ${({ $size }) => SIZE[$size].radius};
  letter-spacing: ${({ $size }) => SIZE[$size].letterSpacing};

  /* ── variant: gradient ── */
  ${({ $variant, $accent, $size }) =>
    $variant === "gradient" &&
    `
    color: ${T.white};
    background: linear-gradient(135deg, ${$accent}, ${alpha($accent, 0.55)});
    box-shadow: ${SIZE[$size].shadow($accent)};
    border: none;

    &:hover:not(:disabled) {
      filter: brightness(1.15);
      box-shadow: ${SIZE[$size].shadowHover($accent)};
    }

    &:active:not(:disabled) {
      filter: brightness(0.95);
      transform: scale(0.98);
    }
  `}

  /* ── variant: outline ── */
  ${({ $variant, $accent }) =>
    $variant === "outline" &&
    `
    color: ${$accent};
    background: ${alpha($accent, 0.05)};
    border: 1.5px solid ${$accent};
    box-shadow: none;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    &:hover:not(:disabled) {
      background: ${alpha($accent, 0.1)};
    }

    &:active:not(:disabled) {
      background: ${alpha($accent, 0.18)};
      transform: scale(0.98);
    }
  `}

  /* ── disabled ── */
  &:disabled {
    opacity: 0.4;
  }

  @media (max-width: ${T.bp.mobile}) {
    font-size: ${T.fontSize.xs};
    padding: ${T.spacing[8]} ${T.spacing[16]};
  }
`
