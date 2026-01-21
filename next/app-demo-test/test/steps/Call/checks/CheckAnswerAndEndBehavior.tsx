import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckAnswerAndEndProps {
  hungUpCallId: string;
  answerCallNumber: string;
}

export const CheckAnswerAndEndBehavior: StepFunction<
  CheckAnswerAndEndProps
> = async ({ hungUpCallId, answerCallNumber }, { app }) => {
  const webphone = app.container.got(Webphone)!;
  const secondCall = webphone.sessions.find(
    (item) => item.to === answerCallNumber,
  );
  // The secondCall was answered
  expect(webphone.answer).toHaveBeenCalledWith(secondCall!.id);
  expect(webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: secondCall?.id,
    }),
  );
  // The first call should be hangup
  expect(webphone.hangup).toHaveBeenCalledWith(hungUpCallId);
};
