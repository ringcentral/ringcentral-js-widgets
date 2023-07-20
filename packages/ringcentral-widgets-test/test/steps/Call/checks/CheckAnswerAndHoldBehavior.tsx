import { screen, waitFor } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface CheckAnswerAndHoldProps {
  firstCallPNumber?: string;
  secondCallPNumber: string;
  firstCallFinder?: (sessions: any) => {};
}

export const CheckAnswerAndHoldBehavior: StepFunction<CheckAnswerAndHoldProps> =
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
    expect(phone.webphone.answer).toBeCalledWith(secondCall.id);
    expect(phone.webphone._onAccepted).toBeCalledWith(
      expect.objectContaining({
        id: secondCall?.id,
      }),
    );
    // The first call should be held
    expect(phone.webphone.hold).toBeCalledWith(firstCall?.id);
  };
