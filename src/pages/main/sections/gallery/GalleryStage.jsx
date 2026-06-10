import { useState } from "react"
import styled from "@emotion/styled"
import { T, alpha, revealUp } from "@/styles/theme"
import { ChevronIcon, ExpandIcon } from "@/components/ui/icons"

const RATIO = 1.78
const W_MAX = 787,
  W_MIN = 500
const HD = 1920,
  QHD = 2560
const DOT_ACTIVE_W = "22px"
const SIDE_OPACITY = [0.59, 0.32, 0.14]
const SIDE_OPACITY_HOVER = [0.78, 0.5, 0.28]

// 보더가 있는 글래스 버튼 표면 (화살표·VIEW SCENE 공유)
const borderGlass = (bAlpha, blur) => `
  background:${alpha(T.bgDark, 0.36)};
  border:1px solid ${alpha(T.violet, bAlpha)};
  backdrop-filter:blur(${blur});
  -webkit-backdrop-filter:blur(${blur});`
const glassHover = (bg, glow) => `
  background:${alpha(T.violet, bg)};
  border-color:${T.violet};
  box-shadow:0 0 16px ${alpha(T.violet, glow)};
  `

const getLoopIndexes = (active, total, dir) =>
  [1, 2, 3].map((offset) => (active + dir * offset + total) % total)

function SideStack({ images, side, indexes, animIn, onSelect }) {
  return (
    <SideStackWrap $side={side} $animIn={animIn}>
      {indexes.map((idx, i) => (
        <SideThumb
          key={`${side}-${idx}`}
          type="button"
          $order={i}
          onClick={() => onSelect(idx)}
          aria-label={images[idx].alt}
        >
          <SideImg src={images[idx].src} alt="" loading="lazy" />
        </SideThumb>
      ))}
    </SideStackWrap>
  )
}

function CenterViewer({
  images,
  active,
  prevSrc,
  animIn,
  viewSceneLabel,
  onPrev,
  onNext,
  onSelect,
  onViewScene,
}) {
  const activeItem = images[active]
  return (
    <CenterViewerWrap $animIn={animIn}>
      <CenterFrame role="region" aria-label="갤러리 캐러셀" $prevSrc={prevSrc}>
        <CenterImg key={active} src={activeItem.src} alt={activeItem.alt} loading="lazy" />
        <CenterBorder />
        <ArrowBtn type="button" $side="left" onClick={onPrev} aria-label="이전 이미지">
          <ChevronIcon dir="left" />
        </ArrowBtn>
        <ArrowBtn type="button" $side="right" onClick={onNext} aria-label="다음 이미지">
          <ChevronIcon dir="right" />
        </ArrowBtn>
        <ViewSceneBtn type="button" onClick={onViewScene}>
          <span>{viewSceneLabel}</span>
          <ExpandIcon />
        </ViewSceneBtn>
      </CenterFrame>

      <Dots>
        {images.map((_, i) => (
          <Dot
            key={i}
            type="button"
            $active={i === active}
            onClick={() => onSelect(i)}
            aria-current={i === active ? "true" : undefined}
            aria-label={`이미지 ${i + 1}`}
          />
        ))}
      </Dots>
    </CenterViewerWrap>
  )
}

