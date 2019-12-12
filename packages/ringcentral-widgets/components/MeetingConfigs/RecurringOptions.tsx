import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import MeetingSection from '../MeetingSection';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';
import { WeekdaysSelect } from '../WeekdaysSelect';

interface RecurringOptionsProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  isRecurring: boolean;
  occurrenceDesc?: string;
  showRecurringMeetingV2: boolean;
}

const RecurringOptions: FunctionComponent<RecurringOptionsProps> = ({
  isRecurring,
  currentLocale,
  update,
  meeting,
  occurrenceDesc,
  showRecurringMeetingV2,
}) => {
  const { recurrence = {} } = meeting;
  // TODO: handle different kinds of intervals. For now, there's noly weekly
  // TODO: Convert number to actually weekday
  const selectWeekDay = (selectedWeekdays) => {
    console.log('==>week day selected: ', selectedWeekdays);
    update({
      ...meeting,
      recurrence: {
        ...meeting.recurrence,

        frequency: 'Weekly',
        weeklyByDays: selectedWeekdays,
        interval: '2',
        until: '2030-12-21T12:00:00Z',
      },
    });
  };

  return (
    <>
      <MeetingSection className={styles.section}>
        <div className={styles.RecurringMeetingDiv}>
          <div className={styles.spaceBetween}>
            <span className={styles.label}>
              {i18n.getString('recurringMeeting', currentLocale)}
            </span>
            <Switch
              checked={isRecurring}
              onChange={(isCheckRecurring) => {
                const meetingType = isCheckRecurring
                  ? 'ScheduledRecurring'
                  : 'Scheduled';
                update({
                  ...meeting,
                  meetingType,
                });
              }}
              dataSign="recuttingMeeting"
            />
          </div>
          {isRecurring && !showRecurringMeetingV2 ? (
            <div className={styles.recurringDescribe}>
              {i18n.getString('recurringDescribe', currentLocale)}
            </div>
          ) : null}

          {showRecurringMeetingV2 && isRecurring ? (
            <span className={styles.labelLight}>{occurrenceDesc}</span>
          ) : null}
        </div>
      </MeetingSection>
      {showRecurringMeetingV2 && isRecurring ? (
        <MeetingSection
          title={i18n.getString('recurrenceEndDate', currentLocale)}
        >
          <input placeholder="MM/DD/YYYY" />
        </MeetingSection>
      ) : null}
      {showRecurringMeetingV2 && isRecurring ? (
        <MeetingSection title={i18n.getString('recurrenceType', currentLocale)}>
          <input />
        </MeetingSection>
      ) : null}
      {showRecurringMeetingV2 && isRecurring ? (
        <MeetingSection title={i18n.getString('recurringEvery', currentLocale)}>
          <div>
            <input />
            <span>Week(s)</span>
          </div>
        </MeetingSection>
      ) : null}
      {showRecurringMeetingV2 && isRecurring ? (
        <MeetingSection title={i18n.getString('weekDays', currentLocale)}>
          <WeekdaysSelect
            selected={recurrence.weeklyByDays || []}
            onSelect={(e) => selectWeekDay(e)}
            currentLocale={currentLocale}
            multiple
          />
        </MeetingSection>
      ) : null}
    </>
  );
};
RecurringOptions.defaultProps = {
  occurrenceDesc: 'N/A',
  showRecurringMeetingV2: false,
};
export { RecurringOptions };
