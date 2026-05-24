// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  현재 뷰포트가 어느 브레이크포인트인지 반환
//  T.bp 기준 (max-width / 데스크탑 우선)
//
//  useMediaQuery 같은 라이브러리도 있지만, 간단한 로직은 직접 구현해도 충분할 듯
//  (특히 SSR 환경에서 초기값 처리 때문에 라이브러리 사용이 오히려 번거로울 수 있음)
//  ✦ 언제 @media 쿼리를 쓰고 언제 이 훅을 쓰나?
//
//  @media 쿼리 → CSS(스타일)만 바뀌는 경우
//  스타일만 바뀜 → @media 쿼리
// ─────────────────────────────────────
//  useResponsive → JS 로직이 바뀌는 경우
//  컴포넌트 자체 교체 → useResponsive
//  데이터/로직 교체  → useResponsive
//  조건부 렌더링    → useResponsive
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { useEffect, useState } from "react"
import { T } from "@/styles/theme"

const KEYS = ["mini", "mobile", "tablet"]
const BPS = [T.bp.mini, T.bp.mobile, T.bp.tablet]

const getCurrent = () => {
  if (typeof window === "undefined") return "desktop"
  return KEYS.find((_, i) => window.matchMedia(`(max-width: ${BPS[i]})`).matches) ?? "desktop"
}

export function useResponsive() {
  const [current, setCurrent] = useState(getCurrent)

  useEffect(() => {
    const mqs = BPS.map((bp) => window.matchMedia(`(max-width: ${bp})`))
    const update = () => setCurrent(getCurrent())
    mqs.forEach((mq) => mq.addEventListener("change", update))
    return () => mqs.forEach((mq) => mq.removeEventListener("change", update))
  }, [])

  return {
    current,
    isMini: current === "mini",
    isMobile: current === "mobile",
    isTablet: current === "tablet",
    isDesktop: current === "desktop",
    isMobileOrTablet: current !== "desktop",
    isMobileOrSmaller: current === "mobile" || current === "mini",
  }
}
