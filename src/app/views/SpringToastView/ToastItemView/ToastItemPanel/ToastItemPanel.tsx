// import { Xmd } from '@ringcentral/spring-icon';

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AlertProps, // IconButton,
  SnackbarContent,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent, useEffect, useRef } from 'react';

import type { ToastItem, ToastItemPanelProps } from '../../../../services';

export function getLevelType(level: ToastItem['level']) {
  let type: AlertProps['severity'];
  switch (level) {
    case 'warning':
      type = 'warning';
      break;
    case 'danger':
      type = 'error';
      break;
    case 'hint':
      type = 'neutral';
      break;
    default:
      type = level;
  }
  return type;
}

export const ToastItemPanel: FunctionComponent<ToastItemPanelProps> = ({
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
  // juno props
  messageAlign,
  fullWidth,
  className,
  ...rest
}) => {
  const type = getLevelType(level);

  const snackbarContentRef = useRef<HTMLDivElement>(null);

  const handleClose =
    action === undefined
      ? () => {
          dismiss(id, 'removeButtonClick');
        }
      : undefined;
  // TODO: spring ui still not support pass any props to close or custom action in correct place, need wait spring update
  // UXSYS-3822
  // UXSYS-3821
  useEffect(() => {
    if (!handleClose) return;
    const close = snackbarContentRef.current?.querySelector('.sui-alert-close');

    close?.setAttribute('data-sign', 'dismiss');
  });

  return (
    <SnackbarContent
      ref={snackbarContentRef}
      aria-live="polite"
      aria-atomic="true"
      data-id={id}
      data-sign="Toast"
      data-sign-type={type}
      severity={type}
      // TODO: currently always show icon
      // icon={typeof children === 'string'}
      icon
      // TODO: still not support loading
      // loading={loading}
      // TODO: that action is render in wrong place, need wait spring update
      // action={
      //   action === undefined ? (
      //     <IconButton
      //       className="sui-snackbar-content-close"
      //       symbol={Xmd}
      //       variant="icon"
      //       shape="squircle"
      //       color="secondary"
      //       size="small"
      //       background={false}
      //       data-sign="dismiss"
      //       onClick={() => {
      //         dismiss(id, 'removeButtonClick');
      //       }}
      //     />
      //   ) : (
      //     action
      //   )
      // }
      action={action}
      onClose={handleClose}
      {...rest}
      className={clsx('min-w-auto flex-none', className)}
    >
      {children}
    </SnackbarContent>
  );
};
