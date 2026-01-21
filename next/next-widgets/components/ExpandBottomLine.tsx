import { palette2, RcIconButton, styled } from '@ringcentral/juno';

export const ExpandBottomLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: ${palette2('neutral', 'l02')};

  ${RcIconButton} {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: ${palette2('neutral', 'b01')};
    height: 17px;
  }
`;
