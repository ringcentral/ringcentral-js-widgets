import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import './helper.css';
import DateIcon from '../../assets/images/Date.svg';
import TimeIcon from '../../assets/images/Time.svg';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';
import Switch from '../Switch';
import CheckBox from '../CheckBox';

// import formatMessage from 'format-message';
// import IconField from '../IconField';
// import Switch from '../Switch';
// import SpinnerOverlay from '../SpinnerOverlay';
// import i18n from './i18n';
// import RcFont from '../../assets/RcFont/RcFont.scss';

const MINUTE_SCALE = 4;
const HOUR_SCALE = 13;
const AUDIO_OPTIONS = [
  {
    key: 'Phone',
    text: 'Telephony Only',
  },
  {
    key: 'ComputerAudio',
    text: 'VoIP Only',

  },
  {
    key: 'Phone_ComputerAudio',
    text: 'Both',
  },
];

function getMinutesList(MINUTE_SCALE) {
  return new Array(MINUTE_SCALE).fill(0).map((_, key) => {
    const value = 60 / MINUTE_SCALE * key;
    const text = (`${value}0`).slice(0, 2) + ' m.';
    return {
      value,
      text
    };
  });
}

function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return new Array(HOUR_SCALE).fill(0).map((_, value) => {
    const text = (`0${value}0`).slice(-3, -1) + ' h.';
    return {
      value,
      text
    };
  });
}

const minutesList = getMinutesList(MINUTE_SCALE);
const hoursList = getHoursList(HOUR_SCALE);

export class Section extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      toggle: this.props.toggle,
    };
  }
  render() {
    const {
      children,
      title,
      withSwitch,
      className,
      hideTopBorderLine,
    } = this.props;
    const toggle = () => {
      this.setState({ toggle: !this.state.toggle });
    };
    const Title = () => (
      title ? (
        <span className={styles.title}>{title}</span>
      ) : null
    );
    const DropDown = ({ isDropDown, onClick }) => (
      withSwitch ? (
        <span
          className={classnames(!isDropDown ? styles.dropDown : null)}
          onClick={onClick}>
          <i className={classnames(dynamicsFont.arrow, styles.arrow)} />
        </span>
      ) : null
    );
    const topBorderLine = hideTopBorderLine ? styles.hiddenTopBorder : null;
    return (
      <div className={classnames(styles.section, topBorderLine, className)}>
        {
          title ? (
            <div className={styles.spaceBetween}>
              <Title />
              <DropDown isDropDown={this.state.toggle} onClick={toggle} />
            </div>
          ) : null
        }
        { this.state.toggle ? children : null }
      </div>
    );
  }
}

Section.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  withSwitch: PropTypes.bool,
  toggle: PropTypes.bool,
  hideTopBorderLine: PropTypes.bool,
};

Section.defaultProps = {
  className: null,
  title: null,
  withSwitch: false,
  toggle: true,
  hideTopBorderLine: false,
};

