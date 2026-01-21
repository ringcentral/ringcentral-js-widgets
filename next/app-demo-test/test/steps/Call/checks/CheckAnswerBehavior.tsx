import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface CheckAnswerBehaviorProps {
  answerCallPNumber?: string;
  answerCallFinder?: (sessions: any) => {};
}

export const CheckAnswerBehavior: StepFunction<
  CheckAnswerBehaviorProps
> = async ({ answerCallPNumber, answerCallFinder }, { app }) => {
  const webphone = app.container.got(Webphone)!;
  const answerCallSession =
    answerCallFinder?.(webphone.sessions) ||
    webphone.sessions.find((item) => item.to === answerCallPNumber);
  // The call should be answered
  expect(webphone.answer).toHaveBeenCalledWith(answerCallSession!.id);
  expect(webphone._onAccepted).toHaveBeenCalledWith(
    expect.objectContaining({
      id: answerCallSession?.id,
    }),
  );
  // other call would be held
  expect(webphone._holdOtherSession).toHaveBeenCalledWith(
    answerCallSession!.id,
  );
};
