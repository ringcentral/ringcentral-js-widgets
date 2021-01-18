import activeCallSvg from '@ringcentral/juno/icon/ActiveCall';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import { CallButtonsProps } from '../../SmallCallControl';
import i18n from '../i18n';

export type ActiveCallButtonProps = CallButtonsProps & {
  onActive?(): void;
  disableActive?: boolean;
  dataSign?: string;
};

export const ActiveCallButton: FunctionComponent<ActiveCallButtonProps> = ({
  currentLocale,
  disableActive,
  onActive,
  size,
  dataSign,
}) => {
  return (
    <CircleIconButton
      dataSign={dataSign}
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
  dataSign: 'activeCall',
};
