import { StepFunction } from '../..';

export const UpdateMeetingSettings: StepFunction<any> = async (
  props,
  context,
) => {
  const { phone } = context;
  await phone.genericMeeting.updateMeetingSettings({
    ...phone.genericMeeting.meeting,
    ...props,
  });
};
