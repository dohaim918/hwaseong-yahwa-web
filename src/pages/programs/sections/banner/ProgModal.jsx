import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, accentFill } from "@/styles/theme"
import { serif, glass, flexCol, flexRow } from "@/styles/mixins"
import { UI_TEXT } from "@/data/uiText"
import { PROGRAM_ASSETS } from "@/data/programAssets"
import { getModalPrograms } from "@/data/nightData"
import { useResponsive } from "@/hooks/useResponsive"
import ModalFrame from "@/components/ui/ModalFrame"
import Tooltip from "@/components/ui/Tooltip"
import Button from "@/components/ui/Button"
import { AccentDot } from "@/components/ui/Deco"
import { SparkleIcon, MapPinIcon, TagIcon, InfoIcon } from "@/components/ui/icons"

const t = UI_TEXT.progModal

const META_ICONS = {
  schedule: SparkleIcon,
  location: MapPinIcon,
  category: TagIcon,
}

export default function ProgModal({ open, onClose, night }) {
  const { id, color, style, modal } = night
  const programs = getModalPrograms(id)
  // 모달 분위기 배경 — 야별 전용 이미지 (modal/{id}-modal-bg.webp)
  const bg = PROGRAM_ASSETS.modalBgs[id]
  const titleId = `prog-modal-title-${id}`

  const { isMini } = useResponsive()

  const metaRows = t.metaItems.map(({ key, label }) => {
    const Icon = META_ICONS[key]

    return (
      <MetaRow key={key}>
        <Icon size={16} color={color} aria-label={label} />
        <span>{modal[key]}</span>
      </MetaRow>
    )
  })

  return (
    <ModalFrame open={open} onClose={onClose} accent={color} maxWidth={480} labelledBy={titleId}>
      {/* ── 분위기 배경 이미지 (exclusion 블렌드, modalBgs[id]) ── */}
      {bg && (
        <BgLayer aria-hidden="true">
          <BgImg src={bg} alt="" loading="lazy" />
        </BgLayer>
      )}

      <Inner>
        <Header>
          <Badge $accent={color}>
            <BadgeDotA $color={color} $size={4} $opacity={0.6} />
            <BadgeDotB $color={color} $size={2} $opacity={0.4} />
            <BadgeNum $grad={style.heroGrad}>{modal.badgeLabel}</BadgeNum>
          </Badge>
          <TitleGroup>
            <SubTheme $accent={color}>{modal.subTheme}</SubTheme>
            <MainTitle id={titleId}>{modal.mainTitle}</MainTitle>
          </TitleGroup>
        </Header>

        {/* ── 설명 + 메타: 우측 정렬 좁은 컬럼 (좌측에 배경 이미지 노출) ── */}
        {/* 미니에서는 메타를 숨기고 아래 ⓘ 팝오버로 띄움 */}
        <SideColumn>
          <Desc>{modal.desc}</Desc>
          {!isMini && <MetaList>{metaRows}</MetaList>}
        </SideColumn>

        <ProgramsBlock>
          <LabelRow>
            <ProgramsLabel $accent={color}>{t.programsLabel}</ProgramsLabel>
            {isMini && (
              <Tooltip
                accent={color}
                ariaLabel="행사 정보"
                content={<MetaList>{metaRows}</MetaList>}
              >
                <InfoIcon size={16} />
              </Tooltip>
            )}
          </LabelRow>
          {/* 카드 + TIP 묶음 — 라벨↔묶음은 gap 12 */}
          <ProgramsStack>
            <ProgramsCard $accent={color}>
              {programs.map((p, i) => (
                <ProgramRow key={`${p.name}-${i}`}>
                  <AccentDot $color={color} />
                  <ProgName $first={i === 0}>{p.name}</ProgName>
                  <ProgPlace>{p.place}</ProgPlace>
                  <ProgTime>{p.time}</ProgTime>
                </ProgramRow>
              ))}
            </ProgramsCard>

            {modal.tip && (
              <TipBox $accent={color}>
                <TipLabel $accent={color}>{t.tipLabel}</TipLabel>
                <TipText>{modal.tip}</TipText>
              </TipBox>
            )}
          </ProgramsStack>
        </ProgramsBlock>

        <ButtonRow>
          <Button variant="outline" size="sm" accent={color} onClick={onClose}>
            {t.closeLabel}
          </Button>
          <Button
            as={Link}
            to={`/booking?night=${id}`}
            variant="gradient"
            size="sm"
            accent={color}
            bordered
          >
            {t.bookingLabel}
          </Button>
        </ButtonRow>
      </Inner>
    </ModalFrame>
  )
}

