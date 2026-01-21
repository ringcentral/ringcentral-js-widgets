import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickMuteButton: StepFunction = () => {
  const muteBtn = screen.getByTestId('mute').querySelector('circle');
  fireEvent.click(muteBtn!);
};
