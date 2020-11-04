import holdSvg from '@ringcentral/juno/icons/icon-hold.svg';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import { getCircleIconButtonTitle } from '../help';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';

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
}) => {
  const { holdTitle } = getCircleIconButtonTitle({
    isOnHold,
  });
  return (
    <CircleIconButton
      data-icon="hold"
      symbol={holdSvg}
      title={i18n.getString(holdTitle, currentLocale)}
      active={isOnHold}
      onClick={isOnHold ? onUnHold : onHold}
      disabled={disableHold}
      size={size}
      className={className}
      normal
    />
  );
};

HoldCallButton.defaultProps = {
  onHold() {},
  onUnHold() {},
  disableHold: false,
  currentLocale: 'en-US',
};
