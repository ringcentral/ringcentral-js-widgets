import { fireEvent, screen, waitFor } from '@testing-library/react';
import { NavigateToSettings } from './NavigateToSettings';

import { StepFunction } from '../../../lib/step';

const GoToCallingSetting: StepFunction = async () => {
  expect(screen.getByText('Calling')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Calling'));
  await waitFor(() =>
    expect(screen.getByText('Make my calls with')).toBeInTheDocument(),
  );
};

export const NavigateToCallingSetting: StepFunction = async () => {
  const dom = screen.queryByText('Calling');

  if (dom) {
    return <GoToCallingSetting />;
  }

  return [NavigateToSettings, GoToCallingSetting];
};
