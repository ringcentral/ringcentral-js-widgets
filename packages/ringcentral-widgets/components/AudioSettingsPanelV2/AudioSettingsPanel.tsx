import { TEST_TYPE } from '@ringcentral-integration/commons/modules/VolumeInspector';
import { RcSwitch, RcTypography } from '@ringcentral/juno';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import {
  PageHeader,
  PageHeaderBack,
  PageHeaderRemain,
  PageHeaderTitle,
} from '../BackHeader/PageHeader';
import { RingtoneSelection } from '../RingtoneSelection';

import type { AudioSettingsPanelProps } from './AudioSettingsPanel.interface';
import {
  VolumeTester,
  AudioDeviceSelect,
  Section,
  VolumeSlider,
} from './components';
import { t } from './i18n';
import styles from './styles.scss';

export const AudioSettingsPanel: FC<AudioSettingsPanelProps> = ({
  availableInputDevices,
  availableOutputDevices,
  availableRingtoneDevices,
  callVolume,
  showDangerAlert,
  className = null,
  inputDeviceDisabled = false,
  inputDeviceId,
  onBackButtonClick,
  onSave,
  outputDeviceDisabled = false,
  ringtoneSelectDisabled = false,
  outputDeviceId,
  ringtoneVolume,
  isAGCEnabled,
  showAGCEnabled,
  hasUserMedia,
  ringtoneDeviceId,
  handleTestMicroClick,
  handleTestSpeakerClick,
  showAlert,
  volumeTestData,
  fullRingtoneList,
  selectedRingtoneId,
  isUploadRingtoneDisabled,
  enableCustomRingtone,
  uploadCustomRingtone,
  updateCurrentRingtone,
  removeCustomRingtone,
}) => {
  useEffect(() => {
    showAlert();
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <PageHeader>
        <PageHeaderBack onClick={onBackButtonClick} />
        <PageHeaderTitle>{t('title')}</PageHeaderTitle>
        <PageHeaderRemain />
      </PageHeader>
      <div className={styles.content}>
        <Section label={t('input')} dataSign="inputDeviceSection">
          <AudioDeviceSelect
            dataSign="microphoneDeviceSelect"
            label={t('microphone')}
            availableDevices={availableInputDevices}
            isDisabled={inputDeviceDisabled}
            deviceId={inputDeviceId}
            onChange={(deviceId) => {
              onSave({
                inputDeviceId: deviceId,
              });
            }}
          />
          <VolumeTester
            {...volumeTestData}
            disabled={inputDeviceDisabled}
            audioType={TEST_TYPE.microphone}
            handleButtonClick={() => {
              handleTestMicroClick(volumeTestData.testState);
            }}
          />
          {showAGCEnabled && (
            <RcSwitch
              formControlLabelProps={{
                labelPlacement: 'start',
                style: {
                  marginLeft: 0,
                },
              }}
              disabled={!hasUserMedia}
              className={styles.switch}
              label={
                <RcTypography variant="body2">
                  {t('autoAdjustMicLevel')}
                </RcTypography>
              }
              checked={isAGCEnabled}
              onChange={(_, checked) => {
                onSave({
                  isAGCEnabled: checked,
                });
              }}
            />
          )}
        </Section>
        <Section label={t('output')} dataSign="outputDeviceSection">
          <AudioDeviceSelect
            dataSign="speakerDeviceSelect"
            availableDevices={availableOutputDevices}
            isDisabled={outputDeviceDisabled}
            deviceId={outputDeviceId}
            onChange={(deviceId) => {
              onSave({
                outputDeviceId: deviceId,
              });
            }}
            label={t('speakerSource')}
          />
          <VolumeTester
            {...volumeTestData}
            audioType={TEST_TYPE.speaker}
            disabled={outputDeviceDisabled}
            handleButtonClick={() => {
              handleTestSpeakerClick(volumeTestData.testState);
            }}
          />
          <VolumeSlider
            volume={callVolume}
            dataSign="speakerVolume"
            label={t('speakerVolume')}
            onChange={(volume) => {
              onSave({
                callVolume: volume,
              });
            }}
          />
          <AudioDeviceSelect
            dataSign="ringtoneDeviceSelect"
            isDisabled={ringtoneSelectDisabled}
            availableDevices={availableRingtoneDevices}
            deviceId={ringtoneDeviceId}
            onChange={(deviceId) => {
              onSave({
                ringtoneDeviceId: deviceId,
              });
            }}
            label={t('ringtoneSource')}
          />
          <RingtoneSelection
            label={t('ringtones')}
            ringtoneDeviceId={ringtoneDeviceId}
            ringtoneList={fullRingtoneList}
            isDisabled={ringtoneSelectDisabled}
            selectedRingtoneId={selectedRingtoneId}
            volume={ringtoneVolume}
            isUploadRingtoneDisabled={isUploadRingtoneDisabled}
            enableCustomRingtone={enableCustomRingtone}
            updateCurrentRingtone={updateCurrentRingtone}
            uploadCustomRingtone={uploadCustomRingtone}
            removeCustomRingtone={removeCustomRingtone}
            showAlert={showDangerAlert}
          />
          <VolumeSlider
            volume={ringtoneVolume}
            dataSign="ringtoneVolume"
            label={t('ringtoneVolume')}
            onChange={(volume) => {
              onSave({
                ringtoneVolume: volume,
              });
            }}
          />
        </Section>
      </div>
    </div>
  );
};
