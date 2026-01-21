import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen, within } from '@testing-library/react';

const ClickSelectContactMenu: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('menuButton'));
};

export { ClickSelectContactMenu };
