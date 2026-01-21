import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const SaveCallLog: StepFunction = () => {
  fireEvent.click(screen.getByTestId('saveCall'));
};
