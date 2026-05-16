import styled from "@emotion/styled"

// 텍스트 일부에만 gradient 적용하는 span
// g: textGrad() / NIGHT_STYLE[n].textGrad / GRADIENT.xxx
// 사용: <GradSpan g={NIGHT_STYLE[1].textGrad}>빛의 흔적</GradSpan>
export const GradSpan = styled("span", {
  shouldForwardProp: (prop) => prop !== "g",
})`
  ${({ g }) => g}
`
