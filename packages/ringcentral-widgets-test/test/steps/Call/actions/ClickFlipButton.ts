import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@ringcentral-integration/test-utils';

export const ClickFlipButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('callActions'));
  expect(screen.getByTestId('flip')).toBeInTheDocument();
  fireEvent.click(screen.getByTestId('flip'));
};
