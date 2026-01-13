import type { GetExtensionForwardingNumberListResponse } from '@ringcentral-integration/mock';

import type { StepFunction } from '../../../lib/step';

interface MockExtensionForwardingNumberProps {
  getPhoneNumberData?: (
    mockData: GetExtensionForwardingNumberListResponse,
  ) => GetExtensionForwardingNumberListResponse;
}

export const MockExtensionForwardingNumber: StepFunction<
  MockExtensionForwardingNumberProps
> = async ({ getPhoneNumberData }, { rcMock }) => {
  const mock = () => {
    rcMock.getForwardingNumber((mockData) => {
      return getPhoneNumberData?.(mockData) ?? mockData;
    });
  };

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.getForwardingNumber);
    rcMock.defaultInitMocks.add(mock);
  }
};
