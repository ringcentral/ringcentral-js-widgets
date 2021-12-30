import React, { FunctionComponent } from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { Hold } from '@ringcentral/juno/icon';

import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';
import { getIconColor } from './getIconColor';

export type HoldCallButtonProps = CallButtonsProps & {
  isOnHold: boolean;
  onUnHold?(): void | Promise<void>;
  onHold?(): void | Promise<void>;
  disableHold?: boolean;
};

export const HoldCallButton: FunctionComponent<HoldCallButtonProps> = ({
  currentLocale,
  isOnHold,
  onUnHold,
  onHold,
  size,
  disableHold,
  className,
  dataSign,
}) => {
  const { holdTitle } = getCircleIconButtonTitle({
    isOnHold,
  });

  const color = getIconColor({
    active: isOnHold,
    disable: disableHold,
  });

  return (
    <RcIconButton
      symbol={Hold}
      data-icon="hold"
      title={i18n.getString(holdTitle, currentLocale)}
      color={color}
      shouldPersistBg={isOnHold || disableHold}
      onClick={isOnHold ? onUnHold : onHold}
      disabled={disableHold}
      size={size}
      className={className}
      useColorWhenDisabled={isOnHold}
      data-sign={dataSign}
    />
  );
};

HoldCallButton.defaultProps = {
  onHold() {},
  onUnHold() {},
  disableHold: false,
  currentLocale: 'en-US',
  dataSign: 'holdCall',
};
