import type accountBody from '@ringcentral-integration/mock/src/platform/data/accountInfo.json';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockAccountInfoProps {
  handler?: (accountInfo: typeof accountBody) => typeof accountBody;
  isDefaultInit?: boolean;
  repeat?: number;
}

export const MockAccountInfo: StepFunction<MockAccountInfoProps> = async (
  { handler, isDefaultInit = true, repeat = 1 },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.getAccount({ handler, repeat });
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getAccount, () => {
    rcMock.getAccount({ handler, repeat });
  });
};
