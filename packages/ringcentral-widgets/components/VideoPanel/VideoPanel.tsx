import React, { useState } from 'react';
import sleep from 'ringcentral-integration/lib/sleep';
import { RcVMeetingModel } from 'ringcentral-integration/models/rcv.model';

import isSafari from '../../lib/isSafari';
import { VideoConfig, Topic } from './VideoConfig';
import styles from './styles.scss';

export const VideoPanel: React.FunctionComponent<VideoPanelProps> = ({
  scheduleButton: ScheduleButton,
  meeting,
  hidden,
  currentLocale,
  onOK,
  showSaveAsDefault,
  disabled,
  openNewWindow,
  invite,
  updateMeetingSettings,
  validatePasswordSettings,
  init,
  recipientsSection,
  showWhen,
  showDuration,
  brandName,
}) => {
  const [topicRef, setTopicRef] = useState(null);
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
      >
        <Topic
          name={meeting.name}
          updateMeetingTopic={(name) => {
            updateMeetingSettings({ name });
          }}
          currentLocale={currentLocale}
          setTopicRef={setTopicRef}
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
              await invite(
                {
                  ...meeting,
                  name: topicRef.current.props.value,
                },
                opener,
              );
            }
          }}
          update={updateMeetingSettings}
          showSaveAsDefault={showSaveAsDefault}
        />
      ) : null}
    </div>
  );
};

interface VideoPanelProps {
  currentLocale: string;
  meeting: RcVMeetingModel;
  updateMeetingSettings: (meeting: Partial<RcVMeetingModel>) => void;
  validatePasswordSettings: (password: string, isSecret: boolean) => boolean;
  hidden: boolean;
  disabled: boolean;
  onOK: any;
  onClick: any;
  update: any;
  showSaveAsDefault: any;
  scheduleButton: any;
  openNewWindow: any;
  invite: any;
  init: any;
  brandName: string;
  recipientsSection?: React.ReactNode;
  showWhen?: boolean;
  showDuration?: boolean;
}
