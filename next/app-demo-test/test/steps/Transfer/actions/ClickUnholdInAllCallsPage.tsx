import { CallMonitor } from '@ringcentral-integration/micro-phone/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const ClickUnholdInAllCallsPage: StepFunction = async (
  _,
  { app, rcMock },
) => {
  const callMonitor = app.container.got(CallMonitor)!;
  const activeCalls = callMonitor.allCalls;
  const currentCall = activeCalls.find(
    (call: any) => call.telephonyStatus === 'OnHold',
  );

  if (currentCall?.telephonySessionId) {
    await rcMock.unholdCall(currentCall.telephonySessionId);
  }
};
