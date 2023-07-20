import type { RcMock } from '@ringcentral-integration/mock';
import type { StepFunction } from '../../lib/step';

interface MockGetRingOutProps {
  handler?: Parameters<RcMock['ringOutUpdate']>[0];
  isDefaultInit?: boolean;
}
export const MockGetRingOut: StepFunction<MockGetRingOutProps> = async (
  { handler, isDefaultInit = true },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.ringOutUpdate(handler);
    return;
  }
  rcMock.defaultInitMocks.delete(rcMock.ringOutUpdate);
  rcMock.defaultInitMocks.add(() => {
    rcMock.ringOutUpdate(handler);
  });
};
