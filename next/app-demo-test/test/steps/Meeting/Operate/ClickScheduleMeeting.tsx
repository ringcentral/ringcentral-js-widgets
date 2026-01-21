import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickScheduleMeeting: StepFunction = async () => {
  const scheduleButton = screen.getByTestId('meetingScheduleButton');
  fireEvent.click(scheduleButton);
};

export { ClickScheduleMeeting };
