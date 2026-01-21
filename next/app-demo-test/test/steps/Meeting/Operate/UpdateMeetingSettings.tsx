import { GenericMeeting } from '@ringcentral-integration/micro-meeting/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const UpdateMeetingSettings: StepFunction<any> = async (
  props,
  { app },
) => {
  const genericMeeting = app.container.got(GenericMeeting)!;
  await genericMeeting.updateMeetingSettings({
    ...genericMeeting.meeting,
    ...props,
  });
};
