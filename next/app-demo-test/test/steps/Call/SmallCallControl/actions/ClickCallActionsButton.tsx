import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickCallActionsButton: StepFunction = async () => {
  const selector = document.querySelector('[data-sign="callActions"] circle');
  expect(selector).not.toBeNull();

  fireEvent.click(selector!);
};
