import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickMoreButton: StepFunction = async () => {
  const selector = document.querySelector('[data-sign="more"] circle');
  expect(selector).not.toBeNull();

  fireEvent.click(selector!);
};

export { ClickMoreButton };
