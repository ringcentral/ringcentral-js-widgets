import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockSampleAudioFile: StepFunction = (_, { rcMock }) => {
  // default name for file mock
  rcMock.fetchMock.mock(`test-file-stub`, 200, {
    method: 'GET',
    response: {
      blob: () => Promise.resolve(new Blob([])),
    },
    repeat: 0,
  });
};
