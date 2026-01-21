import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  StepFunction,
  screen,
  within,
} from '@ringcentral-integration/test-utils';

interface CheckContactSearchByOrderProps {
  tabs: string[];
  thirdPartyCount?: number;
  companyCount?: number;
  personalCount?: number;
  otherCount?: number;
  appName?: string;
}

export const CheckContactSearchByOrder: StepFunction<
  CheckContactSearchByOrderProps
> = async ({ tabs }, { app }) => {
  await whenStateChange(() => {
    const searchView = screen.queryByTestId('contactSearchPanel');
    expect(searchView).toBeInTheDocument();

    const searchSummary = within(searchView!).queryByTestId('contactTabsTitle');
    expect(searchSummary).toBeInTheDocument();

    const tabsText = Array.from(searchSummary!.querySelectorAll('button')).map(
      (i) => i.textContent,
    );

    tabs.forEach((expectTabText, index) => {
      expect(tabsText[index]).toContain(expectTabText);
    });
  });
};
