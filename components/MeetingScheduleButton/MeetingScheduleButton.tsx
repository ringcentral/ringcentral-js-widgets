import React from 'react';
import classnames from 'classnames';
import { RcMMeetingModel } from 'ringcentral-integration/modules/Meeting/Meeting';

import styles from './styles.scss';
import i18n from './i18n';
import { Button } from '../Button';
import CheckBox from '../CheckBox';

type Props = {
  currentLocale: string;
  meeting: RcMMeetingModel;
  scheduleButtonLabel: string;
  onClick?: () => any;
  hidden?: boolean;
  showSaveAsDefault?: boolean;
  disableSaveAsDefault?: boolean;
  disabled?: boolean;
  update?: (any) => any;
  showLaunchMeetingBtn?: boolean;
  launchMeeting?: (meeting?: RcMMeetingModel) => any;
};

export class MeetingScheduleButton extends React.Component<Props, {}> {
  static defaultProps = {
    meeting: null,
    hidden: false,
    disabled: false,
    currentLocale: undefined,
    showSaveAsDefault: false,
    disableSaveAsDefault: false,
    update() {},
    showLaunchMeetingBtn: false,
    launchMeeting() {},
    onClick() {},
  };

  getI18nButtonString() {
    return i18n.getString('schedule');
  }

  getI18nPromptString() {
    return i18n.getString('prompt');
  }

  getI18nTermsString() {
    return i18n.getString('terms');
  }

  render() {
    const {
      hidden,
      meeting,
      currentLocale,
      showSaveAsDefault,
      disableSaveAsDefault,
      update,
      showLaunchMeetingBtn,
      onClick,
      launchMeeting,
      scheduleButtonLabel,
      disabled,
    } = this.props;
    return (
      <div
        className={classnames(
          styles.inviteBox,
          !hidden ? styles.withShadow : styles.onlyButton,
        )}
      >
        {hidden ? (
          <div className={styles.actionPrompt}>
            {this.getI18nPromptString()}
          </div>
        ) : null}
        {showSaveAsDefault ? (
          <CheckBox
            dataSign="saveAsDefault"
            checked={meeting.saveAsDefault}
            disabled={disableSaveAsDefault}
            onChecked={() =>
              update({
                ...meeting,
                saveAsDefault: !meeting.saveAsDefault,
              })
            }
            type="checkbox"
            className={styles.notShowAgain}
          >
            {i18n.getString('saveAsDefault', currentLocale)}
          </CheckBox>
        ) : null}
        <Button
          onClick={onClick}
          className={classnames(
            styles.isContainedType,
            disabled ? styles.isContainedTypeDisabled : null,
          )}
          dataSign="meetingScheduleButton"
        >
          {scheduleButtonLabel || this.getI18nButtonString()}
        </Button>
        {showLaunchMeetingBtn ? (
          <Button
            dataSign="launchMeetingButton"
            className={classnames(styles.isOutlineType)}
            onClick={() => launchMeeting(meeting)}
          >
            {i18n.getString('launchMeeting', currentLocale)}
          </Button>
        ) : null}
      </div>
    );
  }
}
