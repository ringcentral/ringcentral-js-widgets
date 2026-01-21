import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockMuteFail: StepFunction<any> = (_, { rcMock }) => {
  rcMock.mute(500);
};
