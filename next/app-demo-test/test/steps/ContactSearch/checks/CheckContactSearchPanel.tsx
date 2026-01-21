import {
  StepFunction,
  screen,
  within,
} from '@ringcentral-integration/test-utils';

interface CheckContactSearchPanelProps {
  present?: boolean;
  thirdPartyCount?: number;
  companyCount?: number;
  personalCount?: number;
  otherCount?: number;
  appName?: string;
}

export const CheckContactSearchPanel: StepFunction<
  CheckContactSearchPanelProps
> = async ({
  present = true,
  thirdPartyCount = 0,
  companyCount = 0,
  personalCount = 0,
  otherCount = 0,
  appName = '',
}) => {
  if (!present) {
    expect(screen.queryByTestId('contactSearchPanel')).not.toBeInTheDocument();
    return;
  }
  const searchView = screen.queryByTestId('contactSearchPanel');
  expect(searchView).toBeInTheDocument();
  const searchSummary = within(searchView!).queryByTestId('contactTabsTitle');
  expect(
    within(searchSummary!).queryByTestId('thirdPartyContactSearchResult')
      ?.textContent,
  ).toBe(`${appName} (${thirdPartyCount})`);
  expect(
    within(searchSummary!).queryByTestId('companyContactSearchResult')
      ?.textContent,
  ).toBe(`Company (${companyCount})`);
  expect(
    within(searchSummary!).queryByTestId('personalContactSearchResult')
      ?.textContent,
  ).toBe(`Personal (${personalCount})`);
  expect(
    within(searchSummary!).queryByTestId('otherContactSearchResult')
      ?.textContent,
  ).toBe(`Other (${otherCount})`);
};
