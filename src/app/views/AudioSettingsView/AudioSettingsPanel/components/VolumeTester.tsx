import {
  AUDIO_TYPE,
  TEST_STATE,
  TEST_TYPE,
} from '@ringcentral-integration/micro-phone/src/app/services/VolumeInspector';
import { Text, Button } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { t } from '../i18n';

import { VolumeGauge } from './VolumeGauge';

type VolumeTesterProps = {
  type: AUDIO_TYPE | null;
  audioType: AUDIO_TYPE;
  volume: number;
  testState: number;
  gaugeSize?: number;
  handleButtonClick: (...args: any[]) => any;
  isRecording?: boolean;
  countDown?: number;
  disabled?: boolean;
};

export const VolumeTester = (props: VolumeTesterProps) => {
  const {
    type,
    audioType,
    handleButtonClick,
    gaugeSize = 16,
    volume,
    testState,
    countDown,
    isRecording,
    disabled,
  } = props;

  const isInactive = useMemo(() => {
    return type && audioType !== type;
  }, [audioType, type]);

  const convertVolumeForGauge = useMemo(() => {
    if (isInactive) {
      return 0;
    }
    return Math.floor(gaugeSize * volume) * (100 / gaugeSize);
  }, [gaugeSize, volume, isInactive]);

  const buttonText = useMemo(() => {
    const defaultText = t(
      audioType === TEST_TYPE.microphone
        ? 'startRecordButton'
        : 'startTestButton',
    );
    if (isInactive) {
      return defaultText;
    }
    switch (testState) {
      case TEST_STATE.RECORDS_AUDIO:
        return t('stopRecordButton');
      case TEST_STATE.PLAYS_AUDIO:
        return t('stopPlaybackButton');
      default:
        return defaultText;
    }
  }, [testState, audioType, isInactive]);

  const hintText = useMemo(() => {
    if (isInactive) {
      return null;
    }
    if (testState === TEST_STATE.RECORDS_AUDIO && countDown) {
      return t('stopRecordDescription', {
        countDown,
      });
    }
    if (testState === TEST_STATE.PLAYS_AUDIO) {
      return t(
        audioType === TEST_TYPE.microphone
          ? 'stopPlaybackDescription'
          : 'stopTestDescription',
      );
    }
    return null;
  }, [countDown, testState, audioType, isInactive]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {hintText ? (
        <Text
          data-sign={`test-${audioType}-hint`}
          className={clsx(
            'text-xs block',
            isRecording ? 'text-danger' : 'text-success',
          )}
          component="p"
        >
          {hintText}
        </Text>
      ) : null}
      <div>
        <Button
          size="small"
          variant="outlined"
          data-sign={`test-${audioType}-button`}
          disabled={isInactive || disabled}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
      <VolumeGauge
        data-sign={`test-${audioType}-volume-gauge`}
        volume={convertVolumeForGauge}
        size={gaugeSize}
        isRecording={isRecording}
      />
    </div>
  );
};
