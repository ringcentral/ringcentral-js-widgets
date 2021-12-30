import { fireEvent } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

export const ClickCallButton: StepFunction = () => {
  fireEvent.click(document.querySelector('.callBtn circle'));
};
