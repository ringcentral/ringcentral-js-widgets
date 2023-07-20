import type { StepFunction } from '../../../lib/step';

interface CheckMeetingTitleProps {
  userName: string;
}

export const CheckMeetingTitle: StepFunction<CheckMeetingTitleProps> = async (
  { userName },
  { phone },
) => {
  expect(phone.genericMeeting.updateMeeting).toHaveBeenCalledWith(
    undefined,
    {
      ...phone.genericMeeting.meeting,
      name: `${userName}'s video meeting`,
    },
    { isAlertSuccess: true },
  );
};
