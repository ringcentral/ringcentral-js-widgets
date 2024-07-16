import type { RegionSettings } from '@ringcentral-integration/commons/modules/RegionSettings';
import { waitUntilTo } from '@ringcentral-integration/utils';
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import type { StepFunction } from '../../../lib/step';

interface SetAreaCodeInt {
  areaCode: string;
  clickSave?: boolean;
}

export const SetAreaCode: StepFunction<SetAreaCodeInt> = async (
  { areaCode, clickSave = true },
  context,
) => {
  const areaCodeInput =
    screen.queryByTestId<HTMLInputElement>('areaCodeInputField');

  // When area code is set to auto detected, no area code input field then
  if (!areaCodeInput) {
    const regionSettings = context.phone.regionSettings as RegionSettings;
    regionSettings.setAreaCode(areaCode);
    return;
  }

  // check if alert saving
  const hasAlert = areaCode !== areaCodeInput.value;

  // input
  act(() => {
    fireEvent.change(areaCodeInput, {
      target: { value: areaCode },
    });
  });
  expect(areaCodeInput).toHaveValue(areaCode);

  // save
  if (clickSave) {
    act(() => {
      fireEvent.click(screen.getByTestId('saveButton'));
    });

    // check alert
    if (hasAlert) {
      await waitUntilTo(() => {
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
