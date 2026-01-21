import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface CheckNotContactsMatchedProps {
  selector?: string;
}

/**
 * Check no matched contacts list shown
 */
export const CheckNotContactsMatched: StepFunction<
  CheckNotContactsMatchedProps
> = async ({ selector = 'contactDropdownList' }) => {
  await whenStateChange(() => {
    expect(screen.queryByTestId(selector)).not.toBeInTheDocument();
  });
};
