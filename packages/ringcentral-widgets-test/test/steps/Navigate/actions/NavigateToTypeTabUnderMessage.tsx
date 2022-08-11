import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

interface NavigateToTypeTabUnderMessageProps {
  type: string;
}
export const NavigateToTypeTabUnderMessage: StepFunction<NavigateToTypeTabUnderMessageProps> =
  async ({ type }) => {
    fireEvent.click(screen.getByTestId(type));
  };
