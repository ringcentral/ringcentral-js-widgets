import { ActiveCallControl } from '@ringcentral-integration/micro-phone/src/app/services';
import type { PartySuperviseResponse } from '@ringcentral-integration/mock';
import type {
  Context,
  StepFunction,
} from '@ringcentral-integration/test-utils';

const PARTY_STATUS_CODE_HOLD = 'Hold';

interface MockHoldPartyProps {
  repeat?: number;
}

export const findCurrentPartyInfo = (
  app: Context['app'],
  telephonySessionId: string,
  partyId: string,
) => {
  const activeCallControl = app.container.got(ActiveCallControl)!;
  const session = activeCallControl._getSessionById(telephonySessionId)!;
  return (session.parties as PartySuperviseResponse[]).find(
    (x) => x.id === partyId,
  );
};

export const MockHoldParty: StepFunction<MockHoldPartyProps> = async (
  { repeat },
  { app, rcMock },
) => {
  const mock = () => {
    rcMock.holdParty(
      200,
      (params) => {
        // trigger notification
        rcMock.holdCall(params.telephonySessionId);
        // response
        const partyInfo = findCurrentPartyInfo(
          app,
          params.telephonySessionId,
          params.partyId,
        )!;
        const response: PartySuperviseResponse = {
          ...partyInfo,
          status: {
            ...partyInfo.status,
            code: PARTY_STATUS_CODE_HOLD,
          },
        };
        return response;
      },
      repeat,
    );
  };
  if (rcMock.initialized) {
    mock();
  } else {
    rcMock.defaultInitMocks.delete(rcMock.holdParty);
    rcMock.defaultInitMocks.add(mock);
  }
};
