import { RcDialogProps, RcModal } from '@ringcentral/juno';
import { map, mergeDeepLeft } from 'ramda';
import React, { FunctionComponent } from 'react';
import { ModalV2Props } from './interface';

export const ModalV2: FunctionComponent<ModalV2Props> = ({
  modals,
  dialogProps = {},
}) => {
  return (
    <>
      {map(
        ({ key, dialogProps: modalDialogProps = {}, ...modalProps }) => (
          <RcModal
            dialogProps={
              mergeDeepLeft(modalDialogProps, dialogProps) as Partial<
                RcDialogProps
              >
            }
            {...modalProps}
            key={key}
          />
        ),
        modals,
      )}
    </>
  );
};
