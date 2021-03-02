import React, { FunctionComponent } from 'react';
import { RcIconButton } from '@ringcentral/juno';
import { CallLogActionButton } from 'ringcentral-integration/interfaces/CallLog.interface';

export const ActionButton: FunctionComponent<CallLogActionButton> = ({
  icon,
  label,
  disabled,
  action,
}) => {
  return (
    <RcIconButton
      symbol={icon}
      color="icon.primary"
      size="medium"
      variant="plain"
      title={label}
      onClick={action}
      disabled={disabled}
    />
  );
};
