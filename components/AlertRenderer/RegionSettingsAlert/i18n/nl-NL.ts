/* eslint-disable */
import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: 'Regio',
  [regionSettingsMessages.saveSuccess]: 'Instellingen opgeslagen.',
  [regionSettingsMessages.dialingPlansChanged]:
    'De vorige regio wordt niet meer ondersteund voor uw account.\n    Controleer uw nieuwe {regionSettingsLink}.',
  regionSettings: 'regionale instellingen',
  [regionSettingsMessages.areaCodeInvalid]: 'Voer een geldig netnummer in.',
} as const;

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
