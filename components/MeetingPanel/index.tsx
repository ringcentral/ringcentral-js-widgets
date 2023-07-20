import 'react-widgets/dist/css/react-widgets.css';

import type { FunctionComponent } from 'react';
import React from 'react';

import { sleep } from '@ringcentral-integration/commons/utils';
import { isSafari } from '@ringcentral-integration/utils';

import MeetingConfig from '../MeetingConfigs';
import styles from './styles.scss';

const MeetingPanel: FunctionComponent<MeetingProps> = (props) => {
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
    disableSaveAsDefault,
    launchMeeting,
    enablePersonalMeeting,
    personalMeetingId,
    switchUsePersonalMeetingId,
  } = props;

  return (
    <div className={styles.meetingPanel}>
      {!hidden ? (
        <MeetingConfig
          update={update}
          init={init}
          meeting={meeting}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          disabled={disabled}
          currentLocale={currentLocale}
          recipientsSection={recipientsSection}
          showWhen={showWhen}
          showDuration={showDuration}
          showRecurringMeeting={showRecurringMeeting}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable}
          audioOptionToggle={audioOptionToggle}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          enablePersonalMeeting={enablePersonalMeeting}
          personalMeetingId={personalMeetingId}
          switchUsePersonalMeetingId={switchUsePersonalMeetingId}
        />
      ) : null}
      {ScheduleButton && (
        <ScheduleButton
          currentLocale={currentLocale}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          hidden={hidden}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          disabled={disabled}
          meeting={meeting}
          // @ts-expect-error TS(2322): Type '(() => any) | undefined' is not assignable t... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              await invite(meeting, opener);
            }
          }}
          update={update}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          showSaveAsDefault={showSaveAsDefault}
          // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
          disableSaveAsDefault={disableSaveAsDefault}
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
  disableSaveAsDefault: boolean;
}

interface MeetingProps {
  update: () => any;
  invite?: (meeting: any, openr: any) => any;
  init: () => any;
  meeting: any;
  currentLocale: string;
  scheduleButton?: FunctionComponent<ScheduleButtonProps>;
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
  disableSaveAsDefault?: boolean;
  launchMeeting?: () => any;
  enablePersonalMeeting?: boolean;
  personalMeetingId: string;
  switchUsePersonalMeetingId: (usePersonalMeetingId: boolean) => any;
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
  enablePersonalMeeting: false,
  showSaveAsDefault: false,
  disableSaveAsDefault: false,
  launchMeeting: undefined,
};

export default MeetingPanel;
