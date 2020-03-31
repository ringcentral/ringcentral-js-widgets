import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import MeetingSection from '../MeetingSection';
import Switch from '../Switch';
import i18n from './i18n';
import styles from './styles.scss';

interface RecurringOptionsProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  isRecurring: boolean;
  occurrenceDesc?: string;
}

const RecurringOptions: FunctionComponent<RecurringOptionsProps> = ({
  isRecurring,
  currentLocale,
  update,
  meeting,
}) => {
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
          {isRecurring ? (
            <div className={styles.recurringDescribe}>
              {i18n.getString('recurringDescribe', currentLocale)}
            </div>
          ) : null}
        </div>
      </MeetingSection>
    </>
  );
};
RecurringOptions.defaultProps = {
  occurrenceDesc: 'N/A',
};
export { RecurringOptions };
