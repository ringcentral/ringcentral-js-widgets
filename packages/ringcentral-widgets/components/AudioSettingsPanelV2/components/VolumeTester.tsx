import {
  AUDIO_TYPE,
  TEST_STATE,
  TEST_TYPE,
} from '@ringcentral-integration/commons/modules/VolumeInspector';
import { RcTypography, RcButton } from '@ringcentral/juno';
import React, { useMemo } from 'react';

import { t } from '../i18n';
import styles from '../styles.scss';

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
    <div className={styles.testVolumeContainer}>
      {hintText ? (
        <RcTypography
          data-sign={`test-${audioType}-hint`}
          className={styles.testVolumeHint}
          color={isRecording ? 'danger.f02' : 'success.f02'}
          variant="caption1"
          display="block"
        >
          {hintText}
        </RcTypography>
      ) : null}
      <RcButton
        className={styles.testVolumeButton}
        size="small"
        variant="outlined"
        data-sign={`test-${audioType}-button`}
        disabled={isInactive || disabled}
        onClick={handleButtonClick}
      >
        {buttonText}
      </RcButton>
      <VolumeGauge
        data-sign={`test-${audioType}-volume-gauge`}
        volume={convertVolumeForGauge}
        size={gaugeSize}
        isRecording={isRecording}
      />
    </div>
  );
};
