import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const SelectContactSourceFilter: StepFunction<{ filter: string }> =
  async ({ filter }) => {
    const contactSourceList = screen.getByTestId('contactSourceList');
    const option = within(contactSourceList).getByText(filter);
    fireEvent.click(option);
  };
