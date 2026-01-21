import { DialerView } from '@ringcentral-integration/micro-phone/src/app/views';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const MakeC2DCall: StepFunction<{
  recipient: { phoneNumber: string; id: string };
  phoneNumber: string;
}> = async ({ recipient, phoneNumber }, { app }) => {
  const dialerView = app.container.got(DialerView)!;
  await dialerView.call({ phoneNumber, recipient, fromNumber: '+18882556247' });
};
