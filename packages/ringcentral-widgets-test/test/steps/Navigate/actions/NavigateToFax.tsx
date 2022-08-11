import { fireEvent, screen } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

export const NavigateToFax: StepFunction = async () => {
  fireEvent.click(
    (screen.queryByTestId('Messages') ?? screen.queryByTestId('messagesTab'))!,
  );
  fireEvent.click(screen.getByTestId('Fax'));
};
