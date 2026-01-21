import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const FocusOnToField: StepFunction = async () => {
  const input = screen.getByTestId('recipientsInput');
  fireEvent.focus(input);
};
