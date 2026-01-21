import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickBackButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('backButton'));
};

export { ClickBackButton };
