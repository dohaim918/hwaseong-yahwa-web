import { Link } from "react-router-dom"
import styled from "@emotion/styled"
import { T, alpha, flexCol, flexRow } from "@/styles/theme"
import Button from "@/components/ui/Button"

// ── 404 — 존재하지 않는 경로
export default function NotFound() {
  return (
    <Sec>
      <Inner>
        <Code aria-hidden="true">404</Code>
        <Title>길을 잃었습니다</Title>
        <Desc>요청하신 페이지를 찾을 수 없어요.</Desc>
        <Button as={Link} to="/" size="md" accent={T.pink}>
          메인으로 돌아가기
        </Button>
      </Inner>
    </Sec>
  )
}

const Sec = styled.section`
  min-height: 100dvh;
  ${flexRow()}
  justify-content: center;
  padding: ${T.spacing[48]} ${T.pagePad};
  scroll-snap-align: start;
`

const Inner = styled.div`
  ${flexCol(T.spacing[16])}
  align-items: center;
  text-align: center;
`

const Code = styled.div`
  font-family: ${T.fontMono};
  font-size: clamp(64px, 10vw, 120px);
  font-weight: 900;
  line-height: 1;
  color: ${alpha(T.pink, 0.7)};
  letter-spacing: 4px;
`

const Title = styled.h1`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.xxl};
  color: ${T.main};
  margin: 0;
`

const Desc = styled.p`
  font-size: ${T.fontSize.sm};
  color: ${T.sub};
  margin: 0 0 ${T.spacing[16]};
`
