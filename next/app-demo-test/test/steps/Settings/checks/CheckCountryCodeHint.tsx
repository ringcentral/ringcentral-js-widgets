import { whenStateChange } from '@ringcentral-integration/next-core/test';
import { screen, StepFunction } from '@ringcentral-integration/test-utils';

interface CheckCountryCodeHintProps {
  hint: string;
}

export const CheckCountryCodeHint: StepFunction<
  CheckCountryCodeHintProps
> = async ({ hint }) => {
  await whenStateChange(() =>
    expect(screen.getByTestId('countryCodeHint')).toHaveTextContent(hint),
  );
};
