import type postRcvBridges from '@ringcentral-integration/mock/src/platform/data/postRcvBridges.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPostBridgesProps {
  handler?: (bridge: typeof postRcvBridges) => typeof postRcvBridges;
  repeat?: number;
}

export const MockPostBridges: StepFunction<MockPostBridgesProps> = async (
  { handler, repeat },
  { rcMock },
) => {
  const mock = () => {
    rcMock.postBridges(repeat, handler);
  };
  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.postBridges);
    rcMock.defaultInitMocks.add(mock);
  }
};
