import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockRcvRenderdocument: StepFunction<{
  isDefaultInit?: boolean;
  handler?: any;
}> = async ({ isDefaultInit = true, handler }, { rcMock }) => {
  if (!isDefaultInit) {
    rcMock.postRcvInvitation((mockData) => {
      return handler?.(mockData) ?? mockData;
    });
  }

  rcMock.replaceDefaultInitMock(rcMock.postRcvInvitation, () => {
    rcMock.postRcvInvitation((mockData) => {
      return handler?.(mockData) ?? mockData;
    });
  });
};
