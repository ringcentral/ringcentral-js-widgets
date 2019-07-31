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
import DropdownSelect from '../DropdownSelect';

import styles from './styles.scss';
import Switch from '../Switch';
import CheckBox from '../CheckBox';
import i18n from './i18n';
import MeetingSection from '../MeetingSection';
import {
  MINUTE_SCALE,
  HOUR_SCALE,
  MAX_TOPIC_LENGTH,
  PASSWORD_REGEX,
  NO_NUMBER_REGEX,
} from './constants';

function getMinutesList(MINUTE_SCALE) {
  return reduce((result) => {
    const index = result.length;
    const value = 60 / MINUTE_SCALE * index;
    const text = `${(`${value}0`).slice(0, 2)} min`;
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
    const text = `${(`0${value}0`).slice(-3, -1)} hr`;
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
        }}
        data-sign="scheduleMeetingTopic"
        />
    </div>
  </MeetingSection>
);

Topic.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  that: PropTypes.object.isRequired,
};

export const When = (
  {
    isRecurring,
    currentLocale,
    meeting,
    update,
    that,
    onToggle,
    minTime,
    useTimePicker
  }
) => {
  // The default value of the text input is in the componentDidMount.
  const formatDisplay = (Hours, Minutes) => {
    setTimeout(() => {
      that.minutes.value = `0${Minutes}0`.slice(-3, -1);
      const currentHours = `0${Hours}0`.slice(-3, -1);
      if (useTimePicker) {
        if (currentHours > 12) {
          const convertedHours = +currentHours % 12;
          that.hours.value = convertedHours.toString().length === 1 ? `0${convertedHours}` : convertedHours;
        }
      }
    }, 0);
  };

  const changeTime = () => {
    if (useTimePicker) {
      return;
    }
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
        formatDisplay(Hours, Minutes);
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

  const preventDatePickerReplay = (isFocus) => {
    that.dateBlur = true;
    setTimeout(() => {
      if (!isFocus && !that.timeBlur) {
        that.topic.focus();
      }
      that.dateBlur = false;
    }, 200);
  };

  const preventTimePickerReplay = (isFocus) => {
    that.timeBlur = true;
    setTimeout(() => {
      if (!isFocus && !that.dateBlur) {
        that.topic.focus();
      }
      that.timeBlur = false;
    }, 200);
  };
  let minMinute;
  if (meeting.schedule && meeting.schedule.startTime && useTimePicker) {
    const iscurrentDate = Moment(meeting.schedule.startTime).isSame(new Date(), 'day');
    if (iscurrentDate) {
      const currentMinute = +Moment().format('mm');
      const nearlest = Moment().set('minute', Math.ceil(currentMinute / 15) * 15).toDate();
      minMinute = nearlest;
    }
    console.log('prepared minTime', +minMinute);
  }

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
                  preventDatePickerReplay(false);
                  if (currentStartTime) {
                    const date = new Date(meeting.schedule.startTime);
                    date.setFullYear(
                      currentStartTime.getFullYear(),
                      currentStartTime.getMonth(),
                      currentStartTime.getDate()
                    );
                    let startTime = date.getTime();
                    const now = (new Date()).getTime();
                    if (startTime < now) {
                      startTime = now;
                      const Minutes = new Date().getMinutes();
                      const Hours = new Date().getHours();
                      formatDisplay(Hours, Minutes);
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
                  preventDatePickerReplay(false);
                }}
                onToggle={preventDatePickerReplay}
                ref={(ref) => { that.date = ref; }}
                format="MM/DD/YY"
                min={new Date()}
              />
              <div
                onClick={() => onToggle('date')}
                data-sign="dateText"
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
            <div className={classnames([styles.timePicker, useTimePicker && styles.useTimePicker])}>
              <DateTimePicker
                culture={currentLocale}
                date={false}
                step={15}
                value={new Date(meeting.schedule.startTime)}
                onChange={(startTime) => {
                  preventTimePickerReplay(false);
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
                onBlur={() => {
                  preventTimePickerReplay(false);
                }}
                onToggle={preventTimePickerReplay}
                ref={(ref) => { that.time = ref; }}
                format="hh:mm A"
                min={minMinute}
              />
              <div
                className={styles.timeText}
                onClick={() => {
                  if (useTimePicker) {
                    onToggle('time');
                  }
                }
              }>
                <input
                  flag="timeInput"
                  disabled={useTimePicker}
                  ref={(ref) => { that.hours = ref; }}
                  data-sign="timeInputHour"
                  className={styles.timeInput}
                  defaultValue={Moment(meeting.schedule.startTime).format(useTimePicker ? 'hh' : 'HH')}
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
                  disabled={useTimePicker}
                  ref={(ref) => { that.minutes = ref; }}
                  data-sign="timeInputMinute"
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
                {useTimePicker && <div className={styles.colon}>{Moment(meeting.schedule.startTime).locale('en').format('A')}</div>}
              </div>
            </div>
            <div
              ref={(ref) => { that.TimeIcon = ref; }}
              className={styles.timeIcon}>
              <TimeIcon
                onClick={() => {
                  if (useTimePicker) {
                    onToggle('time');
                  }
                }}
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
  useTimePicker: PropTypes.bool.isRequired
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
    <div className={styles.RecurringMeetingDiv}>
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
          }}
          dataSign="recuttingMeeting"
        />
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
    <div className={styles.videoDiv}>
      <div className={classnames(styles.labelLight, styles.fixTopMargin, styles.videoDescribe)}>
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
          }}
          dataSign="videoHostToggle"
          />
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
          }}
          dataSign="videoParticipantToggle"
          />
      </div>
    </div>
  </MeetingSection>
);

