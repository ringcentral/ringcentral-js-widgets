import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckContactNumberNotExist: StepFunction<{
  userName?: string;
}> = ({ userName }) => {
  if (userName) {
    const contactItem = screen.queryByTitle(userName);
    expect(contactItem).not.toBeInTheDocument();
  }
};
