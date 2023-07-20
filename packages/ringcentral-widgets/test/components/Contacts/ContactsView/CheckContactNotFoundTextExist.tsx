import { screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckContactNotFoundTextExist: StepFunction = () => {
  const contactItem = screen.getByTestId('contactList');
  expect(contactItem).toHaveAttribute('data-contact-count', '0');
  expect(contactItem).toHaveTextContent('No records found.');
};
