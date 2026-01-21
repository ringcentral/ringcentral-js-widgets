import { RcButton, RcDialogActions } from '@ringcentral/juno';
import React, { FunctionComponent } from 'react';

import { useModalItemView } from '../../ModalItemView/contexts';

export const DefaultActionsFooter: FunctionComponent<{}> = () => {
  const {
    props: {
      ActionsProps,
      cancelButtonText,
      onConfirm,
      onCancel,
      childrenSize,
      loading,
      cancelButtonProps,
      confirmButtonText,
      confirmButtonProps,
    },
  } = useModalItemView();

  const isXsmall = childrenSize === 'small';

  return (
    <RcDialogActions {...ActionsProps}>
      {cancelButtonText && (
        <RcButton
          data-sign="DialogCancelButton"
          fullWidth={isXsmall}
          variant="text"
          onClick={(e) => onCancel?.(e, 'cancelClick')}
          disabled={loading}
          {...cancelButtonProps}
        >
          {cancelButtonText}
        </RcButton>
      )}
      {confirmButtonText && (
        <RcButton
          data-sign="DialogConfirmButton"
          fullWidth={isXsmall}
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          loading={loading}
          {...confirmButtonProps}
        >
          {confirmButtonText}
        </RcButton>
      )}
    </RcDialogActions>
  );
};
