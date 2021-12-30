import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

export const ExpandTheActionMenu: StepFunction = async () => {
  const extendButton = await screen.findByTestId('extendButton');
  extendButton.click();
};
