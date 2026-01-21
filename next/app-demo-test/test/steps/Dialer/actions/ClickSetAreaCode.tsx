import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickSetAreaCode: StepFunction = () => {
  fireEvent.click(screen.getAllByTestId('setAreaCode')[0]);
};
