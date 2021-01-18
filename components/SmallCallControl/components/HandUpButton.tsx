import handUpSvg from '@ringcentral/juno/icon/HandUp';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';

export type HandUpButtonProps = CallButtonsProps & {
  onReject?(): void | Promise<void>;
  onHangup?(): void | Promise<void>;
  disableHangup?: boolean;
  isInComingCall?: boolean;
};

export const HandUpButton: FunctionComponent<HandUpButtonProps> = ({
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
    <CircleIconButton
      dataSign={dataSign}
      data-icon="hand-up"
      symbol={handUpSvg}
      title={i18n.getString(endTitle, currentLocale)}
      color={['semantic', 'negative']}
      onClick={isInComingCall ? onReject : onHangup}
      disabled={disableHangup}
      size={size}
      className={className}
    />
  );
};

HandUpButton.defaultProps = {
  onReject() {},
  onHangup() {},
  disableHangup: false,
  isInComingCall: false,
  currentLocale: 'en-US',
  dataSign: 'handUp',
};
