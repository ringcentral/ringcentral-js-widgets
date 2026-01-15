import type {
  RcVideoAPI,
  RcVSettingKey,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';

import type { StepFunction } from '../../../lib/step';
import { transformV2RequestToV1 } from '../transformV2RequestToV1';

export const CheckPostMeetingParams: StepFunction<
  Partial<RcVideoAPI> & { useV1?: boolean }
> = async ({ children, useV1, ...params }, { phone, rcMock }) => {
  const api = useV1
    ? '.*/rcvideo/v1/bridges'
    : '.*/rcvideo/v2/account/.*/extension/.*/bridges.*';
  const [_, request] = rcMock.fetchMock.lastCall(new RegExp(api), {
    method: 'post',
  })!;
  const requestObj = JSON.parse(request?.body as string);

  const responseData = useV1 ? requestObj : transformV2RequestToV1(requestObj);
  Object.keys(params).forEach((key) => {
    expect(responseData[key]).toEqual(params[key as RcVSettingKey]);
  });
};

export const CheckPostMeetingUrlParams: StepFunction<{
  extensionId?: string;
  accountId?: string;
}> = async ({ accountId = '.*', extensionId = '.*' }, { phone, rcMock }) => {
  const api = `.*/rcvideo/v2/account/${accountId}/extension/${extensionId}/bridges.*`;
  const [url] = rcMock.fetchMock.lastCall(new RegExp(api), {
    method: 'post',
  })!;
  expect(url).toBeDefined();
};

export const CheckPatchMeetingParams: StepFunction<
  Partial<RcVideoAPI> & { useV1?: boolean }
> = async ({ children, useV1, ...params }, { phone, rcMock }) => {
  const api = useV1 ? '.*/rcvideo/v1/bridges' : '.*/rcvideo/v2/bridges/.*';
  const [_, request] = rcMock.fetchMock.lastCall(new RegExp(api), {
    method: 'patch',
  })!;
  const requestObj = JSON.parse(request?.body as string);
  const requestData = useV1 ? requestObj : transformV2RequestToV1(requestObj);
  Object.keys(params).forEach((key) => {
    expect(requestData[key]).toEqual(params[key as RcVSettingKey]);
  });
};
