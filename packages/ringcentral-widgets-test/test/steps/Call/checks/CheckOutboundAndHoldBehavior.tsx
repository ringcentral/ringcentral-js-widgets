import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckOutboundAndHoldProps {
  firstCallPNumber?: string;
  secondCallPNumber: string;
  firstCallFinder?: (sessions: any) => {};
}

export const CheckOutboundAndHoldBehavior: StepFunction<CheckOutboundAndHoldProps> =
  async (
    { firstCallPNumber, secondCallPNumber, firstCallFinder },
    { phone },
  ) => {
    const firstCall =
      firstCallFinder?.(phone.webphone.sessions) ||
      phone.webphone.sessions.find((item) => item.to === firstCallPNumber);
    const secondCall = phone.webphone.sessions.find(
      (item) => item.to === secondCallPNumber,
    );
    // The secondCall was answered
    expect(phone.webphone._onAccepted).toBeCalledWith(
      expect.objectContaining({
        id: secondCall?.id,
      }),
    );
    // The first call should be held
    expect(firstCall.callStatus).toEqual('webphone-session-onHold');
  };
