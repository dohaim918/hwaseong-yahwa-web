// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SVG 아이콘 모음

//  공통 props:
//    size  — width & height (px, 기본값: 24)
//    color — stroke / fill 색상 (기본값: "currentColor")
//    ...rest — SVG 속성 전달 (className, style, onClick 등)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function StarIcon({ size = 14, color = "currentColor", opacity = 1, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" {...rest}>
      <path
        d="M7 0L8.16 5.84L14 7L8.16 8.16L7 14L5.84 8.16L0 7L5.84 5.84L7 0Z"
        fill={color}
        opacity={opacity}
      />
    </svg>
  )
}

export function CloseIcon({ size = 24, color = "currentColor", ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 18, color = "currentColor", ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M3.5 9H13.2"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 5.2L13.5 9L9.7 12.8"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
