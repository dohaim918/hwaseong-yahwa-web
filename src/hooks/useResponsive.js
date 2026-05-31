import { useSyncExternalStore } from "react"
import { T } from "@/styles/theme"

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  useMediaQuery — matchMedia 공유 구독
//  ────────────────────────────────────
//  같은 query 는 브라우저 리스너 하나만 만들고
//  여러 컴포넌트가 결과를 함께 구독한다.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const stores = new Map()

const createStore = (query) => {
  let mq = null
  const listeners = new Set()
  const getMq = () => {
    if (typeof window === "undefined") return null
    mq ??= window.matchMedia(query)
    return mq
  }
  const notify = () => listeners.forEach((listener) => listener())

  return {
    subscribe(listener) {
      const media = getMq()
      listeners.add(listener)
      if (listeners.size === 1) media?.addEventListener("change", notify)
      return () => {
        listeners.delete(listener)
        if (listeners.size === 0) media?.removeEventListener("change", notify)
      }
    },
    getSnapshot: () => getMq()?.matches ?? false,
    getServerSnapshot: () => false,
  }
}

const getStore = (query) => {
  if (!stores.has(query)) stores.set(query, createStore(query))
  return stores.get(query)
}

export function useMediaQuery(query) {
  const store = getStore(query)
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)
}

// ── 자주 쓰는 쿼리 단축
export const useReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)")

export const useFinePointer = () => useMediaQuery("(pointer: fine)")

// ── JS 분기가 필요한 반응형 정보
const BPS = [
  { key: "mini", query: `(max-width: ${T.bp.mini})` },
  { key: "mobile", query: `(max-width: ${T.bp.mobile})` },
  { key: "tablet", query: `(max-width: ${T.bp.tablet})` },
]

export function useResponsive() {
  const isMiniMax = useMediaQuery(BPS[0].query)
  const isMobileMax = useMediaQuery(BPS[1].query)
  const isTabletMax = useMediaQuery(BPS[2].query)
  const current = isMiniMax ? "mini" : isMobileMax ? "mobile" : isTabletMax ? "tablet" : "desktop"

  return {
    current,
    isMini: current === "mini",
    isMobile: current === "mobile",
    isTablet: current === "tablet",
    isDesktop: current === "desktop",
    isMobileOrTablet: current !== "desktop",
    isSmall: current === "mini" || current === "mobile",
  }
}
