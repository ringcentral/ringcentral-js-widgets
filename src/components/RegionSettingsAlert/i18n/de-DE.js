import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Region',
  [regionSettingsMessages.saveSuccess]: 'Einstellungen wurden erfolgreich gespeichert.',
  [regionSettingsMessages.dialingPlansChanged]: 'Die vorherige Region wird für Ihr Konto nicht mehr unterstützt.\n    Prüfen Sie Ihre neuen {regionSettingsLink}.',
  regionSettings: 'Regionseinstellungen',
  [regionSettingsMessages.areaCodeInvalid]: 'Geben Sie eine gültige Vorwahl ein.',
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