export class MeetingPanel extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      topic: 'Michael Lin\'s Meeting',
      meetingType: 'Scheduled',
      password: null,
      schedule: {
        startTime: new Date(),
        durationInMinutes: 60,
        timeZone: {
          id: null
        }
      },
      host: {
        id: null,
      },
      allowJoinBeforeHost: false,
      startHostVideo: false,
      startParticipantsVideo: false,
      audioOptions: ['Phone', 'ComputerAudio'],
      _requireMeetingPassword: false,
      _showDate: false,
      _showTime: false,
    };//
    Moment.locale('en');
    momentLocalizer();
  }
  render() {
    const {
      // update,
      // meeting,
      hidden,
      disabled,
      invite,
      buttonText,
    } = this.props;
    const meeting = this.state;//
    const update = state => this.setState(state);//
    const onToggle = (type) => {
      if (this[type]._values.open) {
        this[type].refs.inner.close();
      } else {
        this[type].focus();
        this[type].refs.inner.toggle();
      }
    };
    const minTime = new Date(meeting.schedule.startTime) < +new Date() ? { min: new Date() } : {};
    return (
      <div className={styles.meetingPanel}>
        {
          !hidden ? (
            <div className={styles.scroll}>
              <Section hideTopBorderLine={true}>
                <div className={styles.inline}>
                  <span className={styles.label}>
                    {'Topic'}
                  </span>
                  <input
                    type="text"
                    className={styles.input}
                    value={meeting.topic || ''}
                    onChange={({ target }) => {
                      update({
                        ...meeting,
                        topic: target.value
                      });
                    }} />
                </div>
              </Section>
              <Section title={'When'}>
                <div className={styles.dateTimeBox}>
                  <div className={styles.list}>
                    <div className={styles.datePicker}>
                      <DateTimePicker
                        culture={'en'}
                        time={false}
                        value={meeting.schedule.startTime}
                        onChange={(startTime) => {
                          update({
                            ...meeting,
                            schedule: {
                              ...meeting.schedule,
                              startTime,
                            }
                          });
                        }}
                        ref={(ref) => { this.date = ref; }}
                        format={'MM/DD/YY'}
                        min={new Date()}
                      />
                    </div>
                    <div className={styles.dateIcon}>
                      <DateIcon
                        onClick={() => onToggle('date')}
                        className={styles.icon} />
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.timePicker}>
                      <DateTimePicker
                        culture={'en'}
                        date={false}
                        ref={(ref) => { this.time = ref; }}
                        value={meeting.schedule.startTime}
                        onChange={(startTime) => {
                          update({
                            ...meeting,
                            schedule: {
                              ...meeting.schedule,
                              startTime,
                            }
                          });
                        }}
                        format={'hh:mm A'}
                        {...minTime}
                      />
                    </div>
                    <div className={styles.timeIcon}>
                      <TimeIcon
                        onClick={() => onToggle('time')}
                        className={styles.icon} />
                    </div>
                  </div>
                </div>
              </Section>
              <Section title={'Duration'}>
                <div className={classnames(styles.spaceBetween, styles.duration)}>
                  <div className={styles.list}>
                    <div className={styles.hoursList}>
                      <DropdownList
                        data={hoursList}
                        valueField={'value'}
                        textField={'text'}
                        value={(meeting.schedule.durationInMinutes / 60) | 0}
                        onChange={({ value }) => {
                          let restMinutes = meeting.schedule.durationInMinutes % 60;
                          const isMax = value === hoursList.slice(-1)[0].value;
                          const isMin = value === hoursList[0].value;
                          restMinutes = isMax ? 0 : restMinutes;
                          const isZero = restMinutes === minutesList[0].value;
                          restMinutes = isMin && isZero ? minutesList[1].value : restMinutes;
                          const durationInMinutes = value * 60 + restMinutes;
                          update({
                            ...meeting,
                            schedule: {
                              ...meeting.schedule,
                              durationInMinutes,
                            }
                          });
                        }} />
                    </div>
                  </div>
                  <div className={styles.list}>
                    <div className={styles.minutesList}>
                      <DropdownList
                        data={minutesList}
                        valueField={'value'}
                        textField={'text'}
                        value={(meeting.schedule.durationInMinutes % 60) || 0}
                        onChange={({ value }) => {
                          const restHours = ~~(meeting.schedule.durationInMinutes / 60);
                          const isMax = restHours === hoursList.slice(-1)[0].value;
                          const isMin = restHours === hoursList[0].value;
                          let minutes = isMax ? 0 : value;
                          const isZero = minutes === minutesList[0].value;
                          minutes = isMin && isZero ? minutesList[1].value : minutes;
                          const durationInMinutes = restHours * 60 + minutes;
                          update({
                            ...meeting,
                            schedule: {
                              ...meeting.schedule,
                              durationInMinutes,
                            }
                          });
                        }} />
                    </div>
                  </div>
                </div>
              </Section>
              <Section className={styles.section}>
                <div className={styles.spaceBetween}>
                  <span className={styles.label}>
                    {'Recurring Meeting'}
                  </span>
                  <Switch
                    checked={meeting.meetingType === 'Recurring'}
                    onChange={() => {
                      const meetingType = ['Recurring', 'Scheduled'].find(item => (
                        item !== meeting.meetingType
                      ));
                      update({
                        ...meeting,
                        meetingType,
                      });
                    }} />
                </div>
              </Section>
              <Section title={'Video'} withSwitch={true}>
                <div>
                  <div className={classnames(styles.labelLight, styles.fixTopMargin)}>
                    {'When joining a meeting'}
                  </div>
                  <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
                    <span className={styles.labelLight}>
                      {'Host'}
                    </span>
                    <Switch
                      checked={meeting.startHostVideo}
                      onChange={(startHostVideo) => {
                        update({
                          ...meeting,
                          startHostVideo,
                        });
                      }} />
                  </div>
                  <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
                <span className={styles.labelLight}>
                  {'Participants'}
                </span>
                    <Switch
                      checked={meeting.startParticipantsVideo}
                      onChange={(startParticipantsVideo) => {
                        update({
                          ...meeting,
                          startParticipantsVideo,
                        });
                      }} />
                  </div>
                </div>
              </Section>
              <Section title={'Audio Options'} withSwitch={true}>
                <CheckBox
                  onSelect={({ key }) => {
                    const audioOptions = key.split('_');
                    update({
                      ...meeting,
                      audioOptions,
                    });
                  }}
                  valueField={'key'}
                  textField={'text'}
                  selected={meeting.audioOptions.join('_')}
                  data={AUDIO_OPTIONS} />
              </Section>
              <Section title={'Meeting Options'} withSwitch={true}>
                <div>
                  <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
                    <span className={styles.labelLight}>
                      {'Require Meeting Password'}
                    </span>
                    <Switch
                      checked={meeting._requireMeetingPassword}
                      onChange={(_requireMeetingPassword) => {
                        const password = _requireMeetingPassword ? null : meeting.password;
                        update({
                          ...meeting,
                          _requireMeetingPassword,
                          password,
                        });
                      }} />
                  </div>
                  {
                    meeting._requireMeetingPassword ? (
                      <div className={styles.passwordBox}>
                        <div className={styles.labelLight}>
                          {'Password'}
                        </div>
                        <input
                          type="password"
                          className={styles.password}
                          value={meeting.password || ''}
                          onChange={({ target }) => {
                            update({
                              ...meeting,
                              password: target.value
                            });
                          }} />
                      </div>
                    ) : null
                  }
                  <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
                    <span className={styles.labelLight}>
                      {'Enable join before host'}
                    </span>
                    <Switch
                      checked={meeting.allowJoinBeforeHost}
                      onChange={(allowJoinBeforeHost) => {
                        update({
                          ...meeting,
                          allowJoinBeforeHost,
                        });
                      }} />
                  </div>
                </div>
              </Section>
            </div>
          ) : null
        }
        <div className={classnames(styles.inviteBox, !hidden ? styles.withShadow : null)}>
          <button
            onClick={invite}
            disabled={disabled}
            className={classnames(styles.button, disabled ? styles.disabled : null)}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
}

MeetingPanel.propTypes = {
  update: PropTypes.func,
  meeting: PropTypes.object,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  invite: PropTypes.func,
  buttonText: PropTypes.string,
};
MeetingPanel.defaultProps = {
  update: (state) => {console.log(state)},
  invite: (state) => {console.log(state)},
  buttonText: 'Invite with Google Calendar',
  disabled: false,
  hidden: true,
  meeting: {
    topic: 'Michael Lin\'s Meeting',
    meetingType: 'Scheduled',
    password: null,
    schedule: {
      startTime: new Date(),
      durationInMinutes: 60,
      timeZone: {
        id: null
      }
    },
    host: {
      id: null,
    },
    allowJoinBeforeHost: false,
    startHostVideo: false,
    startParticipantsVideo: false,
    audioOptions: ['Phone', 'ComputerAudio'],
    _requireMeetingPassword: false,
    _showDate: false,
    _showTime: false,
  }
};

export default MeetingPanel;
