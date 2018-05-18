import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import i18n from './i18n';

export default class MeetingScheduleButton extends PureComponent {
  static propTypes = {
    currentLocale: PropTypes.string,
    meeting: PropTypes.object,
    hidden: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    brand: PropTypes.string,
  }

  static defaultProps = {
    meeting: null,
    hidden: false,
    disabled: false,
    brand: undefined,
    currentLocale: undefined,
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
      currentLocale
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
        <button
          onClick={onClick}
          disabled={disabled}
          className={classnames(styles.button, disabled ? styles.disabled : null)}>
          { this.getI18nButtonString() }
        </button>
      </div>
    );
  }
}

