import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

const ClickScheduleMeeting: StepFunction = async () => {
  const scheduleButton = screen.getByTestId('meetingScheduleButton');
  fireEvent.click(scheduleButton);
};

export { ClickScheduleMeeting };
