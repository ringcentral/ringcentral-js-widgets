import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

interface OperationProps {
  parsedNumber: string;
  name?: string;
  type?: 'company' | 'personal';
  showDuration?: boolean;
  showCustomAvatar?: boolean;
}

export const CheckCallControlPage: StepFunction<OperationProps> = async ({
  parsedNumber,
  name = 'Unknown',
  type = 'company',
  showDuration = false,
  showCustomAvatar = false,
}) => {
  await waitUntilTo(() => {
    expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
  });
  expect(screen.getByTestId('userPhoneNumber')).toHaveTextContent(
    new RegExp(parsedNumber.replace(/\(|\)|\+/g, (match) => `\\${match}`)),
  );

  if (showDuration) {
    await waitFor(
      () => {
        expect(screen.getByTestId('callDuration')).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  }

  expect(screen.getByTestId('avatar')).toBeInTheDocument();
  if (showCustomAvatar) {
    expect(
      screen
        .getByTestId('avatar')
        ?.querySelector('svg')
        ?.querySelector('image'),
    ).toBeInTheDocument();
  } else {
    expect(
      screen
        .getByTestId('avatar')
        ?.querySelector('svg')
        ?.querySelector('image'),
    ).not.toBeInTheDocument();
  }
  await waitUntilTo(() => {
    if (type === 'personal') {
      expect(
        screen
          .getByTestId('menuButton')
          .querySelector('[data-sign="currentName"]'),
      ).toHaveTextContent(name);
    } else {
      expect(screen.getByTestId('currentName')).toHaveTextContent(name);
    }
  });
};
