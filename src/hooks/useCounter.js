import { useState, useEffect } from "react"

/* ──────────────────────────────────────
   useCounter — 슬롯머신 스크램블 → 잠금 효과
   active === true 가 되면:
     1. 랜덤 숫자를 50ms 간격으로 교체 (스크램블)
     2. lockDelay ms 후 target 값으로 고정 (잠금)

   사용:
     const c = useCounter(23, 1800, animIn)
     <span>{c}</span>
────────────────────────────────────── */
export function useCounter(target, lockDelay = 1800, active = false) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) return

    const digits = target.toString().length
    const min = digits === 1 ? 0 : Math.pow(10, digits - 1)
    const max = Math.pow(10, digits) - 1

    const scrambleId = setInterval(() => {
      setVal(Math.floor(Math.random() * (max - min + 1)) + min)
    }, 50)

    const lockId = setTimeout(() => {
      clearInterval(scrambleId)
      setVal(target)
    }, lockDelay)

    return () => {
      clearInterval(scrambleId)
      clearTimeout(lockId)
    }
  }, [active, target, lockDelay])

  return val
}
