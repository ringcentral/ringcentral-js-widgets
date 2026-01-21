import type { PartySuperviseResponse } from '@ringcentral-integration/mock';
import type { StepFunction } from '@ringcentral-integration/test-utils';

import { findCurrentPartyInfo } from './MockHoldParty';

const PARTY_STATUS_CODE_UNHOLD = 'Answered';

interface MockUnholdPartyProps {
  repeat?: number;
}

export const MockUnholdParty: StepFunction<MockUnholdPartyProps> = async (
  { repeat },
  { app, rcMock },
) => {
  const mock = () => {
    rcMock.unholdParty(
      200,
      (params) => {
        // trigger notification
        rcMock.unholdCall(params.telephonySessionId);
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
            code: PARTY_STATUS_CODE_UNHOLD,
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
    rcMock.defaultInitMocks.delete(rcMock.unholdParty);
    rcMock.defaultInitMocks.add(mock);
  }
};
