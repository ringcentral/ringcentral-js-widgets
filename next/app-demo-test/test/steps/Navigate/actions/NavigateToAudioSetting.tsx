import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  type StepFunction,
  waitForRenderReady,
} from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

import { NavigateToSettings } from './NavigateToSettings';

const GoToAudioSetting: StepFunction = async () => {
  expect(screen.getByText('Audio')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Audio'));
  await whenStateChange(() =>
    expect(screen.getByText('Output Device')).toBeInTheDocument(),
  );
};

export const NavigateToAudioSetting: StepFunction = async () => {
  const dom = screen.queryByText('Audio');

  if (dom) {
    return <GoToAudioSetting />;
  }

  return [
    NavigateToSettings,
    GoToAudioSetting,
    async () => {
      await waitForRenderReady();
    },
  ];
};
