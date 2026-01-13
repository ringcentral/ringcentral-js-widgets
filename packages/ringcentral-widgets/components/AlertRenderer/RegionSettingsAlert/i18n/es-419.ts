/* eslint-disable */
import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: 'Región',
  [regionSettingsMessages.saveSuccess]:
    'La configuración se guardó correctamente.',
  [regionSettingsMessages.dialingPlansChanged]:
    'La región anterior ya no se admite para su cuenta.\n    Verifique su nueva {regionSettingsLink}.',
  regionSettings: 'configuración de región',
  [regionSettingsMessages.areaCodeInvalid]: 'Ingrese un código de área válido.',
} as const;

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
