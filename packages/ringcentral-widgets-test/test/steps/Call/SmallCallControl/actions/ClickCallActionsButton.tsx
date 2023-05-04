import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

export const ClickCallActionsButton: StepFunction = async () => {
  const selector = document.querySelector('[data-sign="callActions"] circle');
  expect(selector).not.toBeNull();

  fireEvent.click(selector);
};
