import accountBody from '@ringcentral-integration/mock/src/platform/data/accountInfo.json';
import { StepFunction } from '../../lib/step';

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
  rcMock.defaultInitMocks.delete(rcMock.getAccount);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getAccount({ handler, repeat });
  });
};
