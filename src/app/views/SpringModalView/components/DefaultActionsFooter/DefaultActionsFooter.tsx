import { Button, DialogActions } from '@ringcentral/spring-ui';
import React, { FunctionComponent } from 'react';

import { useModalItemView } from '../../../ModalView/ModalItemView/contexts';

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

  // TODO: fix those types issue
  return (
    // @ts-ignore
    <DialogActions {...ActionsProps}>
      {cancelButtonText && (
        // @ts-ignore
        <Button
          data-sign="DialogCancelButton"
          fullWidth={isXsmall}
          color="secondary"
          variant="outlined"
          // @ts-ignore
          onClick={(e) => onCancel?.(e, 'cancelClick')}
          disabled={loading}
          {...cancelButtonProps}
        >
          {cancelButtonText}
        </Button>
      )}
      {confirmButtonText && (
        // @ts-ignore
        <Button
          data-sign="DialogConfirmButton"
          fullWidth={isXsmall}
          onClick={onConfirm}
          disabled={loading}
          loading={loading}
          {...confirmButtonProps}
        >
          {confirmButtonText}
        </Button>
      )}
    </DialogActions>
  );
};
