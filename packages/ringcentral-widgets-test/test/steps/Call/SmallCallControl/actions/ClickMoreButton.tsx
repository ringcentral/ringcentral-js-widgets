import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const ClickMoreButton: StepFunction = async (_, context) => {
  const selector = document.querySelector('[data-sign="more"] circle');
  expect(selector).not.toBeNull();

  fireEvent.click(selector!);
};
