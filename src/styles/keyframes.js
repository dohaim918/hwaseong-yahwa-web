export const keyframes = `
  /* 아래에서 위로 올라오며 등장 */
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(26px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 살짝 튀어오르며 모달 등장 */
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.94) translateY(12px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* 탭 전환 시 아래에서 올라오며 등장 */
  @keyframes tabIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* opacity만 fade-in (transform 있는 요소에 사용) */
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* 갤러리 이미지 전환 — 살짝 확대에서 원래 크기로 */
  @keyframes imgScale {
    from { opacity: 0; transform: scale(1.04); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* 배경 오브 부유 */
  @keyframes orbFloat {
    0%,
    100% {
      transform: translateY(0) scale(1);
    }
    50% {
      transform: translateY(-18px) scale(1.04);
    }
  }

  /* 스크롤 쉐브론 바운스 */
  @keyframes scrollChevBounce {
    0%,
    100% {
      opacity: 0.4;
      transform: rotate(45deg) translate(0, 0);
    }
    50% {
      opacity: 1;
      transform: rotate(45deg) translate(4px, 4px);
    }
  }

  /* 스크롤 인디케이터 바운스 */
  @keyframes scrollBounce {
    0%,
    100% {
      transform: translateY(0);
      opacity: 0.5;
    }
    50% {
      transform: translateY(6px);
      opacity: 1;
    }
  }
`
