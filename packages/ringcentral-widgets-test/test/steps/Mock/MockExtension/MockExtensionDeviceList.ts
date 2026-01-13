import { GetExtensionDevicesResponse } from '@ringcentral-integration/mock';

import type { StepFunction } from '../../../lib/step';

interface MockExtensionDeviceListProps {
  DLs?: 'default' | 'no';
  getDevicesData?: (
    mockData: GetExtensionDevicesResponse,
  ) => GetExtensionDevicesResponse;
}

export const MockExtensionDeviceList: StepFunction<
  MockExtensionDeviceListProps
> = async ({ DLs, getDevicesData }, { rcMock }) => {
  const mock = () => {
    rcMock.getDevice((mockData) => {
      if (DLs === 'no') {
        return {
          ...mockData,
          records: [],
        };
      }
      return getDevicesData?.(mockData) ?? mockData;
    });
  };

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.getDevice);
    rcMock.defaultInitMocks.add(mock);
  }
};
