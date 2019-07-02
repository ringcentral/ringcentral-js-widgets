import React from 'react';
import PropTypes from 'prop-types';
import sleep from 'ringcentral-integration/lib/sleep';
import 'react-widgets/dist/css/react-widgets.css';
import MeetingConfigs from '../MeetingConfigs';
import styles from './styles.scss';
import { isSafari } from '../MeetingConfigs/constants';

function MeetingPanel(props) {
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
            const opener = (openNewWindow && isSafari()) ? window.open() : null;
            await invite(meeting, opener);
          }
        }}
        update={update}
        showSaveAsDefault={showSaveAsDefault}
      />
      )
      }
    </div>
  );
}

MeetingPanel.propTypes = {
  update: PropTypes.func.isRequired,
  invite: PropTypes.func,
  init: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
  scheduleButton: PropTypes.func,
  recipientsSection: PropTypes.node,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  showWhen: PropTypes.bool,
  showDuration: PropTypes.bool,
  showRecurringMeeting: PropTypes.bool,
  openNewWindow: PropTypes.bool,
  meetingOptionToggle: PropTypes.bool,
  passwordPlaceholderEnable: PropTypes.bool,
  audioOptionToggle: PropTypes.bool,
  onOK: PropTypes.func,
  showSaveAsDefault: PropTypes.bool,
};

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
};

export default MeetingPanel;
