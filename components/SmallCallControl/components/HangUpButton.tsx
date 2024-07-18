import { RcIconButton } from '@ringcentral/juno';
import { HandUp } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React from 'react';

import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import styles from '../styles.scss';

import type { CallButtonsProps } from './CallButtons.interface';

export type HangUpButtonProps = CallButtonsProps & {
  onReject?(): void | Promise<void>;
  onHangup?(): void | Promise<void>;
  disableHangup?: boolean;
  isInComingCall?: boolean;
};

export const HangUpButton: FunctionComponent<HangUpButtonProps> = ({
  currentLocale,
  onReject,
  onHangup,
  isInComingCall,
  size,
  disableHangup,
  className,
  dataSign,
}) => {
  const { endTitle } = getCircleIconButtonTitle({
    isInComingCall,
  });

  return (
    <RcIconButton
      symbol={HandUp}
      variant="contained"
      data-icon="hand-up"
      title={i18n.getString(endTitle, currentLocale)}
      color="danger.b03"
      onClick={isInComingCall ? onReject : onHangup}
      disabled={disableHangup}
      size={size}
      className={clsx(styles.hangup, className)}
      disableRipple
      data-sign={dataSign}
    />
  );
};

HangUpButton.defaultProps = {
  onReject() {},
  onHangup() {},
  disableHangup: false,
  isInComingCall: false,
  currentLocale: 'en-US',
  dataSign: 'hangup',
};
