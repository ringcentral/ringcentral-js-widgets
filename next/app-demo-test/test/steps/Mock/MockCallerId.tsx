import { ExtensionCallerIdInfo } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockCallerIdProps {
  handler?: (callerIdInfo: ExtensionCallerIdInfo) => ExtensionCallerIdInfo;
  isDefaultInit?: boolean;
}

export const MockCallerId: StepFunction<MockCallerIdProps> = async (
  { handler, isDefaultInit = true },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.getCallerId(handler);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getCallerId, () => {
    rcMock.getCallerId(handler);
  });
};
