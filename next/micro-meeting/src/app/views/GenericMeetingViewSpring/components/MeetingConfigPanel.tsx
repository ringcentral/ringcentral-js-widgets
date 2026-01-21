import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { logger } from '@ringcentral-integration/next-core';
import { useAsyncState } from '@ringcentral-integration/react-hooks';
import {
  Block,
  Button,
  DatePicker,
  Option,
  Select,
  TextField,
  TimePicker,
} from '@ringcentral/spring-ui';
import React, { useState } from 'react';
import { usePromise } from 'react-use';

import i18n from '../i18n';

import {
  MeetingConfigPanelProps,
  MeetingConfigPanelFunctions,
} from './MeetingConfigPanel.interface';

export const MeetingConfigPanel: React.FC<
  MeetingConfigPanelProps & MeetingConfigPanelFunctions
> = ({
  // Props
  meetingTitle,
  meetingDate,
  meetingTime,
  meetingDuration,
  hourOptions,
  minuteOptions,
  disabled,
  isLoading,
  // Functions
  onMeetingTitleChange,
  onMeetingDateChange,
  onMeetingTimeChange,
  onMeetingDurationChange,
  onScheduleMeeting,
}) => {
  const { t } = useLocale(i18n);
  const [meetingTitleState, setMeetingTitleState] = useAsyncState(
    meetingTitle,
    onMeetingTitleChange,
  );

  const [scheduleButtonLoading, setScheduleButtonLoading] = useState(false);
  const mounted = usePromise();

  const handleScheduleMeeting = async () => {
    try {
      setScheduleButtonLoading(true);
      await mounted(onScheduleMeeting());
    } catch (error) {
      logger.error('Failed to schedule meeting:', error);
    } finally {
      setScheduleButtonLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="flex flex-col gap-1 w-full"
        data-sign="meetingTitleSection"
      >
        <div className="typography-descriptorMini text-neutral-b0">
          {t('meetingTitle')}
        </div>
        <TextField
          key="meeting-title-field"
          fullWidth
          size="medium"
          value={meetingTitleState}
          onChange={(e) => {
            const newValue = e.target.value;
            setMeetingTitleState(newValue);
          }}
          disabled={disabled}
          clearBtn={false}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="typography-descriptorMini text-neutral-b0">
          {t('date')}
        </div>
        <DatePicker
          fullWidth
          RootProps={{
            'data-sign': 'meetingDatePicker',
          }}
          label={null}
          variant="outlined"
          value={meetingDate}
          onChange={(date) => {
            if (date) {
              onMeetingDateChange(date);
            }
          }}
          size="medium"
          disabled={disabled}
          clearBtn={false}
        />
      </div>
      <div className="flex flex-col gap-1" data-sign="meetingTimePickerSection">
        <div className="typography-descriptorMini text-neutral-b0">
          {t('time')}
        </div>
        <TimePicker
          fullWidth
          RootProps={{
            'data-sign': 'meetingTimePicker',
          }}
          isTwelveHourSystem
          variant="outlined"
          value={meetingTime}
          onChange={(time) => {
            if (time) {
              onMeetingTimeChange(time);
            }
          }}
          size="medium"
          dateMode
          disabled={disabled}
          clearBtn={false}
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="typography-descriptorMini text-neutral-b0">
          {t('duration')}
        </div>
        <div className="flex flex-wrap gap-2 w-full">
          <Select
            variant="outlined"
            size="medium"
            className="flex-1 min-w-0"
            data-sign="meetingDurationHours"
            value={meetingDuration.hours}
            onChange={(e) =>
              onMeetingDurationChange({
                hours: e.target.value,
                minutes: meetingDuration.minutes,
              })
            }
            renderValue={(value) => `${value} ${t('hour')}`}
            disabled={disabled}
          >
            {hourOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {`${option.value} ${t('hour')}`}
              </Option>
            ))}
          </Select>
          <Select
            variant="outlined"
            size="medium"
            className="flex-1 min-w-0"
            data-sign="meetingDurationMinutes"
            value={meetingDuration.minutes}
            onChange={(e) =>
              onMeetingDurationChange({
                hours: meetingDuration.hours,
                minutes: e.target.value,
              })
            }
            renderValue={(value) => `${value} ${t('minute')}`}
            disabled={disabled}
          >
            {minuteOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {`${option.value} ${t('minute')}`}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Button
        fullWidth
        onClick={handleScheduleMeeting}
        disabled={disabled || isLoading || scheduleButtonLoading}
        loading={scheduleButtonLoading}
        data-sign="videoScheduleButton"
      >
        <div className="typography-subtitleMini text-neutral-high-contrast-b0">
          {t('scheduleVideoMeeting')}
        </div>
      </Button>
    </div>
  );
};
