import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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

function getMinutesList(MINUTE_SCALE) {
  return new Array(MINUTE_SCALE).fill(0).map((_, key) => {
    const value = 60 / MINUTE_SCALE * key;
    const text = `${(`${value}0`).slice(0, 2)} m.`;
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
    const text = `${(`0${value}0`).slice(-3, -1)} h.`;
    return {
      value,
      text
    };
  });
}

const minutesList = getMinutesList(MINUTE_SCALE);
const hoursList = getHoursList(HOUR_SCALE);

const Topic = ({ update, currentLocale, meeting }) => (
  <MeetingSection hideTopBorderLine>
    <div className={styles.inline}>
      <span className={styles.label}>
        {i18n.getString('topic', currentLocale)}
      </span>
      <input
        type="text"
        className={styles.input}
        defaultValue={meeting.topic || ''}
        onChange={({ target }) => {
          const topic = target.value;
          if (topic.length >= 0 && topic.length < 128) {
            update({
              ...meeting,
              topic,
            });
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
) => (
  !isRecurring ? (
    <MeetingSection title={i18n.getString('when', currentLocale)}>
      <div className={styles.dateTimeBox}>
        <div className={styles.list}>
          <div className={styles.datePicker}>
            <DateTimePicker
              culture={currentLocale}
              time={false}
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
          <div className={styles.dateIcon}>
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
            <div className={styles.dateTimeText}>
              <input
                className={styles.timeInput}
                defaultValue={Moment(meeting.schedule.startTime).format('HH')}
                onBlur={({ target }) => {
                  const hours = parseInt(target.value, 10);
                  const time = new Date(meeting.schedule.startTime);
                  time.setHours(hours);
                  const startTime = time.getTime();
                  if (startTime >= (new Date()).getTime() && hours < 24 && hours > 0) {
                    setTimeout(() => {
                      target.value = Moment(startTime).format('HH');
                    });
                    update({
                      ...meeting,
                      schedule: {
                        ...meeting.schedule,
                        startTime,
                      }
                    });
                  } else {
                    target.value = Moment(meeting.schedule.startTime).format('HH');
                  }
                }}
                maxLength={2}
                type="text" />
              <div className={styles.colon}>{':'}</div>
              <input
                className={styles.timeInput}
                defaultValue={Moment(meeting.schedule.startTime).format('mm')}
                onBlur={({ target }) => {
                  const minutes = parseInt(target.value, 10);
                  const time = new Date(meeting.schedule.startTime);
                  time.setMinutes(minutes);
                  const startTime = time.getTime();
                  if (startTime >= (new Date()).getTime() && minutes < 60 && minutes > 0) {
                    setTimeout(() => {
                      target.value = Moment(startTime).format('mm');
                    });
                    update({
                      ...meeting,
                      schedule: {
                        ...meeting.schedule,
                        startTime,
                      }
                    });
                  } else {
                    target.value = Moment(meeting.schedule.startTime).format('mm');
                  }
                }}
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
              });
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
                if (/^[A-Za-z0-9]{0,10}$/.test(target.value)) {
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
    Moment.locale(this.props.currentLocale);
    momentLocalizer();
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
    } = this.props;
    if (!Object.keys(meeting).length) {
      return null;
    }
    const onToggle = (type) => {
      if (this[type]._values.open) {
        this[type].refs.inner.close();
      } else {
        this[type].focus();
        this[type].refs.inner.toggle();
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
                meeting={meeting}
                update={update}
                currentLocale={currentLocale} />
              <When
                isRecurring={isRecurring}
                currentLocale={currentLocale}
                meeting={meeting}
                update={update}
                that={this}
                onToggle={onToggle}
                minTime={minTime} />
              <Duration
                isRecurring={isRecurring}
                currentLocale={currentLocale}
                meeting={meeting}
                update={update} />
              <RecurringMeeting
                isRecurring={isRecurring}
                currentLocale={currentLocale}
                meeting={meeting}
                update={update} />
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
          hidden={hidden}
          disabled={disabled}
          meeting={meeting}
          onClick={invite} />
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
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
};

MeetingPanel.defaultProps = {
  disabled: false,
  hidden: false,
};

export default MeetingPanel;
