import type { GetSMSMessageInfoResponse } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPostSMSProps {
  handler?: (mockData: GetSMSMessageInfoResponse) => GetSMSMessageInfoResponse;
  isDefaultInit?: boolean;
  repeat?: number;
  status?: 200 | 401 | 400 | 500 | 503;
}

export const MockPostSMS: StepFunction<MockPostSMSProps> = async (
  {
    handler = (mockData: GetSMSMessageInfoResponse) => mockData,
    repeat = 1,
    isDefaultInit = true,
    status = 200,
  },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.postSms(handler, repeat, status);
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.postSms, () => {
    rcMock.postSms(handler, repeat, status);
  });
};
