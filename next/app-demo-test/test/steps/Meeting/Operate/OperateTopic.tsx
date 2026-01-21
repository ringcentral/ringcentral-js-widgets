import { RcVideo } from '@ringcentral-integration/micro-meeting/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const OperateTopic: StepFunction<{ topic: string }> = async (
  { topic },
  { app },
) => {
  const rcVideo = app.container.got(RcVideo)!;
  rcVideo.updateMeetingSettings({ name: topic });
  expect(rcVideo.meeting!.name).toBe(topic);
};
