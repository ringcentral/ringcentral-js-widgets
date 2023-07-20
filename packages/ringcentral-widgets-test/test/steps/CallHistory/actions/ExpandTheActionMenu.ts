import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, fireEvent } from '@testing-library/react';

export const ExpandTheActionMenu: StepFunction = async () => {
  const extendButton = await screen.findAllByTestId('extendButton');
  fireEvent.click(extendButton[0]);
};
