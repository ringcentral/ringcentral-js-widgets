import { Webphone } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

interface CheckHoldProps {
  callId: string;
  type: 'hold' | 'unhold';
}

export const CheckHoldBehavior: StepFunction<CheckHoldProps> = async (
  { callId, type },
  { app },
) => {
  const webphone = app.container.got(Webphone)!;
  const currentCall = webphone.sessions.find((item) => item.id === callId);
  expect(webphone[type]).toHaveBeenCalledWith(currentCall?.id);
};
