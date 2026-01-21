import type { CallParty } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockBringInToConferenceProps {
  handler?: (res: CallParty) => CallParty;
  repeat?: number;
  status?: 200 | 500;
}

export const MockBringInToConference: StepFunction<
  MockBringInToConferenceProps
> = async ({ handler, repeat, status }, { rcMock }) => {
  rcMock.bringInToConference(handler, repeat, status);
};
