import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

const ClickSelectContactMenu: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('menuButton'));
};

export { ClickSelectContactMenu };
