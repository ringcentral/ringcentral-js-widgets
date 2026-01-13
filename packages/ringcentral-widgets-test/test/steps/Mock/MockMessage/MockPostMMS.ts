import type { GetMMSMessageInfoResponse } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPostMMSProps {
  handler?: (mockData: GetMMSMessageInfoResponse) => GetMMSMessageInfoResponse;
  isDefaultInit?: boolean;
  repeat?: number;
  status?: 200 | 401 | 400 | 500 | 503;
}

export const MockPostMMS: StepFunction<MockPostMMSProps> = async (
  {
    handler = (mockData: GetMMSMessageInfoResponse) => mockData,
    repeat = 1,
    isDefaultInit = true,
    status = 200,
  },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postMms(handler, repeat, status);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.postMms, () => {
    rcMock.postMms(handler, repeat, status);
  });
};
