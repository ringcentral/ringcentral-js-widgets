import { RcThemeProvider } from '@ringcentral/juno';
import React from 'react';

import { StepFunction } from 'crius-test';
import { render } from '@testing-library/react';
import { RecordControlButton, RecordControlButtonProps } from '.';

function setup({
  currentLocale = 'en-US',
  isRecording = true,
  onRecord = () => {},
  onStopRecord = () => {},
  disablePauseRecord = true,
  onPauseRecord = () => {},
}: Partial<RecordControlButtonProps>) {
  return render(
    <RcThemeProvider>
      <RecordControlButton
        currentLocale={currentLocale}
        isRecording={isRecording}
        onRecord={onRecord}
        onStopRecord={onStopRecord}
        disablePauseRecord={disablePauseRecord}
        onPauseRecord={onPauseRecord}
      />
    </RcThemeProvider>,
  );
}

export const CheckPauseRecordingTooltip: StepFunction<any> = () => {
  const { container } = setup({ disablePauseRecord: false });
  const node = container.querySelector<HTMLButtonElement>(
    '[data-sign="PauseRecording"]',
  );
  expect(node).toBeTruthy;
  expect(node.title).toBe('Pause recording');
};
