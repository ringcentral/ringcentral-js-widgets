import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { getNodeText, screen } from '@testing-library/react';

const getSearchNames = () => {
  const searchSections = screen.queryAllByTestId('contactSearchItem');
  const searchOptions = searchSections.reduce((optionTexts, section) => {
    optionTexts.push(section.querySelector('span')!.title);
    return optionTexts;
  }, []);
  return searchOptions.join();
};

export const CheckContactSearchResultInDialPad: StepFunction<{
  options?: string;
  entityCount?: string;
}> = async ({ options, entityCount }) => {
  if (options) {
    await whenStateChange(() =>
      expect(
        screen.queryByTestId('thirdPartyContactSearchResult'),
      ).toHaveTextContent(entityCount!),
    );
    expect(getSearchNames()).toBe(options);
  } else {
    expect(
      screen.queryByTestId('thirdPartyContactSearchResult'),
    ).toHaveTextContent("0");
  }
};
