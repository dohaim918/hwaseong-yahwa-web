// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  SVG 아이콘 모음

//  공통 props:
//    size  — width & height (px, 기본값: 24)
//    color — stroke / fill 색상 (기본값: "currentColor")
//    ...rest — SVG 속성 전달 (className, style, onClick 등)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function CloseIcon({ size = 24, color = "currentColor", ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <line x1="4" y1="4" x2="20" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="4" x2="4" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
