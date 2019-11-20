import 'react-widgets/dist/css/react-widgets.css';

import React from 'react';
import sleep from 'ringcentral-integration/lib/sleep';
import isSafari from '../../lib/isSafari';

import MeetingConfigs from '../MeetingConfigs';
import styles from './styles.scss';

const MeetingPanel: React.FunctionComponent<MeetingProps> = (props) => {
  const {
    update,
    meeting,
    hidden,
    disabled,
    invite,
    currentLocale,
    scheduleButton: ScheduleButton,
    recipientsSection,
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
    launchMeeting,
  } = props;

  return (
    <div className={styles.meetingPanel}>
      {!hidden ? (
        <MeetingConfigs
          update={update}
          init={init}
          meeting={meeting}
          disabled={disabled}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showWhen={showWhen}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          openNewWindow={openNewWindow}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          audioOptionToggle={audioOptionToggle}
        />
      ) : null}
      {ScheduleButton && (
        <ScheduleButton
          currentLocale={currentLocale}
          hidden={hidden}
          disabled={disabled}
          meeting={meeting}
          onOK={onOK}
          onClick={async () => {
            if (!disabled) {
              await sleep(100);
              /**
               * HACK: for safari, we can only open new tab within click event callback's synchronous call stack
               * so we have to couple the UI with logic in here:(
               * https://stackoverflow.com/a/24327319
               */
              const opener = openNewWindow && isSafari() ? window.open() : null;
              await invite(meeting, opener);
            }
          }}
          update={update}
          showSaveAsDefault={showSaveAsDefault}
          launchMeeting={launchMeeting}
        />
      )}
    </div>
  );
};

interface ScheduleButtonProps {
  currentLocale: string;
  hidden: boolean;
  disabled: boolean;
  meeting: any;
  onOK: () => void;
  onClick: () => void;
  update: () => any;
  showSaveAsDefault: boolean;
}

interface MeetingProps {
  update: () => any;
  invite?: (meeting: any, openr: any) => any;
  init: () => any;
  meeting: any;
  currentLocale: string;
  scheduleButton?: React.FunctionComponent<ScheduleButtonProps>;
  recipientsSection: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
  showWhen?: boolean;
  showDuration?: boolean;
  showRecurringMeeting?: boolean;
  openNewWindow?: boolean;
  meetingOptionToggle?: boolean;
  passwordPlaceholderEnable?: boolean;
  audioOptionToggle?: boolean;
  onOK?: () => any;
  showSaveAsDefault?: boolean;
  launchMeeting?: () => any;
}

MeetingPanel.defaultProps = {
  invite() {},
  recipientsSection: undefined,
  disabled: false,
  hidden: false,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
  openNewWindow: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  onOK: undefined,
  scheduleButton: undefined,
  showSaveAsDefault: false,
  launchMeeting: undefined,
};

export default MeetingPanel;
