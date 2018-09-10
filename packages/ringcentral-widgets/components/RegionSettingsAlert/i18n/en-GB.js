import regionSettingsMessages from 'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: "Region",
  [regionSettingsMessages.saveSuccess]: "Settings saved successfully.",
  [regionSettingsMessages.dialingPlansChanged]: "The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}.",
  regionSettings: "region settings",
  [regionSettingsMessages.areaCodeInvalid]: "Please enter a valid area code."
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
