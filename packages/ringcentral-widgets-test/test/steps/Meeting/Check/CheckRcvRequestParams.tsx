import {
  RcVideoAPI,
  RcVSettingKey,
} from '@ringcentral-integration/commons/interfaces/Rcv.model';
import { StepFunction } from '../../../lib/step';

export const CheckPostMeetingParams: StepFunction<Partial<RcVideoAPI>> = async (
  { children, ...params },
  { phone, rcMock },
) => {
  const [_, request] = rcMock.fetchMock.lastCall(
    new RegExp('.*/rcvideo/v1/bridges'),
    { method: 'post' },
  );
  const requestObj = JSON.parse(request.body as string);
  Object.keys(params).forEach((key) => {
    expect(requestObj[key]).toEqual(params[key as RcVSettingKey]);
  });
};

export const CheckPatchMeetingParams: StepFunction<Partial<RcVideoAPI>> =
  async ({ children, ...params }, { phone, rcMock }) => {
    const [_, request] = rcMock.fetchMock.lastCall(
      new RegExp('.*/rcvideo/v1/bridges'),
      { method: 'patch' },
    );
    const requestObj = JSON.parse(request.body as string);
    Object.keys(params).forEach((key) => {
      expect(requestObj[key]).toEqual(params[key as RcVSettingKey]);
    });
  };
