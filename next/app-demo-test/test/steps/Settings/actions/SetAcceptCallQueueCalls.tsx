import { whenStateOrTimerChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MockPutPresence } from '../../Mock';

interface SetAcceptCallQueueCallsOptions {
  isAccept: boolean;
}

export const SetAcceptCallQueueCalls: StepFunction<
  SetAcceptCallQueueCallsOptions
> = async ({ isAccept }, context) => {
  const getSwitchControl = () => {
    const element = screen.queryByTestId<HTMLDivElement>('acceptQueueSwitch');
    expect(element).toBeInTheDocument();
    const switchControl = element!.querySelector<HTMLElement>(
      '[data-sign="switch"]',
    );
    expect(switchControl).toBeInTheDocument();
    const switchInput =
      switchControl instanceof HTMLInputElement
        ? switchControl
        : switchControl!.querySelector<HTMLInputElement>('input');
    expect(switchInput).toBeInTheDocument();
    return { switchControl: switchControl!, switchInput: switchInput! };
  };

  const { switchControl, switchInput } = await whenStateOrTimerChange(() => {
    return getSwitchControl();
  });

  const isChecked = switchInput.checked;
  const isDisabled = switchInput.disabled;
  if (!isDisabled && isChecked !== isAccept) {
    MockPutPresence({}, context);
    await userEvent.click(switchControl);
    await waitForRenderReady();
    await whenStateOrTimerChange(() => {
      expect(getSwitchControl().switchInput.checked).toEqual(isAccept);
    });
  }
};
