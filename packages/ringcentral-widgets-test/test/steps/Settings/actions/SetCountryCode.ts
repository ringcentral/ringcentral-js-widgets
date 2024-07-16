import { whenStateChange } from '@ringcentral-integration/core/test';
import { formatCountryDisplay } from '@ringcentral-integration/widgets/components/RegionSettingsPanel';
import { fireEvent, screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

interface SetCountryCodeProps {
  countryCallingCode: string;
  countryName: string;
  clickSave?: boolean;
}

export const SetCountryCode: StepFunction<SetCountryCodeProps> = async ({
  countryCallingCode,
  countryName,
  clickSave = true,
}) => {
  // format target value
  const targetValue = formatCountryDisplay(countryCallingCode, countryName);

  // check if alert saving
  const selectedItem = screen.getByTestId('selectedItem');
  const hasAlert = selectedItem.textContent !== targetValue;

  // open dropdown
  fireEvent.click(screen.getByTestId('selectRoot'));
  const dropdownList = screen.getByRole('menu');
  expect(dropdownList).toBeInTheDocument();

  // select target value
  fireEvent.click(within(dropdownList).getByText(targetValue));
  expect(selectedItem).toHaveTextContent(targetValue);

  // save
  if (clickSave) {
    const saveButton = screen.getByTestId('saveButton');
    expect(saveButton).not.toBeDisabled();
    fireEvent.click(saveButton);

    // check alert
    if (hasAlert) {
      await whenStateChange(() => {
        // multiple alerts will be shown when calling step SetCountryCode and step SetAreaCode at the same time
        const alerts = screen.queryAllByText('Settings saved successfully.');
        expect(alerts.length).toBeGreaterThanOrEqual(1);
        alerts.forEach((alert) => {
          expect(alert).toBeInTheDocument();
        });
      });
    }
  }
};
