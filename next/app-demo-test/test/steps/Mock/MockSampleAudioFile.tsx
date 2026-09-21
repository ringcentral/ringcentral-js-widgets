import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockSampleAudioFile: StepFunction = (_, { rcMock }) => {
  const originalOverwriteRoutes = rcMock.fetchMock.config.overwriteRoutes;

  // default name for file mock
  try {
    rcMock.fetchMock.config.overwriteRoutes = true;
    rcMock.fetchMock.mock(`test-file-stub`, 200, {
      method: 'GET',
      response: {
        blob: () => Promise.resolve(new Blob([])),
      },
      repeat: 0,
    });
  } finally {
    rcMock.fetchMock.config.overwriteRoutes = originalOverwriteRoutes;
  }
};
