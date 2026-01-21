import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickToCurrentCallControlPage: StepFunction = () => {
  fireEvent.click(screen.getByTestId('currentCallButton'));
  expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
};
