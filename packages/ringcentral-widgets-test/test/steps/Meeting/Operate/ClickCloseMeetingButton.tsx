import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

const ClickCloseMeetingButton: StepFunction = async () => {
  const clickCloseMeetingButton = screen.getByTestId('scheduleMeetingClose');
  fireEvent.click(clickCloseMeetingButton);
};

export { ClickCloseMeetingButton };
