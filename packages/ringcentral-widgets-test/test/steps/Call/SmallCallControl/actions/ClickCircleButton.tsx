import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

export const ClickCircleButton: StepFunction<{
  dataSign: string;
  container?: string;
}> = ({ dataSign, container }) => {
  let element: any = screen;
  if (container) {
    element = within(screen.getByTestId(container));
  }
  const muteBtn = element.getByTestId(dataSign).querySelector('circle');
  fireEvent.click(muteBtn!);
};
