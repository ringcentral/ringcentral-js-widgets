import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const ClickContactSourceFilterButton: StepFunction = async () => {
  const button = screen.getByTestId('contactSourceFilterButton');
  fireEvent.click(button);
};
