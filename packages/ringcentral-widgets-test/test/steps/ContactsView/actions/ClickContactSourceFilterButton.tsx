import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickContactSourceFilterButton: StepFunction = async () => {
  const button = screen.getByTestId('contactSourceFilterButton');
  fireEvent.click(button);
};
