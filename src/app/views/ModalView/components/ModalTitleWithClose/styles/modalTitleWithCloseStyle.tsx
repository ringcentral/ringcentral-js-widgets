import type { RcThemedStyled } from '@ringcentral/juno';
import { css } from '@ringcentral/juno';

import type { ModalTitleWithCloseProps } from '../ModalTitleWithClose';

export const modalTitleWithCloseStyle: RcThemedStyled<
  ModalTitleWithCloseProps,
  ReturnType<typeof css>
> = (props) => {
  return css`
    display: flex;
    align-items: center;
    width: 100%;
    height: 64px;
  `;
};
