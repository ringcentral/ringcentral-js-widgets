import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { reduce } from 'ramda';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import 'react-widgets/dist/css/react-widgets.css';
import DateIcon from '../../assets/images/Date.svg';
import TimeIcon from '../../assets/images/Time.svg';

import styles from './styles.scss';
import Switch from '../Switch';
import CheckBox from '../CheckBox';
import i18n from './i18n';
import MeetingSection from '../MeetingSection';

const MINUTE_SCALE = 4;
const HOUR_SCALE = 13;
const MAX_TOPIC_LENGTH = 128;
export const PASSWORD_REGEX = /^[A-Za-z0-9]{0,10}$/;
const NO_NUMBER_REGEX = /[^\d]/g;

function getMinutesList(MINUTE_SCALE) {
  return reduce((result) => {
    const index = result.length;
    const value = 60 / MINUTE_SCALE * index;
    const text = `${(`${value}0`).slice(0, 2)} m.`;
    return result.concat({
      value,
      text
    });
  }, [], new Array(MINUTE_SCALE));
}

function getHoursList(HOUR_SCALE) {
  if (HOUR_SCALE > 23) {
    throw new Error('HOUR_SCALE must be less than 23.');
  }
  return reduce((result) => {
    const value = result.length;
    const text = `${(`0${value}0`).slice(-3, -1)} h.`;
    return result.concat({
      value,
      text
    });
  }, [], new Array(HOUR_SCALE));
}

const minutesList = getMinutesList(MINUTE_SCALE);
const hoursList = getHoursList(HOUR_SCALE);

const Topic = (
  {
    update,
    currentLocale,
    meeting,
    that,
  }
) => (
  <MeetingSection hideTopBorderLine>
    <div className={styles.inline}>
      <span className={styles.label}>
        {i18n.getString('topic', currentLocale)}
      </span>
      <input
        ref={(ref) => { that.topic = ref; }}
        onPaste={(event) => {
          const topic = event.target.value;
          event.preventDefault();
          event.clipboardData.items[0].getAsString((data) => {
            const isOverLength = topic.length >= 0 && topic.length <= MAX_TOPIC_LENGTH;
            const positionStart = that.topic.selectionStart;
            const positionEnd = that.topic.selectionEnd;
            const select = positionEnd - positionStart;
            const restLength = MAX_TOPIC_LENGTH - topic.length + select;
            const isOver = isOverLength && restLength > 0;
            if (isOver) {
              const isOverLength = restLength >= data.length;
              const insertText = isOverLength ? data : data.slice(0, !isOver ? select : restLength);
              const value = topic.split('');
              value.splice(positionStart, select, insertText);
              that.topic.value = value.join('');
              const newPosition = positionStart + insertText.length;
              that.topic.setSelectionRange(newPosition, newPosition);
            }
            update({
              ...meeting,
              topic: that.topic.value,
            });
          });
        }}
        type="text"
        className={styles.input}
        defaultValue={meeting.topic || ''}
        onChange={({ target }) => {
          const topic = target.value;
          if (topic.length >= 0 && topic.length <= MAX_TOPIC_LENGTH) {
            clearTimeout(that.topicSetTimeoutId);
            that.topicSetTimeoutId = setTimeout(
              () => {
                update({
                  ...meeting,
                  topic,
                });
              },
              10
            );
          } else {
            target.value = meeting.topic || '';
          }
        }} />
    </div>
  </MeetingSection>
);

Topic.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  that: PropTypes.object.isRequired,
};

