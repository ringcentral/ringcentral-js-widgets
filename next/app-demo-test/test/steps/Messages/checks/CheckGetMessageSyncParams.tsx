import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckGetMessageSyncParams: StepFunction<{
  query: string;
}> = async ({ query }, { rcMock }) => {
  const [_, request] = rcMock.fetchMock.lastCall(
    new RegExp('.*/restapi/v1.0/account/~/extension/~/message-sync'),
    { method: 'get' },
  );
  expect(request.url).toContain(query);
};
