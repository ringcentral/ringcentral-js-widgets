import { StepFunction } from '../../../lib/step';

export const MakeC2DCall: StepFunction<{
  recipient: { phoneNumber: string; id: string };
  phoneNumber: string;
}> = async ({ recipient, phoneNumber }, context) => {
  const {
    phone: { dialerUI },
  } = context;
  await dialerUI.call({ phoneNumber, recipient, fromNumber: '+18882556247' });
};
