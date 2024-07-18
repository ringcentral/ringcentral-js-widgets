import { KeyPadHeight } from '@ringcentral-integration/widgets/components/BasicCallInfo/BasicCallInfo';
import {
  css,
  flexCenterStyle,
  palette2,
  radius,
  RcCollapse,
  RcDialPad,
  RcDialTextField,
  RcPaper,
  setOpacity,
  styled,
  px,
} from '@ringcentral/juno';

import { pageSpace } from '../../../../scss/variables';

export const Wrapper = styled.div<{ open?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ open }) => (open ? '0' : px(KeyPadHeight))};
  z-index: ${({ open }) => (open ? 3 : 2)};
`;

export const Backdrop = styled.div<{ open?: boolean }>`
  position: absolute;
  left: 0;
  top: ${({ open }) => (open ? `calc(-100vh - 64px)` : '0')};
  right: 0;
  bottom: 0;
  background: ${setOpacity(palette2('neutral', 'b05'), '72')};
`;

export const StyledCollapse = styled(RcCollapse)<{ open?: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0px -4px 5px 0px rgba(0, 0, 0, 0.15);
  cursor: ${({ open }) => (open ? 'default' : 'pointer')};
  border-bottom: 1px solid ${palette2('neutral', 'l02')};
  background: ${palette2('neutral', 'f01')};

  ${RcPaper} {
    border-radius: ${radius('zero')};
    ${({ open }) =>
      open
        ? css`
            ${pageSpace('padding')}
          `
        : css`
            padding-left: 0 !important;
            padding-right: 0 !important;
          `};
  }

  ${RcDialTextField} {
    border-bottom: 1px solid ${palette2('neutral', 'l02')};
  }

  ${RcDialPad} {
    padding: 17px 21.3px 6px;
    [sf-classic] & {
      padding: 17px 0 6px;
    }
  }
`;

export const Footer = styled.div<{ open?: boolean; keypadOpenHover?: boolean }>`
  ${flexCenterStyle};
  height: 32px;
  background-color: ${({ keypadOpenHover }) =>
    keypadOpenHover ? setOpacity(palette2('neutral', 'b04'), '08') : '#fff'};
`;

export const KeyPadCloseButton = styled.div<{ open?: boolean }>`
  float: right;
  padding-top: 8px;
`;
