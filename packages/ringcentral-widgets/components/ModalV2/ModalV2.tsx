import type { FunctionComponent } from 'react';
import React from 'react';

import { map } from 'ramda';

import type { RcPopupBoxProps } from '@ringcentral/juno';
import {
  combineProps,
  palette2,
  RcDialogContent,
  RcPopupBox,
  styled,
} from '@ringcentral/juno';

import type { ModalV2Props } from './interface';

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

        if ((modalProps as any).size) {
          // throw error directly
          throw new Error(
            '[ModalV2] that size props are be deprecated, please use maxWidth',
          );
        }

        return (
          <PopupBox key={key} {...rest} open={open}>
            {children}
          </PopupBox>
        );
      }, modals)}
    </>
  );
};