Video.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
};

const AudioOptionsCheckbox = ({
  update,
  meeting,
  data
}) => (
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
);
AudioOptionsCheckbox.propTypes = {
  update: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};
const AudioOptionsDropdown = ({
  update,
  meeting,
  data
}) => (
  <DropdownSelect
    className={classnames(styles.dropdownSelect)}
    iconClassNßame={styles.dropdownIcon}
    value={meeting.audioOptions.join('_')}
    onChange={({ key }) => {
      const audioOptions = key.split('_');
      update({
        ...meeting,
        audioOptions,
      });
    }}
    options={data}
    valueFunction={option => option.text}
    renderValue={value => data.find(item => item.key === value).text}
    renderFunction={option => <div title={option.text}>{option.text}</div>}
    dropdownAlign="left"
    titleEnabled
    />
);
AudioOptionsDropdown.propTypes = {
  update: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
};

const AudioOptions = (
  {
    currentLocale,
    update,
    meeting,
    data,
    audioOptionToggle
  }
) => {
  const audioOptions = audioOptionToggle ? (
    <AudioOptionsDropdown
      update={update}
      meeting={meeting}
      data={data}
    />
  ) :
    (
      <AudioOptionsCheckbox
        update={update}
        meeting={meeting}
        data={data}
      />
    );
  return (
    <MeetingSection title={i18n.getString('audioOptions', currentLocale)} withSwitch>
      {audioOptions}
    </MeetingSection>
  );
};

AudioOptions.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  audioOptionToggle: PropTypes.bool.isRequired
};

const MeetingOptions = (
  {
    currentLocale,
    meeting,
    update,
    that,
    meetingOptionToggle,
    passwordPlaceholderEnable
  }
) => {
  const passwordPlaceholder = passwordPlaceholderEnable ? i18n.getString('password', currentLocale) : '';
  return (
    <MeetingSection
      title={i18n.getString('meetingOptions', currentLocale)}
      className={styles.meetingOptions}
      // when there is a default meeting password or `allowJoinBeforeHost` toggle opened
      // then expand the meeting option section
      toggle={meetingOptionToggle || !!meeting.password || meeting.allowJoinBeforeHost}
      withSwitch>
      <div className={styles.meetingOptionsDiv}>
        <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
          <span className={classnames(styles.labelLight, styles.defaultShrink)}>
            {i18n.getString('requirePassword', currentLocale)}
          </span>
          <Switch
            checked={meeting._requireMeetingPassword || !!meeting.password}
            onChange={(_requireMeetingPassword) => {
              if (_requireMeetingPassword) {
                setTimeout(() => {
                  that.password.focus();
                }, 100);
              }
              update({
                ...meeting,
                _requireMeetingPassword,
                password: '',
              });
            }}
            dataSign="requirePasswordToggle"
          />
        </div>
        {
          meeting._requireMeetingPassword || meeting.password ? (
            <div className={styles.passwordBox}>
              <div className={styles.labelLight}>
                {i18n.getString('password', currentLocale)}
              </div>
              <input
                type="text"
                placeholder={passwordPlaceholder}
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
                }}
                data-sign="requirePasswordInput"
              />
            </div>
          ) : null
        }
        <div className={classnames(styles.spaceBetween, styles.fixTopMargin)}>
          <span className={classnames(styles.labelLight, styles.defaultShrink)}>
            {i18n.getString('enableJoinBeforeHost', currentLocale)}
          </span>
          <Switch
            checked={meeting.allowJoinBeforeHost}
            onChange={(allowJoinBeforeHost) => {
              update({
                ...meeting,
                allowJoinBeforeHost,
              });
            }}
            dataSign="enableJoinToggle"
          />
        </div>
      </div>
    </MeetingSection>
  );
};
MeetingOptions.propTypes = {
  update: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  that: PropTypes.object.isRequired,
  meetingOptionToggle: PropTypes.bool.isRequired,
  passwordPlaceholderEnable: PropTypes.bool.isRequired
};

