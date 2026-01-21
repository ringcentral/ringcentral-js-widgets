import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { waitForRenderReady } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

const getSearchOptions = () => {
  const searchSections = screen.queryAllByTestId('recipientOption');
  const searchOptions = searchSections.reduce((optionTexts, section) => {
    optionTexts.push(section.textContent.replace(/\|/g, '_'));
    return optionTexts;
  }, []);
  return searchOptions;
};

export const CheckContactSearchOptionsInDialPad: StepFunction<{
  options: string[];
}> = async ({ options }) => {
  if (options) {
    await whenStateChange(
      () => expect(screen.queryByTestId('dropdownList')).not.toBeNull(),
      { timeout: 1000 },
    );
    expect(getSearchOptions()).toStrictEqual(options);
  } else {
    jest.useFakeTimers();
    await waitForRenderReady();
    jest.advanceTimersByTime(1000);
    expect(screen.queryByTestId('dropdownList')).toBeNull();
    jest.useRealTimers();
  }
};
