import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickCloseMeetingButton: StepFunction = async () => {
  const clickCloseMeetingButton = screen.getByTestId('scheduleMeetingClose');
  fireEvent.click(clickCloseMeetingButton);
};

export { ClickCloseMeetingButton };