export default function GalleryStage({ images, animIn, inView, viewSceneLabel, onViewScene }) {
  const total = images.length
  const [active, setActive] = useState(0)
  const [prevActive, setPrevActive] = useState(null)

  const goTo = (idx) => {
    setPrevActive(active)
    setActive(idx)
  }

  const onKeyDown = (e) => {
    if (!inView || e.target?.matches?.("input, textarea, select, [contenteditable='true']")) return
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo((active - 1 + total) % total)
    }
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo((active + 1) % total)
    }
  }

  // near → far 순 (렌더 순서 = opacity 순서)
  const leftIdx = getLoopIndexes(active, total, -1)
  const rightIdx = getLoopIndexes(active, total, 1)

  return (
    <Stage role="group" aria-label="갤러리 이미지 탐색" tabIndex={0} onKeyDown={onKeyDown}>
      <SideStack images={images} side="left" indexes={leftIdx} animIn={animIn} onSelect={goTo} />
      <CenterViewer
        images={images}
        active={active}
        prevSrc={prevActive !== null ? images[prevActive].src : null}
        animIn={animIn}
        viewSceneLabel={viewSceneLabel}
        onPrev={() => goTo((active - 1 + total) % total)}
        onNext={() => goTo((active + 1) % total)}
        onSelect={goTo}
        onViewScene={onViewScene}
      />
      <SideStack images={images} side="right" indexes={rightIdx} animIn={animIn} onSelect={goTo} />
    </Stage>
  )
}

// 중앙/사이드 크기·겹침을 CSS 변수로 통합 제어
const Stage = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100%;
  /* 카드 폭 = 가로기준·세로기준 중 작은 값을 W_MIN~W_MAX 로 제한 */
  --cw-by-width: calc(${W_MAX}px - ((${HD}px - 100vw) * 0.75));
  --cw-by-height: calc((100vh - 420px) * ${RATIO});
  --center-w: clamp(${W_MIN}px, min(var(--cw-by-width), var(--cw-by-height)), ${W_MAX}px);
  --center-h: calc(var(--center-w) / ${RATIO});
  --side-w: clamp(140px, calc(var(--center-w) * 0.33), 260px);
  --side-h: clamp(180px, calc(var(--center-h) * 0.84), 366px);
  --side-gap: clamp(${T.spacing[8]}, calc(var(--center-w) * 0.02), ${T.spacing[20]});
  --side-overlap: clamp(0px, calc((${QHD}px - 100vw) * 0.09), 96px);

  @media (max-height: 820px) and (min-width: ${T.bp.mini}) {
    --side-overlap: clamp(0px, calc((${QHD}px - 100vw) * 0.1), 110px);
  }
  @media (max-width: ${T.bp.mobile}) {
    --center-w: clamp(420px, 76vw, 520px);
    --side-w: clamp(92px, calc(var(--center-w) * 0.28), 140px);
    --side-h: calc(var(--center-h) * 0.76);
    --side-gap: ${T.spacing[8]};
    --side-overlap: clamp(48px, 14vw, 88px);
  }
  @media (max-width: ${T.bp.mini}) {
    --center-w: calc(100vw - 48px);
    --center-h: clamp(180px, 60vw, 260px);
  }
`

const SideStackWrap = styled.div`
  display: flex;
  align-items: center;
  gap: var(--side-gap);
  position: absolute;
  top: calc(var(--center-h) / 2);
  transform: translateY(-50%);
  z-index: 2;
  height: var(--side-h);
  ${({ $side }) =>
    $side === "left"
      ? `right: calc(50% + (var(--center-w) / 2) + var(--side-gap) - var(--side-overlap)); flex-direction: row-reverse;`
      : `left: calc(50% + (var(--center-w) / 2) + var(--side-gap) - var(--side-overlap));`}
  ${({ $animIn, $side }) =>
    $animIn
      ? `animation: fadeIn 0.75s ease ${$side === "left" ? 0.5 : 0.55}s both;`
      : `opacity: 0;`}
`

const SideThumb = styled.button`
  position: relative;
  width: var(--side-w);
  height: var(--side-h);
  border-radius: ${T.radius.sm};
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  opacity: ${({ $order }) => SIDE_OPACITY[$order] ?? 0.14};
  filter: grayscale(1) brightness(0.6); /* mix-blend hue 대신 filter 모노톤 */
  transition:
    opacity ${T.transition.mid},
    filter ${T.transition.mid},
    transform ${T.transition.mid};

  &:hover {
    opacity: ${({ $order }) => SIDE_OPACITY_HOVER[$order] ?? 0.28};
    filter: grayscale(0.6) brightness(0.75);
    transform: scale(1.02);
  }
