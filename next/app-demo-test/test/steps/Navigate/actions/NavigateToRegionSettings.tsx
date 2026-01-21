import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  fireEvent,
  screen,
  type StepFunction,
} from '@ringcentral-integration/test-utils';

interface NavigateToRegionSettingsProps {
  checkCountryField?: boolean;
}

export const NavigateToRegionSettings: StepFunction<
  NavigateToRegionSettingsProps
> = async ({ checkCountryField = true }) => {
  const region = screen.queryByTestId('region');
  expect(region).toBeInTheDocument();
  fireEvent.click(region!);

  if (checkCountryField) {
    await whenStateChange(() =>
      expect(screen.getByText('Country')).toBeInTheDocument(),
    );
  }
};
