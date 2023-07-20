import type { StepFunction } from '../../lib/step';

export const MockUnHoldCallFail: StepFunction<any> = (_, { rcMock }) => {
  rcMock.post(
    `/restapi/v1.0/account/:accountId/telephony/sessions/:telephonySessionId/parties/:partyId/unhold`,
    409,
    {
      repeat: 1,
      response: {
        body: {
          errorCode: 'TAS-102 409',
          message: 'Incorrect State 409',
        },
      },
    },
  );
};
