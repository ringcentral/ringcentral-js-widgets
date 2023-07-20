import type { FunctionComponent } from 'react';
import React from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { StopRecord } from '@ringcentral/juno-icon';

import RecordControlSvg from '../../../assets/icons/icon-record.svg';
import type { CallButtonsProps } from '../../SmallCallControl';
import i18n from '../i18n';

export type RecordControlButtonProps = CallButtonsProps & {
  isRecording?: boolean;
  onRecord?(): void | Promise<void>;
  onPauseRecord?(): void | Promise<void>;
  onStopRecord?(): void | Promise<void>;
  disablePauseRecord?: boolean;
};

export const RecordControlButton: FunctionComponent<RecordControlButtonProps> =
  ({
    currentLocale,
    isRecording,
    onRecord,
    onStopRecord,
    disablePauseRecord,
    size,
    className,
    onPauseRecord,
  }) => {
    return isRecording ? (
      <RcIconButton
        data-sign={disablePauseRecord ? 'StopRecording' : 'PauseRecording'}
        color="danger.f02"
        symbol={StopRecord}
        variant="round"
        title={i18n.getString(
          disablePauseRecord ? 'stopRecording' : 'pauseRecording',
          currentLocale,
        )}
        onClick={disablePauseRecord ? onStopRecord : onPauseRecord}
        size={size}
        className={className}
        shouldPersistBg
      />
    ) : (
      <RcIconButton
        data-sign="StartRecording"
        symbol={RecordControlSvg}
        variant="round"
        title={i18n.getString('startRecording', currentLocale)}
        onClick={onRecord}
        size={size}
        className={className}
      />
    );
  };

RecordControlButton.defaultProps = {
  currentLocale: 'en-US',
};