// ── 배경 레이어
const BgLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  mix-blend-mode: exclusion;
  opacity: 0.6;
  pointer-events: none;
  transition: opacity ${T.transition.fast};
  @media (max-width: ${T.bp.mini}) {
    opacity: 0.4;
  }
`

const BgImg = styled.img`
  position: absolute;
  left: -2.83%;
  top: 7.81%;
  width: 85%;
  height: 51.8%;
  max-width: none;
  object-fit: cover;

  /* 미니: 좁은 폭이라 크롭 대신 풀폭·자연 높이로 (좌측 -2.83%·height 고정 해제) */
  /* top: 480px→6% / 320px→9% 점진 보간 (px/px=scalar 트릭) */
  @media (max-width: ${T.bp.mini}) {
    left: 0;
    top: calc(6% + clamp(0, (480px - 100vw) / 160px, 1) * 3%);
    width: 110%;
    height: auto;
  }
`

// ── 콘텐츠
const Inner = styled.div`
  position: relative;
  z-index: 1;
  ${flexCol(T.spacing[20])}
  width: 100%;
  text-align: left;
`

const Header = styled.div`
  ${flexRow(T.spacing[24])}
`

const Badge = styled.div`
  position: relative;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  padding: 2px;
  border-radius: 120px;
  border: 2px solid ${({ $accent }) => alpha($accent, 0.267)};
  background: radial-gradient(
    circle at 35% 35%,
    ${alpha(T.bgDark, 0.85)} 0%,
    ${({ $accent }) => alpha($accent, 0.267)} 100%
  );
  box-shadow:
    0 0 50px ${({ $accent }) => alpha($accent, 0.17)},
    0 0 100px ${({ $accent }) => alpha($accent, 0.07)},
    inset 0 0 30px 2px ${({ $accent }) => alpha($accent, 0.08)};
  overflow: clip;

  @media (max-width: ${T.bp.mini}) {
    width: 56px;
    height: 56px;
  }
`

const BadgeDotA = styled(AccentDot)`
  position: absolute;
  top: 8px;
  right: 12px;
`

const BadgeDotB = styled(AccentDot)`
  position: absolute;
  bottom: 14px;
  left: 10px;
`

const BadgeNum = styled.span`
  ${serif(700)}
  font-size: 24px;
  ${({ $grad }) => $grad}

  @media (max-width: ${T.bp.mini}) {
    font-size: 20px;
  }
`

const TitleGroup = styled.div`
  ${flexCol()}
`

const SubTheme = styled.p`
  margin: 0;
  ${serif(500)}
  font-size: ${T.fontSize.sm};
  color: ${({ $accent }) => $accent};
`

const MainTitle = styled.h2`
  margin: 0;
  ${serif(700)}
  font-size: 24px;
  color: ${T.main};

  @media (max-width: ${T.bp.mini}) {
    font-size: 18px;
  }
`

// 설명 + 메타를 묶어 우측 정렬(좁은 컬럼). 좌측 여백으로 배경 이미지가 비친다.
const SideColumn = styled.div`
  align-self: flex-end;
  ${flexCol(T.spacing[16])}
  width: 180px;

  @media (max-width: ${T.bp.mini}) {
    align-self: stretch;
    width: 100%;
    align-items: center;
    text-align: center;
  }
