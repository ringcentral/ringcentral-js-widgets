import type { StepFunction } from '../../../lib/step';

export const OperateTopic: StepFunction<{ topic: string }> = async (
  { topic },
  { phone },
) => {
  phone.rcVideo.updateMeetingSettings({ name: topic });
  expect(phone.rcVideo.meeting.name).toBe(topic);
};