const When = (
  {
    isRecurring,
    currentLocale,
    meeting,
    update,
    that,
    onToggle,
    minTime
  }
) => {
  const changeTime = () => {
    setTimeout(() => {
      const allInputBlur = document.querySelectorAll('input[flag=timeInput]:focus').length;
      if (!allInputBlur && that.hours) {
        const startTime = new Date(meeting.schedule.startTime);
        const hours = parseInt(that.hours.value, 10);
        const minutes = parseInt(that.minutes.value, 10);
        startTime.setHours(hours);
        startTime.setMinutes(minutes);
        let time = startTime;
        if (startTime.getTime() > new Date().getTime()) {
          update({
            ...meeting,
            schedule: {
              ...meeting.schedule,
              startTime: startTime.getTime(),
            }
          });
        } else {
          time = new Date(meeting.schedule.startTime);
        }
        const Minutes = time.getMinutes();
        const Hours = time.getHours();
        that.minutes.value = `0${Minutes}0`.slice(-3, -1);
        that.hours.value = `0${Hours}0`.slice(-3, -1);
      }
    }, 100);
  };
  const accumulator = (event, max) => {
    const currentValue = parseInt(event.target.value, 10);
    const isValid = value => currentValue > 0 - value && currentValue < max - value;
    const isUpKey = event.keyCode === 38;
    if (isUpKey) {
      const value = isValid(1) ? currentValue + 1 : 0;
      event.target.value = `0${value}0`.slice(-3, -1);
    }
    const isDownKey = event.keyCode === 40;
    if (isDownKey) {
      const value = isValid(0) ? currentValue - 1 : max - 1;
      event.target.value = `0${value}0`.slice(-3, -1);
    }
  };
  const preventReplay = (isFocus) => {
    that.dateBlur = true;
    setTimeout(() => {
      if (!isFocus) {
        that.topic.focus();
      }
      that.dateBlur = false;
    }, 200);
  };
  return (
    !isRecurring ? (
      <MeetingSection title={i18n.getString('when', currentLocale)}>
        <div className={styles.dateTimeBox}>
          <div className={styles.list}>
            <div className={styles.datePicker}>
              <DateTimePicker
                culture={currentLocale}
                time={false}
                value={new Date(meeting.schedule.startTime)}
                onChange={(currentStartTime) => {
                  preventReplay(false);
                  if (currentStartTime) {
                    const date = new Date(meeting.schedule.startTime);
                    date.setFullYear(currentStartTime.getFullYear(), currentStartTime.getMonth(), currentStartTime.getDate());
                    let startTime = date.getTime();
                    const now = (new Date()).getTime();
                    if (startTime < now) {
                      startTime = now;
                      const Minutes = new Date().getMinutes();
                      const Hours = new Date().getHours();
                      that.minutes.value = `0${Minutes}0`.slice(-3, -1);
                      that.hours.value = `0${Hours}0`.slice(-3, -1);
                    }
                    update({
                      ...meeting,
                      schedule: {
                        ...meeting.schedule,
                        startTime,
                      }
                    });
                  }
                }}
                onBlur={() => {
                  preventReplay(false);
                }}
                onToggle={preventReplay}
                ref={(ref) => { that.date = ref; }}
                format="MM/DD/YY"
                min={new Date()}
              />
              <div
                onClick={() => onToggle('date')}
                className={classnames(styles.dateTimeText, styles.dateText)}>
                {Moment(meeting.schedule.startTime).format('MM/DD/YY')}
              </div>
            </div>
            <div
              ref={(ref) => { that.dateIcon = ref; }}
              className={styles.dateIcon}>
              <DateIcon
                onClick={() => onToggle('date')}
                className={styles.icon} />
            </div>
          </div>
          <div className={styles.list}>
            <div className={styles.timePicker}>
              <DateTimePicker
                culture="en"
                date={false}
                ref={(ref) => { that.time = ref; }}
                value={new Date(meeting.schedule.startTime)}
                onChange={(startTime) => {
                  if (startTime) {
                    update({
                      ...meeting,
                      schedule: {
                        ...meeting.schedule,
                        startTime: startTime.getTime(),
                      }
                    });
                  }
                }}
                format="hh:mm A"
                {...minTime}
              />
              <div className={styles.timeText}>
                <input
                  flag="timeInput"
                  ref={(ref) => { that.hours = ref; }}
                  className={styles.timeInput}
                  defaultValue={Moment(meeting.schedule.startTime).format('HH')}
                  onChange={({ target }) => {
                    that.hours.value = target.value.replace(NO_NUMBER_REGEX, '');
                    const isSelectionEnd = target.selectionEnd === 2;
                    if (isSelectionEnd) {
                      that.minutes.value = '';
                      that.minutes.focus();
                    }
                  }}
                  onKeyDown={(event) => {
                    accumulator(event, 24);
                    const isRightKey = event.keyCode === 39;
                    const isSelectionEnd = event.target.selectionEnd === 2;
                    if (isRightKey && isSelectionEnd) {
                      that.minutes.focus();
                    }
                  }}
                  onBlur={changeTime}
                  maxLength={2}
                  type="text" />
                <div className={styles.colon}>:</div>
                <input
                  flag="timeInput"
                  ref={(ref) => { that.minutes = ref; }}
                  className={styles.timeInput}
                  defaultValue={Moment(meeting.schedule.startTime).format('mm')}
                  onKeyDown={(event) => {
                    const isDelKey = event.keyCode === 8;
                    const isLeftKey = event.keyCode === 37;
                    const isSelectionHead = event.target.selectionEnd === 0;
                    if (isSelectionHead && (isDelKey || isLeftKey)) {
                      that.hours.focus();
                      that.hours.setSelectionRange(2, 2);
                    }
                    accumulator(event, 60);
                  }}
                  onChange={({ target }) => {
                    that.minutes.value = target.value.replace(NO_NUMBER_REGEX, '');
                  }}
                  onBlur={changeTime}
                  maxLength={2}
                  type="text" />
              </div>
            </div>
            <div className={styles.timeIcon}>
              <TimeIcon
                className={styles.icon} />
            </div>
          </div>
        </div>
      </MeetingSection>
    ) : null
  );
};

