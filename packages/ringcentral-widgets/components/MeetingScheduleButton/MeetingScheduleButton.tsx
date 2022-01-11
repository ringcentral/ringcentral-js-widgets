import React from 'react';

import { RcMMeetingModel } from '@ringcentral-integration/commons/modules/MeetingV2';
import { RcButton, RcCheckbox } from '@ringcentral/juno';

import i18n from './i18n';
import {
  ScheduleButton,
  MeetingScheduleButtonWrapper,
} from './MeetingScheduleButtonWrapper';
import styles from './styles.scss';

type Props = {
  currentLocale: string;
  meeting: RcMMeetingModel;
  scheduleButtonLabel: string;
  onClick?: () => any;
  hidden?: boolean;
  showSaveAsDefault?: boolean;
  disableSaveAsDefault?: boolean;
  disabled?: boolean;
  update?: (data: any) => any;
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
      <MeetingScheduleButtonWrapper $hidden={hidden}>
        {hidden ? (
          <div className={styles.actionPrompt}>
            {this.getI18nPromptString()}
          </div>
        ) : null}
        {showSaveAsDefault ? (
          <RcCheckbox
            data-sign="saveAsDefault"
            checked={meeting?.saveAsDefault}
            disabled={disableSaveAsDefault}
            className={styles.saveAsDefault}
            formControlLabelProps={{
              classes: {
                label: styles.saveAsDefaultLabel,
              },
            }}
            onChange={() =>
              update({
                ...meeting,
                saveAsDefault: !meeting?.saveAsDefault,
              })
            }
            label={i18n.getString('saveAsDefault', currentLocale)}
          />
        ) : null}
        <ScheduleButton
          onClick={onClick}
          disabled={disabled}
          data-sign="meetingScheduleButton"
          fullWidth
        >
          {scheduleButtonLabel || this.getI18nButtonString()}
        </ScheduleButton>
        {showLaunchMeetingBtn ? (
          <RcButton
            className={styles.gutter}
            onClick={() => launchMeeting(meeting)}
            data-sign="launchMeetingButton"
            variant="text"
            fullWidth
          >
            {i18n.getString('launchMeeting', currentLocale)}
          </RcButton>
        ) : null}
      </MeetingScheduleButtonWrapper>
    );
  }
}
