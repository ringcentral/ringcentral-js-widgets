import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MockErrorRcvInvitation: StepFunction<{
  isDefaultInit?: boolean;
}> = async ({ isDefaultInit = true }, { rcMock }) => {
  if (!isDefaultInit) {
    rcMock.post('/restapi/v1.0/uns/render-document' as any, 500, {
      repeat: 0,
      response: () => {
        throw new Error('render-document api is unreachable');
      },
    });
    return;
  }

  // mock rcv invite api returns error, will check it in e2e
  rcMock.replaceDefaultInitMock(rcMock.postRcvInvitation, () => {
    rcMock.post('/restapi/v1.0/uns/render-document' as any, 500, {
      repeat: 0,
      response: () => {
        throw new Error('render-document api is unreachable');
      },
    });
  });
};
