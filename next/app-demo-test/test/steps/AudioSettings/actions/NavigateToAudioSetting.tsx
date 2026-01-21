import { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const NavigateToAudioSetting: StepFunction = async () => {
  const audioSetting = screen.getByText('Audio');
  if (audioSetting) {
    fireEvent.click(screen.getByText('Audio'));
  }

  const headerTitle = screen.getByTestId('headerTitle');
  expect(headerTitle).toBeInTheDocument();
  expect(headerTitle.title).toBe('Audio');
};

export { NavigateToAudioSetting };
