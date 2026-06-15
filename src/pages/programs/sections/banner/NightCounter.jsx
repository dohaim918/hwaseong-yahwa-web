// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NightCounter  —  배너 우하단 카운터 + 인용구
//  ────────────────────────────────────────────────────────────
//  ‹ 01 / 04 ›  +  인용구(prefix + accent + rest)
//
//  · 화살표 : ChevronIcon (44px, mini 36px). 1야 ‹ / 4야 › disabled
//  · 숫자   : Noto Serif KR — 현재 56px accent / "/" 32px / 총합 36px white39%
//  · 인용구 : serif 16px, accent 강조 + white39% 평문, 중앙 정렬
//
//  props:
//    currentId / total / counterNum / quote / accent / onPrev / onNext
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import styled from "@emotion/styled"
import { T, alpha, pad2, focusRing, serif, flexCol, flexRow } from "@/styles/theme"
import { ChevronIcon } from "@/components/ui/icons"
import { SrOnly } from "@/components/ui/Deco"

export default function NightCounter({
  currentId,
  total = 4,
  counterNum,
  quote = {},
  accent,
  onPrev,
  onNext,
}) {
  const { prefix = "", accent: accentText = "", rest = "" } = quote
  const isFirst = currentId <= 1
  const isLast = currentId >= total

  // 마지막 자리 릴에 쌓을 숫자들 (1 ~ total)
  const reelDigits = Array.from({ length: total }, (_, i) => i + 1)
  const fixedPrefix = counterNum.slice(0, -1) // 앞자리("0") 고정

  return (
    <Counter>
      <CounterRow>
        <Arrow
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          $accent={accent}
          aria-label="이전 야"
        >
          <ChevronIcon size={44} dir="left" strokeWidth={1.5} />
        </Arrow>
        <Nums>
          <CurNum $accent={accent}>
            {/* 앞자리("0")는 고정, 마지막 자리만 릴(odometer)로 굴림 */}
            {fixedPrefix}
            <Reel aria-hidden="true">
              <ReelTrack style={{ transform: `translateY(${-(currentId - 1)}em)` }}>
                {reelDigits.map((d) => (
                  <ReelCell key={d}>{d}</ReelCell>
                ))}
              </ReelTrack>
            </Reel>
            {/* 스크린리더용 실제 값 */}
            <SrOnly>{counterNum}</SrOnly>
          </CurNum>
          <Slash>/</Slash>
          <TotalNum>{pad2(total)}</TotalNum>
        </Nums>
        <Arrow
          type="button"
          onClick={onNext}
          disabled={isLast}
          $accent={accent}
          aria-label="다음 야"
        >
          <ChevronIcon size={44} strokeWidth={1.5} />
        </Arrow>
      </CounterRow>

      <Quote key={counterNum}>
        {prefix}
        {accentText && <QAccent $accent={accent}>{accentText}</QAccent>}
        {rest}
      </Quote>
    </Counter>
  )
}

// ─────────────────────────────────────────────────────────────

const Counter = styled.div`
  ${flexCol(T.spacing[16])}
  align-items: center;
`

const CounterRow = styled.div`
  ${flexRow(T.spacing[16], "flex-end")}
`

const Arrow = styled.button`
  ${flexRow()}
  width: 44px;
  height: 48px;
  padding-top: ${T.spacing[4]};
  justify-content: center;
  color: ${alpha(T.white, 0.39)};
  transition:
    color ${T.transition.fast},
    transform ${T.transition.fast},
    width ${T.transition.mid},
    height ${T.transition.mid};

  svg {
    transition:
      width ${T.transition.mid},
      height ${T.transition.mid};
  }

  &:hover:not(:disabled) {
    color: ${({ $accent }) => $accent};
    transform: scale(1.15);
  }

  ${({ $accent }) => focusRing(alpha($accent, 0.7))}

  &:disabled {
    opacity: 0.25;
    cursor: default;
  }

  @media (max-width: ${T.bp.mini}) {
    width: 40px;
    height: 40px;

    svg {
      width: ${T.spacing[36]};
      height: ${T.spacing[36]};
    }
  }
`

const Nums = styled.div`
  ${flexRow(T.spacing[16], "flex-end")}
`

const CurNum = styled.span`
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  height: 1em;
  ${serif(700)}
  font-size: 56px;
  line-height: 1;
  letter-spacing: 2.24px;
  color: ${({ $accent }) => $accent};
  transition:
    color ${T.transition.slow},
    font-size ${T.transition.mid},
    height ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: 44px;
  }

  @media (max-width: ${T.bp.mini}) {
    font-size: 38px;
  }
`

// 릴 뷰포트 — 한 글자 높이만 보이고 나머지는 잘라냄
const Reel = styled.span`
  display: inline-block;
  overflow: hidden;
  height: 1em;
  vertical-align: bottom;
`

// 릴 트랙 — 1·2·3·4를 세로로 쌓아두고 translateY 로 굴림
const ReelTrack = styled.span`
  ${flexCol()}
  will-change: transform;
  transition: transform ${T.transition.spring};
`

const ReelCell = styled.span`
  display: block;
  height: 1em;
  line-height: 1;
`

const Slash = styled.span`
  ${serif(900)}
  font-size: 32px;
  color: ${alpha(T.white, 0.39)};
  line-height: 1;
  letter-spacing: 1.28px;
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: 26px;
  }
`

const TotalNum = styled.span`
  ${serif(700)}
  font-size: 36px;
  color: ${alpha(T.white, 0.39)};
  line-height: 1;
  letter-spacing: 1.44px;
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mobile}) {
    font-size: 28px;
  }
`

const Quote = styled.p`
  ${serif(400)}
  font-size: ${T.fontSize.sm};
  color: ${alpha(T.white, 0.39)};
  letter-spacing: 0.02em;
  text-align: center;
  word-break: keep-all;
  animation: fadeIn ${T.transition.slow} both;
  transition: font-size ${T.transition.mid};

  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`

const QAccent = styled.span`
  color: ${({ $accent }) => $accent};
  font-weight: 600;
  transition: color ${T.transition.slow};
`
