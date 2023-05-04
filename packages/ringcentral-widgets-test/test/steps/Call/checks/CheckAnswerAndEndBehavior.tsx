import { screen, waitFor } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckAnswerAndEndProps {
  hungUpCallId: string;
  answerCallNumber: string;
}

export const CheckAnswerAndEndBehavior: StepFunction<CheckAnswerAndEndProps> =
  async ({ hungUpCallId, answerCallNumber }, { phone }) => {
    const secondCall = phone.webphone.sessions.find(
      (item) => item.to === answerCallNumber,
    );
    // The secondCall was answered
    expect(phone.webphone.answer).toBeCalledWith(secondCall.id, undefined);
    expect(phone.webphone._onAccepted).toBeCalledWith(
      expect.objectContaining({
        id: secondCall?.id,
      }),
    );
    // The first call should be hangup
    expect(phone.webphone.hangup).toBeCalledWith(hungUpCallId);
  };
