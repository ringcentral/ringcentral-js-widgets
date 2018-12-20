import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';
import Button from '../Button';

export default class MeetingScheduleButton extends PureComponent {
  static propTypes = {
    currentLocale: PropTypes.string,
    meeting: PropTypes.object,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    brand: PropTypes.string,
    launchMeeting: PropTypes.func,
    showLaunchMeeting: PropTypes.bool,
  }

  static defaultProps = {
    meeting: null,
    hidden: false,
    disabled: false,
    brand: undefined,
    currentLocale: undefined,
    launchMeeting() {},
    showLaunchMeeting: false
  }

  getI18nButtonString() {
    return i18n.getString('schedule');
  }

  getI18nPromptString() {
    return i18n.getString('prompt');
  }

  getI18nLanuchMeetingString() {
    return i18n.getString('lanuchMeeting');
  }

  render() {
    const {
      hidden,
      disabled,
      meeting,
      onClick,
      brand,
      currentLocale,
      showLaunchMeeting,
      launchMeeting
    } = this.props;
    return (
      <div
        className={classnames(styles.inviteBox, !hidden ? styles.withShadow : styles.onlyButton,
        { [styles.launchMeeting]: showLaunchMeeting })} >
        {
          hidden ? (
            <div className={styles.actionPrompt}>
              { this.getI18nPromptString() }
            </div>
          ) : null
        }
        {
          showLaunchMeeting ? <Button
            onClick={launchMeeting}
            disabled={disabled}
            className={classnames(styles.button, disabled ? styles.disabled : null,
               styles.launchMeetingButton)}
            dataSign="lanuchMeetingButton"
          >
            { this.getI18nLanuchMeetingString() }
          </Button>
          : null
        }
        <Button
          onClick={onClick}
          disabled={disabled}
          className={classnames(styles.button, disabled ? styles.disabled : null)}
          dataSign="meetingScheduleButton"
        >
          { this.getI18nButtonString() }
        </Button>
      </div>
    );
  }
}
