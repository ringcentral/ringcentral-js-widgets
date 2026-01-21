import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckOutboundAndHoldProps {
  firstCallPNumber?: string;
  secondCallPNumber: string;
  firstCallFinder?: (sessions: any) => {};
}

export const CheckOutboundAndHoldBehavior: StepFunction<
  CheckOutboundAndHoldProps
> = async (
  { firstCallPNumber, secondCallPNumber, firstCallFinder },
  { app },
) => {
  const webphone = app.container.got(Webphone)!;
  const firstCall =
    firstCallFinder?.(webphone.sessions) ||
    webphone.sessions.find((item) => item.to === firstCallPNumber);
  const secondCall = webphone.sessions.find(
    (item) => item.to === secondCallPNumber,
  );
  // The secondCall was answered
  expect(webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: secondCall?.id,
    }),
  );
  // The first call should be held
  expect(firstCall!.callStatus).toEqual('webphone-session-onHold');
};
