import { screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckAnswerAndEndProps {
  hungUpCallId: string;
  answerCallNumber: string;
}

export const CheckAnswerAndEndBehavior: StepFunction<
  CheckAnswerAndEndProps
> = async ({ hungUpCallId, answerCallNumber }, { phone }) => {
  const secondCall = phone.webphone.sessions.find(
    (item) => item.to === answerCallNumber,
  );
  // The secondCall was answered
  expect(phone.webphone.answer).toHaveBeenCalledWith(secondCall.id);
  expect(phone.webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: secondCall?.id,
    }),
  );
  // The first call should be hangup
  expect(phone.webphone.hangup).toHaveBeenCalledWith(hungUpCallId);
};
