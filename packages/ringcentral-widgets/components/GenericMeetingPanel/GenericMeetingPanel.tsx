import sleep from 'ringcentral-integration/lib/sleep';
import React, { useState } from 'react';
import { SpinnerOverlay } from '../SpinnerOverlay';
import MeetingConfigs from '../MeetingConfigs';
import isSafari from '../../lib/isSafari';

import { VideoConfig, Topic } from '../VideoPanel/VideoConfig';
import { MeetingConfigs as MeetingConfigsV2 } from '../MeetingConfigsV2';

import { GenericMeetingPanelProps } from './interface';
import styles from './styles.scss';
import { RcMMeetingModel } from '../../../ringcentral-integration/modules/Meeting';
import { RcVMeetingModel } from '../../../ringcentral-integration/interfaces/Rcv.model';

const GenericMeetingPanel: React.ComponentType<GenericMeetingPanelProps> = (
  props,
) => {
  const [topicRef, setTopicRef] = useState(null);

  const { showCustom, CustomPanel } = props;
  if (showCustom) {
    return CustomPanel as JSX.Element;
  }

  const {
    useRcmV2,
    meeting,
    disabled,
    currentLocale,
    scheduleButton: ScheduleButton,
    recipientsSection,
    showTopic,
    showWhen,
    showDuration,
    showRecurringMeeting,
    openNewWindow,
    meetingOptionToggle,
    passwordPlaceholderEnable,
    audioOptionToggle,
    onOK,
    init,
    showSaveAsDefault,
    disableSaveAsDefault,
    updateMeetingSettings,
    validatePasswordSettings,
    isRCM,
    isRCV,
    datePickerSize,
    timePickerSize,
    showLaunchMeetingBtn,
    launchMeeting,
    scheduleButtonLabel,
    appCode,
    schedule,
    brandName,
    showSpinner,
    showAdminLock,
    showPmiAlert,
    enablePersonalMeeting,
    enableWaitingRoom,
    enableJoinAfterMeCopy,
    personalMeetingId,
    switchUsePersonalMeetingId,
    showScheduleOnBehalf,
    delegators,
    updateScheduleFor,
    labelPlacement,
    showSpinnerInConfigPanel,
  } = props;

  if (showSpinner) {
    return <SpinnerOverlay />;
  }

  return (
    <div className={styles.wrapper}>
      {isRCM && !useRcmV2 && (
        <MeetingConfigs
          useTimePicker
          update={updateMeetingSettings}
          init={init}
          meeting={meeting as RcMMeetingModel}
          disabled={disabled}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showWhen={showWhen}
          showTopic={showTopic}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          audioOptionToggle={audioOptionToggle}
          enablePersonalMeeting={enablePersonalMeeting}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
        />
      )}
      {isRCM && useRcmV2 && (
        <MeetingConfigsV2
          showSpinnerInConfigPanel={showSpinnerInConfigPanel}
          updateMeetingSettings={updateMeetingSettings}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
          init={init}
          labelPlacement={labelPlacement}
          meeting={meeting as RcMMeetingModel}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showTopic={showTopic}
          showWhen={showWhen}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          meetingOptionToggle={meetingOptionToggle}
          audioOptionToggle={audioOptionToggle}
          showScheduleOnBehalf={showScheduleOnBehalf}
          delegators={delegators}
          updateScheduleFor={updateScheduleFor}
        />
      )}
      {isRCV && (
        <VideoConfig
          currentLocale={currentLocale}
          labelPlacement={labelPlacement}
          meeting={meeting as RcVMeetingModel}
          updateScheduleFor={updateScheduleFor}
          updateMeetingSettings={updateMeetingSettings}
          validatePasswordSettings={validatePasswordSettings}
          recipientsSection={recipientsSection}
          showTopic={showTopic}
          showWhen={showWhen}
          showDuration={showDuration}
          init={init}
          datePickerSize={datePickerSize}
          timePickerSize={timePickerSize}
          brandName={brandName}
          showAdminLock={showAdminLock}
          showPmiAlert={showPmiAlert}
          enableWaitingRoom={enableWaitingRoom}
          enablePersonalMeeting={enablePersonalMeeting}
          enableJoinAfterMeCopy={enableJoinAfterMeCopy}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
          showScheduleOnBehalf={showScheduleOnBehalf}
          showSpinnerInConfigPanel={showSpinnerInConfigPanel}
          delegators={delegators}
        >
          {showTopic && (
            <Topic
              name={(meeting as RcVMeetingModel).name}
              updateMeetingTopic={(name) => {
                updateMeetingSettings({ name });
              }}
              currentLocale={currentLocale}
              setTopicRef={setTopicRef}
            />
          )}
        </VideoConfig>
      )}
      {(isRCM || isRCV) && ScheduleButton && (
        <ScheduleButton
          currentLocale={currentLocale}
          disabled={disabled}
          meeting={meeting}
          onOK={onOK}
          onClick={async () => {
            if (!disabled) {
              await sleep(100);
              const opener = openNewWindow && isSafari() ? window.open() : null;
              const meetingSetting = isRCM
                ? meeting
                : {
                    ...meeting,
                    name: topicRef.current.props.value,
                  };
              await schedule(meetingSetting, opener);
            }
          }}
          update={updateMeetingSettings}
          showSaveAsDefault={showSaveAsDefault}
          disableSaveAsDefault={disableSaveAsDefault}
          launchMeeting={launchMeeting}
          showLaunchMeetingBtn={showLaunchMeetingBtn}
          appCode={appCode}
          scheduleButtonLabel={scheduleButtonLabel}
        />
      )}
    </div>
  );
};

GenericMeetingPanel.defaultProps = {
  launchMeeting() {},
  disabled: false,
  showWhen: true,
  showTopic: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showAdminLock: false,
  showPmiAlert: false,
  enableWaitingRoom: false,
  enablePersonalMeeting: false,
  enableJoinAfterMeCopy: false,
  showSaveAsDefault: true,
  disableSaveAsDefault: false,
  showCustom: false,
  showLaunchMeetingBtn: false,
  appCode: '',
  scheduleButtonLabel: '',
  personalMeetingId: undefined,
  showSpinner: false,
  useRcmV2: false,
  labelPlacement: 'start',
};

export { GenericMeetingPanel };
