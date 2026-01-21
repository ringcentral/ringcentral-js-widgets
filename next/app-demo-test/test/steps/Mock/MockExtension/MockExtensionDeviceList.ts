import { StepFunction } from '@ringcentral-integration/test-utils';

interface MockExtensionDeviceListProps {
  DLs?: 'default' | 'no';
  errorCode?: number;
}

export const MockExtensionDeviceList: StepFunction<
  MockExtensionDeviceListProps
> = async ({ DLs, errorCode }, { rcMock }) => {
  const mock = () => {
    if (errorCode) {
      rcMock.get(
        '/restapi/v1.0/account/:accountId/extension/:extensionId/device' as any,
        errorCode,
      );
    } else {
      rcMock.getDevice((mockData) => {
        if (DLs === 'no') {
          return {
            ...mockData,
            records: [],
          };
        }
        return mockData;
      });
    }
  };

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.replaceDefaultInitMock(rcMock.getDevice, mock);
  }
};
