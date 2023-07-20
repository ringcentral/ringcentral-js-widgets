import type { FunctionComponent } from 'react';
import React from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { ActiveCall } from '@ringcentral/juno-icon';

import type { CallButtonsProps } from '../../SmallCallControl';
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
    <RcIconButton
      data-sign={dataSign}
      color="interactive.b02"
      symbol={ActiveCall}
      size={size}
      disabled={disableActive}
      onClick={onActive}
      title={i18n.getString('activeCall', currentLocale)}
    />
  );
};

ActiveCallButton.defaultProps = {
  onActive() {},
  disableActive: false,
  currentLocale: 'en-US',
  dataSign: 'activeCall',
};
