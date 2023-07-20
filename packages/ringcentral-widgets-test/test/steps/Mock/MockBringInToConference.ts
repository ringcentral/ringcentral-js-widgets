import type bringInToConferenceResponse from '@ringcentral-integration/mock/src/platform/data/bringInToConferenceRes.json';

import type { StepFunction } from '../../lib/step';

interface MockBringInToConferenceProps {
  handler?: (
    res: typeof bringInToConferenceResponse,
  ) => typeof bringInToConferenceResponse;
  repeat?: number;
}

export const MockBringInToConference: StepFunction<MockBringInToConferenceProps> =
  async ({ handler, repeat }, { rcMock }) => {
    rcMock.bringInToConference(handler, repeat);
  };
