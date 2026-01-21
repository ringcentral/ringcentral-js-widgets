import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckGetStatusApi: StepFunction<{
  length: number;
}> = async ({ length }, { rcMock }) => {
  const getStatusApi = rcMock.fetchMock.calls(
    new RegExp(`.*/restapi/v1.0/status`),
    { method: 'get' },
  );
  expect(getStatusApi.length).toBe(length);
};
