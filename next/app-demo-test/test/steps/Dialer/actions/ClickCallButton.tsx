import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickCallButton: StepFunction = () => {
  fireEvent.click(screen.getByTestId('callButton'));
};
