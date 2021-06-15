import { RcThemeProvider } from '@ringcentral/juno';
import React from 'react';

import { StepFunction } from 'crius-test';
import { render } from '@testing-library/react';
import { CountDown, CountDownButton, CountDownButtonProps } from '.';

function setup({
  currentLocale = 'en-US',
  onRestartTimer = () => {},
  onResumeRecord = () => {},
  recordPauseCount = 10,
  timeStamp = Date.now(),
  dataSign = 'CountDown',
}: Partial<CountDownButtonProps>) {
  return render(
    <RcThemeProvider>
      <CountDownButton
        currentLocale={currentLocale}
        onRestartTimer={onRestartTimer}
        onResumeRecord={onResumeRecord}
        recordPauseCount={recordPauseCount}
        timeStamp={timeStamp}
        dataSign={dataSign}
      />
    </RcThemeProvider>,
  );
}

export const CheckCountDownButtonTooltip: StepFunction<any> = () => {
  const { container } = setup({});
  const node = container.querySelector('[data-sign="CountDown"]');
  expect(node).toBeTruthy;
  expect(node.title).toBe('Restart timer');
};

export const CheckCountDownShows: StepFunction<any> = ({ secondsToPause }) => {
  const { container } = render(
    <RcThemeProvider>
      <CountDown data={secondsToPause} />
    </RcThemeProvider>,
  );
  const node = container.querySelector('[data-sign="CountDownText"]');
  expect(node.textContent).toEqual(
    secondsToPause > 99 ? '99+' : secondsToPause,
  );
};

export const CheckCountDownTimer: StepFunction<any> = () => {
  jest.useFakeTimers('legacy');
  const { container } = setup({ recordPauseCount: 3 });
  const node = container.querySelector('[data-sign="CountDown"]');
  expect(node.textContent).toEqual('3');
  expect(setInterval).toHaveBeenCalledTimes(1);
  jest.useRealTimers();
};

export const WaitCountDownOver: StepFunction<any> = ({ secondsToPause }) => {
  jest.useFakeTimers();
  jest.advanceTimersByTime(secondsToPause * 1000);
  jest.useRealTimers();
};
