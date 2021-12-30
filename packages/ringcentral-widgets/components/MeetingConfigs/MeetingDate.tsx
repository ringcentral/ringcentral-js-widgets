import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
import Moment from 'moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

import DateIcon from '../../assets/images/Date.svg';
import TimeIcon from '../../assets/images/Time.svg';
import MeetingSection from '../MeetingSection';
import { NO_NUMBER_REGEX } from './constants';
import i18n from './i18n';
import styles from './styles.scss';

interface MeetingDateProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  that: any;
  onToggle: (...args: any[]) => any;
  useTimePicker: boolean;
  isRecurring: boolean;
}

const MeetingDate: FunctionComponent<MeetingDateProps> = ({
  currentLocale,
  meeting,
  update,
  that,
  onToggle,
  useTimePicker,
  isRecurring,
}) => {
  // The default value of the text input is in the componentDidMount.
  const formatDisplay = (Hours, Minutes) => {
    setTimeout(() => {
      that.minutes.value = `0${Minutes}0`.slice(-3, -1);
      const currentHours = `0${Hours}0`.slice(-3, -1);
      if (useTimePicker) {
        if (currentHours > 12) {
          const convertedHours = +currentHours % 12;
          that.hours.value =
            convertedHours.toString().length === 1
              ? `0${convertedHours}`
              : convertedHours;
        }
      }
    }, 0);
  };
  const changeTime = () => {
    if (useTimePicker) {
      return;
    }
    setTimeout(() => {
      const allInputBlur = document.querySelectorAll(
        'input[flag=timeInput]:focus',
      ).length;
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
            },
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
    const isValid = (value) =>
      currentValue > 0 - value && currentValue < max - value;
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
    const isToday = Moment(meeting.schedule.startTime).isSame(
      new Date(),
      'day',
    );
    if (isToday) {
      const currentMinute = +Moment().format('mm');
      const nearlest = Moment()
        .set('minute', Math.ceil(currentMinute / 15) * 15)
        .toDate();
      minMinute = nearlest;
    }
    console.log('prepared minTime', +minMinute);
  }
  return !isRecurring ? (
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
                    currentStartTime.getDate(),
                  );
                  let startTime = date.getTime();
                  const now = new Date().getTime();
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
                    },
                  });
                }
              }}
              onBlur={() => {
                preventDatePickerReplay(false);
              }}
              onToggle={preventDatePickerReplay}
              ref={(ref) => {
                that.date = ref;
              }}
              format="MM/DD/YY"
              min={new Date()}
            />
            <div
              onClick={() => onToggle('date')}
              data-sign="dateText"
              className={classnames(styles.dateTimeText, styles.dateText)}
            >
              {Moment(meeting.schedule.startTime).format('MM/DD/YY')}
            </div>
          </div>
          <div
            ref={(ref) => {
              that.dateIcon = ref;
            }}
            className={styles.dateIcon}
          >
            <DateIcon
              onClick={() => onToggle('date')}
              className={styles.icon}
            />
          </div>
        </div>

        <div className={styles.list}>
          <div
            className={classnames([
              styles.timePicker,
              useTimePicker && styles.useTimePicker,
            ])}
          >
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
                    },
                  });
                }
              }}
              onBlur={() => {
                preventTimePickerReplay(false);
              }}
              onToggle={preventTimePickerReplay}
              ref={(ref) => {
                that.time = ref;
              }}
              format="hh:mm A"
              min={minMinute}
            />
            <div
              className={styles.timeText}
              onClick={() => {
                if (useTimePicker) {
                  onToggle('time');
                }
              }}
            >
              <input
                flag="timeInput"
                disabled={useTimePicker}
                ref={(ref) => {
                  that.hours = ref;
                }}
                data-sign="timeInputHour"
                className={styles.timeInput}
                defaultValue={Moment(meeting.schedule.startTime).format(
                  useTimePicker ? 'hh' : 'HH',
                )}
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
                type="text"
              />
              <div className={styles.colon}>:</div>
              <input
                flag="timeInput"
                disabled={useTimePicker}
                ref={(ref) => {
                  that.minutes = ref;
                }}
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
                  that.minutes.value = target.value.replace(
                    NO_NUMBER_REGEX,
                    '',
                  );
                }}
                onBlur={changeTime}
                maxLength={2}
                type="text"
              />
              {useTimePicker && (
                <div className={styles.colon}>
                  {Moment(meeting.schedule.startTime).locale('en').format('A')}
                </div>
              )}
            </div>
          </div>
          <div
            ref={(ref) => {
              that.TimeIcon = ref;
            }}
            className={styles.timeIcon}
          >
            <TimeIcon
              onClick={() => {
                if (useTimePicker) {
                  onToggle('time');
                }
              }}
              className={styles.icon}
            />
          </div>
        </div>
      </div>
    </MeetingSection>
  ) : null;
};

export { MeetingDate };
