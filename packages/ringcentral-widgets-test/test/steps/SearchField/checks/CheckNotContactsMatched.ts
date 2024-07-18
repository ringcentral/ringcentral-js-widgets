import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckNotContactsMatchedProps {
  selector?: string;
}

/**
 * Check no matched contacts list shown
 */
export const CheckNotContactsMatched: StepFunction<
  CheckNotContactsMatchedProps
> = async ({ selector = 'contactDropdownList' }) => {
  await waitUntilTo(() => {
    expect(screen.queryByTestId(selector)).not.toBeInTheDocument();
  });
};
