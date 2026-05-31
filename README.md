# Hwaseong Yahwa Web

화성 야화 웹사이트 프론트엔드입니다.

React, Vite, Emotion 기반으로 구성되어 있으며 메인 랜딩, 행사 프로그램, 관람 안내, 갤러리, 예약 흐름을 단계적으로 확장하는 구조입니다.

## Scripts

```bash
npm run dev      # 개발 서버 실행
npm run build    # 배포용 빌드 생성
npm run lint     # 코드 검사
npm run format   # 코드 포맷 적용
npm run preview  # 빌드 결과 미리보기
```

## Stack

- React 19
- Vite
- React Router
- Emotion
- Fontsource variable Korean fonts

## Project Structure

```text
src/
  assets/       이미지와 정적 에셋
  components/   공통 UI와 레이아웃 컴포넌트
  data/         화면 문구와 프로그램 데이터
  hooks/        재사용 훅
  pages/        라우트 단위 페이지
  styles/       전역 스타일과 테마 토큰
```

## Development Notes

- 전역 스타일은 `src/styles/GlobalStyles.jsx`와 `src/styles/theme.js`에서 관리합니다.
- 아직 구현 전인 흐름은 MVP 모달로 안내할 수 있습니다.
- `references/`, `troubleshooting/` 폴더는 개발 참고 자료로 사용합니다.
