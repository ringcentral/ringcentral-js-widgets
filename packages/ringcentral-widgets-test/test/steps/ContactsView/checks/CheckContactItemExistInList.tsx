import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

import type { ContactDetailsProps } from './ContactDetailsProps.interface';

interface CheckContactItemExistInListProps extends ContactDetailsProps {}

export const CheckContactItemExistInList: StepFunction<
  CheckContactItemExistInListProps
> = async ({ userName, extensionNumber, isActive }) => {
  if (userName) {
    const contactItem = await screen.findByTitle(userName);
    expect(contactItem).toBeVisible();

    if (isActive === undefined) {
      // do nothing
    } else if (isActive === false) {
      expect(screen.getByText('Inactive')).toBeVisible();
      expect(contactItem).toHaveAttribute('data-inactive', 'true');
      expect(screen.getByTestId('profile')).toHaveAttribute(
        'data-inactive',
        'true',
      );
    } else {
      expect(screen.getByText('Inactive')).not.toBeVisible();
      expect(contactItem).toHaveAttribute('data-inactive', 'false');
      expect(screen.getByTestId('profile')).toHaveAttribute(
        'data-inactive',
        'false',
      );
    }

    expect(contactItem.parentElement).not.toBeNull();
    if (extensionNumber && contactItem.parentElement) {
      expect(
        within(contactItem.parentElement).queryByTitle(extensionNumber),
      ).toBeInTheDocument();
    }
  }
};
