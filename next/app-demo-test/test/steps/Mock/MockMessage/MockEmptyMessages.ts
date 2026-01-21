import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockEmptyMessages: StepFunction = async (props, { rcMock }) => {
  rcMock.replaceDefaultInitMock(rcMock.getMessageSync, () => {
    rcMock.getMessageSync({}, (mockData) => ({
      ...mockData,
      records: [],
    }));
  });
};
