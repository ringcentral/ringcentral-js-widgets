import {
  ExtensionInfo,
  RegionSettings,
} from '@ringcentral-integration/micro-auth/src/app/services';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { formatContactPhoneNumber } from '@ringcentral-integration/widgets/modules/ContactDetailsUI';
import { screen } from '@testing-library/react';

export const CheckContactNumberExist: StepFunction<{ number: string }> = (
  { number },
  { app },
) => {
  const regionSettings = app.container.got(RegionSettings)!;
  const extensionInfo = app.container.got(ExtensionInfo)!;
  const formatNumber = formatContactPhoneNumber({
    phoneNumber: number,
    countryCode: regionSettings.countryCode,
    isMultipleSiteEnabled: extensionInfo.isMultipleSiteEnabled,
    siteCode: extensionInfo.site?.code,
  });
  const numberItem = screen.queryByTitle(formatNumber!);
  expect(numberItem).toBeInTheDocument();
};
