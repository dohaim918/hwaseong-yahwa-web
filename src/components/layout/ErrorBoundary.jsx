import { Component } from "react"
import styled from "@emotion/styled"
import { T, alpha } from "@/styles/theme"
import Button from "@/components/ui/Button"

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ErrorBoundary
//  ────────────────────────────────────
//  렌더링 중 throw 가 발생해도 화이트 스크린이 아닌
//  안내 페이지를 보여준다. App 최상위에 한 번만 두면 됨.
//
//  React 19 기준 함수형 컴포넌트로도 가능하지만,
//  componentDidCatch / getDerivedStateFromError 는
//  여전히 클래스 컴포넌트 API 라 클래스로 구현.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // 추후 Sentry 등 외부 리포팅 연결 지점
    if (typeof window !== "undefined") {
      console.error("[ErrorBoundary]", error, info?.componentStack)
    }
  }

  handleReset = () => {
    this.setState({ error: null })
    // 라우터 상태 복구 (간단 처리 — 새로고침)
    if (typeof window !== "undefined") window.location.assign("/")
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <Sec>
        <Inner>
          <Label aria-hidden="true">ERROR</Label>
          <Title>잠시 문제가 발생했어요</Title>
          <Desc>페이지를 불러오지 못했습니다.{"\n"}메인으로 돌아가서 다시 시도해보세요.</Desc>
          <ResetBtn type="button" accent={T.pink} onClick={this.handleReset}>
            메인으로 돌아가기
          </ResetBtn>
        </Inner>
      </Sec>
    )
  }
}

export default ErrorBoundary

const Sec = styled.section`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${T.spacing[48]} ${T.pagePad};
  background: ${T.bgBase};
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${T.spacing[16]};
  text-align: center;
  max-width: 360px;
`

const Label = styled.span`
  font-family: ${T.fontMono};
  font-size: ${T.fontSize.xs};
  letter-spacing: 6px;
  color: ${alpha(T.pink, 0.7)};
`

const Title = styled.h2`
  font-family: ${T.fontSerif};
  font-size: ${T.fontSize.xxl};
  color: ${T.main};
  margin: 0;
`

const Desc = styled.p`
  font-size: ${T.fontSize.sm};
  color: ${T.sub};
  margin: 0;
  white-space: pre-line;
  line-height: 1.7;
`

const ResetBtn = styled(Button)`
  margin-top: ${T.spacing[12]};
`
