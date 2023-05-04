import { StepFunction } from '../../lib/step';

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

  rcMock.defaultInitMocks.delete(rcMock.postRcvInvitation);
  // mock rcv invite api returns error, will check it in e2e
  rcMock.defaultInitMocks.add(() => {
    rcMock.post('/restapi/v1.0/uns/render-document' as any, 500, {
      repeat: 0,
      response: () => {
        throw new Error('render-document api is unreachable');
      },
    });
  });
};
