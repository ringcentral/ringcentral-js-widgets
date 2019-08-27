import classnames from 'classnames';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DropdownSelect from '../../DropdownSelect';
import { PASSWORD_REGEX } from '../../MeetingConfigs/constants';
import styles from '../PopupModal/styles.scss';
import ArrowSVG from '../ArrowSVG';
import Switch from '../Switch';
import Title from '../Title';
import Input from '../Input';

class MeetingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.meeting,
      validPassword: true,
    };
  }

  getDatas = () => {
    const { password } = this.state;
    if (!this.validatePassword(password)) {
      return null;
    }
    return this.state;
  }

  onUpdate = (key, value) => {
    if (key === '_requireMeetingPassword' && !value) {
      this.setState({
        password: ''
      });
    }
    this.setState({
      [key]: value
    });
  }

  validatePassword = (password) => {
    const { _requireMeetingPassword } = this.state;
    const valid = !!(!_requireMeetingPassword || password);
    this.setState({
      validPassword: valid
    });
    return valid;
  }

  onAudioOptionsChange = (audioOptions) => {
    this.setState({ audioOptions: audioOptions.value.split('_') });
  }

  render() {
    const {
      recurringMeeting, startHostVideo, startParticipantsVideo, audioOptions,
      _requireMeetingPassword, password, allowJoinBeforeHost,
      validPassword,
    } = this.state;

    const { i18n, theme } = this.props;

    const AUDIO_OPTIONS = [
      {
        value: 'Phone',
        display: i18n.telephone,
      },
      {
        value: 'ComputerAudio',
        display: i18n.voip,

      },
      {
        value: 'Phone_ComputerAudio',
        display: i18n.both,
      },
    ];

    return (
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <Title label={i18n.when} />
          <div className={styles.flex}>
            <span>{i18n.recurringMeeting}</span>
            <span>
              <Switch
                checked={recurringMeeting}
                dataSign="enableJoinToggle"
                onChange={checked => this.onUpdate('recurringMeeting', checked)}
                />
            </span>
          </div>
          {recurringMeeting && <div className={styles.info}>{i18n.recurringMeetingPrompt}</div>}
        </div>
        <div className={styles.formGroup}>
          <Title label={i18n.video} subLabel={`(${i18n.videoDescribe})`} />
          <div className={classnames(styles.flex, styles.flexMargin8)}>
            <div>{i18n.hostVideoOn}</div>
            <span>
              <Switch
                checked={startHostVideo}
                dataSign="enableJoinToggle"
                onChange={checked => this.onUpdate('startHostVideo', checked)}
              />
            </span>
          </div>
          <div className={styles.flex}>
            <div>{i18n.participantVideoOn}</div>
            <span>
              <Switch
                checked={startParticipantsVideo}
                dataSign="enableJoinToggle"
                onChange={checked => this.onUpdate('startParticipantsVideo', checked)}
              />
            </span>
          </div>
        </div>
        <div className={styles.formGroup}>
          <Title label={i18n.audioOptions} className={styles.titleMargin8} />
          <div className={classnames(styles.audioOptionDropdown)}>
            <DropdownSelect
              className={classnames(styles.dropdown, theme.UI && styles[theme.UI])}
              iconClassName={styles.dropdownIcon}
              value={audioOptions.join('_')}
              onChange={option => this.onAudioOptionsChange(option)}
              options={AUDIO_OPTIONS}
              valueFunction={option => option.display}
              renderValue={value => AUDIO_OPTIONS.find(item => item.value === value).display}
              renderFunction={option => <div title={option.display}>{option.display}</div>}
              dropdownAlign="left"
              icon={<ArrowSVG />}
              titleEnabled
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <Title label={i18n.meetingOptions} />
          <div className={classnames(styles.flex, styles.flexMargin8)}>
            <div>{i18n.requirePassword}</div>
            <span>
              <Switch
                checked={_requireMeetingPassword}
                dataSign="enableJoinToggle"
                onChange={checked => this.onUpdate('_requireMeetingPassword', checked)}
              />
            </span>
          </div>
          {_requireMeetingPassword && (
            <div className={classnames(styles.passwordField)}>
              <div className={styles.label}>{i18n.password}</div>
              <Input
                value={password || ''}
                onChange={({ target }) => {
                  this.validatePassword(target.value);
                  if (PASSWORD_REGEX.test(target.value)) {
                    this.onUpdate('password', target.value);
                  }
                }}
                isError={!validPassword}
                errorMessage={i18n.noPassword}
                dataSign="requirePasswordInput"
                placeholder={theme.isOldUI ? '' : i18n.password}
              />
            </div>
          )}
          <div className={styles.flex}>
            <div>{i18n.joinBeforeHost}</div>
            <span>
              <Switch
                checked={allowJoinBeforeHost}
                dataSign="enableJoinToggle"
                onChange={checked => this.onUpdate('allowJoinBeforeHost', checked)}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

MeetingPanel.propTypes = {
  i18n: PropTypes.object.isRequired,
  meeting: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default MeetingPanel;
