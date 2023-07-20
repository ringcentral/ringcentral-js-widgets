import type { StepFunction } from '../../../lib/step';

export const MockEmptyMessages: StepFunction = async (props, { rcMock }) => {
  rcMock.defaultInitMocks.delete(rcMock.getMessageSync);
  rcMock.defaultInitMocks.add(() => {
    rcMock.getMessageSync({}, (mockData) => ({
      ...mockData,
      records: [],
    }));
  });
};
