import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import { flexCol } from "@/styles/mixins"
export default function RouteLoader({ label = "페이지 로딩중..." }) {
  return (
    <Loader role="status" aria-live="polite" aria-label={label}>
      <Spinner aria-hidden="true" />
      <Eyebrow>HWASEONG NIGHT</Eyebrow>
      <Text>{label}</Text>
    </Loader>
  )
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  min-height: 100dvh;
  padding: ${T.spacing[32]} ${T.pagePad};
  ${flexCol()}
  align-items: center;
  justify-content: center;
  text-align: center;
  background:
    linear-gradient(180deg, ${alpha(T.pink, 0.06)} 0%, transparent 34%),
    linear-gradient(0deg, ${alpha(T.violet, 0.05)} 0%, transparent 42%), ${T.bgBase};
  color: ${T.main};
`

const Spinner = styled.span`
  width: clamp(58px, 9vw, 76px);
  height: clamp(58px, 9vw, 76px);
  margin-bottom: ${T.spacing[24]};
  border-radius: 50%;
  background:
    conic-gradient(
      from 220deg,
      transparent 0deg 248deg,
      ${alpha(T.pink, 0.08)} 262deg,
      ${T.pink} 286deg,
      ${T.amber} 318deg,
      ${alpha(T.amber, 0.08)} 334deg,
      transparent 348deg 360deg
    ),
    ${alpha(T.main, 0.1)};
  mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
  filter: drop-shadow(0 0 8px ${alpha(T.pink, 0.38)});
  animation: ${spin} 0.95s linear infinite;

  @media (max-width: ${T.bp.mini}) {
    margin-bottom: ${T.spacing[20]};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Eyebrow = styled.span`
  display: block;
  margin-bottom: ${T.spacing[8]};
  font-size: ${T.fontSize.xxs};
  font-weight: 700;
  letter-spacing: 3px;
  color: ${alpha(T.main, 0.48)};

  @media (max-width: ${T.bp.mini}) {
    letter-spacing: 2px;
  }
`

const Text = styled.span`
  display: block;
  font-size: ${T.fontSize.smFluid};
  font-weight: 600;
  color: ${alpha(T.main, 0.86)};
`
