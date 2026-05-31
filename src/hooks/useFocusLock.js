import { useEffect, useRef } from "react"

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",")

const getFocusable = (root) =>
  root
    ? Array.from(root.querySelectorAll(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      )
    : []

let lockCount = 0
let locked = []

const lockScroll = () => {
  if (lockCount++ > 0) return
  locked = [document.body, document.querySelector("main")]
    .filter(Boolean)
    .map((el) => ({ el, overflow: el.style.overflow }))
  locked.forEach(({ el }) => {
    el.style.overflow = "hidden"
  })
}

const unlockScroll = () => {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount > 0) return
  locked.forEach(({ el, overflow }) => {
    el.style.overflow = overflow
  })
  locked = []
}

export function useFocusLock(
  active,
  { containerRef, focusRef, onClose, trapTab = true, scrollLock = true } = {}
) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!active) return
    const prevFocus = document.activeElement
    if (scrollLock) lockScroll()

    const onKey = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current?.()
        return
      }
      if (!trapTab || e.key !== "Tab") return

      const root = containerRef?.current ?? focusRef?.current?.closest("[role='dialog']")
      const focusables = getFocusable(root)
      if (focusables.length === 0) {
        e.preventDefault()
        focusRef?.current?.focus()
        return
      }

      const first = focusables[0]
      const last = focusables.at(-1)
      const current = document.activeElement
      if (
        e.shiftKey
          ? current === first || !root?.contains(current)
          : current === last || !root?.contains(current)
      ) {
        e.preventDefault()
        ;(e.shiftKey ? last : first).focus()
      }
    }

    document.addEventListener("keydown", onKey)
    const rafId = requestAnimationFrame(() => {
      ;(focusRef?.current ?? getFocusable(containerRef?.current)[0])?.focus?.()
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("keydown", onKey)
      if (scrollLock) unlockScroll()
      if (prevFocus instanceof HTMLElement && document.contains(prevFocus)) prevFocus.focus()
    }
  }, [active, containerRef, focusRef, scrollLock, trapTab])
}
