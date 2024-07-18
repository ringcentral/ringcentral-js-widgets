import { fireEvent, screen } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const ClickUnHoldButton: StepFunction<{ mock: boolean }> = () => {
  const unholdBtn = screen.getByTestId('onHold').querySelector('circle');
  if (!unholdBtn) return;
  fireEvent.click(unholdBtn);
};
