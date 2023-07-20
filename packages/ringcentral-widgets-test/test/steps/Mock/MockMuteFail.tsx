import type { StepFunction } from '../../lib/step';

export const MockMuteFail: StepFunction<any> = (_, { rcMock }) => {
  rcMock.mute(500);
};
