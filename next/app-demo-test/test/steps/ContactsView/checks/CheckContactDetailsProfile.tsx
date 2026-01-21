import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

import type { ContactDetailsProps } from './ContactDetailsProps.interface';

interface CheckContactDetailsProfileProps extends ContactDetailsProps {}

export const CheckContactDetailsProfile: StepFunction<
  CheckContactDetailsProfileProps
> = async ({ userName, isActive = true }) => {
  await whenStateChange(() => {
    expect(screen.getByLabelText('profile')).toBeVisible();
  });
  const profileContainer = screen.getByLabelText('profile');
  if (!isActive) {
    expect(within(profileContainer).getByText('Inactive')).toBeVisible();
    expect(within(profileContainer).getByTitle(userName)).toHaveAttribute(
      'data-inactive',
      'true',
    );
    expect(within(profileContainer).getByTestId('profile')).toHaveAttribute(
      'data-inactive',
      'true',
    );
  } else {
    expect(within(profileContainer).getByText('Inactive')).not.toBeVisible();
    expect(within(profileContainer).getByTitle(userName)).toHaveAttribute(
      'data-inactive',
      'false',
    );
    expect(within(profileContainer).getByTestId('profile')).toHaveAttribute(
      'data-inactive',
      'false',
    );
  }
};
