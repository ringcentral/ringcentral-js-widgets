import activeCallSvg from '@ringcentral-integration/rcui/icons/icon-active-call.svg';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import { CallButtonsProps } from '../../SmallCallControl';
import i18n from '../i18n';

export type ActiveCallButtonProps = CallButtonsProps & {
  onActive?(): void;
  disableActive?: boolean;
};

export const ActiveCallButton: FunctionComponent<ActiveCallButtonProps> = ({
  currentLocale,
  disableActive,
  onActive,
  size,
}) => {
  return (
    <CircleIconButton
      symbol={activeCallSvg}
      title={i18n.getString('activeCall', currentLocale)}
      onClick={onActive}
      disabled={disableActive}
      size={size}
      active
    />
  );
};

ActiveCallButton.defaultProps = {
  onActive() {},
  disableActive: false,
  currentLocale: 'en-US',
};
