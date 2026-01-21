import {
  createGlobalStyle,
  css,
  focusVisibleShadowStyle,
  nonStyleButton,
  palette2,
  radius,
  RcIconButton,
  setOpacity,
  spacing,
  styled,
} from '@ringcentral/juno';

const inset = 2;

export const DotItem = styled.button<{ active: boolean }>`
  position: relative;

  ${focusVisibleShadowStyle('round', palette2('neutral', 'f11'), false)};

  &:after {
    top: -${inset}px !important;
    right: -${inset}px !important;
    bottom: -${inset}px !important;
    left: -${inset}px !important;
  }

  ${nonStyleButton};
  border-radius: ${radius('round')};
  width: 12px;
  height: 4px;
  background-color: ${setOpacity(palette2('neutral', 'f11'), '48')};

  ${({ active }) =>
    active &&
    css`
      width: 35px;
      background-color: ${palette2('neutral', 'f11')};
    `}
`;

export const DotWrap = styled.div`
  position: absolute;
  bottom: ${spacing(-6)};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${spacing(1)};
`;

export const CloseWrap = styled.div`
  position: absolute;
  top: ${spacing(5)};
  right: ${spacing(5)};

  ${RcIconButton} {
    border: 1px solid ${palette2('neutral', 'f06')};
  }
`;

type ButtonWrapProps = {
  direction: 'left' | 'right';
};

const directionStyle = ({ direction }: ButtonWrapProps) =>
  direction === 'left'
    ? css`
        left: 0;
        transform: translate(-100%, -50%);
        padding-right: ${spacing(6)};
      `
    : css`
        right: 0;
        transform: translate(100%, -50%);
        padding-left: ${spacing(6)};
      `;

export const ButtonWrap = styled.div<ButtonWrapProps>`
  position: absolute;
  top: 50%;

  ${directionStyle}
`;

export const CarouselModalDialogInvisibleGlobalStyle = createGlobalStyle`
  .carouselModal-dialog-root {
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    pointer-events: none;
    opacity: 0;

    .RcBackdrop-root {
      opacity: 0 !important;
    }
  }
`;
