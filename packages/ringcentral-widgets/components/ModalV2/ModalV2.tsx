import {
  combineProps,
  palette2,
  RcDialogContent,
  RcPopupBox,
  RcPopupBoxProps,
  styled,
} from '@ringcentral/juno';
import { map } from 'ramda';
import React, { FunctionComponent } from 'react';

import { ModalV2Props } from './interface';

const PopupBox = styled(RcPopupBox)`
  ${RcDialogContent} {
    color: ${palette2('neutral', 'f06')};
  }
`;

export const ModalV2: FunctionComponent<ModalV2Props & { phone: any }> = ({
  modals,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  phone, // * just pick phone out of props
  ...dialogProps
}) => {
  return (
    <>
      {map(({ key, open, ...modalProps }) => {
        const { children, ...rest } = combineProps(
          dialogProps,
          modalProps,
        ) as RcPopupBoxProps;

        return (
          <PopupBox open={open} key={key} {...rest}>
            <>{children}</>
          </PopupBox>
        );
      }, modals)}
    </>
  );
};
