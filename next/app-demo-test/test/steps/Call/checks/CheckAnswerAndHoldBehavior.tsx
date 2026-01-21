import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckAnswerAndHoldProps {
  firstCallPNumber?: string;
  secondCallPNumber: string;
  firstCallFinder?: (sessions: any) => {};
}

export const CheckAnswerAndHoldBehavior: StepFunction<
  CheckAnswerAndHoldProps
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
  expect(webphone.answer).toHaveBeenCalledWith(secondCall!.id);
  expect(webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: secondCall?.id,
    }),
  );
  // The first call should be held
  expect(webphone.hold).toHaveBeenCalledWith(firstCall?.id);
};
