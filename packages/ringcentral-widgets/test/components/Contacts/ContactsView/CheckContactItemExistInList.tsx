import { screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const CheckContactItemExistInList: StepFunction<{
  userName?: string;
}> = async ({ userName }) => {
  if (userName) {
    const contactItem = await screen.findByTitle(userName);
    expect(contactItem).toBeVisible();
  }
};
