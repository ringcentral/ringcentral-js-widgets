import { screen, userEvent } from '@ringcentral-integration/test-utils';
import { fireEvent } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const ClickCallButton: StepFunction = () => {
  fireEvent.click(document.querySelector('.callBtn circle'));
};

export const ClickCallButtonByDataSign: StepFunction = async (_, context) => {
  const callButton = screen.getByTestId('callButton');
  userEvent.click(callButton);
};
