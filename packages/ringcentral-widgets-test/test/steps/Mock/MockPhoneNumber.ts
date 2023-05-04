import { GetExtensionPhoneNumbersResponse } from '@ringcentral-integration/mock/src/platform/interfaces';
import { StepFunction } from '../../lib/step';

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
  rcMock.defaultInitMocks.delete(rcMock.getPhoneNumber);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getPhoneNumber((mockData) => {
      return handler?.(mockData) ?? mockData;
    });
  });
};
