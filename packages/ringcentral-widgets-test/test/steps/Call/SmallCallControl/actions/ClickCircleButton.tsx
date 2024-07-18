import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const ClickCircleButton: StepFunction<{
  dataSign: string;
}> = ({ dataSign }) => {
  const muteBtn = screen.getByTestId(dataSign).querySelector('circle');
  fireEvent.click(muteBtn!);
};
