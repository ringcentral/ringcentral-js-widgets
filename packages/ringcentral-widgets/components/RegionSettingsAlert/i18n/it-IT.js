import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Regione',
  [regionSettingsMessages.saveSuccess]: 'Impostazioni salvate correttamente.',
  [regionSettingsMessages.dialingPlansChanged]: 'La regione precedente non è più supportata per l\'account.\n    Verifica la nuova {regionSettingsLink}.',
  regionSettings: 'impostazioni regione',
  [regionSettingsMessages.areaCodeInvalid]: 'Inserisci un prefisso valido.',
};

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
