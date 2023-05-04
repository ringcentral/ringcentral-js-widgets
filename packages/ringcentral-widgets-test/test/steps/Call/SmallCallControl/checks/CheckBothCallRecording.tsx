import { waitUntilTo } from '@ringcentral-integration/utils';
import { screen } from '@testing-library/react';

import { StepFunction } from '../../../../lib/step';

const CheckBothCallRecording: StepFunction = async () => {
  expect(screen.queryByTestId('stopRecord')).toBeInTheDocument();

  await waitUntilTo(() =>
    expect(screen.queryByTestId('recordingIndicator')).toBeInTheDocument(),
  );
  expect(screen.queryByTestId('subRecordingIndicator')).toBeInTheDocument();
  expect(screen.queryByTestId('recordingIndicatorHeader')).toBeInTheDocument();
};

export { CheckBothCallRecording };