When.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  isRecurring: PropTypes.bool.isRequired,
  that: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  minTime: PropTypes.object.isRequired,
};

const Duration = (
  {
    isRecurring,
    currentLocale,
    meeting,
    update
  }
) => (
  !isRecurring ? (
    <MeetingSection title={i18n.getString('duration', currentLocale)}>
      <div className={classnames(styles.spaceBetween, styles.duration)}>
        <div className={styles.list}>
          <div className={styles.hoursList}>
            <DropdownList
              data={hoursList}
              valueField="value"
              textField="text"
              value={parseInt((meeting.schedule.durationInMinutes / 60), 10)}
              onChange={({ value }) => {
                let restMinutes = meeting.schedule.durationInMinutes % 60;
                const isMax = value === hoursList.slice(-1)[0].value;
                restMinutes = isMax ? 0 : restMinutes;
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
              valueField="value"
              textField="text"
              value={(meeting.schedule.durationInMinutes % 60) || 0}
              onChange={({ value }) => {
                const restHours = parseInt((meeting.schedule.durationInMinutes / 60), 10);
                const isMax = restHours === hoursList.slice(-1)[0].value;
                const minutes = isMax ? 0 : value;
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
    </MeetingSection>
  ) : null
);

Duration.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  isRecurring: PropTypes.bool.isRequired,
};

const RecurringMeeting = (
  {
    isRecurring,
    currentLocale,
    update,
    meeting,
  }
) => (
  <MeetingSection className={styles.section}>
    <div>
      <div className={styles.spaceBetween}>
        <span className={styles.label}>
          {i18n.getString('recurringMeeting', currentLocale)}
        </span>
        <Switch
          checked={isRecurring}
          onChange={(isCheckRecurring) => {
            const meetingType = isCheckRecurring ? 'Recurring' : 'Scheduled';
            update({
              ...meeting,
              meetingType,
            });
          }} />
      </div>
      {
        isRecurring ? (
          <div className={styles.recurringDescribe}>
            {i18n.getString('recurringDescribe', currentLocale)}
          </div>
        ) : null
      }
    </div>
  </MeetingSection>
);

RecurringMeeting.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  isRecurring: PropTypes.bool.isRequired,
};

const Video = (
  {
    currentLocale,
    meeting,
    update,
  }
) => (
  <MeetingSection title={i18n.getString('video', currentLocale)} withSwitch>
    <div>
      <div className={classnames(styles.labelLight, styles.fixTopMargin)}>
        {i18n.getString('videoDescribe', currentLocale)}
      </div>
      <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
        <span className={styles.labelLight}>
          {i18n.getString('host', currentLocale)}
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
          {i18n.getString('participants', currentLocale)}
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
  </MeetingSection>
);

Video.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
};

const AudioOptions = (
  {
    currentLocale,
    update,
    meeting,
    data,
  }
) => (
  <MeetingSection title={i18n.getString('audioOptions', currentLocale)} withSwitch>
    <CheckBox
      onSelect={({ key }) => {
        const audioOptions = key.split('_');
        update({
          ...meeting,
          audioOptions,
        });
      }}
      valueField="key"
      textField="text"
      selected={meeting.audioOptions.join('_')}
      data={data} />
  </MeetingSection>
);

AudioOptions.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

const MeetingOptions = (
  {
    currentLocale,
    meeting,
    update,
    that,
  }
) => (
  <MeetingSection
    title={i18n.getString('meetingOptions', currentLocale)}
    toggle={false}
    withSwitch>
    <div>
      <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
        <span className={styles.labelLight}>
          {i18n.getString('requirePassword', currentLocale)}
        </span>
        <Switch
          checked={meeting._requireMeetingPassword}
          onChange={(_requireMeetingPassword) => {
            if (_requireMeetingPassword) {
              setTimeout(() => {
                that.password.focus();
              }, 100);
            }
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
              {i18n.getString('password', currentLocale)}
            </div>
            <input
              type="text"
              className={styles.password}
              ref={(ref) => { that.password = ref; }}
              value={meeting.password || ''}
              onChange={({ target }) => {
                if (PASSWORD_REGEX.test(target.value)) {
                  update({
                    ...meeting,
                    password: target.value
                  });
                }
              }} />
          </div>
        ) : null
      }
      <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
        <span className={styles.labelLight}>
          {i18n.getString('enableJoinBeforeHost', currentLocale)}
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
  </MeetingSection>
);

MeetingOptions.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  that: PropTypes.object.isRequired,
};

