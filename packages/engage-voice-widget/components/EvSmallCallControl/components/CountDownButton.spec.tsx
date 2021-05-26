import { RcThemeProvider } from '@ringcentral/juno';
import React from 'react';

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

describe('<CountDownButton />', async () => {
  it('CountDown button shows', async () => {
    const { container } = setup({});
    const node = container.querySelector('[data-sign="CountDown"]');
    expect(node).toBeTruthy;
  });

  it('countdown text will show 99+ if count > 99', async () => {
    const { container } = render(
      <RcThemeProvider>
        <CountDown data={500} />
      </RcThemeProvider>,
    );
    const node = container.querySelector('[data-sign="CountDownText"]');
    expect(node.textContent).toEqual('99+');
  });

  it('countdown timer should be use', async () => {
    jest.useFakeTimers();
    const { container } = setup({ recordPauseCount: 3 });
    const node = container.querySelector('[data-sign="CountDown"]');
    expect(node.textContent).toEqual('3');
    expect(setInterval).toHaveBeenCalledTimes(1);
  });
});
