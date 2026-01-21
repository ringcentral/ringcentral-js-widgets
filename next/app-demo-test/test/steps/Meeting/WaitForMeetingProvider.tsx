import { VideoConfiguration } from '@ringcentral-integration/micro-meeting/src/app/services';
import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const WaitForMeetingProvider: StepFunction = async (_, { app }) => {
  const videoConfiguration = app.container.got(VideoConfiguration)!;
  await whenStateChange(() => {
    expect(videoConfiguration.ready).toBeTruthy();
  });
};
