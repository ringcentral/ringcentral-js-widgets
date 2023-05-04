import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

const ClickScheduleMeeting: StepFunction = async () => {
  const scheduleButton = screen.getByTestId('meetingScheduleButton');
  fireEvent.click(scheduleButton);
};

export { ClickScheduleMeeting };
