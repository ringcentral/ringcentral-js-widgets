import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const SearchContacts: StepFunction<{ content: string }> = async ({
  content,
}) => {
  const searchInput = screen.getByTestId('contactsSearchInput');

  jest.useFakeTimers();

  fireEvent.change(searchInput, { target: { value: content } });
  expect(searchInput).toHaveAttribute('value', content);

  // make debounce completed
  // wait layout ready, then the timer will be trigger
  await waitForRenderReady();
  // skip all timer
  jest.runOnlyPendingTimers();
  // reset timer back to real
  jest.useRealTimers();

  await waitForRenderReady();
};
