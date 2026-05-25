import { Global, css } from "@emotion/react"
import "@fontsource-variable/noto-sans-kr"
import "@fontsource-variable/noto-serif-kr"
import { T, alpha } from "@/styles/theme"
import { keyframes } from "@/styles/keyframes"

const styles = css`
  ${keyframes}

  /* ── Reset ─────────────────────────── */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 마우스 기기에서만 커서 숨김 — 터치 기기는 기본 동작 유지 */
  @media (pointer: fine) {
    *,
    *::before,
    *::after {
      cursor: none !important;
    }
  }

  html,
  body,
  div,
  span,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a,
  img,
  ul,
  ol,
  li,
  form,
  fieldset,
  label,
  legend,
  input,
  textarea,
  button,
  table,
  caption,
  tbody,
  thead,
  tfoot,
  tr,
  th,
  td,
  article,
  aside,
  section,
  header,
  main,
  nav,
  footer {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
  }

  html {
    min-height: 100dvh;
    scroll-behavior: smooth;
    background: ${T.bgBase};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    min-height: 100vh;
    min-height: 100dvh;
    background: ${T.bgBase};
    color: ${T.main};
    font-family: ${T.fontSans};
    line-height: 1.6;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 80% 50% at 20% 80%, ${alpha(T.pink, 0.06)} 0%, transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 20%, ${alpha(T.amber, 0.05)} 0%, transparent 55%);
  }

  /* 전체 grain 텍스처 */
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n1)' opacity='.03'/%3E%3C/svg%3E");
    background-size: 200px;
  }

  #root {
    min-height: 100%;
  }

  input,
  button,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
  }

  button {
    appearance: none;
    text-align: inherit;
  }

  textarea {
    resize: none;
  }
  ol,
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: ${alpha(T.pink, 0.28)};
    color: ${T.main};
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: ${T.muted};
    border-radius: 4px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: ${T.muted} transparent;
  }
`

const GlobalStyles = () => <Global styles={styles} />

export default GlobalStyles
