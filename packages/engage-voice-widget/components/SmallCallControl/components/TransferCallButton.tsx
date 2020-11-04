import transferCallSvg from '@ringcentral/juno/icons/icon-transfer-call.svg';
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
}) => {
  return (
    <CircleIconButton
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
};
