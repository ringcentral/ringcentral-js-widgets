import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckContactNumberNotExist: StepFunction<{
  userName?: string;
}> = ({ userName }) => {
  if (userName) {
    const contactItem = screen.queryByTitle(userName);
    expect(contactItem).not.toBeInTheDocument();
  }
};
