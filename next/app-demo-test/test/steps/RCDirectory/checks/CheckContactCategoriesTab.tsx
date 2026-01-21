import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface CheckContactCategoriesTabProps {
  isShow?: boolean;
}

export const CheckContactCategoriesTab: StepFunction<
  CheckContactCategoriesTabProps
> = async ({ isShow = true }, _) => {
  if (isShow) {
    expect(
      screen.queryByTestId('thirdPartyContactSearchResult'),
    ).not.toBeNull();
    expect(screen.queryByTestId('companyContactSearchResult')).not.toBeNull();
    expect(screen.queryByTestId('personalContactSearchResult')).not.toBeNull();
    expect(screen.queryByTestId('otherContactSearchResult')).not.toBeNull();
  } else {
    expect(screen.queryByTestId('thirdPartyContactSearchResult')).toBeNull();
    expect(screen.queryByTestId('companyContactSearchResult')).toBeNull();
    expect(screen.queryByTestId('personalContactSearchResult')).toBeNull();
  }
};
