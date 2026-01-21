import { ContactMatcher } from '@ringcentral-integration/micro-contacts/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const ForceContactMatch: StepFunction<{ phoneNumber: string }> = async (
  { phoneNumber },
  { app },
) => {
  const contactMatcher = app.container.got(ContactMatcher)!;
  await contactMatcher.forceMatchNumber({
    phoneNumber,
  });
};
