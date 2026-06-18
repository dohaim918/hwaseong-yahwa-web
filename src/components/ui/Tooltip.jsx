// 아이콘(children) + 팝오버(content) 툴팁.
// 호버 / 포커스 / ESC 자동 처리, △ 꼬리, 호버 브리지로 마우스 이동 중 닫힘 방지.

import { useId, useState } from "react"
import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { focusRing, glass } from "@/styles/mixins"
export default function Tooltip({ accent, content, ariaLabel, children }) {
  const [open, setOpen] = useState(false)
  const popId = useId()
  const show = () => setOpen(true)
  const hide = () => setOpen(false)
  const onKey = (e) => {
    if (e.key === "Escape" && open) {
      e.stopPropagation()
      hide()
    }
  }

  return (
    <Wrap onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} onKeyDown={onKey}>
      <Trigger
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-describedby={open ? popId : undefined}
        $accent={accent}
      >
        {children}
      </Trigger>
      {open && (
        <Pop id={popId} role="tooltip" $accent={accent}>
          {content}
        </Pop>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  display: inline-flex;
`

const Trigger = styled.button`
  display: inline-grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: ${T.radius.full};
  background: ${alpha(T.bgDark, 0.4)};
  color: ${({ $accent }) => $accent};
  transition:
    background ${T.transition.fast},
    border ${T.transition.fast};
  ${({ $accent }) => focusRing(alpha($accent, 0.7), T.radius.full)}

  &:hover,
  &[aria-expanded="true"] {
    background: ${({ $accent }) => accentFill($accent)};
    border: 1px solid ${({ $accent }) => alpha($accent, 0.4)};
  }
`

// 팝오버 — 버튼 아래 좌측정렬, △ 꼬리, 호버 브리지
const Pop = styled.div`
  position: absolute;
  top: calc(100% + ${T.spacing[8]});
  left: -10px;
  z-index: 20;
  min-width: 150px;
  max-width: 230px;
  padding: ${T.spacing[12]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.4)};
  border-radius: ${T.radius.md};
  background: linear-gradient(180deg, ${alpha(T.bgCard, 0.97)}, ${alpha(T.bgBase, 0.98)});
  ${glass("10px")}
  box-shadow: 0 12px 32px ${alpha(T.bgDark, 0.5)};
  text-align: left;
  animation: fadeIn ${T.transition.fast} both;
  outline: none;

  /* △ 꼬리 — 트리거(22px) 중앙을 가리키도록 정렬 */
  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 14px;
    width: 9px;
    height: 9px;
    background: ${alpha(T.bgCard, 0.97)};
    border-left: 1px solid ${({ $accent }) => alpha($accent, 0.4)};
    border-top: 1px solid ${({ $accent }) => alpha($accent, 0.4)};
    transform: rotate(45deg);
  }

  /* 버튼↔팝오버 사이 투명 브리지 — 호버 이동 중 닫힘 방지 */
  &::after {
    content: "";
    position: absolute;
    top: calc(-1 * ${T.spacing[8]});
    left: 0;
    right: 0;
    height: ${T.spacing[8]};
  }
`
