import React from 'react';
import classnames from 'classnames';
import { RcMMeetingModel } from 'ringcentral-integration/modules/MeetingV2';

import { RcCheckbox, RcButton } from '@ringcentral/juno';
import styles from './styles.scss';
import i18n from './i18n';

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
        <RcButton
          onClick={onClick}
          disabled={disabled}
          data-sign="meetingScheduleButton"
          fullWidth
        >
          {scheduleButtonLabel || this.getI18nButtonString()}
        </RcButton>
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
      </div>
    );
  }
}
