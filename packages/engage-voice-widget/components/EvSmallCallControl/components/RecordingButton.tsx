import { RcIconButton } from '@ringcentral/juno';
import type { FunctionComponent } from 'react';
import React from 'react';

import RecordingSvg from '../../../assets/icons/icon-recording.svg';
import type { CallButtonsProps } from '../../SmallCallControl';
import i18n from '../i18n';

import styles from './styles.scss';

export type RecordingButtonProps = CallButtonsProps & {
  disabled?: boolean;
  time?: number;
};

export const RecordingButton: FunctionComponent<RecordingButtonProps> = ({
  currentLocale,
  disabled,
  size,
}) => {
  return (
    <RcIconButton
      data-sign="Recording"
      color="danger.f02"
      symbol={RecordingSvg}
      variant="round"
      title={i18n.getString('Recording', currentLocale)}
      shouldPersistBg
      TooltipProps={{
        ignorePointer: disabled,
        maskProps: {
          className: disabled && styles.disableRecordingBtn,
        },
      }}
      disabled={disabled}
      size={size}
    />
  );
};

RecordingButton.defaultProps = {
  disabled: true,
  currentLocale: 'en-US',
  dataSign: 'Recording',
  time: 0,
};
