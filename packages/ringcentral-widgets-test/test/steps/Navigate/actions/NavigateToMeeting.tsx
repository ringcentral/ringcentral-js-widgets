import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToMeeting: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('meetingTab'));
};
