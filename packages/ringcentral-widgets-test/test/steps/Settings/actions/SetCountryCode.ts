import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';
import { StepFunction } from '../../../lib/step';

interface SetCountryCodeProps {
  selectedCountryCallingCode?: string;
  countryName?: string;
}

export const SetCountryCode: StepFunction<SetCountryCodeProps> = async ({
  selectedCountryCallingCode,
  countryName,
}) => {
  if (
    document.querySelector('[data-sign="selectedItem"]').textContent ===
    `(+${selectedCountryCallingCode}) ${countryName}`
  ) {
    return;
  }
  fireEvent.click(screen.getByTestId('selectRoot'));

  await waitUntilTo(() => {
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
  fireEvent.click(
    screen.getByText(`(+${selectedCountryCallingCode}) ${countryName}`),
  );
  expect(screen.getByTestId('selectedItem')).toHaveTextContent(
    `(+${selectedCountryCallingCode}) ${countryName}`,
  );
  expect(screen.getByTestId('saveButton')).not.toBeDisabled();

  fireEvent.click(screen.getByTestId('saveButton'));
  await waitUntilTo(() => {
    expect(
      screen.getByText('Settings saved successfully.'),
    ).toBeInTheDocument();
  });
};
