import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';
import Button from '../Button';
import CheckBox from '../CheckBox';

export default class MeetingScheduleButton extends PureComponent {
  static propTypes = {
    currentLocale: PropTypes.string,
    meeting: PropTypes.object,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    brand: PropTypes.string,
    showSaveAsDefault: PropTypes.bool,
    update: PropTypes.func,
  }

  static defaultProps = {
    meeting: null,
    hidden: false,
    disabled: false,
    brand: undefined,
    currentLocale: undefined,
    showSaveAsDefault: false,
    update() {}
  }

  getI18nButtonString() {
    return i18n.getString('schedule');
  }

  getI18nPromptString() {
    return i18n.getString('prompt');
  }

  render() {
    const {
      hidden,
      disabled,
      meeting,
      onClick,
      brand,
      currentLocale,
      showSaveAsDefault,
      update,
    } = this.props;
    return (
      <div
        className={classnames(styles.inviteBox, !hidden ? styles.withShadow : styles.onlyButton)}>
        {
          hidden ? (
            <div className={styles.actionPrompt}>
              { this.getI18nPromptString() }
            </div>
          ) : null
        }
        {
          showSaveAsDefault ? (
            <CheckBox
              checked={meeting.saveAsDefault}
              onChecked={
                () => update({
                  ...meeting,
                  saveAsDefault: !meeting.saveAsDefault
                })}
              type="checkbox"
              className={styles.notShowAgain}>
              { i18n.getString('saveAsDefault', currentLocale) }
            </CheckBox>
          ) : null
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
