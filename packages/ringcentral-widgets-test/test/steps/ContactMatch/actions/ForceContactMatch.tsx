import type { StepFunction } from '../../../lib/step';

export const ForceContactMatch: StepFunction<{ phoneNumber: string }> = async (
  { phoneNumber },
  { phone },
) => {
  await phone.contactMatcher.forceMatchNumber({
    phoneNumber,
  });
};
