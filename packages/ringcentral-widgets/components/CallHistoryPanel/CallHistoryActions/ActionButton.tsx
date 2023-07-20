import type { FunctionComponent } from 'react';
import React from 'react';

import { RcIconButton } from '@ringcentral/juno';

import type { CallLogActionButton } from '../CallHistoryPanel.interface';

export const ActionButton: FunctionComponent<CallLogActionButton> = ({
  icon,
  label,
  disabled,
  action,
  dataSign,
}) => {
  return (
    <RcIconButton
      symbol={icon}
      color="interactive.f01"
      size="medium"
      variant="plain"
      title={label}
      onClick={action}
      disabled={disabled}
      data-sign={dataSign}
    />
  );
};
