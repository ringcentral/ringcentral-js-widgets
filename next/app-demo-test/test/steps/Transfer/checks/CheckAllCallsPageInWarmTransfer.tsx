import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckAllCallsPageInWarmTransferProps {
  currentCallName: string;
  holdCallName: string;
}

export const CheckAllCallsPageInWarmTransfer: StepFunction<
  CheckAllCallsPageInWarmTransferProps
> = async ({ currentCallName, holdCallName }) => {
  await whenStateChange(() => {
    expect(screen.queryAllByTestId('callList').length).toEqual(2);
    const currentCall = document.querySelectorAll(
      'div[data-sign="callList"]',
    )[0];
    const holdCall = document.querySelectorAll('div[data-sign="callList"]')[1];

    expect(
      currentCall.querySelector('div[data-sign="currentName"]')?.textContent,
    ).toEqual(currentCallName);
    expect(
      holdCall.querySelector('div[data-sign="currentName"]')?.textContent,
    ).toEqual(holdCallName);
  });
};