class MeetingConfigs extends Component {
  constructor(...args) {
    super(...args);
    this.props.init();
    this.state = {};
    Moment.locale(this.props.currentLocale);
    momentLocalizer();
  }

  componentDidMount() {
    setTimeout(() => {
      this.displayFormat(this.props.meeting.schedule.startTime);
    });
  }

  displayFormat(startTime) {
    const isAMPM = this.props.useTimePicker ? 'hh' : 'HH';
    if (this.hours) {
      this.hours.value = Moment(startTime).format(isAMPM);
    }
    if (this.minutes) {
      this.minutes.value = Moment(startTime).format('mm');
    }
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
    if (this.props.meeting.schedule && nextProps.meeting.schedule &&
      this.props.meeting.schedule.startTime !== nextProps.meeting.schedule.startTime
    ) {
      this.displayFormat(nextProps.meeting.schedule.startTime);
    }
  }

  render() {
    const {
      update,
      meeting,
      currentLocale,
      recipientsSection,
      showWhen,
      showDuration,
      showRecurringMeeting,
      meetingOptionToggle,
      passwordPlaceholderEnable,
      audioOptionToggle,
      useTimePicker
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
    let minTime = {};
    if (meeting.schedule && meeting.schedule.startTime &&
      new Date(meeting.schedule.startTime) < +new Date()) {
      minTime = { min: new Date() };
    }
    return (
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
          showWhen ? (
            <When
              isRecurring={isRecurring}
              currentLocale={currentLocale}
              meeting={meeting}
              update={update}
              that={this}
              onToggle={onToggle}
              minTime={minTime}
              useTimePicker={useTimePicker}
          />
          ) : null
        }
        {
          showDuration ? (
            <Duration
              isRecurring={isRecurring}
              currentLocale={currentLocale}
              meeting={meeting}
              update={update}
          />
          ) : null
        }
        {
          showRecurringMeeting ? (
            <RecurringMeeting
              isRecurring={isRecurring}
              currentLocale={currentLocale}
              meeting={meeting}
              update={update}
          />
          ) : null
        }
        <Video
          currentLocale={currentLocale}
          meeting={meeting}
          update={update} />
        <AudioOptions
          data={AUDIO_OPTIONS}
          currentLocale={currentLocale}
          meeting={meeting}
          update={update}
          audioOptionToggle={audioOptionToggle} />
        <MeetingOptions
          currentLocale={currentLocale}
          meeting={meeting}
          that={this}
          update={update}
          meetingOptionToggle={meetingOptionToggle}
          passwordPlaceholderEnable={passwordPlaceholderEnable} />
      </div>
    );
  }
}

MeetingConfigs.propTypes = {
  update: PropTypes.func.isRequired,
  init: PropTypes.func.isRequired,
  meeting: PropTypes.object.isRequired,
  currentLocale: PropTypes.string.isRequired,
  recipientsSection: PropTypes.node,
  showWhen: PropTypes.bool,
  showDuration: PropTypes.bool,
  showRecurringMeeting: PropTypes.bool,
  meetingOptionToggle: PropTypes.bool,
  passwordPlaceholderEnable: PropTypes.bool,
  audioOptionToggle: PropTypes.bool,
  useTimePicker: PropTypes.bool,
};

MeetingConfigs.defaultProps = {
  recipientsSection: undefined,
  showWhen: true,
  showDuration: true,
  showRecurringMeeting: true,
  meetingOptionToggle: false,
  passwordPlaceholderEnable: false,
  audioOptionToggle: false,
  useTimePicker: false
};

export default MeetingConfigs;
