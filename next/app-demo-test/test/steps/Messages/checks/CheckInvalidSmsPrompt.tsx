import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen, StepFunction } from '@ringcentral-integration/test-utils';

export const CheckInvalidSmsPrompt: StepFunction = async (props, context) => {
  await whenStateChange(() => {
    screen.getByText('Please enter a valid phone number.');
  });
};
