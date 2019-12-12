import 'react-widgets/dist/css/react-widgets.css';

import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';

import MeetingSection from '../MeetingSection';
import { HOUR_SCALE, MINUTE_SCALE } from './constants';
import { getHoursList, getMinutesList } from './helpers';
import i18n from './i18n';
import styles from './styles.scss';

const minutesList = getMinutesList(MINUTE_SCALE);
const hoursList = getHoursList(HOUR_SCALE);

interface MeetingDurationProps {
  update: (...args: any[]) => any;
  currentLocale: string;
  meeting: any;
  isRecurring: boolean;
  showRecurringMeetingV2: boolean;
}

const MeetingDuration: FunctionComponent<MeetingDurationProps> = ({
  currentLocale,
  meeting,
  update,
  isRecurring,
  showRecurringMeetingV2,
}) =>
  !isRecurring || showRecurringMeetingV2 ? (
    <MeetingSection title={i18n.getString('duration', currentLocale)}>
      <div className={classnames(styles.spaceBetween, styles.duration)}>
        <div className={styles.list}>
          <div className={styles.hoursList}>
            <DropdownList
              data={hoursList}
              valueField="value"
              textField="text"
              value={parseInt(meeting.schedule.durationInMinutes / 60, 10)}
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
                  },
                });
              }}
            />
          </div>
        </div>
        <div className={styles.list}>
          <div className={styles.minutesList}>
            <DropdownList
              data={minutesList}
              valueField="value"
              textField="text"
              value={meeting.schedule.durationInMinutes % 60 || 0}
              onChange={({ value }) => {
                const restHours = parseInt(
                  meeting.schedule.durationInMinutes / 60,
                  10,
                );
                const isMax = restHours === hoursList.slice(-1)[0].value;
                const minutes = isMax ? 0 : value;
                const durationInMinutes = restHours * 60 + minutes;
                update({
                  ...meeting,
                  schedule: {
                    ...meeting.schedule,
                    durationInMinutes,
                  },
                });
              }}
            />
          </div>
        </div>
      </div>
    </MeetingSection>
  ) : null;

export { MeetingDuration };
