import 'react-widgets/dist/css/react-widgets.css';

import type { FunctionComponent } from 'react';
import React from 'react';

import classnames from 'classnames';
import dayjs from 'dayjs';
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
  const formatDisplay = (Hours: any, Minutes: any) => {
    setTimeout(() => {
      that.minutes.value = `0${Minutes}0`.slice(-3, -1);
      const currentHours = `0${Hours}0`.slice(-3, -1);
      if (useTimePicker) {
        // @ts-expect-error TS(2365): Operator '>' cannot be applied to types 'string' a... Remove this comment to see the full error message
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
  const accumulator = (event: any, max: any) => {
    const currentValue = parseInt(event.target.value, 10);
    const isValid = (value: any) =>
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
  const preventDatePickerReplay = (isFocus: any) => {
    that.dateBlur = true;
    setTimeout(() => {
      if (!isFocus && !that.timeBlur) {
        that.topic.focus();
      }
      that.dateBlur = false;
    }, 200);
  };
  const preventTimePickerReplay = (isFocus: any) => {
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
    const isToday = dayjs(meeting.schedule.startTime).isSame(new Date(), 'day');
    if (isToday) {
      const currentMinute = +dayjs().format('mm');
      const nearlest = dayjs()
        .set('minute', Math.ceil(currentMinute / 15) * 15)
        .toDate();
      minMinute = nearlest;
    }
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
              ref={(ref: any) => {
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
              {dayjs(meeting.schedule.startTime).format('MM/DD/YY')}
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
              ref={(ref: any) => {
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
                // @ts-expect-error TS(2322): Type '{ flag: string; disabled: boolean; ref: (ref... Remove this comment to see the full error message
                flag="timeInput"
                disabled={useTimePicker}
                ref={(ref) => {
                  that.hours = ref;
                }}
                data-sign="timeInputHour"
                className={styles.timeInput}
                defaultValue={dayjs(meeting.schedule.startTime).format(
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
                  // @ts-expect-error TS(2339): Property 'selectionEnd' does not exist on type 'Ev... Remove this comment to see the full error message
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
                // @ts-expect-error TS(2322): Type '{ flag: string; disabled: boolean; ref: (ref... Remove this comment to see the full error message
                flag="timeInput"
                disabled={useTimePicker}
                ref={(ref) => {
                  that.minutes = ref;
                }}
                data-sign="timeInputMinute"
                className={styles.timeInput}
                defaultValue={dayjs(meeting.schedule.startTime).format('mm')}
                onKeyDown={(event) => {
                  const isDelKey = event.keyCode === 8;
                  const isLeftKey = event.keyCode === 37;
                  // @ts-expect-error TS(2339): Property 'selectionEnd' does not exist on type 'Ev... Remove this comment to see the full error message
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
                  {dayjs(meeting.schedule.startTime).locale('en').format('A')}
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
