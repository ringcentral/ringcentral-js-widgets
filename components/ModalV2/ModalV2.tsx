import { RcModal, RcModalProps } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

export type ModalV2Props = {
  modals: (RcModalProps & { children: React.ReactNode })[];
} & Pick<RcModalProps, 'dialogProps'>;

export const ModalV2: FunctionComponent<ModalV2Props> = ({
  modals,
  ...rest
}) => {
  return (
    <>
      {modals.map(({ children, ...restModalProps }, i) => {
        return (
          <RcModal {...rest} {...restModalProps} key={i}>
            {children}
          </RcModal>
        );
      })}
    </>
  );
};
