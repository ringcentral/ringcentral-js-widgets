import type { StepFunction } from '../../../../lib/step';

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
    rcMock.defaultInitMocks.delete(rcMock.postSipProvision);
    rcMock.defaultInitMocks.add(mock);
  }
};
