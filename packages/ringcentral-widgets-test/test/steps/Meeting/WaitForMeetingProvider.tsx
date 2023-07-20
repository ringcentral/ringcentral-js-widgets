import { waitUntilTo } from '@ringcentral-integration/commons/utils';

import type { StepFunction } from '../../lib/step';

export const WaitForMeetingProvider: StepFunction = async (_, context) => {
  const { phone } = context;
  await waitUntilTo(() => {
    expect(phone.videoConfiguration.ready).toBeTruthy();
  });
};
