import type { StepFunction } from '../../lib/step';

interface MockPutPresenceProps {
  repeat?: number;
  isDefaultInit?: boolean;
}

export const MockLimitedPutPresence: StepFunction<MockPutPresenceProps> = (
  { repeat = 1, isDefaultInit = false },
  { rcMock },
) => {
  const mock = () => {
    rcMock.put(
      '/restapi/v1.0/account/:accountId/extension/:extensionId/presence',
      503,
      {
        response: {
          body: {
            status: 503,
            errorCode: 'CMN-211',
            errors: [{ errorCode: 'CMN-211' }],
          },
        },
        repeat,
      },
    );
  };
  if (!isDefaultInit) {
    mock();
    return;
  }
  rcMock.replaceDefaultInitMock(rcMock.presenceUpdate, mock);
};
