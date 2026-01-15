/* eslint-disable */
import { regionSettingsMessages } from '@ringcentral-integration/commons/modules/RegionSettings/regionSettingsMessages';
export default {
  region: 'Região',
  [regionSettingsMessages.saveSuccess]: 'Configurações salvas com sucesso.',
  [regionSettingsMessages.dialingPlansChanged]:
    'A região anterior não é mais compatível com a conta.\n    Verifique as novas {regionSettingsLink}.',
  regionSettings: 'configurações de região',
  [regionSettingsMessages.areaCodeInvalid]: 'Insira um código de área válido.',
} as const;

// @key: @#@"region"@#@ @source: @#@"Region"@#@
// @key: @#@"[regionSettingsMessages.saveSuccess]"@#@ @source: @#@"Settings saved successfully."@#@
// @key: @#@"[regionSettingsMessages.dialingPlansChanged]"@#@ @source: @#@"The previous region is no longer supported for your account.\n    Please verify your new {regionSettingsLink}."@#@
// @key: @#@"regionSettings"@#@ @source: @#@"region settings"@#@
// @key: @#@"[regionSettingsMessages.areaCodeInvalid]"@#@ @source: @#@"Please enter a valid area code."@#@
