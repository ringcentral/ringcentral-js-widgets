import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: 'Region',
  [regionSettingsMessages.saveSuccess]: 'Einstellungen wurden erfolgreich gespeichert.',
  [regionSettingsMessages.dialingPlansChanged]: 'Die vorherige Region wird für Ihr Konto nicht mehr unterstützt.\n    Prüfen Sie Ihre neuen {regionSettingsLink}.',
  regionSettings: 'Regionseinstellungen',
  [regionSettingsMessages.areaCodeInvalid]: 'Geben Sie eine gültige Vorwahl ein.',
};
