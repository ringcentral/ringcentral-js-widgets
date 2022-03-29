import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const ClickMoreButton: StepFunction = async () => {
  const selector = document.querySelector('[data-sign="more"] circle');
  expect(selector).not.toBeNull();

  fireEvent.click(selector);
};

export { ClickMoreButton };
