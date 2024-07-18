import type { RcVMeetingModel } from '@ringcentral-integration/commons/interfaces/Rcv.model';
import type { RcMMeetingModel } from '@ringcentral-integration/commons/modules/Meeting';
import React, { type FunctionComponent } from 'react';

import MeetingScheduleButton from '../MeetingScheduleButton';
import { RcVideoScheduleButton } from '../RcVideoScheduleButton';

export interface GenericMeetingScheduleButtonProps {
  currentLocale: string;
  meeting: RcVMeetingModel | RcMMeetingModel;
  hidden?: boolean;
  disabled?: boolean;
  onClick: () => void;
  showSaveAsDefault: boolean;
  disableSaveAsDefault: boolean;
  update: any;
  buttonLabel?: string;
  isRCM: boolean;
  isRCV: boolean;
  launchMeeting: () => any;
}

export const GenericMeetingScheduleButton: FunctionComponent<
  GenericMeetingScheduleButtonProps
> = (props) => {
  const { meeting, buttonLabel, isRCM, isRCV } = props;
  if (isRCM) {
    return (
      <MeetingScheduleButton
        {...props}
        meeting={meeting as RcMMeetingModel}
        scheduleButtonLabel={buttonLabel}
      />
    );
  }
  if (isRCV) {
    return (
      <RcVideoScheduleButton
        {...props}
        meeting={meeting as RcVMeetingModel}
        buttonLabel={buttonLabel}
      />
    );
  }
  return null;
};
