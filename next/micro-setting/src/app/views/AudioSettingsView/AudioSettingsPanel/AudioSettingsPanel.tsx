/* eslint-disable react/destructuring-assignment */
import { isFirefox } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import {
  AppFooterNav,
  AppHeaderNav,
} from '@ringcentral-integration/micro-core/src/app/components';
import { TEST_TYPE } from '@ringcentral-integration/micro-phone/src/app/services/VolumeInspector';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { isSafari } from '@ringcentral-integration/utils';
import { Switch, FormLabel } from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import type { FC } from 'react';

import { Section } from '../../../components/Section';

import type { AudioSettingsPanelProps } from './AudioSettingsPanel.interface';
import {
  VolumeTester,
  AudioDeviceSelect,
  VolumeSlider,
  RingtoneSelection,
} from './components';
import { t } from './i18n';

const sectionClasses = { content: 'py-3 px-4' };

export const AudioSettingsPanel: FC<AudioSettingsPanelProps> = ({
  availableInputDevices,
  availableOutputDevices,
  availableRingtoneDevices,
  callVolume,
  showDangerAlert,
  showHeader = true,
  showRingtoneConfig = true,
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
  checkAudioAvailable,
  volumeTestData,
  fullRingtoneList,
  selectedRingtoneId,
  isUploadRingtoneDisabled,
  enableCustomRingtone,
  uploadCustomRingtone,
  updateCurrentRingtone,
  removeCustomRingtone,
  onExit,
}) => {
  useEffect(() => {
    checkAudioAvailable();
    return () => {
      onExit();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableTestVolumeAndSource = !(isSafari() || isFirefox());

  return (
    <>
      {showHeader && (
        <AppHeaderNav override>
          <PageHeader onBackClick={onBackButtonClick}>{t('title')}</PageHeader>
        </AppHeaderNav>
      )}
      <div
        className={clsx(
          'flex-auto overflow-y-auto overflow-x-hidden px-4 py-2 space-y-5',
          className,
        )}
        data-sign="audioSettingsPanel"
      >
        {enableTestVolumeAndSource && (
          <Section
            label={t('input')}
            data-sign="inputDeviceSection"
            classes={sectionClasses}
          >
            <AudioDeviceSelect
              data-sign="microphoneDeviceSelect"
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
              <FormLabel
                label={t('autoAdjustMicLevel')}
                placement="start"
                className="justify-between w-full"
              >
                <Switch
                  data-sign="autoAdjustMicLevel"
                  disabled={!hasUserMedia}
                  className="flex-none"
                  checked={isAGCEnabled}
                  onChange={(e) => {
                    onSave({
                      isAGCEnabled: e.target.checked,
                    });
                  }}
                />
              </FormLabel>
            )}
          </Section>
        )}
        <Section
          label={t('output')}
          data-sign="outputDeviceSection"
          classes={sectionClasses}
        >
          {enableTestVolumeAndSource && (
            <AudioDeviceSelect
              data-sign="speakerDeviceSelect"
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
          )}
          {enableTestVolumeAndSource && (
            <VolumeTester
              {...volumeTestData}
              audioType={TEST_TYPE.speaker}
              disabled={outputDeviceDisabled}
              handleButtonClick={() => {
                handleTestSpeakerClick(volumeTestData.testState);
              }}
            />
          )}
          <VolumeSlider
            volume={callVolume}
            className="mb-4"
            dataSign="speakerVolume"
            label={t('speakerVolume')}
            onChange={(volume) => {
              onSave({
                callVolume: volume,
              });
            }}
          />
          {showRingtoneConfig && enableTestVolumeAndSource && (
            <AudioDeviceSelect
              data-sign="ringtoneDeviceSelect"
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
          )}
          {showRingtoneConfig && (
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
          )}
          {showRingtoneConfig && (
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
          )}
        </Section>
      </div>
      <AppFooterNav />
    </>
  );
};
