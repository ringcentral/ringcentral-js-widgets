import type { StepFunction } from '../../../lib/step';

interface MockExtensionDeviceListProps {
  DLs: 'default' | 'no';
}

export const MockExtensionDeviceList: StepFunction<
  MockExtensionDeviceListProps
> = async ({ DLs }, { rcMock }) => {
  const mock = () => {
    rcMock.getDevice((mockData) => {
      if (DLs === 'no') {
        return {
          ...mockData,
          records: [],
        };
      }
      return mockData;
    });
  };

  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.getDevice);
    rcMock.defaultInitMocks.add(mock);
  }
};
