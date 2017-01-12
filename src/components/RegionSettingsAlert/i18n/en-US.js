import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Region',
  [regionSettingsMessages.saveSuccess]: 'Settings saved successfully.',
  [regionSettingsMessages.dialingPlansChanged]:
    `The previous region is no longer supported for your account.
    Please verify your new {regionSettingsLink}.`,
  regionSettings: 'region settings',
  [regionSettingsMessages.areaCodeInvalid]: 'Please enter a valid area code.',
};
