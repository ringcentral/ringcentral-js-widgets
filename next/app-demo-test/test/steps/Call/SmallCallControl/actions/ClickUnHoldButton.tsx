import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickUnHoldButton: StepFunction<{ mock: boolean }> = () => {
  const unholdBtn = screen.getByTestId('onHold').querySelector('circle');
  if (!unholdBtn) return;
  fireEvent.click(unholdBtn);
};