`

const Desc = styled.p`
  margin: 0;
  width: 100%;
  font-size: ${T.fontSize.sm};
  line-height: 1.55;
  letter-spacing: 1px;
  color: ${T.sub};
  white-space: pre-line;

  /* 미니: 배경 이미지 위에서 가독성 보강 (모달 배경색 글로우) */
  @media (max-width: ${T.bp.mini}) {
    text-shadow:
      0 0 8px ${T.bgBase},
      0 1px 3px ${T.bgBase};
  }
`

const MetaList = styled.div`
  ${flexCol(T.spacing[6])}
`

const MetaRow = styled.div`
  ${flexRow(T.spacing[8])}
  font-size: ${T.fontSize.xs};
  color: ${alpha(T.white, 0.63)};
  letter-spacing: 1px;
  white-space: nowrap;
  svg {
    flex-shrink: 0;
  }
`

const ProgramsBlock = styled.div`
  ${flexCol(T.spacing[12])}
`

// 카드 + TIP 묶음 — 라벨과는 ProgramsBlock의 12 유지
const ProgramsStack = styled.div`
  ${flexCol(T.spacing[8])}
`

// 라벨 + (미니) ⓘ 트리거 행
const LabelRow = styled.div`
  ${flexRow(T.spacing[6])}
`

const ProgramsLabel = styled.p`
  margin: 0;
  font-size: ${T.fontSize.xs};
  font-weight: 600;
  color: ${({ $accent }) => $accent};
`

const ProgramsCard = styled.div`
  ${flexCol(T.spacing[12])}
  padding-block: ${T.spacing[16]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.65)};
  border-radius: ${T.radius.sm};
  background: ${alpha(T.bgDark, 0.48)};
  transition: gap ${T.transition.fast};
  @media (max-width: ${T.bp.mini}) {
    padding-block: ${T.spacing[12]};
    gap: ${T.spacing[8]};
  }
`

const ProgramRow = styled.div`
  ${flexRow(T.spacing[12])}
  padding: 0 ${T.spacing[20]};
  ${glass("4px")}
`

const ProgName = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: ${T.fontSize.sm};
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $first }) => ($first ? T.main : alpha(T.main, 0.8))};
  transition: font-size ${T.transition.fast};
  @media (max-width: ${T.bp.mini}) {
    font-size: ${T.fontSize.xs};
  }
`

// 장소·시간 정렬: 시간만 고정폭으로 우측 앵커 → 장소는 nowrap 자동폭으로 그 왼쪽에 붙음.
// 시간 left 가 고정이라 장소 우측 끝·시간이 모든 행에서 같은 x 에 정렬되고, 장소가 길어도 줄바꿈 안 됨.
const ProgMeta = styled.span`
  flex-shrink: 0;
  white-space: nowrap;
  font-size: ${T.fontSize.xs};
  text-align: right;
`

const ProgPlace = styled(ProgMeta)`
  color: ${T.muted};
  @media (max-width: ${T.bp.mini}) {
    display: none;
  }
`

const ProgTime = styled(ProgMeta)`
  color: ${T.sub};
`

// 팁 박스 — 프로그램 행과 같은 좌우 리듬
const TipBox = styled.div`
  ${flexRow(T.spacing[12])}
  padding: ${T.spacing[8]} ${T.spacing[20]};
  border: 1px solid ${({ $accent }) => alpha($accent, 0.27)};
  border-radius: ${T.radius.sm};
  background: ${({ $accent }) => accentFill($accent)};
  ${glass("4px")}
`

const TipLabel = styled.span`
  flex-shrink: 0;
  font-size: ${T.fontSize.sm};
  font-weight: 500;
  color: ${({ $accent }) => $accent};
`

const TipText = styled.p`
  margin: 0;
  font-size: ${T.fontSize.xs};
  line-height: 1.6;
  color: ${T.sub};
`

// 버튼은 공용 Button(닫기=outline / 예약=gradient·bordered) 사용 — 행은 중앙정렬만.
const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${T.spacing[12]};
  margin-top: ${T.spacing[4]};
`
