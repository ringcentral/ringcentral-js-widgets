import regionSettingsMessages from
  'ringcentral-integration/modules/RegionSettings/regionSettingsMessages';

export default {
  region: '地域',
  [regionSettingsMessages.saveSuccess]: '設定が正常に保存されました\u3002',
  [regionSettingsMessages.dialingPlansChanged]: '前の地域は\u3001お使いのアカウントでもうサポートされません\u3002\n    新しい{regionSettingsLink}を確認してください\u3002',
  regionSettings: '地域の設定',
  [regionSettingsMessages.areaCodeInvalid]: '有効な市外局番を入力してください\u3002',
};
