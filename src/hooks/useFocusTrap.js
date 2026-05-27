import { useEffect } from "react"

export function useFocusTrap(active, { onClose, focusRef, trapTab = false } = {}) {
  useEffect(() => {
    if (!active) return
    const prevFocus = document.activeElement
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.()
      if (trapTab && e.key === "Tab") {
        e.preventDefault()
        focusRef?.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    const rafId = requestAnimationFrame(() => focusRef?.current?.focus())
    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("keydown", onKey)
      prevFocus?.focus?.()
    }
  }, [active, onClose, focusRef, trapTab])
}
