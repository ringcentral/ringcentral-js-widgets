import type { StepFunction } from '../../../lib/step';

export const CheckGetStatusApi: StepFunction<{
  length: number;
}> = async ({ length }, { rcMock }) => {
  const getStatusApi = rcMock.fetchMock.calls(
    new RegExp(`.*/restapi/v1.0/status`),
    { method: 'get' },
  );
  expect(getStatusApi.length).toBe(length);
};
