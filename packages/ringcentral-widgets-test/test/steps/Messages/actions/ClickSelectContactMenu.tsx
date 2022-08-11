import { fireEvent, screen, within } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

const ClickSelectContactMenu: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('menuButton'));
};

export { ClickSelectContactMenu };
