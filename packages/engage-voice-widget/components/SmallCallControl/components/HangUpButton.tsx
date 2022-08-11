import React, { FunctionComponent } from 'react';

import classnames from 'classnames';

import { RcIconButton } from '@ringcentral/juno';
import { HandUp } from '@ringcentral/juno-icon';

import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import styles from '../styles.scss';
import { CallButtonsProps } from './CallButtons.interface';

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
      className={classnames(styles.hangup, className)}
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
