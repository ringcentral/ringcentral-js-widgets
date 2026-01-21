import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockConferenceCallProps {}

export const MockConferenceCall: StepFunction<MockConferenceCallProps> = async (
  props,
  { rcMock },
) => {
  rcMock.postConferenceCall();
};