class MeetingPanel extends Component {
  constructor(...args) {
    super(...args);
    this.props.init();
    this.state = {};
    Moment.locale(this.props.currentLocale);
    momentLocalizer();
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.hours) this.hours.value = Moment(this.props.meeting.schedule.startTime).format('HH');
      if (this.minutes) this.minutes.value = Moment(this.props.meeting.schedule.startTime).format('mm');
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.meeting.topic !== nextProps.meeting.topic) {
      setTimeout(() => {
        if (!this.topic) return;
        const selectionStart = this.topic.selectionStart;
        const selectionEnd = this.topic.selectionEnd;
        this.topic.value = nextProps.meeting.topic;
        this.topic.setSelectionRange(selectionStart, selectionEnd);
      });
    }
    if (this.props.meeting.schedule &&
      this.props.meeting.schedule.startTime !== nextProps.meeting.schedule.startTime
    ) {
      if (this.hours) this.hours.value = Moment(nextProps.meeting.schedule.startTime).format('HH');
      if (this.minutes) this.minutes.value = Moment(nextProps.meeting.schedule.startTime).format('mm');
    }
  }

  render() {
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
    } = this.props;
    if (!Object.keys(meeting).length) {
      return null;
    }
    const onToggle = (type) => {
      const isToggle = !this[`${type}Blur`];
      if (isToggle) {
        if (this[type]._values.open) {
          this[type].inner.close();
        } else {
          this[type].focus();
          this[type].inner.toggle();
        }
      }
    };
    const isRecurring = meeting.meetingType === 'Recurring';
    const telephonyOnly = i18n.getString('telephonyOnly', currentLocale);
    const voIPOnly = i18n.getString('voIPOnly', currentLocale);
    const both = i18n.getString('both', currentLocale);
    const AUDIO_OPTIONS = [
      {
        key: 'Phone',
        text: telephonyOnly,
      },
      {
        key: 'ComputerAudio',
        text: voIPOnly,

      },
      {
        key: 'Phone_ComputerAudio',
        text: both,
      },
    ];
    const minTime = new Date(meeting.schedule.startTime) < +new Date() ? { min: new Date() } : {};
    return (
      <div className={styles.meetingPanel}>
        {
          !hidden ? (
            <div className={styles.scroll}>
              <Topic
                that={this}
                meeting={meeting}
                update={update}
                currentLocale={currentLocale} />
              {
                recipientsSection
              }
              {
                showWhen ? <When
                  isRecurring={isRecurring}
                  currentLocale={currentLocale}
                  meeting={meeting}
                  update={update}
                  that={this}
                  onToggle={onToggle}
                  minTime={minTime}
                /> : null
              }
              {
                showDuration ? <Duration
                  isRecurring={isRecurring}
                  currentLocale={currentLocale}
                  meeting={meeting}
                  update={update}
                /> : null
              }
              {
                showRecurringMeeting ? <RecurringMeeting
                  isRecurring={isRecurring}
                  currentLocale={currentLocale}
                  meeting={meeting}
                  update={update}
                /> : null
              }
              <Video
                currentLocale={currentLocale}
                meeting={meeting}
                update={update} />
              <AudioOptions
                data={AUDIO_OPTIONS}
                currentLocale={currentLocale}
                meeting={meeting}
                update={update} />
              <MeetingOptions
                currentLocale={currentLocale}
                meeting={meeting}
                that={this}
                update={update} />
            </div>
          ) : null
        }
        <ScheduleButton
          currentLocale={currentLocale}
          hidden={hidden}
          disabled={disabled}
          meeting={meeting}
          onClick={() => !disabled && setTimeout(() => invite(this.props.meeting), 100)} />
      </div>
    );
  }
}

MeetingPanel.propTypes = {
  update: PropTypes.func.isRequired,
  invite: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
  scheduleButton: PropTypes.func.isRequired,
  recipientsSection: PropTypes.node,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  showWhen: PropTypes.bool,
  showDuration: PropTypes.bool,
  showRecurringMeeting: PropTypes.bool,
};

MeetingPanel.defaultProps = {
  recipientsSection: undefined,
  disabled: false,
  hidden: false,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
};

export default MeetingPanel;
