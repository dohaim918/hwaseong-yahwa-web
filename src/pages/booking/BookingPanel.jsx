/* eslint-disable react-refresh/only-export-components */
import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { flexCol, flexRow, focusRing } from "@/styles/mixins"
export function BookingPanel({
  title,
  titleId,
  children,
  gap = T.spacing[16],
  padding = `clamp(${T.spacing[20]}, 2vw, ${T.spacing[24]})`,
  className,
  ...props
}) {
  return (
    <PanelRoot $gap={gap} $padding={padding} className={className} {...props}>
      {title && <BookingPanelTitle id={titleId}>{title}</BookingPanelTitle>}
      {children}
    </PanelRoot>
  )
}

export function BookingSplit({ cols, children, className }) {
  return (
    <SplitRoot $cols={cols} className={className}>
      {children}
    </SplitRoot>
  )
}

// 세로 스택 컬럼 — Step2/3/4 의 Left/Right 래퍼 공용 (기본 gap 16)
export const BookingStack = styled.div`
  ${({ $gap = T.spacing[16] }) => flexCol($gap)}
`

export function BookingPanelTitle({ children, className, ...props }) {
  return (
    <PanelTitleRoot className={className} {...props}>
      {children}
    </PanelTitleRoot>
  )
}

export function BookingNote({ children, className, ...props }) {
  return (
    <NoteRoot className={className} {...props}>
      {children}
    </NoteRoot>
  )
}

export function BookingFieldError({ accent = T.pink, children, className, ...props }) {
  return (
    <FieldErrorRoot $accent={accent} className={className} {...props}>
      {children}
    </FieldErrorRoot>
  )
}

export function BookingCallout({
  as,
  accent = T.pink,
  active = false,
  center = false,
  stack = false,
  tone = "accent",
  children,
  className,
  ...props
}) {
  const Element = as ?? "div"

  return (
    <CalloutRoot
      as={Element}
      $accent={accent}
      $active={active}
      $center={center}
      $interactive={Element === "button" || Boolean(props.onClick)}
      $stack={stack}
      $tone={tone}
      className={className}
      {...props}
    >
      {children}
    </CalloutRoot>
  )
}

const PanelRoot = styled.div`
  ${({ $gap }) => flexCol($gap)}
  padding: ${({ $padding }) => $padding};
  background: ${T.bgCard};
  border: 1px solid ${alpha(T.white, 0.07)};
  border-radius: ${T.radius.xl};
`

const PanelTitleRoot = styled.h3`
  font-size: ${T.fontSize.sm};
  font-weight: 700;
  color: ${T.main};
`

const SplitRoot = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols ?? "minmax(0, 1.4fr) minmax(0, 1fr)"};
  gap: clamp(${T.spacing[20]}, 2.5vw, ${T.spacing[36]});
  align-items: start;

  /* 태블릿(768~1024)은 2열 유지 → 풀폭 과확장 방지 / 모바일에서만 스택 */
  @media (max-width: ${T.bp.mobile}) {
    grid-template-columns: 1fr;
    gap: ${T.spacing[24]};
  }
`

const toneColor = (tone, accent) => (tone === "success" ? T.emerald : accent)

const CalloutRoot = styled.div`
  ${({ $stack }) => ($stack ? flexCol(T.spacing[6]) : flexRow(T.spacing[8]))}
  align-items: ${({ $center, $stack }) =>
    $stack ? ($center ? "center" : "flex-start") : "center"};
  justify-content: ${({ $center }) => ($center ? "center" : "flex-start")};
  width: 100%;
  padding: ${T.spacing[16]} ${T.spacing[20]};
  border-radius: ${T.radius.lg};
  text-align: ${({ $center }) => ($center ? "center" : "left")};
  font-size: ${T.fontSize.xs};
  line-height: 1.5;
  color: ${({ $tone }) => ($tone === "success" ? alpha(T.emerald, 0.95) : T.sub)};
  background: ${({ $accent, $active, $tone }) =>
    alpha(toneColor($tone, $accent), $active ? 0.08 : 0.04)};
  border: 1px solid
    ${({ $accent, $active, $tone }) => alpha(toneColor($tone, $accent), $active ? 0.25 : 0.18)};
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast},
    color ${T.transition.fast};

  ${({ $interactive, $accent }) =>
    $interactive
      ? `
        cursor: pointer;

        &:hover:not(:disabled) {
          color: ${T.main};
          border-color: ${alpha($accent, 0.45)};
          background: ${accentFill($accent)};
        }

        ${focusRing(alpha($accent, 0.7), T.radius.lg)}
      `
      : ""}
`

const NoteRoot = styled.p`
  font-size: ${T.fontSize.xs};
  line-height: 1.5;
  color: ${T.sub};
`

const FieldErrorRoot = styled.p`
  position: absolute;
  top: calc(100% + ${T.spacing[6]});
  left: 0;
  z-index: 1;
  max-width: 100%;
  text-align: left;
  font-size: ${T.fontSize.xxs};
  line-height: 1.5;
  color: ${({ $accent }) => $accent ?? T.pink};
  pointer-events: none;
`
