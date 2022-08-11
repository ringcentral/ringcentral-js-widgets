import { waitInSeconds } from '@ringcentral-integration/commons/integration-test/utils/WaitUtil';
import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { screen, waitFor } from '@testing-library/react';

import { StepFunction } from '../../../lib/step';

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
    await waitFor(
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
