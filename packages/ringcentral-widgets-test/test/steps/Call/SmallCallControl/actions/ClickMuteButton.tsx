import { fireEvent, screen, getByTestId } from '@testing-library/react';

import type { StepFunction } from '../../../../lib/step';

export const ClickMuteButton: StepFunction = () => {
  const muteBtn = screen.getByTestId('mute').querySelector('circle');
  fireEvent.click(muteBtn);
};
