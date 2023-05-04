import 'react-widgets/dist/css/react-widgets.css';

import React, { FunctionComponent } from 'react';

import classnames from 'classnames';
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
}

const MeetingDuration: FunctionComponent<MeetingDurationProps> = ({
  currentLocale,
  meeting,
  update,
  isRecurring,
}) =>
  !isRecurring ? (
    <MeetingSection title={i18n.getString('duration', currentLocale)}>
      <div className={classnames(styles.spaceBetween, styles.duration)}>
        <div className={styles.list}>
          <div className={styles.hoursList}>
            <DropdownList
              data={hoursList}
              valueField="value"
              textField="text"
              // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
              value={parseInt(meeting.schedule.durationInMinutes / 60, 10)}
              onChange={({ value }) => {
                let restMinutes = meeting.schedule.durationInMinutes % 60;
                // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
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
                  // @ts-expect-error TS(2345): Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
                  meeting.schedule.durationInMinutes / 60,
                  10,
                );
                // @ts-expect-error TS(2339): Property 'value' does not exist on type 'never'.
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
