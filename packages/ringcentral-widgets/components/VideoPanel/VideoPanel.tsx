import React, { useRef, useState } from 'react';
import { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import sleep from '@ringcentral-integration/commons/lib/sleep';

import isSafari from '../../lib/isSafari';
import { Topic, TopicRef } from '../InnerTopic';
import styles from './styles.scss';
import { VideoConfig } from './VideoConfig';

/** @deprecated */
export const VideoPanel: React.FunctionComponent<VideoPanelProps> = ({
  scheduleButton: ScheduleButton,
  meeting,
  hidden,
  currentLocale,
  onOK,
  showSaveAsDefault,
  disableSaveAsDefault,
  disabled,
  openNewWindow,
  schedule,
  updateMeetingSettings,
  validatePasswordSettings,
  init,
  recipientsSection,
  showWhen,
  showDuration,
  brandName,
  showRcvAdminLock,
  showPmiAlert,
  enableWaitingRoom,
  enablePersonalMeeting,
  enableJoinAfterMeCopy,
  personalMeetingId,
  switchUsePersonalMeetingId,
  updateHasSettingsChanged,
}) => {
  const topicRef = useRef<TopicRef>(null);

  return (
    <div className={styles.videoPanel}>
      <VideoConfig
        currentLocale={currentLocale}
        meeting={meeting}
        updateMeetingSettings={updateMeetingSettings}
        validatePasswordSettings={validatePasswordSettings}
        recipientsSection={recipientsSection}
        init={init}
        showWhen={showWhen}
        showDuration={showDuration}
        brandName={brandName}
        showRcvAdminLock={showRcvAdminLock}
        showPmiAlert={showPmiAlert}
        enableWaitingRoom={enableWaitingRoom}
        enablePersonalMeeting={enablePersonalMeeting}
        enableJoinAfterMeCopy={enableJoinAfterMeCopy}
        personalMeetingId={personalMeetingId}
        switchUsePersonalMeetingId={switchUsePersonalMeetingId}
        updateHasSettingsChanged={updateHasSettingsChanged}
      >
        <Topic
          name={meeting.name}
          updateMeetingTopic={(name) => {
            updateMeetingSettings({ name });
          }}
          currentLocale={currentLocale}
          ref={topicRef}
        />
      </VideoConfig>
      {ScheduleButton ? (
        <ScheduleButton
          currentLocale={currentLocale}
          hidden={hidden}
          disabled={disabled}
          meeting={meeting}
          onOK={onOK}
          onClick={async () => {
            if (!disabled) {
              await sleep(100);
              const opener = openNewWindow && isSafari() ? window.open() : null;
              await schedule(
                {
                  ...meeting,
                  name: topicRef.current.value,
                },
                opener,
              );
            }
          }}
          update={updateMeetingSettings}
          showSaveAsDefault={showSaveAsDefault}
          disableSaveAsDefault={disableSaveAsDefault}
        />
      ) : null}
    </div>
  );
};

interface VideoPanelProps {
  currentLocale: string;
  meeting: RcVMeetingModel;
  schedule: (meeting: RcVMeetingModel, opener: Window) => any;
  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  hidden: boolean;
  disabled: boolean;
  onOK: any;
  onClick: any;
  update: any;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  scheduleButton: any;
  openNewWindow: any;
  init: any;
  brandName: string;
  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
  showRcvAdminLock?: boolean;
  showPmiAlert?: boolean;
  enableWaitingRoom?: boolean;
  enablePersonalMeeting?: boolean;
  enableJoinAfterMeCopy?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
  updateHasSettingsChanged: (isChanged: boolean) => void;
}
