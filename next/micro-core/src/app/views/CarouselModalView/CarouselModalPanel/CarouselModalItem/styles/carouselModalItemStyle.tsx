import { createGlobalStyle, css, spacing } from '@ringcentral/juno';

type CarouselModalDialogGlobalStyleProps = {
  width: number;
  height: number;
  loading: boolean;
};

export const CarouselModalDialogGlobalStyle = createGlobalStyle<CarouselModalDialogGlobalStyleProps>`
  ${({ loading }) =>
    loading &&
    css`
      .carouselModal-dialog-root {
        pointer-events: none;
        opacity: 0;

        .RcBackdrop-root {
          opacity: 0 !important;
        }
      }
    `};

  .carouselModal-dialog-paper {
    overflow-y: unset;
    border-radius: ${spacing(3)};

    width: ${({ width }) => width}px;
    height: ${({ height }) => height}px;
    max-width: ${({ width }) => width}px;
    max-height: ${({ height }) => height}px;
  }
`;

export const outOfViewStyle = css`
  position: fixed;
  top: 200vh;
  left: 200vw;

  iframe {
    height: 100vh;
    width: 100vw;
  }
`;
