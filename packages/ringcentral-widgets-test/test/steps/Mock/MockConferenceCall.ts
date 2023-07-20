import type { StepFunction } from '../../lib/step';

interface MockConferenceCallProps {}

export const MockConferenceCall: StepFunction<MockConferenceCallProps> = async (
  props,
  { rcMock },
) => {
  rcMock.postConferenceCall();
};
