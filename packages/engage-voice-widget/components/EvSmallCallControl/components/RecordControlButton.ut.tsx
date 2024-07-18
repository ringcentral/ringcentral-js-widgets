import type { RecordControlButtonProps } from '.';
import { RecordControlButton } from '.';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { RcThemeProvider } from '@ringcentral/juno';
import { render } from '@testing-library/react';
import React from 'react';

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
