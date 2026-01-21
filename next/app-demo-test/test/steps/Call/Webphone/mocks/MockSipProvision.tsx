import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockSipProvisionProps {
  handler?: (mockData: unknown) => any;
  repeat?: number;
  status?: number;
}

export const MockSipProvision: StepFunction<MockSipProvisionProps> = async (
  { handler, repeat, status },
  { rcMock },
) => {
  function mock() {
    rcMock.postSipProvision(handler, repeat, status);
  }

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.replaceDefaultInitMock(rcMock.postSipProvision, mock);
  }
};
