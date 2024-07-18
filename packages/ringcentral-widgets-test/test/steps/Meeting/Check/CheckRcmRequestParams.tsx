import type { MeetingResponseResource } from '@ringcentral-integration/mock';

import type { StepFunction } from '../../../lib/step';

type MeetingResponseResourceKey = keyof MeetingResponseResource;

const checkParams = (
  expectedData: Partial<MeetingResponseResource>,
  requestData: MeetingResponseResource,
) => {
  Object.keys(expectedData).forEach((key) => {
    if (typeof expectedData[key as MeetingResponseResourceKey] === 'object') {
      expect(requestData[key as MeetingResponseResourceKey]).toEqual(
        expect.objectContaining(
          expectedData[key as MeetingResponseResourceKey],
        ),
      );
    } else {
      expect(requestData[key as MeetingResponseResourceKey]).toEqual(
        expectedData[key as MeetingResponseResourceKey],
      );
    }
  });
};

export const CheckRcmPostMeetingParams: StepFunction<
  Partial<MeetingResponseResource>
> = async ({ children, ...params }, { rcMock }) => {
  const [_, request] = rcMock.fetchMock.lastCall(
    new RegExp('.*/restapi/v1.0/account/~/extension/~/meeting'),
    { method: 'post' },
  );
  const requestObj = JSON.parse(request.body as string);
  checkParams(params, requestObj);
};

export const CheckRcmPutMeetingParams: StepFunction<
  Partial<MeetingResponseResource>
> = async ({ children, ...params }, { rcMock }) => {
  const [_, request] = rcMock.fetchMock.lastCall(
    new RegExp('.*/restapi/v1.0/account/~/extension/~/meeting'),
    { method: 'put' },
  );
  const requestObj = JSON.parse(request.body as string);
  checkParams(params, requestObj);
};
