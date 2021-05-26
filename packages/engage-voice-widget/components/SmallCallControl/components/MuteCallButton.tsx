import React, { FunctionComponent } from 'react';
import { RcIconButton } from '@ringcentral/juno';
import { Mic, MicOff } from '@ringcentral/juno/icon';

import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';

export type MuteCallButtonProps = CallButtonsProps & {
  isOnMute: boolean;
  onUnmute?(): void | Promise<void>;
  onMute?(): void | Promise<void>;
  disableMute?: boolean;
};
export const MuteCallButton: FunctionComponent<MuteCallButtonProps> = ({
  isOnMute,
  currentLocale,
  onUnmute,
  onMute,
  size,
  className,
  disableMute,
  dataSign,
}) => {
  const { muteTitle } = getCircleIconButtonTitle({
    isOnMute,
  });

  let color = disableMute ? 'icon.disabled' : 'icon.dark';
  if (isOnMute) {
    color = 'icon.primary';
  }

  return (
    <RcIconButton
      data-sign={dataSign}
      symbol={isOnMute ? MicOff : Mic}
      data-icon={isOnMute ? 'mic-off' : 'mic'}
      title={i18n.getString(muteTitle, currentLocale)}
      color={color}
      shouldPersistBg={isOnMute || disableMute}
      onClick={isOnMute ? onUnmute : onMute}
      disabled={disableMute}
      size={size}
      className={className}
      useColorWhenDisabled={isOnMute}
    />
  );
};

MuteCallButton.defaultProps = {
  onMute() {},
  onUnmute() {},
  disableMute: false,
  currentLocale: 'en-US',
  dataSign: 'muteCall',
};
