import transferCallSvg from '@ringcentral/juno/icon/TransferCall';
import React, { FunctionComponent } from 'react';

import { CircleIconButton } from '../../CircleIconButton';
import i18n from '../i18n';
import { CallButtonsProps } from './CallButtons.interface';

export type TransferCallButtonProps = CallButtonsProps & {
  isOnTransfer?: boolean;
  onTransfer?(): void | Promise<void>;
  transferRef?: React.RefObject<HTMLSpanElement>;
  disableTransfer?: boolean;
};

export const TransferCallButton: FunctionComponent<TransferCallButtonProps> = ({
  currentLocale,
  isOnTransfer,
  onTransfer,
  transferRef,
  disableTransfer,
  size,
  className,
  dataSign,
}) => {
  return (
    <CircleIconButton
      dataSign={dataSign}
      data-icon="transfer-call"
      symbol={transferCallSvg}
      title={i18n.getString('transfer', currentLocale)}
      active={isOnTransfer}
      onClick={onTransfer}
      innerRef={transferRef}
      disabled={disableTransfer}
      size={size}
      className={className}
      normal
    />
  );
};

TransferCallButton.defaultProps = {
  onTransfer() {},
  disableTransfer: false,
  currentLocale: 'en-US',
  dataSign: 'transferCall',
};
