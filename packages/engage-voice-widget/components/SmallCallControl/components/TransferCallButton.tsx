import React, { FunctionComponent } from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { TransferCall } from '@ringcentral/juno/icon';

import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';
import { getIconColor } from './getIconColor';

export type TransferCallButtonProps = CallButtonsProps & {
  isOnTransfer?: boolean;
  onTransfer?(): void | Promise<void>;
  transferRef?: React.RefObject<any>;
  disableTransfer?: boolean;
};

export const TransferCallButton: FunctionComponent<TransferCallButtonProps> = ({
  currentLocale,
  onTransfer,
  transferRef,
  disableTransfer,
  size,
  className,
  dataSign,
}) => {
  const color = getIconColor({
    active: false,
    disable: disableTransfer,
  });

  return (
    <RcIconButton
      ref={transferRef}
      size={size}
      onClick={onTransfer}
      symbol={TransferCall}
      disabled={disableTransfer}
      data-sign={dataSign}
      data-icon="transfer-call"
      title={i18n.getString('transfer', currentLocale)}
      color={color}
      className={className}
      shouldPersistBg={disableTransfer}
    />
  );
};

TransferCallButton.defaultProps = {
  onTransfer() {},
  disableTransfer: false,
  currentLocale: 'en-US',
  dataSign: 'transferCall',
};
