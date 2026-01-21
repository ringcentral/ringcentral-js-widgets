import { whenStateChange } from '@ringcentral-integration/next-core/test';
import {
  getNodeText,
  screen,
  StepFunction,
} from '@ringcentral-integration/test-utils';
import { formatCountryDisplay } from '@ringcentral-integration/widgets/components/RegionSettingsPanel';

interface CheckCountryCodeFieldProps {
  countryCallingCode: string;
  countryName: string;
}

export const CheckCountryCodeField: StepFunction<
  CheckCountryCodeFieldProps
> = async ({ countryCallingCode, countryName }) => {
  // format target value
  const targetValue = formatCountryDisplay(countryCallingCode, countryName);

  await whenStateChange(() =>
    expect(getNodeText(screen.getByTestId('selectedItem'))).toBe(targetValue),
  );
};
