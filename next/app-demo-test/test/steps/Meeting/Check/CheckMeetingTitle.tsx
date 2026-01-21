import { GenericMeeting } from '@ringcentral-integration/micro-meeting/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface CheckMeetingTitleProps {
  userName: string;
}

export const CheckMeetingTitle: StepFunction<CheckMeetingTitleProps> = async (
  { userName },
  { app },
) => {
  const genericMeeting = app.container.got(GenericMeeting);
  expect(genericMeeting.updateMeeting).toHaveBeenCalledWith(
    undefined,
    {
      ...genericMeeting.meeting,
      name: `${userName}'s video meeting`,
    },
    { isAlertSuccess: true },
  );
};