`

const SideImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const CenterViewerWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 8;
  ${({ $animIn }) => revealUp($animIn, 0.45)}
`

const CenterFrame = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--center-w);
  height: var(--center-h);
  border-radius: ${T.radius.sm};
  overflow: hidden;
  /* 이전 이미지를 배경으로 깔아 전환 깜빡임 방지 */
  ${({ $prevSrc }) => ($prevSrc ? `background: url(${$prevSrc}) center / cover;` : "")}
`

const CenterImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: imgScale 0.5s ease both;
`

const CenterBorder = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: ${T.radius.sm};
  border: 1px solid ${alpha(T.violet, 0.7)};
  box-shadow:
    0 0 40px ${alpha(T.violet, 0.2)},
    inset 0 0 20px ${alpha(T.violet, 0.04)};
  pointer-events: none;
`

const ArrowBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  ${({ $side }) => ($side === "left" ? `left: ${T.spacing[20]};` : `right: ${T.spacing[20]};`)}
  width: ${T.spacing[42]};
  height: ${T.spacing[42]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${alpha(T.white, 0.85)};
  ${borderGlass(0.3, "4px")}
  transition: background ${T.transition.mid}, border-color ${T.transition.mid}, box-shadow ${T
    .transition.mid}, transform ${T.transition.spring};

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    ${glassHover(0.15, 0.4)}
    color: ${T.main};
    transform: translateY(-50%) scale(1.08);
  }
  &:active {
    transform: translateY(-50%) scale(0.92);
  }

  @media (max-width: ${T.bp.mini}) {
    ${({ $side }) => ($side === "left" ? `left: ${T.spacing[8]};` : `right: ${T.spacing[8]};`)}
    width: ${T.spacing[36]};
    height: ${T.spacing[36]};
    svg {
      width: 16px;
      height: 16px;
    }
  }
`

const ViewSceneBtn = styled.button`
  position: absolute;
  bottom: 14px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};
  padding: 0 18px;
  height: ${T.spacing[32]};
  border-radius: ${T.radius.pill};
  ${borderGlass(0.7, "2px")}
  cursor: pointer;
  white-space: nowrap;
  transition:
    background ${T.transition.fast},
    border-color ${T.transition.fast},
    box-shadow ${T.transition.fast};

  span {
    font-size: ${T.fontSize.xs};
    font-weight: 500;
    color: ${alpha(T.white, 0.72)};
    letter-spacing: 0.3px;
    transition: color ${T.transition.fast};
  }
  svg {
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    color: ${alpha(T.white, 0.72)};
    transition:
      color ${T.transition.fast},
      transform ${T.transition.fast};
  }

  &:hover {
    ${glassHover(0.18, 0.3)}
    span {
      color: ${T.main};
    }
    svg {
      color: ${T.main};
      transform: scale(1.15);
    }
  }

  @media (max-width: ${T.bp.mini}) {
    bottom: 10px;
    height: 28px;
    padding: 0 14px;
    span {
      font-size: ${T.fontSize.xxs};
    }
  }
`

const Dots = styled.div`
  display: flex;
  align-items: center;
  gap: ${T.spacing[8]};
  margin-top: clamp(${T.spacing[20]}, 3.6vh, ${T.spacing[36]});

  @media (max-width: ${T.bp.mobile}) {
    margin-top: ${T.spacing[24]};
  }
`

const Dot = styled.button`
  width: ${({ $active }) => ($active ? DOT_ACTIVE_W : T.spacing[8])};
  height: ${T.spacing[8]};
  border-radius: ${T.spacing[4]};
  cursor: pointer;
  background: ${({ $active }) => ($active ? T.violet : alpha(T.violet, 0.28))};
  transition:
    width ${T.transition.mid},
    background ${T.transition.mid};

  &:hover {
    background: ${({ $active }) => ($active ? T.violet : alpha(T.violet, 0.5))};
  }
`
