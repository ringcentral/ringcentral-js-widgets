import { screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface CheckInContactDetailsPageProps {
  userName?: string;
}

export const CheckInContactDetailsPage: StepFunction<CheckInContactDetailsPageProps> =
  async ({ userName }) => {
    const headers = screen.queryAllByTestId('headerTitle');
    const myHeader = headers.find((header) =>
      header.textContent?.includes('Contact Details'),
    );
    expect(myHeader).toHaveTextContent('Contact Details');

    if (userName) {
      const detailsName = await screen.findByTestId('contactName');
      expect(detailsName).toHaveTextContent(userName);
    }
  };
