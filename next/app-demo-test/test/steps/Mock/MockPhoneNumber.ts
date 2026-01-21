import type { GetExtensionPhoneNumbersResponse } from '@ringcentral-integration/mock/src/platform/interfaces';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface MockPhoneNumberProps {
  handler?: (
    phoneNumberList: GetExtensionPhoneNumbersResponse,
  ) => GetExtensionPhoneNumbersResponse;
  isDefaultInit?: boolean;
}

export const MockPhoneNumber: StepFunction<MockPhoneNumberProps> = async (
  { handler, isDefaultInit },
  { rcMock },
) => {
  if (!isDefaultInit) {
    rcMock.getPhoneNumber((mockData) => {
      return handler?.(mockData) ?? mockData;
    });
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.getPhoneNumber, () => {
    rcMock.getPhoneNumber((mockData) => {
      return handler?.(mockData) ?? mockData;
    });
  });
};
