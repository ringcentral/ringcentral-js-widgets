import { AlertMd, InfoMd, SuccessMd } from '@ringcentral/spring-icon';
import { AlertProps, SnackbarContent } from '@ringcentral/spring-ui';
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

  // Extract startSlot from rest if provided
  const { startSlot, ...restProps } = rest as {
    startSlot?: React.ReactNode | null;
  };

  const DEFAULT_ICON_MAP = {
    info: InfoMd,
    error: AlertMd,
    success: SuccessMd,
    warning: AlertMd,
    neutral: InfoMd,
  } as const;

  // Determine the icon to use based on severity - Same as SpringUI logic
  const defaultIcon = DEFAULT_ICON_MAP[type] ?? InfoMd;

  // Logic:
  // - If startSlot is explicitly null, don't pass startSlot prop (no icon)
  // - If startSlot is undefined, use default icon from map [Backward compatibility]
  // - If startSlot has a value, use that value
  const shouldShowIcon = startSlot !== null;
  const iconToUse: React.ComponentType | React.ReactElement | null | undefined =
    startSlot !== undefined
      ? (startSlot as React.ComponentType | React.ReactElement | null)
      : defaultIcon;

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
      {...(shouldShowIcon ? { startSlot: iconToUse } : {})}
      action={action}
      onClose={handleClose}
      {...restProps}
      className={clsx('min-w-auto flex-none', className)}
    >
      {children}
    </SnackbarContent>
  );
};
