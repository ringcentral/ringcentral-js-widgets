import type { StepFunction } from '../../../lib/step';

interface CheckAnswerBehaviorProps {
  answerCallPNumber?: string;
  answerCallFinder?: (sessions: any) => {};
}

export const CheckAnswerBehavior: StepFunction<
  CheckAnswerBehaviorProps
> = async ({ answerCallPNumber, answerCallFinder }, { phone }) => {
  const answerCallSession =
    answerCallFinder?.(phone.webphone.sessions) ||
    phone.webphone.sessions.find((item) => item.to === answerCallPNumber);
  // The call should be answered
  expect(phone.webphone.answer).toHaveBeenCalledWith(answerCallSession.id);
  expect(phone.webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: answerCallSession?.id,
    }),
  );
  // other call would be held
  expect(phone.webphone._holdOtherSession).toHaveBeenCalledWith(
    answerCallSession.id,
  );
};
