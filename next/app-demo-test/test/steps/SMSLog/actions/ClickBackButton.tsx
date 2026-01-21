import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickBackButton: StepFunction = () => {
  fireEvent.click(screen.getAllByTestId('backButton')[0]);
};
