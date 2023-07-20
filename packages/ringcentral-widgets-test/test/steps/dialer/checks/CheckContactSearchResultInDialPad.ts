import { getNodeText, screen, waitFor } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

const getSearchNames = () => {
  const searchSections = screen.queryAllByTestId('recipientOption');
  const searchOptions = searchSections.reduce((optionTexts, section) => {
    optionTexts.push(getNodeText(section.querySelector('span')));
    return optionTexts;
  }, []);
  return searchOptions.join();
};

export const CheckContactSearchResultInDialPad: StepFunction<{
  options: string;
}> = async ({ options }) => {
  if (options) {
    await waitFor(
      () => expect(screen.queryByTestId('dropdownList')).not.toBeNull(),
      { timeout: 3000 },
    );
    expect(getSearchNames()).toBe(options);
  } else {
    jest.advanceTimersByTime(3000);
    expect(screen.queryByTestId('dropdownList')).toBeNull();
  }
};
