import type { FunctionComponent } from 'react';
import React from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { Mic, MicOff } from '@ringcentral/juno-icon';

import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import type { CallButtonsProps } from './CallButtons.interface';
import { getIconColor } from './getIconColor';

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

  const color = getIconColor({
    active: isOnMute,
    disable: disableMute,
  });

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
