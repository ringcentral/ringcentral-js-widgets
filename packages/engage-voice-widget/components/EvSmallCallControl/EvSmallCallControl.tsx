import type { FunctionComponent } from 'react';
import React from 'react';

import type { SmallCallControlProps } from '../SmallCallControl';
import {
  HangUpButton,
  HoldCallButton,
  MuteCallButton,
  SmallCallControl,
  TransferCallButton,
} from '../SmallCallControl';

import type {
  ActiveCallButtonProps,
  CountDownButtonProps,
  RecordControlButtonProps,
  RecordingButtonProps,
} from './components';
import {
  ActiveCallButton,
  CountDownButton,
  RecordControlButton,
  RecordingButton,
} from './components';

export type EvSmallCallControlProps = ActiveCallButtonProps &
  RecordingButtonProps &
  CountDownButtonProps &
  RecordControlButtonProps &
  SmallCallControlProps & {
    isOnActive?: boolean;
    showMuteButton?: boolean;
    showRecordCall?: boolean;
    recordPauseCount: number;
    disableRecordControl: boolean;
    isRecording: boolean;
  };

export const EvSmallCallControl: FunctionComponent<EvSmallCallControlProps> = ({
  isOnActive,
  showMuteButton,
  showRecordCall,
  recordPauseCount,
  disableRecordControl,
  isRecording,
  ...rest
}) => {
  let configData;
  let RecordBtn: FunctionComponent<
    CountDownButtonProps | RecordControlButtonProps | RecordingButtonProps
  >;

  if (!disableRecordControl) {
    if (recordPauseCount !== null && !isRecording) {
      configData = { recordPauseCount, ...rest };
      RecordBtn = CountDownButton;
    } else {
      configData = { isRecording, ...rest };
      RecordBtn = RecordControlButton;
    }
  } else {
    configData = { disabled: true, ...rest };
    RecordBtn = RecordingButton;
  }

  return (
    <SmallCallControl {...rest}>
      <HoldCallButton {...rest} />
      {showMuteButton && <MuteCallButton {...rest} />}
      <TransferCallButton {...rest} />
      {showRecordCall && <RecordBtn {...configData} data-sign="recordButton" />}
      {isOnActive ? <ActiveCallButton {...rest} /> : <HangUpButton {...rest} />}
    </SmallCallControl>
  );
};

EvSmallCallControl.defaultProps = {
  isOnActive: false,
  showMuteButton: false,
  showRecordCall: false,
};
