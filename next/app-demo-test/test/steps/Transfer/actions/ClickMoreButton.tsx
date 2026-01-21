import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickMoreButton: StepFunction = async () => {
  const selector = screen.getByTestId('more');
  fireEvent.click(selector);
};

export { ClickMoreButton };
