import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckRcvPatchBridge: StepFunction<{ meeting: any }> = async (
  { meeting },
  { rcMock },
) => {
  const postMeeting = await rcMock?.fetchMock
    ?.lastResponse(new RegExp('.*/rcvideo/v1/bridges'), 'PATCH')
    ?.json();

  expect(postMeeting).toMatchObject(meeting);
};
