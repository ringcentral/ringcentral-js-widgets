import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';

import { NavigateToSettings } from './NavigateToSettings';

const GoToCallingSetting: StepFunction = async () => {
  expect(screen.getByText('Calling')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Calling'));
  await whenStateChange(() =>
    expect(screen.getByText('Make my calls with')).toBeInTheDocument(),
  );
};

export const NavigateToCallingSetting: StepFunction = async () => {
  const dom = screen.queryByText('Calling');

  if (dom) {
    return <GoToCallingSetting />;
  }

  return [
    NavigateToSettings,
    GoToCallingSetting,
    async () => {
      await waitForRenderReady();
    },
  ];
};
