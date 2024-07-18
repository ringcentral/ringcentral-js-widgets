import type { RcMMeetingModel } from '@ringcentral-integration/commons/modules/Meeting';
import { RcButton, RcCheckbox } from '@ringcentral/juno';
import React from 'react';

import {
  MeetingScheduleButtonWrapper,
  ScheduleButton,
} from './MeetingScheduleButtonWrapper';
import i18n from './i18n';
import styles from './styles.scss';

export type MeetingScheduleButtonProps = {
  currentLocale: string;
  meeting?: RcMMeetingModel;
  scheduleButtonLabel?: string;
  onClick?: () => void;
  hidden?: boolean;
  showSaveAsDefault?: boolean;
  disableSaveAsDefault?: boolean;
  disabled?: boolean;
  scheduling?: boolean;
  update?: (data: Partial<RcMMeetingModel>) => void;
  showLaunchMeetingBtn?: boolean;
  launchMeeting?: (meeting?: RcMMeetingModel) => void;
};

export const MeetingScheduleButton: React.FC<MeetingScheduleButtonProps> = ({
  meeting,
  scheduleButtonLabel,
  currentLocale,
  hidden = false,
  showSaveAsDefault = false,
  disableSaveAsDefault = false,
  showLaunchMeetingBtn = false,
  disabled = false,
  scheduling = false,
  update,
  onClick,
  launchMeeting,
}) => {
  return (
    <MeetingScheduleButtonWrapper $hidden={hidden}>
      {hidden ? (
        <div className={styles.actionPrompt}>{i18n.getString('prompt')}</div>
      ) : null}
      {showSaveAsDefault ? (
        <RcCheckbox
          data-sign="saveAsDefault"
          checked={meeting?.saveAsDefault}
          disabled={disableSaveAsDefault}
          className={styles.saveAsDefault}
          formControlLabelProps={{
            classes: {
              label: styles.saveAsDefaultLabel,
            },
          }}
          onChange={() =>
            update?.({
              ...meeting,
              saveAsDefault: !meeting?.saveAsDefault,
            })
          }
          label={i18n.getString('saveAsDefault', currentLocale)}
        />
      ) : null}
      <ScheduleButton
        onClick={onClick}
        disabled={disabled}
        loadingMode="suffix"
        loading={scheduling}
        data-sign="meetingScheduleButton"
        fullWidth
      >
        {scheduleButtonLabel ?? i18n.getString('schedule')}
      </ScheduleButton>
      {showLaunchMeetingBtn ? (
        <RcButton
          className={styles.gutter}
          onClick={() => launchMeeting?.(meeting)}
          data-sign="launchMeetingButton"
          variant="text"
          fullWidth
        >
          {i18n.getString('launchMeeting', currentLocale)}
        </RcButton>
      ) : null}
    </MeetingScheduleButtonWrapper>
  );
};
