import { whenStateOrTimerChange } from '@ringcentral-integration/core/test';
import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface CheckCallControlPageProps {
  parsedNumber: string;
  name?: string;
  // According to <ContactDisplay />
  // There are multiple ways to display components
  contactDisplayType?: 'contact-multiple-match' | 'normal';
  showDuration?: boolean;
  showCustomAvatar?: boolean;
  durationDataSign?: string;
}

export const CheckCallControlPage: StepFunction<
  CheckCallControlPageProps
> = async ({
  parsedNumber,
  name = 'Unknown',
  contactDisplayType = 'normal',
  showDuration = false,
  showCustomAvatar = false,
  durationDataSign = 'callDuration',
}) => {
  await whenStateOrTimerChange(() => {
    expect(screen.getByTestId('activeCallPanel')).toBeInTheDocument();
    expect(screen.getByTestId('userPhoneNumber')).toHaveTextContent(
      new RegExp(parsedNumber.replace(/\(|\)|\+/g, (match) => `\\${match}`)),
    );

    if (showDuration) {
      expect(screen.getByTestId(durationDataSign)).toBeInTheDocument();
    }

    const avatarElement = screen.getByTestId('avatar');
    expect(avatarElement).toBeInTheDocument();

    const avatarImage = avatarElement
      .querySelector('svg')
      ?.querySelector('image');
    if (showCustomAvatar) {
      expect(avatarImage).toBeInTheDocument();
    } else {
      expect(avatarImage).not.toBeInTheDocument();
    }

    const matchesMenuButton = screen.queryByTestId('menuButton');
    if (contactDisplayType === 'contact-multiple-match') {
      expect(matchesMenuButton).toBeInTheDocument();
      expect(
        within(matchesMenuButton!).getByTestId('currentName'),
      ).toHaveTextContent(name);
    } else {
      expect(matchesMenuButton).not.toBeInTheDocument();
      expect(screen.getByTestId('currentName')).toHaveTextContent(name);
    }
  });
};
