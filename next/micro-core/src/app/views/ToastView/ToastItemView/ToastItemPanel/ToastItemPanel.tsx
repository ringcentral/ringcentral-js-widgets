/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RcSnackbarAction,
  RcSnackbarContent,
  RcSnackbarContentType,
  styled,
} from '@ringcentral/juno';
import { Close } from '@ringcentral/juno-icon';
import React, { FunctionComponent } from 'react';

import type { ToastItem, ToastItemPanelProps } from '../../../../services';

export function getLevelType(level: ToastItem['level']) {
  let type: RcSnackbarContentType;
  switch (level) {
    case 'warning':
      type = 'warn';
      break;
    case 'danger':
      type = 'error';
      break;
    // in juno, not support neutral, so use info instead
    case 'hint':
      type = 'info';
      break;
    default:
      type = level;
  }
  return type;
}

export const _ToastItemPanel: FunctionComponent<ToastItemPanelProps> = ({
  id,
  level,
  loading,
  action,
  children,
  dismiss,
  // pick only
  backdrop,
  onClose,
  allowDuplicates,
  ...rest
}) => {
  const type = getLevelType(level);

  return (
    <RcSnackbarContent
      aria-live="polite"
      data-id={id}
      aria-atomic="true"
      data-sign="Toast"
      data-sign-type={type}
      type={type}
      loading={loading}
      action={
        action === undefined ? (
          <RcSnackbarAction
            variant="icon"
            symbol={Close}
            size="small"
            data-sign="dismiss"
            onClick={() => {
              dismiss(id, 'removeButtonClick');
            }}
          />
        ) : (
          action
        )
      }
      {...rest}
      message={children}
    />
  );
};

export const ToastItemPanel = styled(_ToastItemPanel)`
  min-width: auto;
  flex: none;
`;
