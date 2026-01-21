import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const CheckContactNotFoundTextExist: StepFunction = () => {
  const contactItem = screen.getByTestId('contactList');
  expect(contactItem).toHaveAttribute('data-contact-count', '0');
  expect(contactItem).toHaveTextContent('No records found.');
};
